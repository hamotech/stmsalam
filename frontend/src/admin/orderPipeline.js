/**
 * Mirror of stm-mobile/src/domain/orderPipeline.ts — keep behavior in sync manually.
 */

export const PIPELINE_ORDER = [
  'PLACED',
  'CONFIRMED',
  'PREPARING',
  'READY',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
];

export function toLegacyTrackingStatus(orderStatus) {
  if (orderStatus === 'PLACED') return 'PENDING';
  if (orderStatus === 'CANCELLED') return 'CANCELLED';
  return orderStatus;
}

function normalizeToken(s) {
  return String(s ?? '')
    .trim()
    .toUpperCase()
    .replace(/-/g, '_')
    .replace(/\s+/g, '_');
}

export function normalizeGrabOrderStatus(order) {
  const raw = order.orderStatus ?? order.status ?? order.stage;
  const u = normalizeToken(raw);

  if (u === 'CANCELLED' || u === 'CANCELED') return 'CANCELLED';
  if (PIPELINE_ORDER.includes(u)) return u;

  if (u === 'PENDING' || u === 'PLACED') return 'PLACED';
  if (u === 'CONFIRMED') return 'CONFIRMED';
  if (u === 'PREPARING') return 'PREPARING';
  if (u === 'READY') return 'READY';
  if (u === 'DELIVERING' || u === 'OUT_FOR_DELIVERY' || u === 'ON_THE_WAY') return 'OUT_FOR_DELIVERY';
  if (u === 'DELIVERED' || u === 'COMPLETE' || u === 'COMPLETED') return 'DELIVERED';

  return 'PLACED';
}

export function canTransitionTo(current, next) {
  if (current === 'CANCELLED') return false;
  if (next === 'CANCELLED') return current === 'PLACED';
  const i = PIPELINE_ORDER.indexOf(current);
  const j = PIPELINE_ORDER.indexOf(next);
  if (i < 0 || j < 0) return false;
  return j === i + 1;
}

export function normalizePaymentMethod(order) {
  const m = order.paymentMethod ?? order.payment_method ?? '';
  return String(m).toLowerCase().trim();
}

export function normalizeCanonicalPaymentStatus(order) {
  const ps = order.paymentStatus;
  if (ps === 'PAID' || ps === 'paid') return 'PAID';
  if (ps === 'PENDING_VERIFICATION' || ps === 'pending_verification') return 'PENDING_VERIFICATION';
  const legacy = order.payment_status;
  if (legacy === 'paid' || legacy === 'PAID') return 'PAID';
  if (legacy === 'pending' || legacy === 'PENDING') return 'PENDING';
  return 'PENDING';
}

export function paymentAllowsConfirm(order) {
  const method = normalizePaymentMethod(order);
  if (method === 'cod' || method === 'cash' || method === 'phone') {
    return { ok: true };
  }
  const ps = normalizeCanonicalPaymentStatus(order);
  if (ps === 'PAID') return { ok: true };
  return {
    ok: false,
    reason:
      'Payment must be verified (PAID) before confirming. Complete Stripe verification or mark QR/online as PAID.',
  };
}

export function nextPipelineStep(current) {
  if (current === 'CANCELLED') return null;
  const i = PIPELINE_ORDER.indexOf(current);
  if (i < 0 || i >= PIPELINE_ORDER.length - 1) return null;
  return PIPELINE_ORDER[i + 1];
}

/** Ops filters for dashboard chips */
export function orderMatchesPaymentFilter(order, filter) {
  if (filter === 'all') return true;
  const method = normalizePaymentMethod(order);
  const ps = normalizeCanonicalPaymentStatus(order);
  if (filter === 'cod') return method === 'cod' || method === 'cash';
  if (filter === 'stripe_paid') return (method === 'stripe' || method === 'paypal') && ps === 'PAID';
  if (filter === 'qr_pending') return method === 'qr' && ps !== 'PAID';
  return true;
}
