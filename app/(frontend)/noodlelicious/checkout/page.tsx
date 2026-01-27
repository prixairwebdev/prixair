"use client";

import React, { Suspense } from 'react';
import CheckoutView from '@/components/checkout/CheckoutView';

export default function NoodleliciousCheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <CheckoutView
                storeSlug="noodlelicious"
                storeName="Noodlelicious"
                primaryColorCls="bg-[#F3A35C] hover:bg-[#e2924a] shadow-[#F3A35C]/10"
                textColorCls="text-[#F3A35C]"
                accentColorCls="border-[#F3A35C] bg-[#F3A35C]/5"
            />
        </Suspense>
    );
}
