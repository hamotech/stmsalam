/**
 * Stripe / hosted-checkout detection and admin payment-patch guards.
 * Canonical reads: `orderStateMachine.ts` (`readCanonicalOrderStatus`).
 */

import { readCanonicalOrderStatus } from '@/src/domain/orderStateMachine';

export const UNIFIED_ORDER_STATUSES = [
  'pending_payment',
  'paid',
  'preparing',
  'ready_for_pickup',
  'out_for_delivery',
  'delivered',
  'cancelled',
  'failed',
] as const;

export type UnifiedOrderStatus = (typeof UNIFIED_ORDER_STATUSES)[number];

/** @deprecated Use `readCanonicalOrderStatus`. */
export function normalizeUnifiedStatusFromDoc(order: Record<string, unknown>): string {
  return readCanonicalOrderStatus(order);
}

export function isStripeHostedOrder(order: {
  paymentMethod?: unknown;
  payment_method?: unknown;
  status?: unknown;
}): boolean {
  const m = String(order?.paymentMethod ?? order?.payment_method ?? '').toUpperCase();
  if (m === 'STRIPE' || m === 'CARD') return true;
  const st = String(order?.status ?? '').toLowerCase();
  return st === 'pending_payment';
}

const ADMIN_FORBIDDEN_PAYMENT_KEYS = new Set([
  'paymentStatus',
  'payment_status',
  'paidAt',
  'paymentIntentId',
  'stripeCheckoutSessionId',
]);

/** Throws if a fulfilment patch attempts to mutate payment / Stripe fields. */
export function assertAdminPatchHasNoPaymentMutation(patch: Record<string, unknown>): void {
  for (const k of Object.keys(patch || {})) {
    if (ADMIN_FORBIDDEN_PAYMENT_KEYS.has(k)) {
      throw new Error('Admin cannot modify payment fields; Stripe webhook or customer proof flows only.');
    }
  }
}
