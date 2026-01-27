"use client";

import React, { Suspense } from 'react';
import CheckoutView from '@/components/checkout/CheckoutView';

export default function SupermarketCheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CheckoutView
        storeSlug="supermarket"
        storeName="Supermarket"
        primaryColorCls="bg-orange-500 hover:bg-orange-600 shadow-orange-100"
        textColorCls="text-orange-600"
        accentColorCls="border-orange-500 bg-orange-50"
      />
    </Suspense>
  );
}
