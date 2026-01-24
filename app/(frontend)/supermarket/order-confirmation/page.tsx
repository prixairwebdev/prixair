import React from 'react';
import OrderConfirmationView from '@/components/checkout/OrderConfirmationView';

interface OrderConfirmationPageProps {
  searchParams: Promise<{
    orderId?: string;
  }>
}

export const dynamic = 'force-dynamic';

export default async function SupermarketOrderConfirmationPage({ searchParams }: OrderConfirmationPageProps) {
  const { orderId } = await searchParams;

  return (
    <OrderConfirmationView
      orderId={orderId}
      storeSlug="supermarket"
      storeName="Supermarket"
      primaryColorCls="bg-orange-500 hover:bg-orange-600"
      textColorCls="text-orange-600"
    />
  );
}
