"use client";

import React, { Suspense } from 'react';
import CheckoutView from '@/components/checkout/CheckoutView';

export default function ShawarmaNomnowCheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <CheckoutView
                storeSlug="shawarmanomnow"
                storeName="Shawarma Now Now"
                primaryColorCls="bg-[#F5A623] hover:bg-[#e0951f] shadow-[#F5A623]/10"
                textColorCls="text-[#F5A623]"
                accentColorCls="border-[#F5A623] bg-[#F5A623]/5"
            />
        </Suspense>
    );
}
