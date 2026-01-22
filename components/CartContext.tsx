"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
  stock?: number;
  store: 'supermarket' | 'bakery' | 'pharmacy' | 'noodlelicious' | 'toastpan' | 'gavi';
};

// Store items as a record where keys are store slugs
export type CartState = Record<string, CartItem[]>;

type CartContextType = {
  carts: CartState;
  addItem: (item: CartItem, qty?: number) => void;
  removeItem: (id: string, store: string) => void;
  updateQty: (id: string, store: string, qty: number) => void;
  clear: (store: string) => void;
  getCartItems: (store: string) => CartItem[];
  getCartTotal: (store: string) => number;
  getAllCartsTotal: () => number;
  getCartCount: (store: string) => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [carts, setCarts] = useState<CartState>({});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("prixair_carts_v2");
      if (raw) {
        setCarts(JSON.parse(raw));
      } else {
        // Migration from old cart if exists
        const oldRaw = localStorage.getItem("prixair_cart");
        if (oldRaw) {
          const oldItems = JSON.parse(oldRaw) as CartItem[];
          const migrated: CartState = {};
          oldItems.forEach(item => {
            const store = item.store || 'supermarket';
            if (!migrated[store]) migrated[store] = [];
            migrated[store].push({ ...item, store: store as any });
          });
          setCarts(migrated);
        }
      }
    } catch (e) {
      console.error("Failed to load cart from local storage", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("prixair_carts_v2", JSON.stringify(carts));
    } catch (e) {
      console.error("Failed to save cart to local storage", e);
    }
  }, [carts, isInitialized]);

  const addItem = (item: CartItem, qty = 1) => {
    const store = item.store;
    setCarts((cur) => {
      const storeItems = cur[store] || [];
      const exists = storeItems.find((i) => i.id === item.id);

      let newStoreItems;
      if (exists) {
        newStoreItems = storeItems.map((i) =>
          i.id === item.id ? { ...i, qty: Math.min((i.qty || 0) + qty, item.stock ?? 9999) } : i
        );
      } else {
        newStoreItems = [...storeItems, { ...item, qty }];
      }

      return { ...cur, [store]: newStoreItems };
    });
  };

  const removeItem = (id: string, store: string) => {
    setCarts((cur) => {
      const storeItems = cur[store] || [];
      return { ...cur, [store]: storeItems.filter((i) => i.id !== id) };
    });
  };

  const updateQty = (id: string, store: string, qty: number) => {
    setCarts((cur) => {
      const storeItems = cur[store] || [];
      const newStoreItems = storeItems
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, qty) } : i))
        .filter((i) => i.qty > 0);
      return { ...cur, [store]: newStoreItems };
    });
  };

  const clear = (store: string) => {
    setCarts((cur) => ({ ...cur, [store]: [] }));
  };

  const getCartItems = (store: string) => carts[store] || [];

  const getCartTotal = (store: string) => {
    const items = carts[store] || [];
    return items.reduce((s, i) => s + i.price * i.qty, 0);
  };

  const getAllCartsTotal = () => {
    return Object.values(carts).flat().reduce((s, i) => s + i.price * i.qty, 0);
  };

  const getCartCount = (store: string) => {
    const items = carts[store] || [];
    return items.reduce((sum, item) => sum + item.qty, 0);
  };

  return (
    <CartContext.Provider value={{
      carts,
      addItem,
      removeItem,
      updateQty,
      clear,
      getCartItems,
      getCartTotal,
      getAllCartsTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export default CartContext;
