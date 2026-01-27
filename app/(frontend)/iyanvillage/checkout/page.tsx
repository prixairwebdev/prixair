"use client";

import React, { Suspense } from 'react';
import CheckoutView from '@/components/checkout/CheckoutView';

export default function IyanVillageCheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <CheckoutView
                storeSlug="iyanvillage"
                storeName="Iyan Village"
                primaryColorCls="bg-[#FE0000] hover:bg-[#e60000] shadow-[#FE0000]/10"
                textColorCls="text-[#FE0000]"
                accentColorCls="border-[#FE0000] bg-[#FE0000]/5"
            />
        </Suspense>
    );
}
