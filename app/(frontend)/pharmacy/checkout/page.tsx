"use client";

import React, { Suspense } from 'react';
import CheckoutView from '@/components/checkout/CheckoutView';

export default function PharmacyCheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <CheckoutView
                storeSlug="pharmacy"
                storeName="Pharmacy"
                primaryColorCls="bg-[#8AD52E] hover:bg-[#a8dd67] shadow-[#8AD52E]/10"
                textColorCls="text-[#8AD52E]"
                accentColorCls="border-[#8AD52E] bg-[#8AD52E]/5"
            />
        </Suspense>
    );
}
