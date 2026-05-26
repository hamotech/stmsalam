module.exports = function createOrderTransitionService({
  admin,
  readCanonicalOrderStatusStrict,
  normalizeOrderStateForRead,
  assertPaymentConsistency,
  assertTransitionAuthorized,
} = {}) {
  if (
    !admin?.firestore?.FieldValue?.serverTimestamp ||
    typeof readCanonicalOrderStatusStrict !== 'function' ||
    typeof normalizeOrderStateForRead !== 'function' ||
    typeof assertPaymentConsistency !== 'function' ||
    typeof assertTransitionAuthorized !== 'function'
  ) {
    throw new Error('Service dependency violation: use bootstrap injection only');
  }

  class TransitionServiceError extends Error {
    constructor(code, message, debug = {}) {
      super(message);
      this.name = 'TransitionServiceError';
      this.code = code;
      this.debug = debug;
    }
  }

  const ALLOWED_TRANSITIONS = Object.freeze({
    pending_payment: Object.freeze(['paid', 'failed', 'cancelled']),
    placed: Object.freeze(['refunded', 'preparing', 'cancelled']),
    paid: Object.freeze(['refunded', 'preparing', 'cancelled']),
    refunded: Object.freeze([]),
    preparing: Object.freeze(['ready_for_pickup', 'cancelled']),
    ready_for_pickup: Object.freeze(['out_for_delivery', 'cancelled']),
    out_for_delivery: Object.freeze(['delivered', 'cancelled']),
    delivered: Object.freeze([]),
    cancelled: Object.freeze([]),
    failed: Object.freeze(['cancelled']),
  });

  function normalizeActor(raw) {
    const a = String(raw || '').trim().toLowerCase();
    if (a === 'webhook') return 'webhook';
    if (a === 'admin') return 'admin';
    if (a === 'rider' || a === 'driver') return 'rider';
    if (a === 'system') return 'system';
    if (a === 'web_customer' || a === 'mobile_customer') return a;
    return a;
  }

  function assertNoDirectStatusMutation(patch, opts = {}) {
    const allow = opts.allowStatusMutation === true;
    if (!patch || typeof patch !== 'object') return;
    const forbiddenLifecycle = ['status', 'paymentStatus', 'paymentMethod'];
    const touched = forbiddenLifecycle.filter((k) => Object.prototype.hasOwnProperty.call(patch, k));
    if (touched.length > 0) {
      console.trace('ORDER WRITE SOURCE');
      console.warn('[orderTransitionService] lifecycle keys passed in patch metadata', {
        touched,
        allow,
      });
    }
    if (!allow && touched.length > 0) {
      const msg = 'FSM VIOLATION: direct lifecycle write blocked';
      if (process.env.NODE_ENV !== 'production') {
        throw new TransitionServiceError('UNAUTHORIZED', msg, { patchKeys: Object.keys(patch) });
      }
      console.error('🚨 Direct lifecycle write detected (BLOCK THIS)', { patchKeys: Object.keys(patch) });
      throw new TransitionServiceError('UNAUTHORIZED', msg);
    }
  }

  const ORDER_LOCK_COLLECTION = 'order_transition_locks';
  const ORDER_LOCK_TTL_MS = 30 * 1000;
  const LOCK_RETRY_MS = 80;
  const LOCK_RETRY_JITTER_MS = 120;
  const LOCK_RETRY_MAX = 30;
  const TERMINAL_STATES = new Set(['delivered', 'cancelled']);
  const SANITIZED_KEYS = new Set([
    'status',
    'paymentStatus',
    'paymentMethod',
  ]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function acquireOrderLock(db, orderId) {
    const ownerId = `lock_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    const lockVersion = `v_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
    const lockRef = db.collection(ORDER_LOCK_COLLECTION).doc(orderId);
    for (let i = 0; i < LOCK_RETRY_MAX; i += 1) {
      const now = Date.now();
      const expiresAtMs = now + ORDER_LOCK_TTL_MS;
      try {
        await db.runTransaction(async (tx) => {
          const snap = await tx.get(lockRef);
          if (snap.exists) {
            const d = snap.data() || {};
            const heldUntil = Number(d.expiresAtMs || 0);
            if (Number.isFinite(heldUntil) && heldUntil > now) {
              throw new TransitionServiceError('LOCKED', 'Order is being updated by another process', {
                orderId,
              });
            }
          }
          tx.set(lockRef, {
            ownerId,
            lockVersion,
            orderId,
            createdAtMs: now,
            expiresAtMs,
            expiresAt: admin.firestore.Timestamp.fromMillis(expiresAtMs),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });
        });
        return { ownerId, lockVersion, lockRef };
      } catch (e) {
        const lockErr =
          e instanceof TransitionServiceError &&
          e.code === 'LOCKED';
        if (!lockErr) throw e;
        const jitter = Math.floor(Math.random() * (LOCK_RETRY_JITTER_MS + 1));
        await sleep(LOCK_RETRY_MS + jitter);
      }
    }
    throw new TransitionServiceError('LOCK_TIMEOUT', 'Order transition lock timeout', { orderId });
  }

  async function releaseOrderLock(db, orderId, ownerId) {
    try {
      const lockRef = db.collection(ORDER_LOCK_COLLECTION).doc(orderId);
      await db.runTransaction(async (tx) => {
        const snap = await tx.get(lockRef);
        if (!snap.exists) return;
        const d = snap.data() || {};
        if (String(d.ownerId || '') !== String(ownerId || '')) return;
        tx.delete(lockRef);
      });
    } catch (e) {
      console.warn('[orderTransitionService][lock-release]', {
        orderId,
        ownerId: ownerId || null,
        error: e instanceof Error ? e.message : String(e),
      });
    }
  }

  function stripIllegalFields(patch) {
    const safe = { ...(patch && typeof patch === 'object' ? patch : {}) };
    for (const k of SANITIZED_KEYS) {
      if (Object.prototype.hasOwnProperty.call(safe, k)) {
        delete safe[k];
      }
    }
    return safe;
  }

  function validateOrderState(next, opts = {}) {
    const from = String(opts.from || '').trim().toLowerCase();
    const status = String(next?.status || '').trim().toLowerCase();
    const paymentStatus = String(next?.paymentStatus || '').trim().toUpperCase();
    const paymentMethod = String(next?.paymentMethod || '')
      .trim()
      .toUpperCase();
    assertPaymentConsistency(status, paymentStatus, {
      from,
      paymentMethod,
      source: 'write',
    });
    if (status === 'delivered') {
      const paid = paymentStatus === 'PAID';
      const codRail = paymentMethod === 'COD' || paymentMethod === 'CASH';
      if (!paid && !codRail) {
        throw new TransitionServiceError('INVALID_TRANSITION', 'Delivered state requires PAID or COD rail', {
          from,
          to: status,
          paymentStatus,
          paymentMethod: paymentMethod || null,
        });
      }
    }
  }

  function applyOrderUpdate(order, nextState, opts = {}) {
    const current = order && typeof order === 'object' ? order : {};
    const from = String(opts.from || current.status || '').trim().toLowerCase();
    const nextStatus = String(nextState?.status || current.status || '').trim().toLowerCase();
    const nextPaymentStatus = String(nextState?.paymentStatus || current.paymentStatus || '').trim().toUpperCase();
    const nextPaymentMethod = String(nextState?.paymentMethod || current.paymentMethod || '')
      .trim()
      .toUpperCase();
    const next = Object.freeze({
      ...current,
      status: nextStatus,
      paymentStatus: nextPaymentStatus,
      paymentMethod: nextPaymentMethod,
    });
    validateOrderState(next, { from });
    console.log('[ORDER UPDATE]', {
      orderId: String(opts.orderId || current.id || current.orderId || '').trim() || null,
      finalStatus: nextStatus,
      finalPaymentStatus: nextPaymentStatus,
      paymentMethod: nextPaymentMethod || null,
      note: 'applyOrderUpdate validates/enforces pre-derived state only',
    });
    return next;
  }

  function deriveNextOrderState(fromState, event, context = {}) {
    const from = String(fromState || '').trim().toLowerCase();
    const type = String(event?.type || '').trim().toUpperCase();
    const currentPaymentStatus = String(context.paymentStatus || '').trim().toUpperCase();
    const currentPaymentMethod = String(context.paymentMethod || '').trim().toUpperCase();

    if (!type) {
      throw new TransitionServiceError('INVALID_TRANSITION', 'Missing transition event type', {
        from,
        eventType: null,
      });
    }

    if (type === 'STRIPE_PAYMENT_SUCCESS') {
      return { status: 'paid', paymentStatus: 'PAID', paymentMethod: 'STRIPE' };
    }
    if (type === 'STRIPE_PAYMENT_FAILED') {
      // Order failure affects ONLY the status field.
      // paymentStatus and paymentMethod MUST remain unchanged — the FSM will preserve them from context.
      return { status: 'failed' };
    }
    if (type === 'ORDER_ACCEPTED') {
      return { status: 'placed' };
    }
    if (type === 'ORDER_PREPARING') {
      return { status: 'preparing' };
    }
    if (type === 'ORDER_READY_FOR_PICKUP') {
      return { status: 'ready_for_pickup' };
    }
    if (type === 'ORDER_OUT_FOR_DELIVERY') {
      return { status: 'out_for_delivery' };
    }
    if (type === 'ORDER_DELIVERED') {
      return { status: 'delivered' };
    }
    if (type === 'ORDER_CANCELLED') {
      return { status: 'cancelled' };
    }
    if (type === 'ADMIN_REFUND_APPROVED') {
      return { status: 'refunded' };
    }

    throw new TransitionServiceError('INVALID_TRANSITION', 'Unknown transition event type', {
      from,
      eventType: type,
    });
  }

  function isAllowedTransition(from, to) {
    const src = String(from || '').trim().toLowerCase();
    const dst = String(to || '').trim().toLowerCase();
    const allowed = ALLOWED_TRANSITIONS[src] || [];
    return allowed.includes(dst);
  }

  function getCanonicalOrderState(data) {
    const rawPs = String(data.paymentStatus || '').trim().toUpperCase();
    // Normalize legacy COD_PENDING to NOT_APPLICABLE immediately upon read.
    const paymentStatus = rawPs === 'COD_PENDING' ? 'NOT_APPLICABLE' : rawPs;
    return {
      status: String(data.status || '').trim().toLowerCase(),
      paymentStatus,
      paymentMethod: String(data.paymentMethod || '').trim().toUpperCase(),
    };
  }

  function enforcePaymentConsistency(status, paymentStatus, paymentMethod) {
    // COD is settled offline — NOT_APPLICABLE is the only valid paymentStatus for COD.
    // Accept legacy COD_PENDING for backward-compat with old docs.
    if (paymentMethod === 'COD' || paymentMethod === 'CASH') {
      if (paymentStatus === 'PAID') {
        throw new Error('COD cannot be PAID directly');
      }
      return; // NOT_APPLICABLE and legacy COD_PENDING both allowed for COD
    }

    if (paymentMethod === 'STRIPE' && status === 'delivered' && paymentStatus !== 'PAID') {
      throw new Error('Stripe must be PAID before delivery');
    }
  }

  function normalizeStateToken(raw) {
    return String(raw ?? '')
      .trim()
      .toLowerCase()
      .replace(/-/g, '_')
      .replace(/\s+/g, '_');
  }

  async function performOrderTransition({
    db,
    orderRef,
    actor,
    actorUid = null,
    event,
    metadata = {},
  }) {
    if (!db || !orderRef) throw new Error('Missing db/orderRef');
    const orderId = String(orderRef.id || '').trim();
    if (!orderId) throw new Error('Missing orderRef.id');
    const normalizedActor = normalizeActor(actor);
    const eventType = String(event?.type || '').trim().toUpperCase();
    if (!eventType) throw new Error('Missing event.type');
    const started = Date.now();
    const requestId =
      String(metadata?.requestId || '').trim() ||
      `req_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    const source = String(metadata?.source || 'unknown').trim();
    let finalFrom = null;
    let duplicateTransitionSkipped = false;

    const runOnce = async (lock) => {
      await db.runTransaction(async (tx) => {
        const snap = await tx.get(orderRef);
        if (!snap.exists) {
          throw new TransitionServiceError('INVALID_TRANSITION', 'Order not found', {
            from: null,
            to: null,
            actor: normalizedActor,
          });
        }
        const data = snap.data() || {};
        const readNorm = normalizeOrderStateForRead(data, {
          logger: (m, p) => console.warn('[orderTransitionService][state:normalize]', m, p || {}),
        });
        if (readNorm?.normalizationWarningsCount) {
          console.log('[orderTransitionService][state:normalize:debug]', {
            orderId,
            normalizationWarningsCount: Number(readNorm.normalizationWarningsCount || 0),
          });
        }
        const canonical = getCanonicalOrderState(data);
        const from = canonical.status;
        const paymentStatus = canonical.paymentStatus;
        const paymentMethod = canonical.paymentMethod;
        if (!from) {
          throw new TransitionServiceError('INVALID_TRANSITION', 'Missing canonical persisted status', {
            from: null,
            to: null,
            actor: normalizedActor,
          });
        }
        finalFrom = from;
        enforcePaymentConsistency(from, paymentStatus, paymentMethod);
        const assignedRiderId = String(data.riderId || data?.rider?.id || '').trim() || null;
        const nextDerived = deriveNextOrderState(
          from,
          event,
          {
            paymentStatus,
            paymentMethod,
            actor: normalizedActor,
            assignedRiderId,
          }
        );
        const nextPaymentStatus = String(nextDerived.paymentStatus || paymentStatus).trim().toUpperCase();
        const finalState = {
          status: String(nextDerived.status || '').trim().toLowerCase(),
          // Final safety: ensure no write operation ever persists legacy COD_PENDING.
          paymentStatus: nextPaymentStatus === 'COD_PENDING' ? 'NOT_APPLICABLE' : nextPaymentStatus,
          paymentMethod: String(nextDerived.paymentMethod || paymentMethod).trim().toUpperCase(),
        };
        const to = finalState.status;
        enforcePaymentConsistency(
          finalState.status,
          finalState.paymentStatus,
          finalState.paymentMethod
        );
        if (finalState.paymentStatus === 'PAID' && finalState.status === 'placed') {
          console.warn('[FSM WARNING] PAID but still placed - review webhook flow', {
            orderId,
            eventType,
            actor: normalizedActor,
          });
        }
        if (TERMINAL_STATES.has(from) && from !== to) {
          throw new TransitionServiceError('INVALID_TRANSITION', 'Terminal state is immutable', {
            from,
            to,
            actor: normalizedActor,
          });
        }
        if (!isAllowedTransition(from, to)) {
          throw new TransitionServiceError('INVALID_TRANSITION', 'Invalid order state transition', {
            from,
            to,
            actor: normalizedActor,
          });
        }
        try {
          assertTransitionAuthorized({
            actor: normalizedActor,
            from,
            to,
            assignedRiderId,
            actorUid,
            paymentStatus,
            paymentMethod,
            patch: {},
          });
        } catch (e) {
          const msg = e instanceof Error ? e.message : 'Transition blocked';
          const code = msg.includes('Unauthorized') ? 'UNAUTHORIZED' : 'INVALID_TRANSITION';
          throw new TransitionServiceError(code, msg, {
            from,
            to,
            actor: normalizedActor,
          });
        }

        const now = admin.firestore.FieldValue.serverTimestamp();
        const patch = {
          ...(metadata?.patch && typeof metadata.patch === 'object' ? metadata.patch : {}),
        };
        assertNoDirectStatusMutation(patch);
        const semanticTransitionKey = `${orderId}:${to}:${String(finalState.paymentStatus || '').trim().toUpperCase()}`;
        if (String(data?.lastTransitionKey || '').trim() === semanticTransitionKey) {
          duplicateTransitionSkipped = true;
          return;
        }
        const transitionRef = orderRef.collection('transitions').doc(requestId);
        const lockSnap = await tx.get(lock.lockRef);
        if (!lockSnap.exists) {
          throw new TransitionServiceError('LOCK_LOST', 'Order transition lock lost before commit', { orderId });
        }
        const lockData = lockSnap.data() || {};
        const heldUntil = Number(lockData.expiresAtMs || 0);
        if (
          String(lockData.ownerId || '') !== String(lock.ownerId || '') ||
          String(lockData.lockVersion || '') !== String(lock.lockVersion || '') ||
          !Number.isFinite(heldUntil) ||
          heldUntil <= Date.now()
        ) {
          throw new TransitionServiceError('LOCK_STALE', 'Order transition lock is stale', { orderId });
        }

        // WHITELIST: only these non-lifecycle extras may be written atomically with the FSM transition.
        // Any other metadata.patch key is intentionally dropped — no blind spreading.
        // WHITELISTED ONLY: paidAt, stripeCheckoutSessionId, paymentIntentId, plus lastEventId for technical idempotency.
        const PATCH_WHITELIST = ['paidAt', 'stripeCheckoutSessionId', 'paymentIntentId', 'lastEventId'];
        const whitelistedExtras = {};
        if (metadata?.patch && typeof metadata.patch === 'object') {
          for (const k of PATCH_WHITELIST) {
            if (Object.prototype.hasOwnProperty.call(metadata.patch, k) && metadata.patch[k] != null) {
              whitelistedExtras[k] = metadata.patch[k];
            }
          }
        }
        tx.set(
          orderRef,
          {
            // ONLY validated canonical lifecycle fields + whitelisted non-lifecycle extras.
            status: finalState.status,
            paymentStatus: finalState.paymentStatus,
            paymentMethod: finalState.paymentMethod,
            lastTransitionId: requestId,
            lastTransitionKey: semanticTransitionKey,
            updatedAt: now,
            ...whitelistedExtras,
          },
          { merge: true }
        );
        tx.create(
          transitionRef,
          {
            transitionId: requestId,
            orderId,
            from,
            to,
            actor: normalizedActor,
            actorUid: actorUid || null,
            source,
            eventType,
            paymentStatus: String(finalState.paymentStatus || '').trim().toUpperCase(),
            paymentMethod: String(finalState.paymentMethod || '').trim().toUpperCase() || null,
            createdAt: now,
            createdAtMs: Date.now(),
            metadata: metadata || {},
          }
        );
        tx.set(
          db.collection('order_audit_logs').doc(orderRef.id).collection('events').doc(),
          {
            orderId: orderRef.id,
            from,
            to,
            actor: normalizedActor,
            actorUid: actorUid || null,
            timestamp: now,
            requestId,
            source,
            eventType,
            latencyMs: Date.now() - started,
            metadata: metadata || {},
          }
        );
        tx.set(
          db.collection('order_events').doc(orderRef.id).collection('events').doc(),
          {
            type: 'ORDER_STATUS_CHANGED',
            orderId: orderRef.id,
            from,
            to,
            actor: normalizedActor,
            actorUid: actorUid || null,
            timestamp: now,
            requestId,
            source,
            eventType,
            metadata: metadata || {},
          }
        );
      });
    };

    let lock = null;
    try {
      lock = await acquireOrderLock(db, orderId);
      await runOnce(lock);
    } catch (e1) {
      const retryable = !(e1 instanceof TransitionServiceError);
      if (retryable) {
        try {
          await runOnce(lock);
        } catch (e2) {
          await db.collection('order_failure_logs').doc(orderRef.id).set(
            {
              orderId: orderRef.id,
              actor: normalizedActor,
              actorUid: actorUid || null,
              requestId,
              source,
              error: e2 instanceof Error ? e2.message : String(e2),
              timestamp: admin.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
          );
          throw new TransitionServiceError('TRANSITION_FAILED', 'Transition failed after retry', {
            from: null,
            to: null,
            actor: normalizedActor,
          });
        }
      }
      throw e1;
    } finally {
      if (lock?.ownerId) {
        await releaseOrderLock(db, orderId, lock.ownerId);
      }
    }

    const latencyMs = Date.now() - started;
    console.log({
      event: 'ORDER_TRANSITION',
      orderId: orderRef.id,
      from: finalFrom,
      eventType,
      actor: normalizedActor,
      latencyMs,
      requestId,
    });
    return { ok: true, requestId, latencyMs, duplicateTransitionSkipped };
  }

  return {
    performOrderTransition,
    applyOrderUpdate,
    assertNoDirectStatusMutation,
    TransitionServiceError,
  };
};
