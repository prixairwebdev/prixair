"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
  stock?: number;
  store?: 'supermarket' | 'bakery' | 'pharmacy';
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  total: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("prixair_cart");
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to load cart from local storage", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("prixair_cart", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to local storage", e);
    }
  }, [items, isInitialized]);

  const addItem = (item: CartItem, qty = 1) => {
    setItems((cur) => {
      const exists = cur.find((i) => i.id === item.id);
      if (exists) {
        return cur.map((i) => (i.id === item.id ? { ...i, qty: Math.min((i.qty || 0) + qty, item.stock ?? 9999) } : i));
      }
      return [...cur, { ...item, qty }];
    });
  };

  const removeItem = (id: string) => setItems((cur) => cur.filter((i) => i.id !== id));

  const updateQty = (id: string, qty: number) =>
    setItems((cur) => cur.map((i) => (i.id === id ? { ...i, qty: Math.max(0, qty) } : i)).filter((i) => i.qty > 0));

  const clear = () => setItems([]);

  const total = () => items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clear, total }}>
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
