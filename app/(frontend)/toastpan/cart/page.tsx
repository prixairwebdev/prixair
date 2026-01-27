"use client";

import React from 'react';
import CartView from '@/components/cart/CartView';

export default function ToastPanCartPage() {
    return (
        <CartView
            storeSlug="toastpan"
            storeName="Toast Pan"
            primaryColorCls="bg-[#B5D04E] hover:bg-[#A3BC46]"
            textColorCls="text-[#B5D04E]"
            continueShoppingPath="/toastpan/products"
        />
    );
}
