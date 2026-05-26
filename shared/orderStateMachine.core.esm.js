/**
 * Browser / Vite / Metro–safe ESM copy of the order lifecycle state machine.
 * Logic must stay aligned with `frontend/functions/shared/orderStateMachine.core.cjs` (Node / Cloud Functions).
 * Do not import Cloud Functions `.cjs` from the client — use this module instead.
 */

/** Hermes-safe production flag: Metro/Vite replace `process.env.NODE_ENV` at build time. */
function envIsProduction() {
  return (
    typeof process !== 'undefined' &&
    process.env &&
    String(process.env.NODE_ENV).toLowerCase() === 'production'
  );
}

export const VALID_STATES = [
  'pending_payment',
  'placed',
  'paid',
  'refunded',
  'preparing',
  'ready_for_pickup',
  'out_for_delivery',
  'delivered',
  'cancelled',
  'failed',
];

export const VALID_TRANSITIONS = {
  pending_payment: { paid: 'webhook', failed: 'webhook', cancelled: 'admin' },
  /** COD / cash-on-delivery: order accepted, payment collected offline — not “money received” online. */
  placed: { refunded: 'admin', preparing: 'admin', cancelled: 'admin' },
  paid: { refunded: 'admin', preparing: 'admin', cancelled: 'admin' },
  refunded: {},
  preparing: { ready_for_pickup: 'admin', cancelled: 'admin' },
  ready_for_pickup: { out_for_delivery: 'rider', cancelled: 'admin' },
  out_for_delivery: { delivered: 'rider', cancelled: 'admin' },
  delivered: {},
  cancelled: {},
  failed: { cancelled: 'admin' },
};

const VALID_STATE_SET = new Set(VALID_STATES);

function normalizeStateToken(raw) {
  return String(raw ?? '')
    .trim()
    .toLowerCase()
    .replace(/-/g, '_')
    .replace(/\s+/g, '_');
}

export function isTerminalState(state) {
  const s = normalizeStateToken(state);
  return s === 'delivered' || s === 'cancelled' || s === 'failed' || s === 'refunded';
}

export function getNextAllowedStates(state, actor) {
  const from = normalizeStateToken(state);
  const row = VALID_TRANSITIONS[from] || {};
  return Object.entries(row)
    .filter(([, owner]) => (actor ? owner === actor : true))
    .map(([to]) => to);
}

export function assertValidOrderTransition(fromRaw, toRaw, actor) {
  const from = normalizeStateToken(fromRaw);
  const to = normalizeStateToken(toRaw);

  if (!VALID_STATE_SET.has(to)) {
    throw new Error('Invalid order state transition');
  }
  if (from === to) return;

  const row = VALID_TRANSITIONS[from];
  if (!row || !row[to]) {
    throw new Error('Invalid order state transition');
  }
  if (row[to] !== actor) {
    throw new Error('Unauthorized state transition');
  }
}

/**
 * @param {string} statusRaw Target order `status` being validated (often transition `to`).
 * @param {string} paymentStatusRaw Current `paymentStatus` on the document (may lag webhook merge).
 * @param {{ from?: string; paymentMethod?: string }} [opts]
 */
export function assertPaymentConsistency(statusRaw, paymentStatusRaw, opts) {
  const options = opts && typeof opts === 'object' ? opts : {};
  const status = normalizeStateToken(statusRaw);
  const paymentStatus = String(paymentStatusRaw ?? '').trim().toUpperCase();
  const from = options.from != null ? normalizeStateToken(options.from) : '';
  const paymentMethod = String(options.paymentMethod ?? '').trim().toUpperCase();
  const source = String(options.source || 'write').trim().toLowerCase() === 'read' ? 'read' : 'write';
  const isStripePaymentMethod = paymentMethod === 'STRIPE';
  const isCodPaymentMethod = paymentMethod === 'COD' || paymentMethod === 'CASH';
  const isOnlinePaymentMethod = paymentMethod === 'ONLINE';
  const warn = (rule) => {
    console.warn('[orderStateMachine][payment-consistency:read]', {
      rule,
      status,
      paymentStatus,
      from: from || null,
      paymentMethod: paymentMethod || null,
    });
  };
  const fail = (rule) => {
    if (source === 'read') {
      warn(rule);
      return false;
    }
    console.error('[PAYMENT STATE ERROR]', {
      rule,
      status,
      paymentStatus,
      from,
      paymentMethod
    });
    const detail = JSON.stringify({
      rule,
      status,
      paymentStatus,
      from: from || null,
      paymentMethod: paymentMethod || null,
    });
    throw new Error(`Payment/status inconsistency :: ${detail}`);
  };

  if (!paymentMethod) {
    fail('missing_payment_method');
    return;
  }

  if (isCodPaymentMethod) {
    if (status === 'placed' || status === 'preparing' || status === 'ready_for_pickup' || status === 'out_for_delivery') {
      // Accept NOT_APPLICABLE (new canonical) and COD_PENDING (backward compat for existing docs).
      if (paymentStatus !== 'NOT_APPLICABLE' && paymentStatus !== 'COD_PENDING') {
        fail('cod_requires_not_applicable_until_delivered');
      }
      return;
    }
    if (status === 'delivered' || status === 'cancelled' || status === 'refunded') {
      if (paymentStatus !== 'NOT_APPLICABLE' && paymentStatus !== 'COD_PENDING' && paymentStatus !== 'PAID') {
        fail('cod_terminal_requires_not_applicable_or_paid');
      }
      return;
    }
    return;
  }

  if (isOnlinePaymentMethod) {
    if (status === 'placed' && paymentStatus === 'PENDING') return;
    if (status === 'paid' && paymentStatus === 'PAID') return;
    if (status === 'pending_payment' && paymentStatus === 'PENDING') return;
  }

  if (status === 'placed') {
    // Accept NOT_APPLICABLE (new) and COD_PENDING (legacy) for COD placed orders.
    if (paymentStatus === 'NOT_APPLICABLE' || paymentStatus === 'COD_PENDING') return;
    fail('placed_requires_not_applicable_or_cod_pending');
    return;
  }

  if (status === 'paid' && paymentStatus !== 'PAID') {
    if (from === 'pending_payment') {
      if (isStripePaymentMethod) return;
      fail('pending_payment_to_paid_requires_stripe');
      return;
    }
    if (!isStripePaymentMethod) return;
    fail('stripe_paid_requires_paid_payment_status');
    return;
  }
  if (paymentStatus === 'PAID' && status === 'pending_payment') {
    fail('pending_payment_cannot_be_paid');
    return;
  }
}

const LEGACY_STATUS_MAP = {
  pending: 'paid',
  confirmed: 'preparing',
  ready: 'ready_for_pickup',
  delivering: 'out_for_delivery',
  complete: 'delivered',
  completed: 'delivered',
  refunded: 'refunded',
  canceled: 'cancelled',
  assigned: 'out_for_delivery',
  picked_up: 'out_for_delivery',
};

/**
 * Read-layer only: legacy COD used `status: paid` + `paymentStatus: PENDING` (ambiguous vs card “paid”).
 * Expose a unified business view as canonical `placed` without mutating Firestore.
 */
function normalizeLegacyCodBusinessStatusRead(doc, normalizedCanonical) {
  const pm = String(doc?.paymentMethod ?? doc?.payment_mode ?? doc?.paymentMode ?? '').trim().toUpperCase();
  if (pm !== 'COD' && pm !== 'CASH') return normalizedCanonical;
  const s = normalizeStateToken(normalizedCanonical);
  if (s !== 'paid') return normalizedCanonical;
  const ps = String(doc?.paymentStatus ?? doc?.payment_status ?? '').trim().toUpperCase();
  if (ps === 'PAID') return 'paid';
  return 'placed';
}

export function readCanonicalOrderStatusStrict(doc, opts) {
  const strict = opts?.strict ?? envIsProduction();
  const logger = opts?.logger || (() => {});

  const fromStatus = normalizeStateToken(doc?.status);
  if (VALID_STATE_SET.has(fromStatus)) {
    const pm = String(doc?.paymentMethod ?? doc?.payment_mode ?? doc?.paymentMode ?? '').trim().toUpperCase();
    if (fromStatus === 'pending_payment' && String(doc?.paymentStatus ?? '').toUpperCase() === 'PAID') {
      const msg = 'state mismatch: pending_payment with PAID paymentStatus';
      logger(msg, { status: fromStatus, paymentStatus: doc?.paymentStatus });
      if (strict) logger('strict mode: normalized persisted pending_payment+PAID to paid', { paymentMethod: pm || null });
      return pm === 'STRIPE' ? 'paid' : fromStatus;
    }
    if (fromStatus === 'placed') {
      const ps = String(doc?.paymentStatus ?? doc?.payment_status ?? '').trim().toUpperCase();
      const codLike = pm === 'COD' || pm === 'CASH';
      // Accept NOT_APPLICABLE (new canonical) and COD_PENDING (legacy) for placed COD orders.
      const validPlacedPayment = ps === 'NOT_APPLICABLE' || ps === 'COD_PENDING' || (codLike && ps === 'PENDING');
      if (!validPlacedPayment) {
        const msg = 'state mismatch: placed requires paymentStatus NOT_APPLICABLE or COD_PENDING (legacy COD PENDING accepted)';
        logger(msg, { status: fromStatus, paymentStatus: doc?.paymentStatus, paymentMethod: pm || null });
        if (strict) logger('strict mode: tolerated placed mismatch for read normalization', { paymentMethod: pm || null });
      }
    }
    return normalizeLegacyCodBusinessStatusRead(doc, fromStatus);
  }

  const legacyCandidates = [doc?.orderStatus, doc?.order_status, doc?.stage]
    .map(normalizeStateToken)
    .filter(Boolean);

  for (const c of legacyCandidates) {
    const mapped = VALID_STATE_SET.has(c) ? c : LEGACY_STATUS_MAP[c];
    if (mapped) {
      logger('legacy status mapped', { source: c, mapped });
      return normalizeLegacyCodBusinessStatusRead(doc, mapped);
    }
  }

  logger('unknown order status token', {
    status: doc?.status,
    orderStatus: doc?.orderStatus,
    order_status: doc?.order_status,
    stage: doc?.stage,
  });
  if (strict) throw new Error('Invalid persisted order state');
  return normalizeLegacyCodBusinessStatusRead(doc, 'paid');
}

export function normalizeOrderStateForRead(doc, opts) {
  const logger = opts?.logger || (() => {});
  let normalizationWarningsCount = 0;
  const warnLogger = (m, p) => {
    normalizationWarningsCount += 1;
    logger(m, p);
  };
  const status = readCanonicalOrderStatusStrict(doc, { strict: false, logger: warnLogger });
  const paymentMethod = String(doc?.paymentMethod ?? doc?.payment_mode ?? doc?.paymentMode ?? '')
    .trim()
    .toUpperCase();
  const rawStatus = String(doc?.status ?? '').trim().toLowerCase();
  const rawPaymentStatus = String(doc?.paymentStatus ?? doc?.payment_status ?? '').trim().toUpperCase();
  const rawPaymentMethod = String(doc?.paymentMethod ?? doc?.payment_mode ?? doc?.paymentMode ?? '')
    .trim()
    .toUpperCase();
  let paymentStatus = rawPaymentStatus
    .trim()
    .toUpperCase();
  // Normalize legacy PENDING→NOT_APPLICABLE for COD (display-only read layer).
  if ((paymentMethod === 'COD' || paymentMethod === 'CASH') && (rawPaymentStatus === 'PENDING' || rawPaymentStatus === 'COD_PENDING')) {
    warnLogger('normalized COD paymentStatus to NOT_APPLICABLE', { paymentMethod, status });
    paymentStatus = 'NOT_APPLICABLE';
  }
  if (paymentMethod === 'STRIPE' && status === 'paid' && rawPaymentStatus !== 'PAID') {
    warnLogger('normalized STRIPE paid paymentStatus -> PAID', { paymentMethod, status, paymentStatus });
    paymentStatus = 'PAID';
  }
  // Read-layer normalization is display-only. Never mutate business state.
  return {
    raw: {
      status: rawStatus || '',
      paymentStatus: rawPaymentStatus || '',
      paymentMethod: rawPaymentMethod || '',
    },
    normalized: {
      status,
      paymentStatus,
      paymentMethod,
    },
    status,
    paymentStatus,
    paymentMethod,
    normalizationWarningsCount,
    normalizationAlert: normalizationWarningsCount >= 3,
  };
}

export default {
  VALID_STATES,
  VALID_TRANSITIONS,
  isTerminalState,
  getNextAllowedStates,
  assertValidOrderTransition,
  assertPaymentConsistency,
  readCanonicalOrderStatusStrict,
  normalizeOrderStateForRead,
};
