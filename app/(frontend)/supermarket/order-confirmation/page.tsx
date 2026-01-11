
import React from 'react';
import Link from 'next/link';
import { getOrder } from '@/app/actions/orders';

interface OrderConfirmationPageProps {
  searchParams: Promise<{
    orderId?: string;
  }>
}

export const dynamic = 'force-dynamic';

export default async function OrderConfirmationPage({ searchParams }: OrderConfirmationPageProps) {
  const { orderId } = await searchParams;
  const order = orderId ? await getOrder(orderId) : null;

  if (!order) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black mb-4">Order Not Found</h1>
          <Link href="/supermarket" className="text-orange-600 hover:text-orange-700">
            ← Back to Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Cast things appropriately or handle potential type mismatches from Payload return
  const items = order.items as any[];
  const shippingAddress = order.shippingAddress as any;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center mb-6">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-black mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-4">Thank you for your purchase</p>
          <p className="text-lg text-black">
            Order Number: <span className="font-bold text-orange-600">{order.id}</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">Reference: {order.paymentReference}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-black mb-4">Order Details</h2>

          <div className="space-y-3 mb-4">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 pb-3 border-b border-gray-200 last:border-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-black font-medium">{item.name}</h3>
                  <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                </div>
                <p className="text-black font-semibold">NGN {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span className="text-black">Total Paid:</span>
              <span className="text-orange-600">NGN {order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-black mb-4">Shipping Information</h2>
          <div className="text-gray-700">
            <p className="font-semibold text-black">{shippingAddress.name}</p>
            <p>{shippingAddress.phone}</p>
            <p>{shippingAddress.street}</p>
            <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
            <p>{shippingAddress.country}</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-black font-semibold mb-2">📦 What's Next?</h3>
          <ul className="text-gray-700 text-sm space-y-1">
            <li>• You'll receive an email confirmation shortly</li>
            <li>• We'll notify you when your order ships</li>
            <li>• Track your order in your account</li>
            <li>• Estimated delivery: 3-5 business days</li>
          </ul>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/supermarket/account/orders"
            className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
          >
            View My Orders
          </Link>
          <Link
            href="/supermarket"
            className="bg-gray-200 text-black px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
