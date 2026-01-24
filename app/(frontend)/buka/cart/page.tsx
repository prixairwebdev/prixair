"use client";

import React from 'react';
import CartView from '@/components/cart/CartView';

export default function BukaCartPage() {
    return (
        <CartView
            storeSlug="buka"
            storeName="Prixair Buka"
            primaryColorCls="bg-[#FE0000] hover:bg-[#D90000]"
            textColorCls="text-[#FE0000]"
            continueShoppingPath="/buka"
        />
    );
}
