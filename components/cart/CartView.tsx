"use client";

import React, { useMemo } from 'react';
import { useCart } from '@/components/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface CartViewProps {
    storeSlug: string;
    storeName: string;
    primaryColorCls?: string; // e.g., "bg-orange-500 hover:bg-orange-600"
    textColorCls?: string; // e.g., "text-orange-600"
    checkoutPath?: string;
    continueShoppingPath?: string;
}

export default function CartView({
    storeSlug,
    storeName,
    primaryColorCls = "bg-orange-500 hover:bg-orange-600",
    textColorCls = "text-orange-600",
    checkoutPath,
    continueShoppingPath = `/${storeSlug}`,
}: CartViewProps) {
    const { carts, removeItem, updateQty, getCartTotal, clear, getCartItems } = useCart();
    const router = useRouter();

    const items = useMemo(() => getCartItems(storeSlug), [getCartItems, storeSlug]);
    const hasItems = items.length > 0;
    const total = getCartTotal(storeSlug);

    const resolvedCheckoutPath = checkoutPath || `/${storeSlug}/checkout`;

    const handleCheckout = () => {
        router.push(resolvedCheckoutPath);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-black mb-8">
                    {storeName} Cart
                </h1>

                {!hasItems ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <div className="text-6xl mb-4">🛒</div>
                        <h2 className="text-2xl font-bold text-black mb-2">Your Cart is Empty</h2>
                        <p className="text-gray-600 mb-6">Add items to your cart to get started</p>
                        <Link
                            href={continueShoppingPath}
                            className={`inline-block text-white px-8 py-3 rounded-lg transition-colors font-semibold ${primaryColorCls}`}
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                                <div className="flex items-center justify-between mb-4 border-b pb-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-black capitalize">{storeName} Items</h2>
                                        <p className="text-gray-500 text-sm">{items.length} items</p>
                                    </div>
                                    <button
                                        onClick={() => clear(storeSlug)}
                                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                                    >
                                        Clear Cart
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                                            <div className="relative w-24 h-24 flex-shrink-0">
                                                <Image
                                                    src={item.image || '/placeholder.png'}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover rounded-xl"
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <Link
                                                    href={`/${storeSlug}/products/${item.id}`}
                                                    className={`text-black font-semibold hover:${textColorCls} mb-1 block truncate text-lg`}
                                                >
                                                    {item.name}
                                                </Link>
                                                <p className={`${textColorCls} font-bold text-lg`}>₦{item.price.toLocaleString()}</p>
                                            </div>

                                            <div className="flex flex-col items-end justify-between">
                                                <button
                                                    onClick={() => removeItem(item.id, storeSlug)}
                                                    className="text-gray-400 hover:text-red-600 transition-colors"
                                                    title="Remove item">
                                                    <span className="text-xl">✕</span>
                                                </button>

                                                <div className="flex items-center gap-3 bg-gray-50 p-1 rounded-lg border border-gray-200">
                                                    <button
                                                        onClick={() => updateQty(item.id, storeSlug, item.qty - 1)}
                                                        className="w-8 h-8 flex items-center justify-center rounded hover:bg-white hover:shadow-sm text-black font-bold transition-all"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-8 text-center text-black font-semibold">{item.qty}</span>
                                                    <button
                                                        onClick={() => updateQty(item.id, storeSlug, item.qty + 1)}
                                                        disabled={item.stock !== undefined && item.qty >= item.stock}
                                                        className="w-8 h-8 flex items-center justify-center rounded hover:bg-white hover:shadow-sm text-black font-bold disabled:opacity-50 transition-all"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <p className="text-black font-bold text-lg">
                                                    ₦{(item.price * item.qty).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                                <h2 className="text-xl font-bold text-black mb-4">Summary</h2>

                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between text-gray-700">
                                        <span>Subtotal</span>
                                        <span>₦{total.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-700">
                                        <span>Delivery</span>
                                        <span className="text-green-600 font-medium font-semibold">FREE</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4 mb-6">
                                    <div className="flex justify-between text-xl font-bold">
                                        <span className="text-black">Total</span>
                                        <span className={textColorCls}>₦{total.toLocaleString()}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className={`w-full text-white py-4 rounded-xl transition-all font-bold text-lg shadow-lg active:scale-[0.98] ${primaryColorCls}`}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
