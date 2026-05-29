import {
  assertValidOrderTransition,
  assertPaymentConsistency,
  type OrderState,
  type TransitionActor,
} from './orderStateMachine.core';

export type OrderActor =
  | 'system'
  | 'webhook'
  | 'admin'
  | 'rider'
  | 'kitchen'
  | 'web_customer'
  | 'mobile_customer';

export type GuardInput = {
  actor: OrderActor;
  from: OrderState;
  to: OrderState;
  assignedRiderId?: string | null;
  actorUid?: string | null;
  patch?: Record<string, unknown>;
  paymentStatus?: string;
  /** Firestore `paymentMethod` / `paymentMode` (COD vs card rails). */
  paymentMethod?: string;
};

function assertNoPaymentFieldMutationForAdmin(patch?: Record<string, unknown>) {
  if (!patch) return;
  const forbidden = new Set([
    'paymentStatus',
    'payment_status',
    'paidAt',
    'paymentIntentId',
    'stripeCheckoutSessionId',
  ]);
  for (const k of Object.keys(patch)) {
    if (forbidden.has(k)) {
      throw new Error('Unauthorized state transition');
    }
  }
}

export function assertTransitionAuthorized(input: GuardInput): void {
  const { actor, from, to, assignedRiderId, actorUid, patch, paymentStatus, paymentMethod } = input;

  if (actor === 'web_customer' || actor === 'mobile_customer' || actor === 'system') {
    throw new Error('Unauthorized state transition');
  }

  if (actor === 'kitchen') {
    if (from !== 'preparing' || to !== 'ready_for_pickup') {
      throw new Error('Unauthorized state transition');
    }
  }

  if (actor === 'admin') {
    assertNoPaymentFieldMutationForAdmin(patch);
  }

  if (actor === 'rider') {
    if (!assignedRiderId || !actorUid || assignedRiderId !== actorUid) {
      throw new Error('Unauthorized state transition');
    }
  }

  assertValidOrderTransition(from, to, actor as TransitionActor);
  assertPaymentConsistency(to, paymentStatus ?? '', { from, paymentMethod });
}
