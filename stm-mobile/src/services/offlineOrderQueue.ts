/**
 * Lightweight COD-only offline queue. Stripe/QR require network for payment.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/src/services/firebase';
import { placeGrabOrderAtCheckout } from '@/src/services/grabFlowOrderService';
import type { GrabOrderItem } from '@/src/services/grabFlowOrderService';
import type { GrabCheckoutDraft } from '@/src/utils/checkoutDraft';

async function sleepMs(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/** Mirror may lag the canonical `orders` write; only `public_tracking` is readable for all clients. */
async function waitForPublicTrackingDoc(orderId: string): Promise<boolean> {
  for (let i = 0; i < 30; i++) {
    const snap = await getDoc(doc(db, 'public_tracking', orderId));
    if (snap.exists()) {
      return true;
    }
    await sleepMs(200 + i * 25);
  }
  return false;
}

const STORAGE_KEY = 'stm_offline_order_queue_v1';

export type OfflineCodQueueItem = {
  queueId: string;
  createdAt: number;
  /** Stored for debugging; flush uses Firebase Auth UID from the callable session (`placeGrabOrderAtCheckout`). */
  userId: string;
  items: GrabOrderItem[];
  draft: GrabCheckoutDraft;
};

async function readQueue(): Promise<OfflineCodQueueItem[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as OfflineCodQueueItem[]) : [];
  } catch {
    return [];
  }
}

async function writeQueue(items: OfflineCodQueueItem[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export async function enqueueOfflineCodOrder(
  item: Omit<OfflineCodQueueItem, 'queueId' | 'createdAt'> & { queueId?: string }
): Promise<string> {
  const queue = await readQueue();
  const queueId = item.queueId?.trim() || `q_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  const next: OfflineCodQueueItem = {
    ...item,
    queueId,
    createdAt: Date.now(),
  };
  queue.push(next);
  await writeQueue(queue);
  return queueId;
}

export async function getPendingOfflineCount(): Promise<number> {
  const q = await readQueue();
  return q.length;
}

export async function removeOfflineQueueItem(queueId: string): Promise<void> {
  const q = await readQueue();
  await writeQueue(q.filter((x) => x.queueId !== queueId));
}

let processing = false;

/**
 * Flushes the COD queue when online. Stops on first network/Firestore failure so items remain queued.
 */
export async function processOfflineOrderQueue(): Promise<{
  attempted: number;
  succeeded: number;
  error?: string;
}> {
  if (processing) {
    return { attempted: 0, succeeded: 0, error: 'busy' };
  }
  processing = true;
  let succeeded = 0;
  let attempted = 0;
  try {
    for (;;) {
      const queue = await readQueue();
      if (queue.length === 0) {
        return { attempted, succeeded };
      }
      const item = queue[0];
      attempted += 1;
      try {
        const orderId = await placeGrabOrderAtCheckout({
          items: item.items,
          totalAmount: Number(item.draft.total),
          paymentMode: 'cod',
          /** Queue-only scope: never reuse as interactive checkout idempotency / pending-resolution (`offline-queue:` is filtered everywhere else). */
          idempotencyKey: `offline-queue:${item.queueId}`,
        });
        if (!orderId?.trim()) {
          return { attempted, succeeded, error: 'no_orderId' };
        }
        const seen = await waitForPublicTrackingDoc(orderId);
        if (!seen) {
          return { attempted, succeeded, error: 'order_not_found' };
        }
        await removeOfflineQueueItem(item.queueId);
        succeeded += 1;
      } catch (e) {
        return {
          attempted,
          succeeded,
          error: e instanceof Error ? e.message : 'sync_failed',
        };
      }
    }
  } finally {
    processing = false;
  }
}
