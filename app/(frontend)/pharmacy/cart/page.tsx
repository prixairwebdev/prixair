"use client";

import React from 'react';
import CartView from '@/components/cart/CartView';

export default function PharmacyCartPage() {
    return (
        <CartView
            storeSlug="pharmacy"
            storeName="Pharmacy"
            primaryColorCls="bg-[#8AD52E] hover:bg-[#a8dd67]"
            textColorCls="text-[#8AD52E]"
            continueShoppingPath="/pharmacy/products"
        />
    );
}
