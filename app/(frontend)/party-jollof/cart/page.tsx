"use client";

import React from 'react';
import CartView from '@/components/cart/CartView';

export default function PartyJollofCartPage() {
    return (
        <CartView
            storeSlug="party-jollof"
            storeName="Party Jollof"
            primaryColorCls="bg-[#FF4500] hover:bg-[#e03d00]"
            textColorCls="text-[#FF4500]"
            continueShoppingPath="/party-jollof"
        />
    );
}
