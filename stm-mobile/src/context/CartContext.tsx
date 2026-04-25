/**
 * Cart — mirrors web CartContext (`stm_salam_cart` key). Web API: addToCart, removeFromCart, updateQty, clearCart.
 * Aliases addItem/removeItem provided for naming parity with product specs.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'stm_salam_cart';

/** Line shape aligned with web cart rows (product fields + qty). */
export type CartProduct = {
  id: string;
  name: string;
  price: number;
  img?: string;
  image?: string;
  categoryId?: string;
  description?: string;
  badge?: string;
  qty: number;
};

type CartContextValue = {
  cartItems: CartProduct[];
  /** Web naming */
  isCartReady: boolean;
  addToCart: (product: Omit<CartProduct, 'qty'> & { qty?: number }) => void;
  /** Alias === addToCart */
  addItem: (product: Omit<CartProduct, 'qty'> & { qty?: number }) => void;
  removeFromCart: (id: string) => void;
  /** Alias === removeFromCart */
  removeItem: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
};

const CartContext = createContext<CartContextValue | null>(null);

/** Strip invalid rows so AsyncStorage corruption cannot crash the app (web JSON.parse is equally fragile). */
function sanitizeCartRows(raw: unknown): CartProduct[] {
  if (!Array.isArray(raw)) return [];
  const out: CartProduct[] = [];
  for (const row of raw) {
    if (!row || typeof row !== 'object') continue;
    const r = row as Record<string, unknown>;
    const id = String(r.id ?? '');
    const name = String(r.name ?? 'Item');
    const price = Number(r.price);
    const qty = Math.max(0, Math.floor(Number(r.qty ?? 0)));
    if (!id || qty <= 0 || !Number.isFinite(price)) continue;
    out.push({
      id,
      name,
      price,
      qty,
      img: r.img != null ? String(r.img) : undefined,
      image: r.image != null ? String(r.image) : undefined,
      categoryId: r.categoryId != null ? String(r.categoryId) : undefined,
      description: r.description != null ? String(r.description) : undefined,
      badge: r.badge != null ? String(r.badge) : undefined,
    });
  }
  return out;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!alive) return;
        if (raw) {
          try {
            const parsed = JSON.parse(raw) as unknown;
            setCartItems(sanitizeCartRows(parsed));
          } catch {
            setCartItems([]);
          }
        }
      } finally {
        if (alive) setHydrated(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Never persist until hydration finished — avoids clobbering disk with initial [].
  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems)).catch(() => {});
  }, [cartItems, hydrated]);

  const addToCart = useCallback((product: Omit<CartProduct, 'qty'> & { qty?: number }) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      const add = product.qty ?? 1;
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + add } : item
        );
      }
      const { qty: _q, ...rest } = product;
      return [...prev, { ...rest, qty: add }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQty = useCallback((id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;
          const next = Math.max(0, item.qty + delta);
          return { ...item, qty: next };
        })
        .filter((item) => item.qty > 0)
    );
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    const q = Math.max(0, Math.floor(qty));
    setCartItems((prev) =>
      q === 0 ? prev.filter((item) => item.id !== id) : prev.map((item) => (item.id === id ? { ...item, qty: q } : item))
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + Number(item.price) * item.qty, 0),
    [cartItems]
  );
  const totalItems = useMemo(() => cartItems.reduce((sum, item) => sum + item.qty, 0), [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      isCartReady: hydrated,
      addToCart,
      addItem: addToCart,
      removeFromCart,
      removeItem: removeFromCart,
      updateQty,
      setQty,
      clearCart,
      subtotal,
      totalItems,
    }),
    [cartItems, hydrated, addToCart, removeFromCart, updateQty, setQty, clearCart, subtotal, totalItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
