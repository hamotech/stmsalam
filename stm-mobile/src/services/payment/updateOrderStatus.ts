/**
 * Payment-only Firestore sync (does not change kitchen / fulfilment status).
 * Writes `paymentStatus` only; lifecycle stays on `status`.
 */

import { doc, getDoc } from 'firebase/firestore';
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

  try {
    const ref = doc(db, 'orders', id);
    const snap = await getDoc(ref);
    const data = snap.exists() ? (snap.data() as Record<string, unknown>) : {};
    const status = String(data?.status ?? '').trim().toLowerCase();
    if (status === 'pending_payment') {
      return {
        ok: false,
        error: 'Pending-payment orders must be settled via webhook/verification flow only.',
      };
    }
    return {
      ok: false,
      error: 'Direct paymentStatus writes are disabled. Use Stripe webhook/FSM transition only.',
    };
  } catch (e) {
    console.error('[PAYMENT_ORDER_SYNC]', e);
    return {
      ok: false,
      error: e instanceof Error ? e.message : 'Could not update orders document.',
    };
  }
}
