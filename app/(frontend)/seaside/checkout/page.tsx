"use client";

import React, { Suspense } from 'react';
import CheckoutView from '@/components/checkout/CheckoutView';

export default function SeasideCheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <CheckoutView
                storeSlug="seaside"
                storeName="Seaside Restaurant"
                primaryColorCls="bg-[#0077CC] hover:bg-[#005FA3] shadow-[#0077CC]/10"
                textColorCls="text-[#0077CC]"
                accentColorCls="border-[#0077CC] bg-[#0077CC]/5"
            />
        </Suspense>
    );
}
