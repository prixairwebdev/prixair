"use client";

import React from 'react';
import CartView from '@/components/cart/CartView';

export default function SeasideCartPage() {
    return (
        <CartView
            storeSlug="seaside"
            storeName="Seaside Restaurant"
            primaryColorCls="bg-[#0077CC] hover:bg-[#005FA3]"
            textColorCls="text-[#0077CC]"
            continueShoppingPath="/seaside"
        />
    );
}
