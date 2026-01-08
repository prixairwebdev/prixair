"use client";

import React, { useState } from 'react';
import { useCart } from '../../../components/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useOrders } from '../contexts/OrderContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { dummyAddresses } from '../data/dummy-data';
import { Address } from '../types/types';

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(
    dummyAddresses.find(addr => addr.isDefault && addr.userId === user?.id) || null
  );
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'card'>('paypal');
  const [processing, setProcessing] = useState(false);

  if (!user) {
    router.push('/supermarket/account/login');
    return null;
  }

  if (items.length === 0) {
    router.push('/supermarket/cart');
    return null;
  }

  const userAddresses = dummyAddresses.filter(addr => addr.userId === user.id);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert('Please select a shipping address');
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const order = createOrder({
      userId: user.id,
      items: items.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.qty,
        image: item.image,
      })),
      total: total(),
      status: 'processing',
      shippingAddress: selectedAddress,
      paymentMethod,
    });

    clear();
    router.push(`/supermarket/order-confirmation?orderId=${order.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-black mb-4">Shipping Address</h2>
              
              {userAddresses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No saved addresses</p>
                  <Link
                    href="/supermarket/account/addresses"
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Add Address →
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {userAddresses.map(address => (
                    <div
                      key={address.id}
                      onClick={() => setSelectedAddress(address)}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedAddress?.id === address.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-black font-semibold">{address.name}</h3>
                          <p className="text-gray-700 text-sm">{address.phone}</p>
                          <p className="text-gray-700 text-sm">{address.street}</p>
                          <p className="text-gray-700 text-sm">
                            {address.city}, {address.state} {address.zipCode}
                          </p>
                        </div>
                        {address.isDefault && (
                          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-black mb-4">Payment Method</h2>
              
              <div className="space-y-3">
                <div
                  onClick={() => setPaymentMethod('paypal')}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'paypal'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">💳</div>
                    <div>
                      <h3 className="text-black font-semibold">PayPal</h3>
                      <p className="text-gray-600 text-sm">Pay with your PayPal account</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">💳</div>
                    <div>
                      <h3 className="text-black font-semibold">Credit/Debit Card</h3>
                      <p className="text-gray-600 text-sm">Pay with your card</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>Demo Mode:</strong> Payment integration will be connected to your PayPal account later.
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold text-black mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image || '/img/foodimg/placeholder.png'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-black font-medium text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-gray-500 text-xs">Qty: {item.qty}</p>
                      <p className="text-orange-600 font-semibold text-sm">
                        NGN {(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>NGN {total().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>NGN 0.00</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-black">Total</span>
                  <span className="text-orange-600">NGN {total().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={processing || !selectedAddress}
                className="w-full bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-semibold text-lg mb-3"
              >
                {processing ? 'Processing...' : 'Place Order'}
              </button>

              <div className="text-center text-sm text-gray-500">
                <p>🔒 Secure Checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
