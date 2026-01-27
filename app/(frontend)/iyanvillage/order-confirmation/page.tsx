import React from 'react';
import OrderConfirmationView from '@/components/checkout/OrderConfirmationView';

interface OrderConfirmationPageProps {
    searchParams: Promise<{
        orderId?: string;
    }>
}

export const dynamic = 'force-dynamic';

export default async function IyanVillageOrderConfirmationPage({ searchParams }: OrderConfirmationPageProps) {
    const { orderId } = await searchParams;

    return (
        <OrderConfirmationView
            orderId={orderId}
            storeSlug="iyanvillage"
            storeName="Iyan Village"
            primaryColorCls="bg-[#FE0000] hover:bg-[#e60000]"
            textColorCls="text-[#FE0000]"
        />
    );
}
