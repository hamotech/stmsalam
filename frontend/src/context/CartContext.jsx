import React, { createContext, useContext, useState, useEffect } from 'react';

/** Exported for Checkout / diagnostics so `useContext` can avoid throwing when provider is absent. */
export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('stm_salam_cart');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      try {
        localStorage.removeItem('stm_salam_cart');
      } catch {
        /* ignore */
      }
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('stm_salam_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQty = (id, delta) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.qty + delta);
          return { ...item, qty: newQty };
        }
        return item;
      }).filter(item => item.qty > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, updateQty, clearCart, 
      subtotal, totalItems 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
