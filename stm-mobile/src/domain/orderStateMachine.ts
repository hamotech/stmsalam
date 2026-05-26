import {
  VALID_STATES,
  VALID_TRANSITIONS,
  assertValidOrderTransition,
  getNextAllowedStates,
  isTerminalState,
  assertPaymentConsistency,
  readCanonicalOrderStatusStrict,
} from '../../../shared/orderStateMachine.core.esm.js';

export const CANONICAL_ORDER_STATUSES = VALID_STATES.filter((s) => s !== 'failed');
export const SYSTEM_TERMINAL_STATUSES = ['failed'] as const;
export type OrderTransitionActor = 'webhook' | 'admin' | 'rider' | 'system';

export {
  VALID_STATES,
  VALID_TRANSITIONS,
  assertValidOrderTransition,
  getNextAllowedStates,
  isTerminalState,
  assertPaymentConsistency,
};

export function readCanonicalOrderStatus(doc: Record<string, unknown> | null | undefined): string {
  return readCanonicalOrderStatusStrict((doc || {}) as Record<string, unknown>, {
    strict: typeof process !== 'undefined' ? process.env.NODE_ENV === 'production' : false,
    logger: (msg: string, payload?: Record<string, unknown>) =>
      console.warn('[orderStateMachine]', msg, payload || {}),
  });
}

export function nextAdminLifecycleStatus(current: string): string | null {
  const next = getNextAllowedStates(current, 'admin');
  if (next.includes('preparing')) return 'preparing';
  if (next.includes('ready_for_pickup')) return 'ready_for_pickup';
  return next[0] || null;
}

export function coerceAdminIntentToCanonical(nextRaw: unknown): string {
  const u = String(nextRaw || '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '_');
  if (u === 'CANCELLED' || u === 'CANCELED') return 'cancelled';
  if (u === 'CONFIRMED' || u === 'PREPARING') return 'preparing';
  if (u === 'READY') return 'ready_for_pickup';
  if (u === 'PLACED') return 'placed';
  if (u === 'PENDING') return 'paid';
  if (u === 'OUT_FOR_DELIVERY' || u === 'DELIVERING' || u === 'ON_THE_WAY') return 'out_for_delivery';
  if (u === 'DELIVERED' || u === 'COMPLETE' || u === 'COMPLETED') return 'delivered';
  return String(nextRaw || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_');
}
