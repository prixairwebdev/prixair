"use client";

import React, { Suspense } from 'react';
import OrderConfirmationView from '@/components/checkout/OrderConfirmationView';

export default function SeasideOrderConfirmationPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <OrderConfirmationView
                storeSlug="seaside"
                storeName="Seaside Restaurant"
                primaryColorCls="bg-[#0077CC]"
                textColorCls="text-[#0077CC]"
            />
        </Suspense>
    );
}
