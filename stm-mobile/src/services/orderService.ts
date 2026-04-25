/**
 * src/services/orderService.ts
 *
 * Customer-facing Firestore layer — mirrors the web `placeOrder` contract
 * (`frontend/src/admin/services/dataService.js`) so mobile writes are compatible
 * with existing `orders` + `public_tracking` documents. Read paths unchanged.
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
  setDoc,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from './firebase';

const LOCAL_ORDERS_KEY = 'stm_local_orders';
/** Same key as web `localStorage` for last placed order id (mobile: AsyncStorage). */
const LAST_ORDER_ID_KEY = 'stm_last_order_id';

export type PlaceOrderPayload = Record<string, unknown> & {
  items: unknown[];
  total: string | number;
  mode?: string;
  payment?: string;
  userId?: string;
  customer?: Record<string, string>;
  notes?: string;
  status?: string;
};

export type PlacedOrder = PlaceOrderPayload & {
  id: string;
  trackingToken: string;
  createdAt: string;
  status: string;
};

/** Web parity: `frontend/src/admin/services/dataService.js` placeOrder */
export async function placeOrder(payload: PlaceOrderPayload): Promise<PlacedOrder> {
  const orderId = `STM-${Date.now()}`;
  // Match web token generation exactly (.substring, not .slice)
  const trackingToken =
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  const statusUp = (payload.status || 'PENDING').toString().toUpperCase();
  const newOrder: PlacedOrder = {
    ...payload,
    id: orderId,
    trackingToken,
    createdAt: new Date().toISOString(),
    status: statusUp,
    isNewForAdmin: true,
    chatEnabled: true,
    unreadAdmin: 0,
    unreadCustomer: 0,
  } as PlacedOrder;

  await setDoc(doc(db, 'orders', orderId), newOrder as DocumentData);

  // public_tracking shape must stay byte-for-byte compatible with web (no Number() coercion here)
  const publicData = {
    id: orderId,
    status: newOrder.status || 'PENDING',
    items: newOrder.items || [],
    total: newOrder.total || 0,
    mode: (newOrder.mode as string) || 'delivery',
    paymentProofSubmitted: false,
    createdAt: new Date(),
  };

  await setDoc(doc(db, 'public_tracking', orderId), publicData);
  await rememberLocalOrderId(orderId);
  return newOrder;
}

export async function rememberLocalOrderId(orderId: string): Promise<void> {
  try {
    await AsyncStorage.setItem(LAST_ORDER_ID_KEY, orderId);
    const raw = await AsyncStorage.getItem(LOCAL_ORDERS_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    if (!list.includes(orderId)) {
      list.unshift(orderId);
      await AsyncStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(list.slice(0, 50)));
    }
  } catch (e) {
    console.warn('[orderService] rememberLocalOrderId', e);
  }
}

export async function getLocalOrderIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(LOCAL_ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

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

/** Normalize line items for UI — tolerate partial/malformed docs from the field. */
function normalizeTrackingItems(raw: unknown): OrderItem[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((it) => {
    const row = it && typeof it === 'object' ? (it as Record<string, unknown>) : {};
    return {
      name:  String(row.name ?? ''),
      qty:   Math.max(0, Number(row.qty ?? 0)),
      price: Number(row.price ?? 0),
    };
  });
}

const mapDoc = (d: DocumentData & { id: string }): PublicOrder => ({
  id:                   d.id,
  status:               (d.status ?? 'PENDING').toUpperCase() as OrderStatus,
  items:                normalizeTrackingItems(d.items),
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

  // Real-time listener — same pattern as web OrderTracking.jsx (onSnapshot on public_tracking doc).
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
  // PREPARING copy matches web OrderTracking.jsx
  { id: 'PREPARING',        label: 'Preparing',         desc: 'Our chefs are grilling your kebabs', emoji: '👨‍🍳' },
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
