/**
 * Build customer-safe public_tracking document from orders/{orderId}.
 * Keep in sync with frontend/functions/mirrorPayload.js
 */

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const { readCanonicalOrderStatus } = require(
  join(__dirname, '../../../frontend/functions/orderLifecycleServer.cjs')
);

function normalizePaymentStatus(data) {
  const p = data.paymentStatus;
  if (typeof p === 'string' && p.trim()) {
    const u = p.toUpperCase();
    if (u === 'PAID' || p.toLowerCase() === 'paid') return 'PAID';
    if (u === 'FAILED' || p.toLowerCase() === 'failed') return 'FAILED';
    if (u === 'PENDING' || p.toLowerCase() === 'pending') return 'PENDING';
    return u || 'PENDING';
  }
  const ps = data.payment_status;
  if (ps === 'paid' || ps === 'PAID') return 'PAID';
  if (ps === 'failed' || ps === 'FAILED') return 'FAILED';
  if (ps === 'pending' || ps === 'PENDING') return 'PENDING';
  return 'PENDING';
}

export function buildPublicTrackingFromOrder(orderId, data) {
  if (!data || typeof data !== 'object') return null;

  const paymentStatus = normalizePaymentStatus(data);
  const lifecycleStatus = readCanonicalOrderStatus(data);

  if (data.flow === 'grab') {
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

export async function mirrorGrabOrderToPublicTracking(db, orderId) {
  const snap = await db.collection('orders').doc(orderId).get();
  if (!snap.exists) return;
  const payload = buildPublicTrackingFromOrder(orderId, snap.data());
  if (!payload) return;
  await db.collection('public_tracking').doc(orderId).set(payload, { merge: true });
}
