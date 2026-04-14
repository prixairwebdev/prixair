"use client";

import React, { Suspense } from 'react';
import CheckoutView from '@/components/checkout/CheckoutView';

export default function PartyJollofCheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <CheckoutView
                storeSlug="party-jollof"
                storeName="Party Jollof"
                primaryColorCls="bg-[#FF4500] hover:bg-[#FF6A1F] shadow-[#FF4500]/20"
                textColorCls="text-[#FF4500]"
                accentColorCls="border-[#FF4500] bg-[#FF4500]/10"
            />
        </Suspense>
    );
}
