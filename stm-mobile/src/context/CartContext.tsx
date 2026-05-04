import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/src/context/AuthContext';
import { sanitizeCartOptions, type ProductLike } from '@/src/utils/productOptionsEngine';

const STORAGE_KEY_BASE = 'stm_mobile_cart_v1';

/** Payload when adding a line — optional classification for order-time sanitization. */
export type AddToCartProduct = {
  id: string;
  name: string;
  price: number;
  image?: string;
  type?: string;
  category?: string;
};

export type CartLineOptions = {
  size?: string;
  sugar?: string;
  ice?: string;
  /** Dessert / pack-style choice from smart options (distinct from line `qty`). */
  quantity?: string;
  addons?: string[];
};

export type CartLine = {
  variantKey: string;
  productId: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
  options?: CartLineOptions;
  /** Base product title (unformatted); improves reorder / Firestore name rebuild. */
  catalogName?: string;
  productType?: string;
  productCategory?: string;
};

function makeVariantKey(productId: string, options?: CartLineOptions): string {
  if (!options || !Object.keys(options).length) return productId;
  const normalized = {
    size: options.size,
    sugar: options.sugar,
    ice: options.ice,
    quantity: options.quantity,
    addons: options.addons?.length ? [...options.addons].sort() : undefined,
  };
  return `${productId}:${JSON.stringify(normalized)}`;
}

/** Grab-style: `Burger (Large) + Cheese` — size in parens, addons with ` + `. */
function formatLineName(name: string, options?: CartLineOptions): string {
  if (!options) return name;
  const addons = options.addons?.filter(Boolean) ?? [];
  const drinkBits: string[] = [];
  if (options.ice) drinkBits.push(options.ice);
  if (options.sugar) drinkBits.push(options.sugar);
  if (options.quantity) drinkBits.push(options.quantity);

  if (options.size) {
    const tail = addons.length ? ` + ${addons.join(' + ')}` : '';
    return `${name} (${options.size})${tail}`;
  }
  if (addons.length) {
    return `${name} + ${addons.join(' + ')}`;
  }
  if (drinkBits.length) {
    return `${name} (${drinkBits.join(' · ')})`;
  }
  return name;
}

function lineCatalogTitle(l: CartLine): string {
  if (l.catalogName?.trim()) return l.catalogName.trim();
  const i = l.name.indexOf(' (');
  return i > 0 ? l.name.slice(0, i).trim() : l.name;
}

type CartContextValue = {
  lines: CartLine[];
  loaded: boolean;
  addProduct: (p: AddToCartProduct, qty?: number, options?: CartLineOptions) => void;
  setQty: (variantKey: string, qty: number) => void;
  remove: (variantKey: string) => void;
  clear: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

function normalizeLoaded(lines: CartLine[]): CartLine[] {
  return lines.map((x) => ({
    ...x,
    variantKey: x.variantKey || x.productId,
  }));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [lines, setLines] = useState<CartLine[]>([]);
  const [loaded, setLoaded] = useState(false);
  const storageKey = useMemo(
    () => (user?.uid ? `${STORAGE_KEY_BASE}_u_${user.uid}` : `${STORAGE_KEY_BASE}_guest`),
    [user?.uid]
  );

  useEffect(() => {
    let cancelled = false;
    setLoaded(false);
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(storageKey);
        if (cancelled) return;
        if (raw) {
          const parsed = JSON.parse(raw) as CartLine[];
          if (Array.isArray(parsed)) setLines(normalizeLoaded(parsed));
        } else {
          setLines([]);
        }
      } catch {
        /* ignore */
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try {
        await AsyncStorage.setItem(storageKey, JSON.stringify(lines));
      } catch {
        /* ignore */
      }
    })();
  }, [lines, loaded, storageKey]);

  const addProduct = useCallback((p: AddToCartProduct, qty = 1, options?: CartLineOptions) => {
    const q = Math.max(1, Math.floor(qty));
    const productLike: ProductLike = {
      name: p.name,
      type: p.type,
      category: p.category,
    };
    const safeOptions = options ? sanitizeCartOptions(productLike, options) : undefined;
    const variantKey = makeVariantKey(p.id, safeOptions);
    const displayName = formatLineName(p.name, safeOptions);
    setLines((prev) => {
      const i = prev.findIndex((x) => x.variantKey === variantKey);
      if (i === -1) {
        return [
          ...prev,
          {
            variantKey,
            productId: p.id,
            name: displayName,
            price: p.price,
            qty: q,
            image: p.image,
            options: safeOptions,
            catalogName: p.name,
            productType: p.type,
            productCategory: p.category,
          },
        ];
      }
      const next = [...prev];
      next[i] = { ...next[i], qty: next[i].qty + q };
      return next;
    });
  }, []);

  const setQty = useCallback((variantKey: string, qty: number) => {
    const q = Math.floor(qty);
    if (q < 1) {
      setLines((prev) => prev.filter((x) => x.variantKey !== variantKey));
      return;
    }
    setLines((prev) =>
      prev.map((x) => (x.variantKey === variantKey ? { ...x, qty: q } : x))
    );
  }, []);

  const remove = useCallback((variantKey: string) => {
    setLines((prev) => prev.filter((x) => x.variantKey !== variantKey));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const itemCount = useMemo(() => lines.reduce((s, x) => s + x.qty, 0), [lines]);
  const subtotal = useMemo(
    () => lines.reduce((s, x) => s + x.price * x.qty, 0),
    [lines]
  );

  const value = useMemo(
    () => ({
      lines,
      loaded,
      addProduct,
      setQty,
      remove,
      clear,
      itemCount,
      subtotal,
    }),
    [lines, loaded, addProduct, setQty, remove, clear, itemCount, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

/** Map cart lines to Firestore order items — final sanitize so payloads stay clean even for legacy lines. */
export function cartLinesToOrderItems(lines: CartLine[]): { name: string; qty: number; price: number }[] {
  return lines.map((l) => {
    const base = lineCatalogTitle(l);
    const pl: ProductLike = {
      name: base,
      type: l.productType,
      category: l.productCategory,
    };
    const safeOpts = l.options ? sanitizeCartOptions(pl, l.options) : undefined;
    const displayName = formatLineName(base, safeOpts);
    return { name: displayName, qty: l.qty, price: l.price };
  });
}
