"use client";

import React from 'react';
import { CartProvider } from '@/components/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { OrderProvider } from './contexts/OrderContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

export default function SupermarketLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <OrderProvider>
            <div className="min-h-screen flex flex-col bg-white">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </OrderProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}


