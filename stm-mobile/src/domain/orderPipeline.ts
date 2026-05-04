/**
 * Strict Grab-style order lifecycle — shared rules for web (mirror in orderPipeline.js) + mobile admin.
 * Pipeline: PLACED → CONFIRMED → PREPARING → READY → OUT_FOR_DELIVERY → DELIVERED
 * Reject: PLACED → CANCELLED only.
 */

import type { GrabOrderStatus } from '@/src/services/grabFlowOrderService';

export const PIPELINE_ORDER: GrabOrderStatus[] = [
  'PLACED',
  'CONFIRMED',
  'PREPARING',
  'READY',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
];

export type PaymentGateResult = { ok: true } | { ok: false; reason: string };

export function toLegacyTrackingStatus(orderStatus: GrabOrderStatus): string {
  if (orderStatus === 'PLACED') return 'PENDING';
  if (orderStatus === 'CANCELLED') return 'CANCELLED';
  return orderStatus;
}

function normalizeToken(s: unknown): string {
  return String(s ?? '')
    .trim()
    .toUpperCase()
    .replace(/-/g, '_')
    .replace(/\s+/g, '_');
}

/** Prefer canonical orderStatus; map legacy status / stage strings. */
export function normalizeGrabOrderStatus(order: {
  orderStatus?: unknown;
  status?: unknown;
  stage?: unknown;
}): GrabOrderStatus {
  const raw = order.orderStatus ?? order.status ?? order.stage;
  const u = normalizeToken(raw);

  if (u === 'CANCELLED' || u === 'CANCELED') return 'CANCELLED';

  const direct = u as GrabOrderStatus;
  if (PIPELINE_ORDER.includes(direct)) return direct;

  // Legacy web/mobile labels
  if (u === 'PENDING' || u === 'PLACED') return 'PLACED';
  if (u === 'CONFIRMED') return 'CONFIRMED';
  if (u === 'PREPARING') return 'PREPARING';
  if (u === 'READY') return 'READY';
  if (u === 'DELIVERING' || u === 'OUT_FOR_DELIVERY' || u === 'ON_THE_WAY') return 'OUT_FOR_DELIVERY';
  if (u === 'DELIVERED' || u === 'COMPLETE' || u === 'COMPLETED') return 'DELIVERED';

  return 'PLACED';
}

export function canTransitionTo(current: GrabOrderStatus, next: GrabOrderStatus): boolean {
  if (current === 'CANCELLED') return false;
  if (next === 'CANCELLED') return current === 'PLACED';
  const i = PIPELINE_ORDER.indexOf(current);
  const j = PIPELINE_ORDER.indexOf(next);
  if (i < 0 || j < 0) return false;
  return j === i + 1;
}

/** Alias for admin / rider tooling — same rules as `canTransitionTo` (single-step, no skips). */
export function canTransition(current: GrabOrderStatus, next: GrabOrderStatus): boolean {
  return canTransitionTo(current, next);
}

export function normalizePaymentMethod(order: {
  paymentMethod?: unknown;
  payment_method?: unknown;
}): string {
  const m = order.paymentMethod ?? order.payment_method ?? '';
  return String(m).toLowerCase().trim();
}

export function normalizeCanonicalPaymentStatus(order: {
  paymentStatus?: unknown;
  payment_status?: unknown;
}): 'PAID' | 'PENDING' | 'PENDING_VERIFICATION' {
  const ps = order.paymentStatus;
  if (ps === 'PAID' || ps === 'paid') return 'PAID';
  if (ps === 'PENDING_VERIFICATION' || ps === 'pending_verification') return 'PENDING_VERIFICATION';
  const legacy = order.payment_status;
  if (legacy === 'paid' || legacy === 'PAID') return 'PAID';
  if (legacy === 'pending' || legacy === 'PENDING') return 'PENDING';
  return 'PENDING';
}

/** Stripe / QR / online rails must be PAID before kitchen accepts (CONFIRMED). COD is allowed at PLACED. */
export function paymentAllowsConfirm(order: {
  paymentMethod?: unknown;
  payment_method?: unknown;
  paymentStatus?: unknown;
  payment_status?: unknown;
}): PaymentGateResult {
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

export function nextPipelineStep(current: GrabOrderStatus): GrabOrderStatus | null {
  if (current === 'CANCELLED') return null;
  const i = PIPELINE_ORDER.indexOf(current);
  if (i < 0 || i >= PIPELINE_ORDER.length - 1) return null;
  return PIPELINE_ORDER[i + 1]!;
}
