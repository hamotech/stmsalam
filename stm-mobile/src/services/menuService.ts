/**
 * src/services/menuService.ts
 *
 * Menu catalog = Firestore `products` + `categories` (same as web admin).
 * There is no separate `menu_items` collection in this project.
 */

import {
  collection,
  onSnapshot,
  query,
  where,
  Unsubscribe,
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
  description?: string;
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

/** Filters by `categoryId` — same field as web Menu (`frontend/src/pages/Menu.jsx`). */
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
