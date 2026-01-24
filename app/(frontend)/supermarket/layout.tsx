"use client";

import React from 'react';
import { CartProvider } from '@/components/CartContext';
import { AuthProvider } from '@/components/contexts/AuthContext';
import { WishlistProvider } from '@/components/contexts/WishlistContext';
import { OrderProvider } from '@/components/contexts/OrderContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

interface SupermarketLayoutProps {
  children: React.ReactNode;
  params?: Promise<Record<string, never>>;
}

export default function SupermarketLayout({ children }: SupermarketLayoutProps) {
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


