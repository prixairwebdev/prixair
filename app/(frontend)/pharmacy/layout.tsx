"use client";

import React from 'react';
import { CartProvider } from '@/components/CartContext';
import { WishlistProvider } from '@/components/contexts/WishlistContext';
import PageWrapper from './components/PageWrapper';
import SubsidiaryBar from '@/app/(frontend)/components/SubsidiaryBar';

export default function PharmacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <SubsidiaryBar name="Prixair Pharmacy" color="#2d7a2d" />
        <div className="pt-9">
          <PageWrapper>
            {children}
          </PageWrapper>
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
