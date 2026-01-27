import React from 'react';
import OrderConfirmationView from '@/components/checkout/OrderConfirmationView';

interface OrderConfirmationPageProps {
    searchParams: Promise<{
        orderId?: string;
    }>
}

export const dynamic = 'force-dynamic';

export default async function BukaOrderConfirmationPage({ searchParams }: OrderConfirmationPageProps) {
    const { orderId } = await searchParams;

    return (
        <OrderConfirmationView
            orderId={orderId}
            storeSlug="buka"
            storeName="Prixair Buka"
            primaryColorCls="bg-[#FE0000] hover:bg-[#D90000]"
            textColorCls="text-[#FE0000]"
        />
    );
}
