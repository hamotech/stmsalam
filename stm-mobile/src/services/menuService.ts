/**
 * src/services/menuService.ts
 *
 * Real-time subscription to the shared `products` and `categories` collections.
 * Read-only from the mobile app — writing is exclusively admin-side.
 */

import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from './firebase';
import * as firestore from 'firebase/firestore';
import { subscribeProductsSnapshot } from '../../../shared/useProductsCore.js';

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
  /** Optional: `drink` | `food` — used by smart options engine when set in Firestore. */
  type?: string;
  /**
   * Per-product option lists — replaces or extends schema fields for this SKU only.
   * Same shape as schema `options` values: string[] or `{ choices, optionType, required? }`.
   */
  customizationOverride?: Record<
    string,
    | string[]
    | { choices: string[]; optionType?: 'single' | 'multi'; required?: boolean }
  >;
  active?: boolean;
  available?: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
  /** Optional catalog copy for product detail. */
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

export const subscribeProducts = (
  onData: (products: Product[]) => void,
  onError?: (err: Error) => void,
  categoryId?: string
): Unsubscribe => {
  return subscribeProductsSnapshot({
    firestore,
    db,
    categoryId,
    includeUnavailable: false,
    orderByCreatedDesc: true,
    onData: (products) => onData(products as Product[]),
    onError: (err) => {
      console.error('[menuService] products error:', err);
      onError?.(err);
    },
    onIndexWarning: (err) => {
      console.warn(
        '[menuService] Missing index for categoryId + createdAt; fallback listener applied.',
        err
      );
    },
  });
};

export async function fetchProductById(id: string): Promise<Product | null> {
  if (!id?.trim()) return null;
  const snap = await getDoc(doc(db, 'products', id.trim()));
  if (!snap.exists()) return null;
  const p = { id: snap.id, ...snap.data() } as Product;
  if (p.available === false) return null;
  return p;
}
