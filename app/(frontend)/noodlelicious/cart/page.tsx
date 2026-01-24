"use client";

import React from 'react';
import CartView from '@/components/cart/CartView';

export default function NoodleliciousCartPage() {
    return (
        <CartView
            storeSlug="noodlelicious"
            storeName="Noodlelicious"
            primaryColorCls="bg-[#F3A35C] hover:bg-[#e2924a]"
            textColorCls="text-[#F3A35C]"
            continueShoppingPath="/noodlelicious/menu"
        />
    );
}
