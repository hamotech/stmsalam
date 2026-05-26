import { useEffect, useMemo, useState } from 'react';
import * as firestore from 'firebase/firestore';
import { db } from '@/src/services/firebase';
import type { Product } from '@/src/services/menuService';
import { subscribeProductsSnapshot } from '../../../shared/useProductsCore.js';

export function useProducts(options?: {
  categoryId?: string;
  includeUnavailable?: boolean;
  orderByCreatedDesc?: boolean;
}) {
  const categoryId = options?.categoryId;
  const includeUnavailable = options?.includeUnavailable ?? false;
  const orderByCreatedDesc = options?.orderByCreatedDesc ?? true;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const unsub = subscribeProductsSnapshot({
      firestore,
      db,
      categoryId,
      includeUnavailable,
      orderByCreatedDesc,
      onData: (next: Product[]) => {
        setProducts(next);
        setLoading(false);
      },
      onError: (err: Error) => {
        console.error('[useProducts] snapshot error:', err);
        setError(err);
        setLoading(false);
      },
      onIndexWarning: (err: Error) => {
        console.warn(
          '[useProducts] Missing index for products query (categoryId + createdAt). Falling back to unordered listener.',
          err
        );
      },
    });
    return () => unsub();
  }, [categoryId, includeUnavailable, orderByCreatedDesc]);

  return useMemo(() => ({ products, loading, error }), [products, loading, error]);
}

