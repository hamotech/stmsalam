/**
 * Payment-only Firestore sync (does not change kitchen / fulfilment status).
 * Writes paymentStatus + payment_status for compatibility with the web admin app.
 */

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export type PaymentCompletionStatus = 'PAID';

/**
 * Mark Firestore payment as PAID on best-effort paths. Fails soft per-document
 * (client rules may block `orders/` — `public_tracking/` may still succeed).
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

  const results = await Promise.all([
    updateDoc(doc(db, 'orders', id), patch).then(
      () => true,
      () => false
    ),
    updateDoc(doc(db, 'public_tracking', id), patch).then(
      () => true,
      () => false
    ),
  ]);

  if (!results[0] && !results[1]) {
    return {
      ok: false,
      error:
        'Could not update Firestore (check rules / network). No order documents were updated.',
    };
  }
  return { ok: true };
}
