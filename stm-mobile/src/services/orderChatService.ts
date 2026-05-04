/**
 * Order-scoped chat — same as web `orders/{orderId}/messages`.
 */
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from './firebase';

export type OrderChatSenderRole = 'customer' | 'admin' | string;

export interface OrderChatMessage {
  id: string;
  text: string;
  senderRole: OrderChatSenderRole;
  senderId?: string;
  createdAt?: { toDate: () => Date } | null;
}

const MOBILE_SENDER_ID = 'stm-mobile-customer';

export const sendOrderChatMessage = async (
  orderId: string,
  text: string,
  senderRole: OrderChatSenderRole = 'customer'
): Promise<void> => {
  const trimmed = (text || '').trim();
  if (!trimmed || !orderId?.trim()) throw new Error('Invalid order message');

  await addDoc(collection(db, 'orders', orderId.trim(), 'messages'), {
    text: trimmed,
    senderRole,
    senderId: MOBILE_SENDER_ID,
    createdAt: serverTimestamp(),
  });
};

export const subscribeOrderChatMessages = (
  orderId: string,
  onData: (messages: OrderChatMessage[]) => void,
  onError?: (err: Error) => void
): Unsubscribe => {
  if (!orderId?.trim()) {
    onData([]);
    return () => {};
  }

  const q = query(
    collection(db, 'orders', orderId.trim(), 'messages'),
    orderBy('createdAt', 'asc')
  );

  return onSnapshot(
    q,
    (snap) => {
      onData(
        snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            text: String(data.text ?? ''),
            senderRole: (data.senderRole ?? 'customer') as OrderChatSenderRole,
            senderId: data.senderId,
            createdAt: data.createdAt,
          };
        })
      );
    },
    (err) => {
      console.error('[orderChatService] messages:', err);
      onError?.(err as Error);
    }
  );
};
