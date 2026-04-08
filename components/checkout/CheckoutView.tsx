"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useCart } from '@/components/CartContext';
import { useAuth } from '@/components/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAddresses } from '@/app/actions/addresses';
import { Address } from '@/types/store';
import { createOrder } from '@/app/actions/orders';
import { useOrders } from '@/components/contexts/OrderContext';
import { getStoreBySlug } from '@/app/actions/products';
import { validatePromotion } from '@/app/actions/promotions';
import { getRestaurantWhatsAppNumber, sanitizeWhatsAppNumber } from '@/lib/whatsapp';

interface CheckoutViewProps {
    storeSlug: string;
    storeName: string;
    primaryColorCls?: string;
    textColorCls?: string;
    accentColorCls?: string; // used for border/bg-5
}

const storeLabels: Record<string, string> = {
    pharmacy: 'pharmacy',
    supermarket: 'store',
    seaside: 'restaurant',
    noodlelicious: 'restaurant',
    iyanvillage: 'restaurant',
    gavi: 'restaurant',
    buka: 'restaurant',
};

function getStoreLabel(slug: string) {
    return storeLabels[slug] ?? 'store';
}

export default function CheckoutView({
    storeSlug,
    storeName,
    primaryColorCls = "bg-orange-500 hover:bg-orange-600 shadow-orange-100",
    textColorCls = "text-orange-600",
    accentColorCls = "border-orange-500 bg-orange-50",
}: CheckoutViewProps) {
    const { getCartItems, getCartTotal, clear, promoCodes } = useCart();
    const { user } = useAuth();
    const { refreshOrders } = useOrders();
    const router = useRouter();

    // Initialize state
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [userAddresses, setUserAddresses] = useState<Address[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<'whatsapp'>('whatsapp');
    const [processing, setProcessing] = useState(false);
    const [storeId, setStoreId] = useState<string | null>(null);

    // Promo State
    const [discountAmount, setDiscountAmount] = useState(0);
    const [promotionId, setPromotionId] = useState<string | undefined>(undefined);
    const [isValidatingPromo, setIsValidatingPromo] = useState(false);

    const items = useMemo(() => getCartItems(storeSlug), [getCartItems, storeSlug]);
    const subtotal = useMemo(() => getCartTotal(storeSlug), [getCartTotal, storeSlug]);
    const whatsappNumber = useMemo(
        () => sanitizeWhatsAppNumber(getRestaurantWhatsAppNumber(storeSlug)),
        [storeSlug]
    );

    // Calculate final total
    const finalTotal = Math.max(0, subtotal - discountAmount);

    // Fetch user addresses and store ID
    useEffect(() => {
        async function fetchData() {
            try {
                const storeDoc = await getStoreBySlug(storeSlug);
                if (storeDoc) {
                    setStoreId(storeDoc.id);
                } else {
                    console.error(`Store not found: ${storeSlug}`);
                }

                if (user) {
                    const addresses = await getAddresses();
                    setUserAddresses(addresses);
                }
            } catch (error) {
                console.error("Failed to load checkout data", error);
            }
        }
        fetchData();
    }, [user, storeSlug]);

    // Validate Promo Code Check
    useEffect(() => {
        const code = promoCodes?.[storeSlug];
        if (!code || items.length === 0) {
            setDiscountAmount(0);
            setPromotionId(undefined);
            return;
        }

        const validate = async () => {
            setIsValidatingPromo(true);
            try {
                const res = await validatePromotion(code, storeSlug, items.map(i => ({ id: i.id, price: i.price, qty: i.qty })));
                if (res.isValid && res.discount !== undefined) {
                    setDiscountAmount(res.discount);
                    setPromotionId(res.promo?.id);
                } else {
                    // Invalid in checkout? Just reset.
                    setDiscountAmount(0);
                    setPromotionId(undefined);
                }
            } catch (e) {
                console.error("Promo validation failed", e);
                setDiscountAmount(0);
            } finally {
                setIsValidatingPromo(false);
            }
        };
        validate();
    }, [promoCodes, storeSlug, items]);

    // Set default address
    useEffect(() => {
        if (userAddresses.length > 0 && !selectedAddress) {
            const defaultAddr = userAddresses.find(addr => addr.isDefault) || userAddresses[0] || null;
            if (defaultAddr) {
                setSelectedAddress(defaultAddr);
            }
        }
    }, [userAddresses, selectedAddress]);

    const addAddressPath = `/${storeSlug}/account/addresses`;

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="mb-4">Your {storeName} cart is empty.</p>
                    <Link href={`/${storeSlug}`} className={`${textColorCls} font-bold`}>
                        Go Shopping
                    </Link>
                </div>
            </div>
        );
    }

    const formatCurrency = (amount: number) => `NGN ${amount.toLocaleString()}`;

    const buildWhatsAppMessage = () => {
        const address = selectedAddress;
        const customerName = user?.name || address?.name || 'Guest customer';
        const customerPhone = address?.phone || user?.phone || 'Not provided';
        const customerEmail = user?.email || 'Not provided';
        const itemLines = items.map((item, index) => {
            const lineTotal = item.price * item.qty;
            return `${index + 1}. ${item.name} x${item.qty} - ${formatCurrency(lineTotal)}`;
        });

        const addressLine = [address?.street, address?.city, address?.state, address?.country]
            .filter(Boolean)
            .join(', ');

        return [
            `Hello ${storeName}, I'd like to place this order.`,
            '',
            'Customer Details',
            `Name: ${customerName}`,
            `Phone: ${customerPhone}`,
            `Email: ${customerEmail}`,
            '',
            'Delivery Details',
            `Recipient: ${address?.name || 'To be confirmed on WhatsApp'}`,
            `Address: ${addressLine || 'To be confirmed on WhatsApp'}`,
            `Zip Code: ${address?.zipCode || 'Not provided'}`,
            '',
            'Order Details',
            ...itemLines,
            '',
            `Subtotal: ${formatCurrency(subtotal)}`,
            ...(discountAmount > 0 ? [`Discount: -${formatCurrency(discountAmount)}`] : []),
            `Total: ${formatCurrency(finalTotal)}`,
            ...(promoCodes?.[storeSlug] ? [`Promo Code: ${promoCodes[storeSlug]}`] : []),
        ].join('\n');
    };

    const handleWhatsAppCheckout = async () => {
        if (!storeId) {
            alert('Error: Store information not found. Please try again or contact support.');
            return;
        }

        if (isValidatingPromo) {
            alert('Please wait for promotion validation.');
            return;
        }

        if (!whatsappNumber) {
            alert(`WhatsApp ordering is not configured for this ${getStoreLabel(storeSlug)} yet. Please contact support.`);
            return;
        }

        setProcessing(true);

        try {
            const message = buildWhatsAppMessage();
            const fallbackAddress = {
                name: selectedAddress?.name || user?.name || 'WhatsApp customer',
                phone: selectedAddress?.phone || user?.phone || 'Not provided',
                street: selectedAddress?.street || 'To be confirmed on WhatsApp',
                city: selectedAddress?.city || 'To be confirmed on WhatsApp',
                state: selectedAddress?.state || 'To be confirmed on WhatsApp',
                zipCode: selectedAddress?.zipCode || 'Not provided',
                country: selectedAddress?.country || 'Nigeria',
            };
            const result = await createOrder({
                userId: user?.id,
                items: items.map(item => ({
                    product_id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.qty,
                    image: item.image,
                })),
                total: finalTotal,
                subtotal: subtotal,
                discountTotal: discountAmount,
                couponCode: promoCodes?.[storeSlug],
                promotionId: promotionId,
                status: 'pending' as const,
                customerEmail: user?.email,
                shippingAddress: fallbackAddress,
                paymentMethod: 'whatsapp' as const,
                paymentReference: `whatsapp-${Date.now()}`,
                storeId,
            });

            if (!result.success || !result.order) {
                alert('Failed to prepare your order. Please try again.');
                setProcessing(false);
                return;
            }

            clear(storeSlug);
            if (user) {
                await refreshOrders();
            }
            window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        } catch (err) {
            console.error('Checkout error:', err);
            alert('An error occurred while preparing your WhatsApp order.');
            setProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => router.back()} className="text-gray-500 hover:text-black transition-colors">← Back</button>
                    <h1 className="text-3xl font-bold text-black capitalize">{storeName} Checkout</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-xl font-bold text-black mb-4">Delivery Details</h2>
                            {!user ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-600 mb-2">Login is not required for checkout.</p>
                                    <p className="text-gray-500 text-sm">You can share your delivery details with the {getStoreLabel(storeSlug)} directly on WhatsApp after placing the order.</p>
                                </div>
                            ) : userAddresses.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-600 mb-2">Saved addresses are optional for WhatsApp checkout.</p>
                                    <p className="text-gray-500 text-sm mb-4">You can continue now or add one for faster ordering next time.</p>
                                    <Link href={addAddressPath} className={`${textColorCls} hover:opacity-80 font-medium`}>Add Address</Link>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-gray-500 text-sm mb-4">Choose a saved address if you want it included in the WhatsApp message. You can also skip this step.</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {userAddresses.map(address => (
                                            <div
                                                key={address.id}
                                                onClick={() => setSelectedAddress(address)}
                                                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${selectedAddress?.id === address.id ? accentColorCls : 'border-gray-100 hover:border-gray-200'}`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="text-black font-semibold">{address.name}</h3>
                                                        <p className="text-gray-700 text-sm mt-1">{address.phone}</p>
                                                        <p className="text-gray-600 text-sm mt-1">{address.street}, {address.city}</p>
                                                    </div>
                                                    {address.isDefault && <span className={`text-white text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${primaryColorCls.split(' ')[0]}`}>Default</span>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-xl font-bold text-black mb-4">Payment Method</h2>
                            <div className="space-y-3">
                                <div
                                    onClick={() => setPaymentMethod('whatsapp')}
                                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'whatsapp' ? accentColorCls : 'border-gray-100 hover:border-gray-200'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">💬</div>
                                        <div>
                                            <h3 className="text-black font-semibold">WhatsApp</h3>
                                            <p className="text-gray-600 text-sm">Send your order details to the {getStoreLabel(storeSlug)} on WhatsApp to complete checkout</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24 border border-gray-100">
                            <h2 className="text-xl font-bold text-black mb-4">Order Summary</h2>
                            <div className="space-y-4 mb-6 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
                                {items.map(item => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-16 h-16 flex-shrink-0">
                                            <Image src={item.image || '/placeholder.png'} alt={item.name} fill className="object-cover rounded-lg" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-black font-medium text-sm line-clamp-2">{item.name}</h4>
                                            <p className="text-gray-500 text-xs mt-1">Qty: {item.qty}</p>
                                            <p className={`${textColorCls} font-bold text-sm mt-1`}>₦{(item.price * item.qty).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-4 space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="text-black font-medium">₦{subtotal.toLocaleString()}</span>
                                </div>

                                {discountAmount > 0 && (
                                    <div className="flex justify-between text-green-600 font-medium">
                                        <span>Discount</span>
                                        <span>-₦{discountAmount.toLocaleString()}</span>
                                    </div>
                                )}

                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-bold">FREE</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4 mb-8">
                                <div className="flex justify-between text-2xl font-black">
                                    <span className="text-black">Total</span>
                                    <span className={textColorCls}>₦{finalTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleWhatsAppCheckout}
                                disabled={processing || !storeId || isValidatingPromo}
                                className={`w-full text-white py-4 rounded-xl font-bold text-lg mb-4 transition-all shadow-xl ${processing || !storeId || isValidatingPromo ? 'bg-gray-200 cursor-not-allowed text-gray-400 shadow-none' : primaryColorCls + ' active:scale-[0.98]'}`}
                            >
                                {processing ? 'Preparing WhatsApp...' : (isValidatingPromo ? 'Validating...' : 'Complete Payment')}
                            </button>

                            <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                                💬 You will be redirected to WhatsApp with your order details
                            </p>

                            {!user && (
                                <p className="text-center text-xs text-gray-400 mt-2">
                                    Guest checkout is enabled. Delivery details can be shared on WhatsApp.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
