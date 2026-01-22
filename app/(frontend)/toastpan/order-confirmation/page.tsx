"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle, Package, MapPin, CreditCard } from 'lucide-react';

interface OrderItem {
    product_id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

interface Order {
    id: string;
    items: OrderItem[];
    total: number;
    status: string;
    paymentReference?: string;
    shippingAddress: {
        name: string;
        phone: string;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    createdAt: string;
}

export default function OrderConfirmationPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get('orderId');

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrder() {
            if (!orderId) {
                router.push('/toastpan/products');
                return;
            }

            try {
                const response = await fetch(`/api/orders/${orderId}`);
                if (response.ok) {
                    const data = await response.json();
                    setOrder(data);
                } else {
                    console.error('Failed to fetch order');
                }
            } catch (error) {
                console.error('Error fetching order:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchOrder();
    }, [orderId, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#fcfbf9] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#B5D04E] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-[#fcfbf9] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Order not found</h2>
                    <Link href="/toastpan/products" className="text-[#B5D04E] font-bold">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfbf9] py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Success Banner */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-sm p-8 mb-8 text-center border border-gray-100"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-20 h-20 bg-[#B5D04E] rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle className="w-12 h-12 text-white" />
                    </motion.div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Order Confirmed!</h1>
                    <p className="text-gray-600 text-lg mb-2">Thank you for your order</p>
                    <p className="text-sm text-gray-500">Order ID: <span className="font-mono font-bold text-[#B5D04E]">#{order.id.substring(0, 8)}</span></p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Delivery Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-[#B5D04E]/10 rounded-lg flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-[#B5D04E]" />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900">Delivery Address</h2>
                        </div>
                        <div className="text-gray-700 space-y-1">
                            <p className="font-semibold">{order.shippingAddress.name}</p>
                            <p className="text-sm">{order.shippingAddress.phone}</p>
                            <p className="text-sm">{order.shippingAddress.street}</p>
                            <p className="text-sm">{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                            <p className="text-sm">{order.shippingAddress.zipCode}, {order.shippingAddress.country}</p>
                        </div>
                    </motion.div>

                    {/* Payment Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-[#B5D04E]/10 rounded-lg flex items-center justify-center">
                                <CreditCard className="w-5 h-5 text-[#B5D04E]" />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900">Payment Details</h2>
                        </div>
                        <div className="text-gray-700 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm">Payment Method:</span>
                                <span className="text-sm font-semibold">Paystack</span>
                            </div>
                            {order.paymentReference && (
                                <div className="flex justify-between">
                                    <span className="text-sm">Reference:</span>
                                    <span className="text-xs font-mono text-gray-500">{order.paymentReference.substring(0, 16)}...</span>
                                </div>
                            )}
                            <div className="flex justify-between pt-2 border-t border-gray-100">
                                <span className="font-bold">Total Paid:</span>
                                <span className="font-bold text-[#B5D04E] text-lg">₦{order.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Order Items */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-[#B5D04E]/10 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-[#B5D04E]" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900">Order Items</h2>
                    </div>
                    <div className="space-y-4">
                        {order.items.map((item, index) => (
                            <div key={index} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                                <div className="relative w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                                    {item.image && (
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                                    <p className="text-sm text-gray-500 mb-2">Quantity: {item.quantity}</p>
                                    <p className="text-[#B5D04E] font-bold">₦{(item.price * item.quantity).toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        href="/toastpan/products"
                        className="bg-[#B5D04E] text-white px-8 py-4 rounded-xl font-bold text-center hover:bg-[#A3BC46] transition-colors shadow-lg shadow-[#B5D04E]/20"
                    >
                        Continue Shopping
                    </Link>
                    <Link
                        href="/toastpan"
                        className="bg-white text-gray-700 px-8 py-4 rounded-xl font-bold text-center hover:bg-gray-50 transition-colors border border-gray-200"
                    >
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
