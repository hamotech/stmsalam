/**
 * Payment-only Firestore sync (does not change kitchen / fulfilment status).
 * Writes paymentStatus + payment_status for compatibility with the web admin app.
 */

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export type PaymentCompletionStatus = 'PAID';

/**
 * Mark payment PAID on `orders` only; public_tracking is mirrored by Cloud Functions.
 */
export async function updateOrderStatus(
  orderId: string,
  status: PaymentCompletionStatus
): Promise<{ ok: boolean; error?: string }> {
  if (status !== 'PAID') {
    return { ok: false, error: 'Only status "PAID" is supported for this helper.' };
  }
  const id = orderId?.trim();
  if (!id) return { ok: false, error: 'orderId is required.' };

  const patch = {
    paymentStatus: 'PAID',
    payment_status: 'paid',
    updatedAt: new Date().toISOString(),
  };

  try {
    await updateDoc(doc(db, 'orders', id), patch);
    return { ok: true };
  } catch (e) {
    console.error('[PAYMENT_ORDER_SYNC]', e);
    return {
      ok: false,
      error: e instanceof Error ? e.message : 'Could not update orders document.',
    };
  }
}
