import React from 'react';
import OrderConfirmationView from '@/components/checkout/OrderConfirmationView';

interface OrderConfirmationPageProps {
    searchParams: Promise<{
        orderId?: string;
    }>
}

export const dynamic = 'force-dynamic';

export default async function PartyJollofOrderConfirmationPage({ searchParams }: OrderConfirmationPageProps) {
    const { orderId } = await searchParams;

    return (
        <OrderConfirmationView
            orderId={orderId}
            storeSlug="party-jollof"
            storeName="Party Jollof"
            primaryColorCls="bg-[#FF4500] hover:bg-[#e03d00]"
            textColorCls="text-[#FF4500]"
        />
    );
}
