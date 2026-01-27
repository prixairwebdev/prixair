"use client";

import React, { Suspense } from 'react';
import CheckoutView from '@/components/checkout/CheckoutView';

export default function GaviCheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <CheckoutView
                storeSlug="gavi"
                storeName="GAVI Bakery"
                primaryColorCls="bg-[#373435] hover:bg-[#2a2829] shadow-[#373435]/10"
                textColorCls="text-[#373435]"
                accentColorCls="border-[#373435] bg-[#373435]/5"
            />
        </Suspense>
    );
}
