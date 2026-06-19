/**
 * Keep in sync with stm-mobile/server/lib/mirrorOnlinePublicTracking.mjs
 */

const { readCanonicalOrderStatus } = require('./orderLifecycleServer.cjs');

function normalizePaymentStatus(data) {
  const p = data.paymentStatus;
  if (typeof p === 'string' && p.trim()) {
    const u = p.toUpperCase();
    if (u === 'PAID' || p.toLowerCase() === 'paid') return 'PAID';
    if (u === 'FAILED' || p.toLowerCase() === 'failed') return 'FAILED';
    if (u === 'PENDING' || p.toLowerCase() === 'pending') return 'PENDING';
    // Normalize legacy COD_PENDING and new NOT_APPLICABLE both to NOT_APPLICABLE.
    if (u === 'NOT_APPLICABLE' || u === 'COD_PENDING' || p.toLowerCase() === 'cod_pending' || p.toLowerCase() === 'not_applicable') return 'NOT_APPLICABLE';
    return u || 'PENDING';
  }
  const ps = data.payment_status;
  if (ps === 'paid' || ps === 'PAID') return 'PAID';
  if (ps === 'failed' || ps === 'FAILED') return 'FAILED';
  if (ps === 'pending' || ps === 'PENDING') return 'PENDING';
  return 'PENDING';
}

function buildPublicTrackingFromOrder(orderId, data) {
  if (!data || typeof data !== 'object') return null;

  const paymentStatus = normalizePaymentStatus(data);
  const lifecycleStatus = readCanonicalOrderStatus(data);

  if (data.flow === 'online') {
    return {
      id: orderId,
      status: lifecycleStatus,
      paymentStatus,
      paymentMethod: data.paymentMethod ?? '',
      items: data.items ?? [],
      total: Number(data.totalAmount ?? data.total ?? 0),
      totalAmount: Number(data.totalAmount ?? 0),
      mode: data.mode ?? 'delivery',
      paymentProofSubmitted: Boolean(
        data.qrCustomerClaimedAt || data.paymentProofSubmitted || data.payment_screenshot
      ),
      qrCustomerClaimedAt: data.qrCustomerClaimedAt ?? null,
      estimatedDeliveryAt: data.estimatedDeliveryAt ?? null,
      createdAt: data.createdAt ?? null,
    };
  }

  return {
    id: orderId,
    status: lifecycleStatus,
    paymentStatus,
    paymentMethod: data.paymentMethod ?? '',
    items: data.items ?? [],
    total: Number(data.totalAmount ?? data.total ?? 0),
    totalAmount: Number(data.totalAmount ?? 0),
    mode: data.mode ?? 'delivery',
    paymentProofSubmitted: Boolean(data.paymentProofSubmitted || data.payment_screenshot),
    estimatedDeliveryAt: data.estimatedDeliveryAt ?? null,
    createdAt: data.createdAt ?? null,
  };
}

module.exports = { buildPublicTrackingFromOrder };
