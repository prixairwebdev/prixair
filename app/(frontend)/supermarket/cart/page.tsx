"use client";

import React from 'react';
import CartView from '@/components/cart/CartView';

export default function SupermarketCartPage() {
  return (
    <CartView
      storeSlug="supermarket"
      storeName="Supermarket"
      primaryColorCls="bg-orange-500 hover:bg-orange-600"
      textColorCls="text-orange-600"
    />
  );
}
