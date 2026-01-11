"use client";

import React from 'react';
import { useCart } from '@/components/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQty, total, clear } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    if (items.length > 0) {
      router.push('/supermarket/checkout');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-black mb-2">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">Add items to your cart to get started</p>
            <Link
              href="/supermarket"
              className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-black">Cart Items ({items.length})</h2>
                  <button
                    onClick={clear}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                      <img
                        src={item.image }
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded"
                      />

                      <div className="flex-1">
                        <Link
                          href={`/supermarket/product/${item.id}`}
                          className="text-black font-semibold hover:text-orange-600 mb-1 block"
                        >
                          {item.name}
                        </Link>
                        {item.store && (
                          <p className="text-gray-500 text-sm capitalize mb-2">Store: {item.store}</p>
                        )}
                        <p className="text-orange-600 font-bold text-lg">NGN {item.price.toFixed(2)}</p>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100 text-black font-bold"
                          >
                            -
                          </button>
                          <span className="w-12 text-center text-black font-semibold">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            disabled={item.stock !== undefined && item.qty >= item.stock}
                            className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100 text-black font-bold disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>

                        <p className="text-black font-bold text-lg">
                          NGN {(item.price * item.qty).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/supermarket"
                className="inline-block text-orange-600 hover:text-orange-700 font-medium"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-bold text-black mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({items.reduce((sum, item) => sum + item.qty, 0)} items)</span>
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
                  onClick={handleCheckout}
                  className="w-full bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition-colors font-semibold text-lg mb-3"
                >
                  Proceed to Checkout
                </button>

                <div className="text-center text-sm text-gray-500">
                  <p>🔒 Secure Checkout</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
