"use client";

import React from 'react';
import CartView from '@/components/cart/CartView';

export default function IyanVillageCartPage() {
    return (
        <CartView
            storeSlug="iyanvillage"
            storeName="Iyan Village"
            primaryColorCls="bg-[#FE0000] hover:bg-[#e60000]"
            textColorCls="text-[#FE0000]"
            continueShoppingPath="/iyanvillage"
        />
    );
}
