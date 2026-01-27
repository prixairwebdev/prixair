"use client";

import React, { Suspense } from 'react';
import CheckoutView from '@/components/checkout/CheckoutView';

export default function BukaCheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <CheckoutView
                storeSlug="buka"
                storeName="Prixair Buka"
                primaryColorCls="bg-[#FE0000] hover:bg-[#D90000] shadow-[#FE0000]/10"
                textColorCls="text-[#FE0000]"
                accentColorCls="border-[#FE0000] bg-[#FE0000]/5"
            />
        </Suspense>
    );
}
