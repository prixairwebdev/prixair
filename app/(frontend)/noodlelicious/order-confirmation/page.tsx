import React from 'react';
import OrderConfirmationView from '@/components/checkout/OrderConfirmationView';

interface OrderConfirmationPageProps {
    searchParams: Promise<{
        orderId?: string;
    }>
}

export const dynamic = 'force-dynamic';

export default async function NoodleliciousOrderConfirmationPage({ searchParams }: OrderConfirmationPageProps) {
    const { orderId } = await searchParams;

    return (
        <OrderConfirmationView
            orderId={orderId}
            storeSlug="noodlelicious"
            storeName="Noodlelicious"
            primaryColorCls="bg-[#F3A35C] hover:bg-[#e2924a]"
            textColorCls="text-[#F3A35C]"
        />
    );
}
