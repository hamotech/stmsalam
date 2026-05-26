import type { Firestore } from 'firebase/firestore';
import {
  updateGrabPipelineStatus,
  type GrabOrderStatus,
} from '@/src/services/grabFlowOrderService';
import {
  canTransitionTo,
  normalizeGrabOrderStatus,
  paymentAllowsConfirm,
  isNewOrderQueueEligible,
} from '@/src/domain/orderPipeline';
import { coerceAdminIntentToCanonical } from '@/src/domain/orderStateMachine';
import type { OrderDoc } from '@/src/admin/services/orderNotificationService';
import type { AppRole } from '@/src/auth/resolveAppRole';

export type AdvancePipelineOptions = {
  /** Only `admin` may change fulfilment state today; `kitchen` reserved for future staff roles. */
  actor: AppRole;
};

export async function advanceGrabOrderPipeline(
  firestore: Firestore,
  order: OrderDoc,
  next: GrabOrderStatus | string,
  opts: AdvancePipelineOptions
): Promise<void> {
  if (opts.actor !== 'admin') {
    throw new Error('Only admin may advance the order pipeline.');
  }

  const id = order.id;
  if (!id) throw new Error('Order id missing');

  const current = normalizeGrabOrderStatus(order);
  if (next === 'CONFIRMED' && isNewOrderQueueEligible(current)) {
    const gate = paymentAllowsConfirm(order as OrderDoc & Record<string, unknown>);
    if (!gate.ok) throw new Error(gate.reason);
  }
  if (!canTransitionTo(current, next)) {
    throw new Error('Invalid order state transition');
  }

  const nextCanon = coerceAdminIntentToCanonical(next);
  await updateGrabPipelineStatus(firestore, id, next, {
    updatedAt: new Date().toISOString(),
    chatEnabled: !['paid', 'placed', 'cancelled', 'pending_payment'].includes(nextCanon),
  });
}
