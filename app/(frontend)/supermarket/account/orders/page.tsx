"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '../../contexts/AuthContext';
import { useOrders } from '../../contexts/OrderContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OrdersPage() {
  const { user } = useAuth();
  const { orders } = useOrders();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/supermarket/account/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const userOrders = orders.filter(order => order.userId === user.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/supermarket/account" className="text-orange-600 hover:text-orange-700">
            ← Back to Account
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-black mb-2">My Orders</h1>
          <p className="text-gray-600">View and track all your orders</p>
        </div>

        {userOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-black mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
            <Link
              href="/supermarket"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {userOrders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-black">Order #{order.id}</h3>
                    <p className="text-gray-500 text-sm">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="space-y-3">
                    {order.items.map((item, idx) => {
                      return (
                        <div key={idx} className="flex items-center gap-4">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="object-cover rounded"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="text-black font-medium">{item.name}</h4>
                            <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                          </div>
                          <p className="text-black font-semibold">NGN {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Store:</span>
                    <span className="text-black font-medium capitalize">
                      {typeof order.store === 'string' ? order.store : (order.store as any)?.name || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="text-black font-medium">
                      {order.paymentMethod === 'paypal' ? 'PayPal' : order.paymentMethod === 'paystack' ? 'Paystack' : 'Card'}
                    </span>
                  </div>
                  {order.trackingNumber && (
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Tracking Number:</span>
                      <span className="text-black font-medium">{order.trackingNumber}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span className="text-black">Total:</span>
                    <span className="text-orange-600">NGN {order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-black font-semibold mb-2">Shipping Address:</h4>
                  <p className="text-gray-700 text-sm">{order.shippingAddress.name}</p>
                  <p className="text-gray-700 text-sm">{order.shippingAddress.street}</p>
                  <p className="text-gray-700 text-sm">
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                </div>

                <div className="mt-4 flex gap-3">
                  {order.status === 'delivered' && (
                    <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                      Reorder
                    </button>
                  )}
                  {order.trackingNumber && (
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      Track Order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
