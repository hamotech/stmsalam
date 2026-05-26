import {
  assertNoLegacyProductFields,
  assertProductVisibility,
} from './productDomainGuard.js';
import { safeProductQuery } from './firestoreQueryGuard.js';

export function toMillis(value) {
  if (!value) return 0;
  if (typeof value?.toMillis === 'function') return value.toMillis();
  const parsed = Date.parse(String(value));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function assertProductVisibilityContract(product) {
  const normalized = assertProductVisibility(product);
  assertNoLegacyProductFields(normalized);
  return normalized;
}

export function isProductAvailable(product, includeUnavailable = false) {
  const normalized = assertProductVisibilityContract(product);
  if (includeUnavailable) return true;
  return normalized?.available !== false;
}

/** Firestore may still contain legacy `active`; strip before contract so listeners never crash the UI. */
let warnedLegacyActiveStrip = false;

function stripLegacyActiveField(product) {
  if (!product || !Object.prototype.hasOwnProperty.call(product, 'active')) {
    return product;
  }
  if (!warnedLegacyActiveStrip) {
    console.warn(
      '[products] Ignoring legacy `active` on product documents. Visibility uses `available` only; remove `active` when convenient.'
    );
    warnedLegacyActiveStrip = true;
  }
  const { active: _legacyActive, ...rest } = product;
  return rest;
}

function isMissingIndexError(error) {
  const code = String(error?.code || '').toLowerCase();
  const msg = String(error?.message || '').toLowerCase();
  return code.includes('failed-precondition') || msg.includes('index');
}

function buildProductsQuery({ firestore, db, categoryId, orderByCreatedDesc, withOrderBy }) {
  return safeProductQuery(() => {
    const constraints = [];
    if (categoryId && categoryId !== 'all') {
      constraints.push(firestore.where('categoryId', '==', categoryId));
    }
    if (orderByCreatedDesc && withOrderBy) {
      constraints.push(firestore.orderBy('createdAt', 'desc'));
    }
    if (constraints.length) {
      return firestore.query(firestore.collection(db, 'products'), ...constraints);
    }
    return firestore.query(firestore.collection(db, 'products'));
  }, 'useProductsCore');
}

export function subscribeProductsSnapshot({
  firestore,
  db,
  categoryId,
  includeUnavailable = false,
  orderByCreatedDesc = true,
  onData,
  onError,
  onIndexWarning,
}) {
  let didFallback = false;
  let currentUnsub = () => {};

  const attach = (withOrderBy) => {
    currentUnsub();
    const q = buildProductsQuery({
      firestore,
      db,
      categoryId,
      orderByCreatedDesc,
      withOrderBy,
    });
    currentUnsub = firestore.onSnapshot(
      q,
      (snap) => {
        try {
          const next = snap.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .map((p) => stripLegacyActiveField(p))
            .map((p) => assertProductVisibilityContract(p))
            .filter((p) => isProductAvailable(p, includeUnavailable))
            .sort((a, b) => toMillis(b.createdAt) - toMillis(a.createdAt));
          onData(next);
        } catch (err) {
          console.error('[useProductsCore] snapshot processing error', err);
          onError?.(err instanceof Error ? err : new Error(String(err)));
        }
      },
      (err) => {
        if (!didFallback && withOrderBy && orderByCreatedDesc && isMissingIndexError(err)) {
          didFallback = true;
          onIndexWarning?.(err);
          attach(false);
          return;
        }
        onError?.(err);
      }
    );
  };

  attach(true);
  return () => currentUnsub();
}

