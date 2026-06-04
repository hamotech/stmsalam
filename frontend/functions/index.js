const crypto = require('crypto');
const admin = require('firebase-admin');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { onDocumentCreated, onDocumentUpdated } = require('firebase-functions/v2/firestore');
const { buildPublicTrackingFromOrder } = require('./mirrorPayload');
const { getService } = require('./shared/bootstrap/functionBootstrap.cjs');
const { PAYMENT_MODE, normalizePaymentMode } = require('./shared/paymentConstants.cjs');
const { log, error } = require('./lib/logger.cjs');
const { withValidation, validateCreateGrabOrder, validateStripePendingOrder } = require('./lib/validators.cjs');

admin.initializeApp();
const IS_DEPLOY_MODE = String(process.env.FUNCTIONS_DEPLOY_MODE || '').toLowerCase() === 'true';
if (!IS_DEPLOY_MODE) {
  console.log('Functions loaded successfully with shared modules');
}

const performOrderTransition = (...args) =>
  getService('orderTransitionService').performOrderTransition(...args);
const createInitialOrderSnapshot = (...args) =>
  getService('createOrderService').createInitialOrderSnapshot(...args);
const checkRateLimit = (...args) =>
  getService('rateLimiter').checkRateLimit(...args);
const increment = (...args) =>
  getService('rateLimiter').increment(...args);
const assertProductionSecurityMode = (...args) =>
  getService('appCheckGuard').assertProductionSecurityMode(...args);
const enforceCallableAppCheck = (...args) =>
  getService('appCheckGuard').enforceCallableAppCheck(...args);
const getProcessedResult = (...args) =>
  getService('idempotencyService').getProcessedResult(...args);
const reserveKey = (...args) =>
  getService('idempotencyService').reserveKey(...args);
const completeKey = (...args) =>
  getService('idempotencyService').completeKey(...args);

const REGION = 'us-central1';

/*
 * Stripe Hosted Checkout contract (web + mobile Grab “stripe” rail):
 *   Firestore `orders/{id}` MUST have `status: 'pending_payment'` before Cloud Run `createStripeCheckout`.
 *   Shared builder: `buildPendingPaymentStripeOrderDocument` (used by createStripePendingOrder + createGrabOrder).
 *   COD / QR (non-card) grab orders still use `buildOrderDocumentForSet` with legacy `status: 'PENDING'` until a full pipeline migration.
 */
const DEFAULT_ADMIN_UID = '9xMUEfOE4EhsDWTAo8d3NnE12Oh2';

const IDEMPOTENCY_COLLECTION = 'order_idempotency';
const CHECKOUT_LEASE_COLLECTION = 'checkout_lease';
const CHECKOUT_LEASE_TTL_MS = 45 * 60 * 1000;
const MAX_CHECKOUT_FENCE_LEN = 128;
const MAX_DEVICE_ID_LEN = 200;
const MAX_IDEMPOTENCY_RAW_LEN = 4096;
const RATE_LIMIT_UID_WINDOW_MS = 10 * 1000;
const RATE_LIMIT_UID_MAX = 10;
const RATE_LIMIT_IP_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_IP_MAX = 30;
const CATEGORY_FOLDER_MAP = {
  snacks: 'snacks',
  'burgers-kebabs': 'BURGER_KABABAB',
  dinosaur: 'DINOSAUR',
  desserts: 'desert',
  'cold-drinks': 'cold_drinks',
  'can-drinks': 'CAN_DRINKS',
  indian: 'indian_food',
  sugarcane: 'SUGARCANE',
  'hot-drinks': 'HOT',
  sides: 'sides',
};

/* -------------------- HELPERS -------------------- */

function deepClean(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function sha256HexUtf8(value) {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
}

function normalizeIdempotencyKeyInput(raw) {
  return String(raw).trim().replace(/\s+/g, '');
}

function isOfflineQueueScopedIdempotencyCandidate(idem) {
  if (!idem || typeof idem !== 'string') return false;
  return normalizeIdempotencyKeyInput(idem).startsWith('offline-queue:');
}

function validateCheckoutFenceInput(raw) {
  const s = typeof raw === 'string' ? raw.trim() : '';
  if (!s || s.length > MAX_CHECKOUT_FENCE_LEN) {
    throw new HttpsError('invalid-argument', 'Missing or invalid checkoutFence');
  }
  return s;
}

function unwrapHttpsError(err) {
  if (!err) return null;
  if (err instanceof HttpsError) return err;
  if (err?.cause) return unwrapHttpsError(err.cause);
  return null;
}

async function enforceRateLimitOrThrow({
  db,
  key,
  limit,
  windowMs,
  payload,
  idemKey = null,
  metadata = {},
}) {
  const pre = await checkRateLimit({ db, key, limit, windowMs });
  if (!pre.allowed) {
    if (idemKey) await completeKey({ db, key: idemKey, result: payload });
    throw new HttpsError('resource-exhausted', payload.message, payload);
  }
  const post = await increment({ db, key, limit, windowMs, metadata });
  if (!post.allowed) {
    if (idemKey) await completeKey({ db, key: idemKey, result: payload });
    throw new HttpsError('resource-exhausted', payload.message, payload);
  }
}

function normalizeCategoryFolder(value) {
  return String(value || '').trim().replace(/\s+/g, '_');
}

function getInvalidImageReason(value) {
  const raw = typeof value === 'string' ? value.trim() : '';
  if (!raw) return 'empty_or_null';
  const lower = raw.toLowerCase();

  if (raw.includes('C:\\') || raw.includes('C:/')) return 'contains_windows_path';
  if (lower.includes('desktop')) return 'contains_desktop_segment';
  if (lower.includes('frontend')) return 'contains_frontend_segment';
  if (!(raw.startsWith('/') || /^https?:\/\//i.test(raw))) return 'not_root_or_http';
  return null;
}

function buildReplacementImagePath(product) {
  const current = String(product?.image || '').trim();
  const fileName = current
    .split(/[\\/]/)
    .filter(Boolean)
    .pop();

  const categoryId = String(product?.categoryId || '').trim();
  const mappedFolder = CATEGORY_FOLDER_MAP[categoryId];
  const fallbackCategory = normalizeCategoryFolder(product?.category || categoryId || 'misc');
  const categoryFolder = mappedFolder || fallbackCategory;

  if (fileName && /\.(png|jpe?g|webp|gif)$/i.test(fileName)) {
    return `/assets/SMT_FOOD/${categoryFolder}/${fileName}`;
  }
  return '/assets/placeholder.png';
}

/* -------------------- VALIDATION -------------------- */

function coerceItemsOrThrow(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new HttpsError('invalid-argument', 'Missing items');
  }

  if (items.length > 200) {
    throw new HttpsError('invalid-argument', 'Too many line items');
  }

  return items.map((raw, idx) => {
    const it = raw && typeof raw === 'object' ? raw : {};

    const name =
      typeof it.name === 'string' && it.name.trim()
        ? it.name.trim().slice(0, 500)
        : `Item ${idx + 1}`;

    if (!('qty' in it) || !('price' in it)) {
      throw new HttpsError('invalid-argument', `Missing qty/price for item "${name}"`);
    }

    const qtyNum = Number(it.qty);
    const priceNum = Number(it.price);

    if (!Number.isFinite(priceNum) || priceNum < 0) {
      throw new HttpsError('invalid-argument', `Invalid price for item "${name}"`);
    }

    const qty = Number.isFinite(qtyNum)
      ? Math.max(1, Math.min(999, Math.floor(qtyNum)))
      : 1;

    return { name, qty, price: priceNum };
  });
}

/**
 * DTO sanitization for createGrabOrder:
 * - clients must not control lifecycle fields (`status`, `paymentStatus`)
 * - only normalized checkout input is passed downstream
 */
function sanitizeCreateGrabOrderInput(raw) {
  const data = raw && typeof raw === 'object' ? raw : {};
  return {
    items: data.items,
    totalAmount: data.totalAmount,
    paymentMethod: data.paymentMethod,
    paymentMode: data.paymentMode,
    paymentStatus: data.paymentStatus,
    idempotencyKey: data.idempotencyKey,
    checkoutFence: data.checkoutFence,
    metaData: data.metaData,
    customerName: data.customerName,
    customerPhone: data.customerPhone,
    mode: data.mode,
    notes: data.notes,
    address: data.address,
  };
}

function buildOrderDocumentForSet({
  uid,
  items,
  totalAmount,
  normalizedMode,
  idempotencyKeyHash,
  customerName,
  customerPhone,
  mode,
  notes,
  address,
}) {
  const phoneNorm = String(customerPhone || '')
    .replace(/\s|-/g, '')
    .trim()
    .slice(0, 40);
  const nameNorm = String(customerName || '').trim().slice(0, 200);
  const modeNorm = mode === 'pickup' ? 'pickup' : 'delivery';

  const doc = createInitialOrderSnapshot({
    userId: uid,
    items,
    totalAmount,
    paymentMethod: normalizedMode,
    paymentMode: normalizedMode,
    flow: 'grab',
    metaData: {},
    paymentStatus: 'PENDING',
    status: 'placed',
    customerName: nameNorm,
    customerPhone: phoneNorm,
    mode: modeNorm,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  if (notes) doc.notes = String(notes).slice(0, 2000);
  if (address) doc.address = String(address).slice(0, 2000);

  if (idempotencyKeyHash) {
    doc.idempotencyKey = idempotencyKeyHash;
  }

  return doc;
}



/**
 * ONE Firestore document shape for Stripe Hosted Checkout (web `createStripePendingOrder` OR mobile Grab rail).
 * Cloud Run `createStripeCheckout` requires `status === 'pending_payment'` (no other status may open checkout).
 */
function buildPendingPaymentStripeOrderDocument({
  uid,
  items,
  totalAmount,
  normalizedMode,
  idempotencyKeyHash,
  customerName,
  customerPhone,
  mode,
  notes,
  address,
  metaData,
}) {
  const phoneNorm = String(customerPhone || '')
    .replace(/\s|-/g, '')
    .trim()
    .slice(0, 40);
  const nameNorm = String(customerName || '').trim().slice(0, 200);
  const modeNorm = mode === 'pickup' ? 'pickup' : 'delivery';
  const meta =
    metaData && typeof metaData === 'object' && Object.keys(metaData).length > 0
      ? deepClean(metaData)
      : {};

  const doc = {
    userId: uid,
    items,
    totalAmount,
    paymentMethod: 'STRIPE',
    paymentMode: 'STRIPE',
    flow: 'grab',
    metaData: meta,
    paymentStatus: 'PENDING',
    status: 'pending_payment',
    customerName: nameNorm,
    customerPhone: phoneNorm,
    mode: modeNorm,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };



  if (notes) doc.notes = String(notes).slice(0, 2000);
  if (address) doc.address = String(address).slice(0, 2000);

  if (idempotencyKeyHash) {
    doc.idempotencyKey = idempotencyKeyHash;
  }

  return createInitialOrderSnapshot(doc);
}

function buildStripePendingOrderDocument({
  uid,
  items,
  totalAmount,
  normalizedMode,
  idempotencyKeyHash,
  customerName,
  customerPhone,
  mode,
  notes,
  address,
}) {
  const pmo = 'stripe';
  return buildPendingPaymentStripeOrderDocument({
    uid,
    items,
    totalAmount,
    normalizedMode,
    idempotencyKeyHash,
    customerName: customerName || '',
    customerPhone: customerPhone || '',
    mode: mode === 'pickup' ? 'pickup' : 'delivery',
    notes,
    address,
    metaData: {},
  });
}

/**
 * Mobile Grab checkout — Stripe Hosted only: customer + draft from `metaData` (must match web field semantics).
 */
function buildStripeHostedGrabOrderDocument({
  uid,
  items,
  totalAmount,
  normalizedMode,
  idempotencyKeyHash,
  meta,
}) {
  const m = meta && typeof meta === 'object' ? meta : {};
  const c = m.customer && typeof m.customer === 'object' ? m.customer : {};
  const customerName = String(c.name || '').trim().slice(0, 200);
  const customerPhone = String(c.phone || '')
    .replace(/\s|-/g, '')
    .trim()
    .slice(0, 40);
  const mode = m.mode === 'pickup' || m.orderType === 'pickup' ? 'pickup' : 'delivery';
  const address =
    mode === 'delivery' ? String(c.address || '').trim().slice(0, 2000) : '';
  const notes = c.notes != null ? String(c.notes).trim().slice(0, 2000) : '';

  if (!customerName) {
    throw new HttpsError('invalid-argument', 'Missing customer name for online card payment');
  }
  if (!customerPhone) {
    throw new HttpsError('invalid-argument', 'Missing customer phone for online card payment');
  }

  return buildPendingPaymentStripeOrderDocument({
    uid,
    items,
    totalAmount,
    normalizedMode,
    idempotencyKeyHash,
    customerName,
    customerPhone,
    mode,
    notes,
    address,
    metaData: m,

  });
}

/* -------------------- FUNCTIONS -------------------- */

exports.createGrabOrder = onCall(
  { region: REGION, invoker: 'public' },
  withValidation(async (request) => {
    assertProductionSecurityMode();
    enforceCallableAppCheck(request, 'createGrabOrder');
    console.log('[CF] START createGrabOrder');
    // Structured log for start
    const data = sanitizeCreateGrabOrderInput(request.data);
    let traceId = '';

    try {
      const uid = request.auth?.uid;
      if (!uid) {
        throw new HttpsError('unauthenticated', 'User not authenticated');
      }

      traceId = `${uid}-${Date.now()}`;
      const ip = String(request?.rawRequest?.ip || '').trim() || 'unknown';
      const db = admin.firestore();
      const createGrabRatePayload = {
        code: 'RATE_LIMITED',
        message: 'Too many createGrabOrder requests',
        debug: { from: null, to: null, actor: 'customer' },
      };
      await enforceRateLimitOrThrow({
        db,
        key: `createGrabOrder:uid:${uid}`,
        limit: RATE_LIMIT_UID_MAX,
        windowMs: RATE_LIMIT_UID_WINDOW_MS,
        payload: createGrabRatePayload,
        metadata: { functionName: 'createGrabOrder', scope: 'uid', uid, ip },
      });
      await enforceRateLimitOrThrow({
        db,
        key: `createGrabOrder:ip:${ip}`,
        limit: RATE_LIMIT_IP_MAX,
        windowMs: RATE_LIMIT_IP_WINDOW_MS,
        payload: createGrabRatePayload,
        metadata: { functionName: 'createGrabOrder', scope: 'ip', uid, ip },
      });

      const pmRaw = String(data.paymentMethod || data.paymentMode || "ONLINE").trim();
      const normalizedMode = normalizePaymentMode(pmRaw);

      const items = coerceItemsOrThrow(data.items);

      console.log('[CREATE ORDER NORMALIZED]', {
        normalizedMode,
        itemsLength: items.length,
      });

      const totalAmount = items.reduce((sum, item) => {
        const line = item.qty * item.price;
        if (!Number.isFinite(line)) {
          throw new HttpsError('invalid-argument', 'Invalid item calculation');
        }
        return sum + line;
      }, 0);

      if (totalAmount <= 0) {
        throw new HttpsError('invalid-argument', 'Invalid total');
      }

      console.log('[CF][VALIDATION OK]', { totalAmount, count: items.length });


      // Contract: createGrabOrder persists canonical non-stripe lifecycle only.
      // Stripe-specific pending-payment lifecycle is handled exclusively by
      // `createStripePendingOrder` + `createStripeCheckout`.
      const useStripeHostedCheckout = false;

      /* -------- IDEMPOTENCY -------- */

      let hash = null;

      if (data.idempotencyKey) {
        const normalized = normalizeIdempotencyKeyInput(data.idempotencyKey);
        if (!normalized || normalized.length > MAX_IDEMPOTENCY_RAW_LEN) {
          throw new HttpsError('invalid-argument', 'Invalid idempotencyKey');
        }
        hash = sha256HexUtf8(normalized);
      }

      let orderId;

      const buildResolvedOrderDoc = (idemHash) =>
        deepClean(
          buildOrderDocumentForSet({
            uid,
            items,
            totalAmount,
            normalizedMode,
            idempotencyKeyHash: idemHash,
            customerName: data.customerName,
            customerPhone: data.customerPhone,
            mode: data.mode,
            notes: data.notes,
            address: data.address,
          })
        );
      const logOrderStateForSave = (orderDoc) => {
        console.log('[CREATE ORDER STATE BEFORE SAVE]', {
          status: orderDoc?.status ?? null,
          paymentStatus: orderDoc?.paymentStatus ?? null,
          paymentMethod: orderDoc?.paymentMethod ?? null,
        });
      };

      /* -------- TRANSACTION PATH -------- */

      if (hash) {
        const idemRef = db.doc(`${IDEMPOTENCY_COLLECTION}/${uid}_${hash}`);

        const orderDoc = buildResolvedOrderDoc(hash);
        logOrderStateForSave(orderDoc);

        const result = await db.runTransaction(async (tx) => {
          const snap = await tx.get(idemRef);

          if (snap.exists) {
            return { kind: 'hit', orderId: snap.data().orderId };
          }

          const newId = db.collection('orders').doc().id;

          tx.set(db.doc(`orders/${newId}`), orderDoc);
          tx.set(idemRef, {
            orderId: newId,
            uid,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
          });

          return { kind: 'created', orderId: newId };
        });

        orderId = result.orderId;
      } else {
        /* -------- SIMPLE WRITE -------- */

        const orderDoc = buildResolvedOrderDoc(null);
        logOrderStateForSave(orderDoc);

        const ref = db.collection('orders').doc();
        await ref.set(orderDoc);

        orderId = ref.id;
      }

      if (!orderId) {
        throw new HttpsError('internal', 'Order creation failed');
      }

      if (normalizedMode === 'COD' && useStripeHostedCheckout) {
        throw new HttpsError(
          'internal',
          'Invariant violation: COD must not use Stripe hosted checkout document shape'
        );
      }

      console.log('[CREATE ORDER SUCCESS]', {
        orderId,
        traceId,
        paymentMode: normalizedMode,

        useStripeHostedCheckout,
        committedPath: 'grab_non_stripe',
      });
      console.log('[CF][SUCCESS]', orderId);

      // Log success
      log({ level: 'info', service: 'createGrabOrder', event: 'success', payload: { orderId, paymentMode: normalizedMode }, requestId: traceId });

      return { success: true, orderId };
    } catch (err) {
      const unwrapped = unwrapHttpsError(err);
      if (unwrapped) throw unwrapped;

      // Structured error logging (forward critical errors to Cloud Logging)
      error({ service: 'createGrabOrder', event: 'error', error: err, payload: { uid }, requestId: traceId });
      console.error('[CF][CREATE ORDER ERROR]', err);

      throw new HttpsError('internal', err.message || 'Unknown error', {
        traceId,
      });
    }
  }, validateCreateGrabOrder)
);

exports.createStripePendingOrder = onCall(
  { region: REGION, invoker: 'public' },
  withValidation(async (request) => {
    assertProductionSecurityMode();
    enforceCallableAppCheck(request, 'createStripePendingOrder');
    console.log('[CF] START createStripePendingOrder');
    // Structured log for start
    const data = request.data || {};
    let traceId = '';

    try {
      const uid = request.auth?.uid;
      if (!uid) {
        throw new HttpsError('unauthenticated', 'User not authenticated');
      }

      traceId = `${uid}-${Date.now()}`;

      const items = coerceItemsOrThrow(data.items);

      const totalAmount = items.reduce((sum, item) => {
        const line = item.qty * item.price;
        if (!Number.isFinite(line)) {
          throw new HttpsError('invalid-argument', 'Invalid item calculation');
        }
        return sum + line;
      }, 0);

      if (totalAmount <= 0) {
        throw new HttpsError('invalid-argument', 'Invalid total');
      }

      const clientTotal = Number(data.totalAmount);
      if (!Number.isFinite(clientTotal) || Math.abs(clientTotal - totalAmount) > 0.02) {
        throw new HttpsError('invalid-argument', 'Total does not match items');
      }

      const customerName = String(data.customerName || '').trim().slice(0, 200);
      if (!customerName) {
        throw new HttpsError('invalid-argument', 'Missing customerName');
      }

      const customerPhone = String(data.customerPhone || '').trim().slice(0, 40);
      const modeRaw = String(data.mode || 'delivery').trim().toLowerCase();
      const mode = modeRaw === 'pickup' ? 'pickup' : 'delivery';
      const notes = typeof data.notes === 'string' ? data.notes : '';
      const address = typeof data.address === 'string' ? data.address : '';

      const normalizedMode = 'ONLINE';

      let hash = null;

      if (data.idempotencyKey) {
        const normalized = normalizeIdempotencyKeyInput(data.idempotencyKey);
        if (!normalized || normalized.length > MAX_IDEMPOTENCY_RAW_LEN) {
          throw new HttpsError('invalid-argument', 'Invalid idempotencyKey');
        }
        hash = sha256HexUtf8(normalized);
      }

      const db = admin.firestore();
      let orderId;

      const pmoWeb = 'stripe';

      const orderDoc = deepClean(
        buildPendingPaymentStripeOrderDocument({
          uid,
          items,
          totalAmount,
          normalizedMode,
          idempotencyKeyHash: hash,
          customerName,
          customerPhone,
          mode,
          notes,
          address,
          paymentMethod: 'STRIPE',
        })
      );

      if (hash) {
        const idemRef = db.doc(`${IDEMPOTENCY_COLLECTION}/${uid}_${hash}_stripe`);

        const result = await db.runTransaction(async (tx) => {
          const snap = await tx.get(idemRef);

          if (snap.exists) {
            return { kind: 'hit', orderId: snap.data().orderId };
          }

          const newId = db.collection('orders').doc().id;

          tx.set(db.doc(`orders/${newId}`), orderDoc);
          tx.set(idemRef, {
            orderId: newId,
            uid,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
          });

          return { kind: 'created', orderId: newId };
        });

        orderId = result.orderId;
      } else {
        const ref = db.collection('orders').doc();
        await ref.set(orderDoc);
        orderId = ref.id;
      }

      if (!orderId) {
        throw new HttpsError('internal', 'Order creation failed');
      }

      console.log('[createStripePendingOrder SUCCESS]', { orderId, traceId });

      // Log success
      log({ level: 'info', service: 'createStripePendingOrder', event: 'success', payload: { orderId, traceId }, requestId: traceId });

      return { success: true, orderId };
    } catch (err) {
      const unwrapped = unwrapHttpsError(err);
      if (unwrapped) throw unwrapped;

      // Structured error logging (critical errors to Cloud Logging)
      error({ service: 'createStripePendingOrder', event: 'error', error: err, payload: {}, requestId: traceId });
      console.error('[CF][createStripePendingOrder ERROR]', err);

      throw new HttpsError('internal', err.message || 'Unknown error', {
        traceId,
      });
    }
  }, validateStripePendingOrder)
);

/* -------------------- MIRROR -------------------- */

exports.syncOrderToPublicTracking = onDocumentCreated(
  { region: REGION, document: 'orders/{orderId}' },
  async (event) => {
    const orderId = event.params.orderId;
    const snap = event.data;

    if (!snap?.exists) return;

    const payload = buildPublicTrackingFromOrder(orderId, snap.data());
    if (!payload) return;

    await admin
      .firestore()
      .collection('public_tracking')
      .doc(orderId)
      .set(payload, { merge: true });
  }
);

/** Keeps customer-readable docs aligned after payment / pipeline edits (create-only mirror misses updates). */
exports.syncOrderUpdatesToPublicTracking = onDocumentUpdated(
  { region: REGION, document: 'orders/{orderId}' },
  async (event) => {
    const orderId = event.params.orderId;
    const after = event.data?.after;
    if (!after?.exists) return;

    const payload = buildPublicTrackingFromOrder(orderId, after.data());
    if (!payload) return;

    await admin
      .firestore()
      .collection('public_tracking')
      .doc(orderId)
      .set(payload, { merge: true });
  }
);

exports.auditOrderLifecycleWrites = onDocumentUpdated(
  { region: REGION, document: 'orders/{orderId}' },
  async (event) => {
    const before = event.data?.before?.data() || {};
    const after = event.data?.after?.data() || {};
    const orderId = String(event.params?.orderId || '').trim();
    if (!orderId) return;

    const normalize = (v) => String(v ?? '').trim().toUpperCase();
    const normalizeStatus = (v) => String(v ?? '').trim().toLowerCase();

    const beforeState = {
      status: normalizeStatus(before.status),
      paymentStatus: normalize(before.paymentStatus),
      paymentMethod: normalize(before.paymentMethod),
    };
    const afterState = {
      status: normalizeStatus(after.status),
      paymentStatus: normalize(after.paymentStatus),
      paymentMethod: normalize(after.paymentMethod),
    };

    const lifecycleChanged =
      beforeState.status !== afterState.status ||
      beforeState.paymentStatus !== afterState.paymentStatus ||
      beforeState.paymentMethod !== afterState.paymentMethod;
    if (!lifecycleChanged) return;

    const likelyFsmWrite =
      String(before.lastTransitionId || '').trim() !== String(after.lastTransitionId || '').trim() &&
      String(after.lastTransitionId || '').trim() !== '';
    if (likelyFsmWrite) return;

    console.trace('ORDER WRITE SOURCE');
    console.error('[FSM AUDIT] lifecycle write outside FSM context detected', {
      orderId,
      before: beforeState,
      after: afterState,
      source: {
        lastTransitionId: after.lastTransitionId || null,
        lastTransitionKey: after.lastTransitionKey || null,
        updatedBy: after.updatedBy || null,
        source: after.source || null,
      },
      message: 'FSM VIOLATION: direct lifecycle write blocked',
    });
  }
);

/* -------------------- ADMIN MAINTENANCE -------------------- */

exports.repairProductImages = onCall(
  { region: REGION, invoker: 'public' },
  async (request) => {
    assertProductionSecurityMode();
    enforceCallableAppCheck(request, 'repairProductImages');
    const uid = request.auth?.uid;
    if (!uid) {
      throw new HttpsError('unauthenticated', 'Authentication required.');
    }

    // Optional admin-claim gate requested by app owner.
    // Keep this enabled for safety in production.
    if (!request.auth?.token?.admin) {
      throw new HttpsError('permission-denied', 'Admin role required.');
    }

    const db = admin.firestore();
    const productsSnap = await db.collection('products').get();
    const totalScanned = productsSnap.size;

    const isBrokenImage = (value) => {
      if (typeof value !== 'string') return true;
      const normalized = value.trim().toLowerCase();
      if (!normalized) return true;
      if (normalized.includes('undefined')) return true;
      if (normalized.includes('null')) return true;
      return false;
    };

    const replacementImage = 'https://teh-tarik-app-my-own.web.app/bg1.jpeg';
    const toUpdate = [];
    let skipped = 0;

    productsSnap.docs.forEach((docSnap) => {
      const data = docSnap.data() || {};
      if (isBrokenImage(data.image)) {
        toUpdate.push(docSnap.ref);
      } else {
        skipped += 1;
      }
    });

    if (toUpdate.length > 0) {
      // Firestore batch supports max 500 operations per commit.
      for (let i = 0; i < toUpdate.length; i += 500) {
        const chunk = toUpdate.slice(i, i + 500);
        const batch = db.batch();
        chunk.forEach((ref) => {
          // Only patch the image field; no schema or other fields changed.
          batch.update(ref, { image: replacementImage });
        });
        await batch.commit();
      }
    }

    return {
      totalProductsScanned: totalScanned,
      brokenImagesFound: toUpdate.length,
      updatedCount: toUpdate.length,
      skippedCount: skipped,
    };
  }
);

exports.makeUserAdmin = onCall(
  { region: REGION, invoker: 'public' },
  async (request) => {
    assertProductionSecurityMode();
    enforceCallableAppCheck(request, 'makeUserAdmin');
    const callerUid = request.auth?.uid;
    if (!callerUid) {
      throw new HttpsError('unauthenticated', 'Authentication required.');
    }
    const isBootstrapAdmin = callerUid === DEFAULT_ADMIN_UID;
    if (!request.auth?.token?.admin && !isBootstrapAdmin) {
      throw new HttpsError('permission-denied', 'Only admins can promote users.');
    }

    const rawUid = request.data?.uid;
    const targetUid = typeof rawUid === 'string' && rawUid.trim()
      ? rawUid.trim()
      : DEFAULT_ADMIN_UID;

    if (!targetUid) {
      throw new HttpsError('invalid-argument', 'Missing uid.');
    }

    await admin.auth().setCustomUserClaims(targetUid, { admin: true });

    console.log('[makeUserAdmin] Admin claim granted', {
      callerUid,
      targetUid,
      isBootstrapAdmin,
    });

    return {
      success: true,
      message: `Admin claim set for uid: ${targetUid}`,
      uid: targetUid,
    };
  }
);

// ----- Admin RBAC Middleware -----
const verifyFirebaseToken = require('./auth/verifyToken.cjs');
const requireAdmin = require('./auth/requireAdmin.cjs');
const requireSuperAdmin = require('./auth/requireSuperAdmin.cjs');

// ----- Admin Transition Callable -----
exports.adminTransition = onCall({ region: REGION, invoker: 'public' }, async (request) => {
  assertProductionSecurityMode();
  enforceCallableAppCheck(request, 'adminTransition');
  const adminUid = await requireAdmin(request);
  const { orderId, eventName, paymentStatus } = request.data || {};
  console.log('[adminTransition] payload:', { orderId, eventName, paymentStatus });
  if (!orderId) {
    throw new HttpsError('invalid-argument', 'Missing orderId');
  }
  const db = admin.firestore();
  const orderRef = db.collection('orders').doc(orderId);
  // FSM manages all lifecycle fields (status, paymentStatus, paymentMethod) internally.
  // Do NOT pass lifecycle fields through metadata.patch — that triggers assertNoDirectStatusMutation.
  const metadata = {};
  // Use orderTransitionService to perform transition via FSM
  const { performOrderTransition } = getService('orderTransitionService');
  // Determine event type based on desired status change
  // Map canonical event names (case‑insensitive) to internal FSM event descriptors
  const eventMap = {
    paid: { type: 'ADMIN_MARK_PAID' },
    cancelled: { type: 'ORDER_CANCELLED' },
    refunded: { type: 'ADMIN_REFUND_APPROVED' },
    preparing: { type: 'ORDER_PREPARING' },
    ready_for_pickup: { type: 'ORDER_READY_FOR_PICKUP' },
    out_for_delivery: { type: 'ORDER_OUT_FOR_DELIVERY' },
    delivered: { type: 'ORDER_DELIVERED' },
  };
  // Normalize incoming payload (uppercase enum) to lower‑case key for lookup
  const normalizedKey = String(eventName || '').trim().toLowerCase();
  const event = eventMap[normalizedKey] || { type: 'ADMIN_CUSTOM' };
  try {
    const result = await performOrderTransition({
      db,
      orderRef,
      actor: 'admin',
      actorUid: adminUid,
      event,
      metadata,
    });
    console.log('[adminTransition] result:', result);
    // Audit log for admin actions
    log({
      level: 'info',
      service: 'adminTransition',
      event: 'admin_action',
      payload: { adminUid, orderId, eventName, paymentStatus },
    });
    return { success: true, result };
  } catch (e) {
    const unwrapped = unwrapHttpsError(e);
    if (unwrapped) throw unwrapped;
    console.error('[adminTransition] error:', e);
    throw new HttpsError('internal', e.message || 'Transition failed', {
      orderId,
      eventName,
    });
  }
});

exports.deleteCustomerAccount = onCall(
  { region: REGION, invoker: 'public' },
  async (request) => {
    assertProductionSecurityMode();
    enforceCallableAppCheck(request, 'deleteCustomerAccount');
    const callerUid = request.auth?.uid;
    if (!callerUid) {
      throw new HttpsError('unauthenticated', 'Authentication required.');
    }
    if (!request.auth?.token?.admin) {
      throw new HttpsError('permission-denied', 'Only admins can delete customers.');
    }

    const rawUid = request.data?.uid;
    const targetUid = typeof rawUid === 'string' ? rawUid.trim() : '';
    if (!targetUid) {
      throw new HttpsError('invalid-argument', 'Missing uid.');
    }
    if (targetUid === callerUid) {
      throw new HttpsError('failed-precondition', 'Admins cannot delete their own account.');
    }

    const db = admin.firestore();
    await db.collection('users').doc(targetUid).delete().catch(() => null);
    await admin.auth().deleteUser(targetUid);

    return {
      success: true,
      message: `Customer deleted: ${targetUid}`,
      uid: targetUid,
    };
  }
);

exports.deleteOrderByAdmin = onCall(
  { region: REGION, invoker: 'public' },
  async (request) => {
    assertProductionSecurityMode();
    enforceCallableAppCheck(request, 'deleteOrderByAdmin');
    const callerUid = request.auth?.uid;
    if (!callerUid) {
      throw new HttpsError('unauthenticated', 'Authentication required.');
    }
    if (!request.auth?.token?.admin) {
      throw new HttpsError('permission-denied', 'Only admins can delete orders.');
    }

    const rawOrderId = request.data?.orderId;
    const orderId = typeof rawOrderId === 'string' ? rawOrderId.trim() : '';
    if (!orderId) {
      throw new HttpsError('invalid-argument', 'Missing orderId.');
    }

    const db = admin.firestore();
    await db.collection('orders').doc(orderId).delete();
    await db.collection('public_tracking').doc(orderId).delete().catch(() => null);

    return {
      success: true,
      message: `Order deleted: ${orderId}`,
      orderId,
    };
  }
);

exports.assignRiderToOrder = onCall(
  { region: REGION, invoker: 'public' },
  async (request) => {
    try {
      assertProductionSecurityMode();
      enforceCallableAppCheck(request, 'assignRiderToOrder');
      const callerUid = request.auth?.uid;
      
      console.log(
        '[assignRiderToOrder:start]',
        {
          orderId: request.data?.orderId,
          assignedRiderId: request.data?.assignedRiderId,
          authUid: callerUid
        }
      );

      if (!callerUid) {
        throw new HttpsError('unauthenticated', 'Authentication required.');
      }
      if (!request.auth?.token?.admin) {
        throw new HttpsError('permission-denied', 'Admin only');
      }

      const { orderId, assignedRiderId } = request.data || {};
      if (!orderId || !assignedRiderId) {
        throw new HttpsError('invalid-argument', 'Missing orderId or assignedRiderId.');
      }

      const db = admin.firestore();
      
      // Fetch rider details
      const riderSnap = await db.collection('users').doc(assignedRiderId).get();
      
      console.log(
        '[assignRiderToOrder:riderDoc]',
        {
          exists: riderSnap.exists,
          data: riderSnap.data()
        }
      );

      if (!riderSnap.exists) {
        throw new HttpsError('not-found', 'Rider profile missing');
      }

      const riderData = riderSnap.data() || {};
      if (riderData.role !== 'rider' && riderData.role !== 'driver') {
        throw new HttpsError('invalid-argument', 'User is not a rider or driver.');
      }

      const assignedRiderName = String(
        riderData.displayName
        || riderData.name
        || riderData.email
        || 'Rider'
      ).trim();

      const assignedRiderPhone = String(
        riderData.phone
        || ''
      ).trim();

      const orderRef = db.collection('orders').doc(orderId);
      
      // Bypass FSM to directly set the specific fields requested by the user
      await orderRef.update({
        assignedDriverId: assignedRiderId,
        assignedRiderName,
        assignedRiderPhone,
        assignedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      const result = { success: true };

      log({
        level: 'info',
        service: 'assignRiderToOrder',
        event: 'admin_action',
        payload: { adminUid: callerUid, assignedRiderId, orderId },
      });

      return { success: true, result };
    } catch (err) {
      console.error(
        '[assignRiderToOrder:error]',
        err
      );
      
      const unwrapped = unwrapHttpsError(err);
      if (unwrapped) throw unwrapped;

      if (err instanceof HttpsError) {
        throw err;
      }

      throw new HttpsError(
        'internal',
        err.message || 'Assign rider failed'
      );
    }
  }
);

exports.migrateProductImagePaths = onCall(
  { region: REGION, invoker: 'public' },
  async (request) => {
    assertProductionSecurityMode();
    enforceCallableAppCheck(request, 'migrateProductImagePaths');
    const callerUid = request.auth?.uid;
    if (!callerUid) {
      throw new HttpsError('unauthenticated', 'Authentication required.');
    }
    if (!request.auth?.token?.admin) {
      throw new HttpsError('permission-denied', 'Only admins can run image migration.');
    }

    const dryRun = request.data?.dryRun !== false; // strict default: true
    const previewLimit = Number.isFinite(Number(request.data?.previewLimit))
      ? Math.max(1, Math.min(200, Number(request.data.previewLimit)))
      : 100;

    const db = admin.firestore();
    const snap = await db.collection('products').get();

    const brokenEntries = [];
    const toUpdate = [];

    for (const docSnap of snap.docs) {
      const data = docSnap.data() || {};
      const image = typeof data.image === 'string' ? data.image : '';
      const reason = getInvalidImageReason(image);

      if (!reason) continue;

      const replacement = buildReplacementImagePath(data);
      brokenEntries.push({
        productId: docSnap.id,
        productName: data.name || '',
        category: data.category || data.categoryId || '',
        currentImage: image || null,
        proposedReplacementImage: replacement,
        reason,
      });
      toUpdate.push({ ref: docSnap.ref, replacementImage: replacement });
    }

    if (!dryRun && toUpdate.length > 0) {
      for (let i = 0; i < toUpdate.length; i += 500) {
        const chunk = toUpdate.slice(i, i + 500);
        console.log(`[migrateProductImagePaths] committing batch ${Math.floor(i / 500) + 1} with ${chunk.length} docs`);
        const batch = db.batch();
        chunk.forEach((entry) => {
          // Only patch image field as requested.
          batch.update(entry.ref, { image: entry.replacementImage });
        });
        await batch.commit();
      }
    }

    const summary = {
      dryRun,
      totalProductsScanned: snap.size,
      brokenCount: brokenEntries.length,
      validCount: snap.size - brokenEntries.length,
      previewLimitUsed: previewLimit,
      updatedCount: dryRun ? 0 : toUpdate.length,
      brokenEntries: brokenEntries.slice(0, previewLimit),
    };

    console.log('[migrateProductImagePaths] summary:', summary);
    return summary;
  }
);

exports.transitionOrderStatus = onCall(
  { region: REGION, invoker: 'public' },
  async (request) => {
    assertProductionSecurityMode();
    enforceCallableAppCheck(request, 'transitionOrderStatus');
    const uid = request?.auth?.uid || null;
    if (!uid) throw new HttpsError('unauthenticated', 'Auth required');

    const orderId = String(request?.data?.orderId || '').trim();
    const nextStatus = String(request?.data?.nextStatus || '').trim();
    const metadataIn =
      request?.data?.metadata && typeof request.data.metadata === 'object'
        ? request.data.metadata
        : {};
    const requestId =
      String(request?.data?.requestId || metadataIn.requestId || '').trim() ||
      `req_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    if (!orderId || !nextStatus) {
      throw new HttpsError('invalid-argument', 'orderId and nextStatus are required');
    }
    const toStatusNorm = String(nextStatus || '').trim().toLowerCase();
    const statusToEventMap = {
      placed: 'ORDER_ACCEPTED',
      preparing: 'ORDER_PREPARING',
      ready_for_pickup: 'ORDER_READY_FOR_PICKUP',
      out_for_delivery: 'ORDER_OUT_FOR_DELIVERY',
      delivered: 'ORDER_DELIVERED',
      cancelled: 'ORDER_CANCELLED',
    };
    const mappedEventType = statusToEventMap[toStatusNorm] || '';
    if (!mappedEventType) {
      throw new HttpsError(
        'invalid-argument',
        `Unsupported transition target "${toStatusNorm || '(empty)'}". Use one of: ${Object.keys(statusToEventMap).join(', ')}`
      );
    }
    const transitionEvent = { type: mappedEventType };

    const userSnap = await admin.firestore().doc(`users/${uid}`).get();
    const role = String(userSnap.data()?.role || '').toLowerCase();
    const isAdminClaim = request?.auth?.token?.admin === true;
    
    const actor =
      isAdminClaim || role === 'admin'
        ? 'admin'
        : role === 'rider' || role === 'driver'
          ? 'rider'
          : role === 'kitchen'
            ? 'kitchen'
            : 'system';
    const db = admin.firestore();
    const ip = String(request?.rawRequest?.ip || '').trim() || 'unknown';

    const idemKey = `transition:${requestId}`;
    const cached = await getProcessedResult({ db, key: idemKey });
    if (cached) return cached;

    const reserved = await reserveKey({
      db,
      key: idemKey,
      metadata: { kind: 'transitionOrderStatus', uid, orderId, actor, requestId },
    });
    if (!reserved.reserved && reserved.result) return reserved.result;

    const rateLimitPayload = {
      code: 'RATE_LIMITED',
      message: 'Too many transition requests',
      debug: { from: null, to: nextStatus, actor },
    };
    await enforceRateLimitOrThrow({
      db,
      key: `transitionOrderStatus:uid:${uid}`,
      limit: RATE_LIMIT_UID_MAX,
      windowMs: RATE_LIMIT_UID_WINDOW_MS,
      payload: rateLimitPayload,
      idemKey,
      metadata: { functionName: 'transitionOrderStatus', scope: 'uid', uid, ip, orderId, actor, requestId },
    });
    await enforceRateLimitOrThrow({
      db,
      key: `transitionOrderStatus:ip:${ip}`,
      limit: RATE_LIMIT_IP_MAX,
      windowMs: RATE_LIMIT_IP_WINDOW_MS,
      payload: rateLimitPayload,
      idemKey,
      metadata: { functionName: 'transitionOrderStatus', scope: 'ip', uid, ip, orderId, actor, requestId },
    });

    try {
      const result = await performOrderTransition({
        db,
        orderRef: db.doc(`orders/${orderId}`),
        actor,
        actorUid: uid,
        event: transitionEvent,
        metadata: { source: 'transitionOrderStatus', requestId, transitionEvent, ...metadataIn },
      });
      const out = { ok: true, ...result };
      await completeKey({ db, key: idemKey, result: out });
      return out;
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Transition failed';
      const debug = e && typeof e === 'object' && e.debug ? e.debug : { from: null, to: nextStatus, actor };
      const code =
        e && typeof e === 'object' && e.code
          ? e.code
          : msg.includes('Unauthorized')
            ? 'UNAUTHORIZED'
            : msg.includes('Stale')
              ? 'STALE_STATE'
              : 'INVALID_TRANSITION';
      const payload = {
        code,
        message: msg,
        debug,
      };
      await completeKey({ db, key: idemKey, result: payload });
      throw new HttpsError('failed-precondition', msg, payload);
    }
  }
);

const { createStripeCheckout, stripeWebhook } = require('./stripeCheckoutHttp');
const { refundOrderByAdmin } = require('./stripeRefundAdmin');

exports.createStripeCheckout = createStripeCheckout;
exports.stripeWebhook = stripeWebhook;
exports.refundOrderByAdmin = refundOrderByAdmin;

exports.createEmployeeAccount = onCall(
  { region: REGION, invoker: 'public' },
  async (request) => {
    assertProductionSecurityMode();
    enforceCallableAppCheck(request, 'createEmployeeAccount');
    
    const callerUid = request.auth?.uid;
    if (!callerUid) {
      throw new HttpsError('unauthenticated', 'Authentication required.');
    }
    
    if (!request.auth?.token?.admin) {
      throw new HttpsError('permission-denied', 'Only admins can create employee accounts.');
    }

    const { email, password, name, phone, role } = request.data || {};
    
    if (!email || !password || !name || !role) {
      throw new HttpsError('invalid-argument', 'Missing required fields: email, password, name, role.');
    }
    
    const validRoles = ['admin', 'rider', 'driver', 'kitchen'];
    if (!validRoles.includes(role)) {
      throw new HttpsError('invalid-argument', 'Invalid role specified.');
    }

    try {
      // 1. Create Firebase Auth User
      const userRecord = await admin.auth().createUser({
        email: email.trim(),
        password: password,
        displayName: name.trim(),
        phoneNumber: phone ? phone.trim() : undefined,
      });

      const uid = userRecord.uid;

      // 2. Set Custom Claims if admin
      if (role === 'admin') {
        await admin.auth().setCustomUserClaims(uid, { admin: true });
      }

      // 3. Create Firestore Profile
      const db = admin.firestore();
      await db.collection('users').doc(uid).set({
        name: name.trim(),
        email: email.trim(),
        phone: phone ? phone.trim() : '',
        role: role,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`[createEmployeeAccount] Successfully created employee: ${uid} with role: ${role}`);

      return {
        success: true,
        uid: uid,
        message: `Employee ${name} created successfully.`,
      };
    } catch (error) {
      console.error('[createEmployeeAccount:error]', error);
      throw new HttpsError('internal', error.message || 'Failed to create employee account.');
    }
  }
);

const notifications = require('./notifications.js');
exports.sendOrderNotifications = notifications.sendOrderNotifications;