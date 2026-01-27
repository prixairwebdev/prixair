"use client";

import React from 'react';
import { CartProvider } from '@/components/CartContext';
import { WishlistProvider } from '@/components/contexts/WishlistContext';

export default function PharmacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        {children}
      </WishlistProvider>
    </CartProvider>
  );
}