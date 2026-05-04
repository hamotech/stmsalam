import type { Firestore } from 'firebase/firestore';
import {
  updateGrabPipelineStatus,
  type GrabOrderStatus,
} from '@/src/services/grabFlowOrderService';
import {
  canTransitionTo,
  normalizeGrabOrderStatus,
  paymentAllowsConfirm,
} from '@/src/domain/orderPipeline';
import type { OrderDoc } from '@/src/admin/services/orderNotificationService';
import type { AppRole } from '@/src/auth/resolveAppRole';

export type AdvancePipelineOptions = {
  /** Only `admin` may change fulfilment state today; `kitchen` reserved for future staff roles. */
  actor: AppRole;
};

export async function advanceGrabOrderPipeline(
  firestore: Firestore,
  order: OrderDoc,
  next: GrabOrderStatus,
  opts: AdvancePipelineOptions
): Promise<void> {
  if (opts.actor !== 'admin') {
    throw new Error('Only admin may advance the order pipeline.');
  }

  const id = order.id;
  if (!id) throw new Error('Order id missing');

  const current = normalizeGrabOrderStatus(order);
  if (next === 'CONFIRMED' && current === 'PLACED') {
    const gate = paymentAllowsConfirm(order as OrderDoc & Record<string, unknown>);
    if (!gate.ok) throw new Error(gate.reason);
  }
  if (!canTransitionTo(current, next)) {
    throw new Error(`Invalid transition ${current} → ${next} (no skipping)`);
  }

  const lower = next.toLowerCase();
  await updateGrabPipelineStatus(firestore, id, next, {
    order_status: lower,
    updatedAt: new Date().toISOString(),
    chatEnabled: next !== 'PLACED' && next !== 'CANCELLED',
  });
}
