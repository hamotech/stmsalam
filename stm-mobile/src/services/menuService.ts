/**
 * src/services/menuService.ts
 *
 * Real-time subscription to the shared `products` and `categories` collections.
 * Read-only from the mobile app — writing is exclusively admin-side.
 */

import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  Unsubscribe,
  DocumentData,
} from 'firebase/firestore';
import { db } from './firebase';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  icon?: string;
  emoji?: string;
  order?: number;
  active?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  img?: string;
  image?: string;
  badge?: string;
  categoryId: string;
  category?: string;
  active?: boolean;
}

// ── Service ───────────────────────────────────────────────────────────────────

export const subscribeCategories = (
  onData: (cats: Category[]) => void,
  onError?: (err: Error) => void
): Unsubscribe => {
  const q = query(collection(db, 'categories'));
  return onSnapshot(
    q,
    (snap) => onData(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Category))),
    (err) => { console.error('[menuService] categories error:', err); onError?.(err); }
  );
};

export const subscribeProducts = (
  onData: (products: Product[]) => void,
  onError?: (err: Error) => void,
  categoryId?: string
): Unsubscribe => {
  const baseQ = categoryId && categoryId !== 'all'
    ? query(collection(db, 'products'), where('categoryId', '==', categoryId))
    : query(collection(db, 'products'));

  return onSnapshot(
    baseQ,
    (snap) => {
      const prods = snap.docs
        .map((d) => ({ id: d.id, ...d.data() } as Product))
        .filter((p) => p.active !== false);
      onData(prods);
    },
    (err) => { console.error('[menuService] products error:', err); onError?.(err); }
  );
};
