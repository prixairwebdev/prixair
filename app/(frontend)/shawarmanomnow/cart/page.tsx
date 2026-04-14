"use client";

import React from 'react';
import CartView from '@/components/cart/CartView';

export default function ShawarmaNomnowCartPage() {
    return (
        <CartView
            storeSlug="shawarmanomnow"
            storeName="Shawarma Now Now"
            primaryColorCls="bg-[#F5A623] hover:bg-[#e0951f]"
            textColorCls="text-[#F5A623]"
            continueShoppingPath="/shawarmanomnow"
        />
    );
}
