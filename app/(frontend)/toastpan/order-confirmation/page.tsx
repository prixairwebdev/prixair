import React from 'react';
import OrderConfirmationView from '@/components/checkout/OrderConfirmationView';

interface OrderConfirmationPageProps {
    searchParams: Promise<{
        orderId?: string;
    }>
}

export const dynamic = 'force-dynamic';

export default async function ToastPanOrderConfirmationPage({ searchParams }: OrderConfirmationPageProps) {
    const { orderId } = await searchParams;

    return (
        <OrderConfirmationView
            orderId={orderId}
            storeSlug="toastpan"
            storeName="Toast Pan"
            primaryColorCls="bg-[#B5D04E] hover:bg-[#A3BC46]"
            textColorCls="text-[#B5D04E]"
        />
    );
}
