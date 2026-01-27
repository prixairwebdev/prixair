import React from 'react';
import OrderConfirmationView from '@/components/checkout/OrderConfirmationView';

interface OrderConfirmationPageProps {
    searchParams: Promise<{
        orderId?: string;
    }>
}

export const dynamic = 'force-dynamic';

export default async function PharmacyOrderConfirmationPage({ searchParams }: OrderConfirmationPageProps) {
    const { orderId } = await searchParams;

    return (
        <OrderConfirmationView
            orderId={orderId}
            storeSlug="pharmacy"
            storeName="Pharmacy"
            primaryColorCls="bg-[#8AD52E] hover:bg-[#a8dd67]"
            textColorCls="text-[#8AD52E]"
        />
    );
}
