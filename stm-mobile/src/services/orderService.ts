/**
 * src/services/orderService.ts
 *
 * Customer-facing Firestore service layer.
 * Reads from `public_tracking` (public, no auth required) — same collection
 * that the admin web app writes to via `updateOrderStatus`.
 *
 * NEVER modifies the private `orders` collection.
 * NEVER duplicates business logic from the web app.
 */

import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
  limit,
  Unsubscribe,
  DocumentData,
} from 'firebase/firestore';
import { db } from './firebase';

// ── Types ─────────────────────────────────────────────────────────────────────

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'READY'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERING'
  | 'DELIVERED';

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

export interface PublicOrder {
  id: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  mode: 'delivery' | 'pickup' | 'dine-in';
  paymentProofSubmitted: boolean;
  createdAt: string | { toDate: () => Date };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const mapDoc = (d: DocumentData & { id: string }): PublicOrder => ({
  id:                   d.id,
  status:               (d.status ?? 'PENDING').toUpperCase() as OrderStatus,
  items:                d.items ?? [],
  total:                Number(d.total ?? 0),
  mode:                 d.mode ?? 'delivery',
  paymentProofSubmitted: d.paymentProofSubmitted ?? false,
  createdAt:            d.createdAt ?? '',
});

// ── Service ───────────────────────────────────────────────────────────────────

/**
 * Real-time listener for a single order's public tracking document.
 * Used by the Tracking screen.
 *
 * @returns Unsubscribe function — call in useEffect cleanup.
 */
export const subscribeOrderTracking = (
  orderId: string,
  onData: (order: PublicOrder | null) => void,
  onError?: (err: Error) => void
): Unsubscribe => {
  if (!orderId?.trim()) {
    onData(null);
    return () => {};
  }

  const ref = doc(db, 'public_tracking', orderId.trim());

  return onSnapshot(
    ref,
    (snap) => {
      if (snap.exists()) {
        onData(mapDoc({ id: snap.id, ...snap.data() }));
      } else {
        onData(null);
      }
    },
    (err) => {
      console.error('[orderService] tracking snapshot error:', err);
      onError?.(err);
    }
  );
};

/**
 * Real-time listener for the most recent public_tracking orders.
 * Used by the Orders List screen — shows the customer's latest N orders.
 *
 * @param maxCount Maximum orders to fetch (default 20).
 */
export const subscribeRecentOrders = (
  onData: (orders: PublicOrder[]) => void,
  onError?: (err: Error) => void,
  maxCount = 20
): Unsubscribe => {
  const q = query(
    collection(db, 'public_tracking'),
    orderBy('createdAt', 'desc'),
    limit(maxCount)
  );

  return onSnapshot(
    q,
    (snap) => {
      onData(snap.docs.map((d) => mapDoc({ id: d.id, ...d.data() })));
    },
    (err) => {
      console.error('[orderService] recent orders snapshot error:', err);
      onError?.(err);
    }
  );
};

// ── Status Utilities ──────────────────────────────────────────────────────────

export const STATUS_STEPS: {
  id: OrderStatus | string;
  label: string;
  desc: string;
  emoji: string;
}[] = [
  { id: 'PENDING',          label: 'Order Placed',     desc: 'We have received your order',     emoji: '🧾' },
  { id: 'CONFIRMED',        label: 'Confirmed',         desc: 'Kitchen has accepted your order', emoji: '✅' },
  { id: 'PREPARING',        label: 'Preparing',         desc: "Chef is preparing your meal",     emoji: '👨‍🍳' },
  { id: 'READY',            label: 'Food Ready',        desc: 'Order packed and ready',          emoji: '📦' },
  { id: 'OUT_FOR_DELIVERY', label: 'Out for Delivery',  desc: 'Driver is on the way',            emoji: '🛵' },
  { id: 'DELIVERED',        label: 'Delivered',         desc: 'Enjoy your meal!',                emoji: '🎉' },
];

export const getActiveStep = (status: OrderStatus | string): number => {
  const s = (status ?? '').toUpperCase();
  const map: Record<string, number> = {
    PENDING: 0, CONFIRMED: 1, PREPARING: 2, READY: 3,
    OUT_FOR_DELIVERY: 4, DELIVERING: 4, DELIVERED: 5,
  };
  return map[s] ?? 0;
};

export const statusColor = (status: OrderStatus | string): string => {
  const s = (status ?? '').toUpperCase();
  const map: Record<string, string> = {
    PENDING:          '#F59E0B',
    CONFIRMED:        '#3B82F6',
    PREPARING:        '#8B5CF6',
    READY:            '#10B981',
    OUT_FOR_DELIVERY: '#0EA5E9',
    DELIVERING:       '#0EA5E9',
    DELIVERED:        '#22C55E',
  };
  return map[s] ?? '#6B7280';
};
