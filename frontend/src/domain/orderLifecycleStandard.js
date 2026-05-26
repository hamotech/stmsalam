/**
 * Stripe / hosted-checkout detection and admin payment-patch guards.
 * Canonical lifecycle + reads: `orderStateMachine.js` (`readCanonicalOrderStatus`).
 */

import { readCanonicalOrderStatus } from './orderStateMachine.js';

export const UNIFIED_ORDER_STATUSES = [
  'pending_payment',
  'placed',
  'paid',
  'preparing',
  'ready_for_pickup',
  'out_for_delivery',
  'delivered',
  'cancelled',
  'failed',
];

/** @deprecated Use `readCanonicalOrderStatus` from `orderStateMachine.js`. */
export function normalizeUnifiedStatusFromDoc(order) {
  return readCanonicalOrderStatus(order);
}

export function isStripeHostedOrder(order) {
  const m = String(order?.paymentMethod ?? order?.payment_method ?? '').toUpperCase();
  if (m === 'STRIPE' || m === 'CARD') return true;
  const st = String(order?.status ?? '').toLowerCase();
  return st === 'pending_payment';
}

/** Throws if a fulfilment patch attempts to mutate payment / Stripe fields. */
export function assertAdminPatchHasNoPaymentMutation(patch) {
  const forbidden = new Set([
    'paymentStatus',
    'payment_status',
    'paidAt',
    'paymentIntentId',
    'stripeCheckoutSessionId',
  ]);
  for (const k of Object.keys(patch || {})) {
    if (forbidden.has(k)) {
      throw new Error('Admin cannot modify payment fields; Stripe webhook or customer proof flows only.');
    }
  }
}
