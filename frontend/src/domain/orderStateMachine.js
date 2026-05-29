// Client-only ESM (no `frontend/functions` / `.cjs` — avoids `module` / `require` in the browser).
import {
  VALID_STATES,
  VALID_TRANSITIONS,
  assertValidOrderTransition,
  getNextAllowedStates,
  isTerminalState,
  assertPaymentConsistency,
  readCanonicalOrderStatusStrict,
  PAYMENT_MODE,
} from '../../../shared/orderStateMachine.core.esm.js';

export const CANONICAL_ORDER_STATUSES = VALID_STATES.filter((s) => s !== 'failed');
export const SYSTEM_TERMINAL_STATUSES = ['failed'];

export {
  VALID_STATES,
  VALID_TRANSITIONS,
  assertValidOrderTransition,
  getNextAllowedStates,
  isTerminalState,
  assertPaymentConsistency,
  PAYMENT_MODE,
};

import { normalizeLegacyOrder } from '../lib/orderUtils.js';

export function readCanonicalOrderStatus(doc) {
  const normalized = normalizeLegacyOrder(doc || {});
  return readCanonicalOrderStatusStrict(normalized, {
    strict: typeof process !== 'undefined' ? process.env.NODE_ENV === 'production' : false,
    logger: (msg, payload) => console.warn('[orderStateMachine]', msg, payload || {}),
  });
}

/** Next status when admin clicks "Next" (fulfilment only, not rider legs). */
export function nextAdminLifecycleStatus(current) {
  const next = getNextAllowedStates(current, 'admin');
  if (next.includes('preparing')) return 'preparing';
  if (next.includes('ready_for_pickup')) return 'ready_for_pickup';
  return next[0] || null;
}

/** Admin "Accept" from queue: first kitchen step from paid. */
export function adminAcceptTargetStatus() {
  return 'preparing';
}

export function isTerminalCanonicalStatus(status) {
  return isTerminalState(status);
}

/** Map admin UI / legacy pipeline tokens → canonical `status` for writes and guards. */
export function coerceAdminIntentToCanonical(nextRaw) {
  const u = String(nextRaw || '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '_');
  if (u === 'CANCELLED' || u === 'CANCELED') return 'cancelled';
  if (u === 'CONFIRMED' || u === 'PREPARING') return 'preparing';
  if (u === 'READY') return 'ready_for_pickup';
  if (u === 'PLACED') return 'placed'
  if (u === 'PENDING') return 'paid'
  if (u === 'OUT_FOR_DELIVERY' || u === 'DELIVERING' || u === 'ON_THE_WAY') return 'out_for_delivery';
  if (u === 'DELIVERED' || u === 'COMPLETE' || u === 'COMPLETED') return 'delivered';
  return String(nextRaw || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_');
}
