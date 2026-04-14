import React from 'react';
import OrderConfirmationView from '@/components/checkout/OrderConfirmationView';

interface OrderConfirmationPageProps {
    searchParams: Promise<{
        orderId?: string;
    }>
}

export const dynamic = 'force-dynamic';

export default async function ShawarmaNomnowOrderConfirmationPage({ searchParams }: OrderConfirmationPageProps) {
    const { orderId } = await searchParams;

    return (
        <OrderConfirmationView
            orderId={orderId}
            storeSlug="shawarmanomnow"
            storeName="Shawarma Now Now"
            primaryColorCls="bg-[#F5A623] hover:bg-[#e0951f]"
            textColorCls="text-[#F5A623]"
        />
    );
}
