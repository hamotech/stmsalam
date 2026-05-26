type OrderState =
  | 'pending_payment'
  | 'placed'
  | 'paid'
  | 'refunded'
  | 'preparing'
  | 'ready_for_pickup'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'failed';
type TransitionActor = 'webhook' | 'admin' | 'rider' | 'system';

/**
 * Typed façade over the browser-safe ESM core.
 * Node / Cloud Functions use `frontend/functions/shared/orderStateMachine.core.cjs` — keep logic in sync.
 */
import {
  VALID_STATES,
  VALID_TRANSITIONS,
  isTerminalState,
  getNextAllowedStates,
  assertValidOrderTransition,
  assertPaymentConsistency,
  readCanonicalOrderStatusStrict,
} from './orderStateMachine.core.esm.js';

export { OrderState, TransitionActor };
export {
  VALID_STATES,
  VALID_TRANSITIONS,
  isTerminalState,
  getNextAllowedStates,
  assertValidOrderTransition,
  assertPaymentConsistency,
  readCanonicalOrderStatusStrict,
};
