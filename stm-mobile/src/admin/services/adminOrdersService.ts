import { collection, onSnapshot, orderBy, query, type Unsubscribe } from 'firebase/firestore';
import { db } from '@/src/services/firebase';
import type { OrderDoc } from './orderNotificationService';

export function subscribeAdminOrdersList(
  onData: (orders: OrderDoc[]) => void,
  onError?: (e: Error) => void
): Unsubscribe {
  const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => {
      onData(snap.docs.map((d) => ({ id: d.id, ...d.data() } as OrderDoc)));
    },
    (err) => {
      console.error('[adminOrdersService]', err);
      onError?.(err as Error);
    }
  );
}
