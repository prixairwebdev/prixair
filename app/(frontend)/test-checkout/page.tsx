"use client";

import React, { Suspense } from 'react';
import CheckoutView from '@/components/checkout/CheckoutView';

export default function TestCheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <CheckoutView
                storeSlug="toastpan"
                storeName="Toast Pan"
                primaryColorCls="bg-[#B5D04E] hover:bg-[#A3BC46] shadow-[#B5D04E]/20"
                textColorCls="text-[#B5D04E]"
                accentColorCls="border-[#B5D04E] bg-[#B5D04E]/5"
            />
        </Suspense>
    );
}
