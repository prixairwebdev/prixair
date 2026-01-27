"use client";

import React from 'react';
import CartView from '@/components/cart/CartView';

export default function GaviCartPage() {
    return (
        <CartView
            storeSlug="gavi"
            storeName="GAVI Bakery"
            primaryColorCls="bg-[#373435] hover:bg-[#2a2829]"
            textColorCls="text-[#373435]"
            continueShoppingPath="/gavi"
        />
    );
}
