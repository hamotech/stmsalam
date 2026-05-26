import { useEffect, useMemo, useState } from 'react';
import * as firestore from 'firebase/firestore';
import { db } from '../lib/firebase';
import { subscribeProductsSnapshot } from '../../../shared/useProductsCore.js';

export function useProducts({ category = null, includeUnavailable = false, orderByCreatedDesc = true } = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const unsub = subscribeProductsSnapshot({
      firestore,
      db,
      categoryId: category,
      includeUnavailable,
      orderByCreatedDesc,
      onData: (next) => {
        setProducts(next);
        setLoading(false);
      },
      onError: (err) => {
        console.error('[useProducts] snapshot error:', err);
        setError(err);
        setLoading(false);
      },
      onIndexWarning: (err) => {
        console.warn(
          '[useProducts] Missing index for products query (categoryId + createdAt). Falling back to unordered listener.',
          err
        );
      },
    });
    return () => unsub();
  }, [category, includeUnavailable, orderByCreatedDesc]);

  return useMemo(() => ({ products, loading, error }), [products, loading, error]);
}

