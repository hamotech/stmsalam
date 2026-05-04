/**
 * Build customer-safe public_tracking document from orders/{orderId}.
 * Keep in sync with frontend/functions/mirrorPayload.js
 */

function normalizePaymentStatus(data) {
  if (data.paymentStatus) return data.paymentStatus;
  const ps = data.payment_status;
  if (ps === 'paid' || ps === 'PAID') return 'PAID';
  if (ps === 'pending' || ps === 'PENDING') return 'PENDING';
  return 'PENDING';
}

export function buildPublicTrackingFromOrder(orderId, data) {
  if (!data || typeof data !== 'object') return null;

  const paymentStatus = normalizePaymentStatus(data);

  if (data.flow === 'grab') {
    const orderStatus = data.orderStatus ?? 'PLACED';
    const legacy =
      typeof data.status === 'string' && data.status
        ? data.status
        : orderStatus === 'PLACED'
          ? 'PENDING'
          : orderStatus;
    return {
      id: orderId,
      status: legacy,
      orderStatus,
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
    status: (data.status ?? 'PENDING').toString(),
    orderStatus: data.orderStatus ?? 'PLACED',
    paymentStatus,
    paymentMethod: data.paymentMethod ?? '',
    items: data.items ?? [],
    total: Number(data.totalAmount ?? data.total ?? 0),
    totalAmount: Number(data.totalAmount ?? 0),
    mode: data.mode ?? 'delivery',
    paymentProofSubmitted: Boolean(
      data.paymentProofSubmitted || data.payment_screenshot
    ),
    estimatedDeliveryAt: data.estimatedDeliveryAt ?? null,
    createdAt: data.createdAt ?? null,
  };
}

export async function mirrorGrabOrderToPublicTracking(db, orderId) {
  const snap = await db.collection('orders').doc(orderId).get();
  if (!snap.exists) return;
  const payload = buildPublicTrackingFromOrder(orderId, snap.data());
  if (!payload) return;
  await db.collection('public_tracking').doc(orderId).set(payload, { merge: true });
}
