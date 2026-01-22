"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useCart } from '@/components/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getAddresses } from '@/app/actions/addresses';
import { Address } from '../types/types';
import { createOrder } from '@/app/actions/orders';
import { useOrders } from '../contexts/OrderContext';
import { getStoreBySlug } from '@/app/actions/products';

interface PaystackTransaction {
  reference: string;
  status: string;
  [key: string]: string | number | boolean | undefined;
}

interface PaystackReference {
  reference: string;
  status?: string;
  [key: string]: string | number | boolean | undefined;
}

export default function CheckoutPage(): React.ReactNode {
  const { getCartItems, getCartTotal, clear } = useCart();
  const { user } = useAuth();
  const { refreshOrders } = useOrders();
  const router = useRouter();
  const searchParams = useSearchParams();
  const storeFilter = searchParams.get('store') || 'supermarket';

  // Initialize state
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [userAddresses, setUserAddresses] = useState<Address[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'paypal' | 'card'>('paystack');
  const [processing, setProcessing] = useState(false);
  const [storeId, setStoreId] = useState<string | null>(null);

  const items = useMemo(() => getCartItems(storeFilter), [getCartItems, storeFilter]);
  const orderTotal = useMemo(() => getCartTotal(storeFilter), [getCartTotal, storeFilter]);

  // Fetch user addresses and store ID
  useEffect(() => {
    async function fetchData() {
      if (user) {
        try {
          const addresses = await getAddresses();
          setUserAddresses(addresses);

          // Fetch store ID for the current store slug
          const storeDoc = await getStoreBySlug(storeFilter);
          if (storeDoc) {
            setStoreId(storeDoc.id);
          } else {
            console.error(`Store not found: ${storeFilter}`);
          }
        } catch (error) {
          console.error("Failed to load checkout data", error);
        }
      }
    }
    fetchData();
  }, [user, storeFilter]);

  // Set default address
  useEffect(() => {
    if (userAddresses.length > 0 && !selectedAddress) {
      const defaultAddr = userAddresses.find(addr => addr.isDefault) || userAddresses[0] || null;
      if (defaultAddr) {
        setSelectedAddress(defaultAddr);
      }
    }
  }, [userAddresses, selectedAddress]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please <Link href="/supermarket/account/login" className="text-orange-600">login</Link> to continue.</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Your {storeFilter} cart is empty.</p>
          <Link href={storeFilter === 'noodlelicious' ? '/noodlelicious' : '/supermarket'} className="text-orange-600 font-bold">
            Go Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Paystack Config
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

  const handlePaystackPayment = async () => {
    if (!selectedAddress) {
      alert('Please select a shipping address');
      return;
    }

    if (!storeId) {
      alert('Error: Store information not found. Please try again or contact support.');
      return;
    }

    const PaystackPop = (await import('@paystack/inline-js')).default;
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: publicKey,
      email: user.email,
      amount: Math.round(orderTotal * 100),
      metadata: {
        name: user.name,
        phone: user.phone || '',
        store: storeFilter,
      } as Record<string, string>,
      onSuccess: (transaction: PaystackTransaction) => {
        handlePaystackSuccess(transaction);
      },
      onCancel: () => {
        alert("Wait! You need to pay to order.");
      },
    });
  };

  const handlePaystackSuccess = async (reference: PaystackReference) => {
    setProcessing(true);

    try {
      const orderData = {
        userId: user.id,
        items: items.map(item => ({
          product_id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.qty,
          image: item.image,
        })),
        total: orderTotal,
        status: 'pending' as const,
        customerEmail: user.email,
        shippingAddress: {
          name: selectedAddress!.name,
          phone: selectedAddress!.phone,
          street: selectedAddress!.street,
          city: selectedAddress!.city,
          state: selectedAddress!.state,
          zipCode: selectedAddress!.zipCode,
          country: selectedAddress!.country,
        },
        paymentMethod: 'paystack' as const,
        paymentReference: reference.reference,
        storeId: storeId!,
      };

      const result = await createOrder(orderData);

      if (result.success && result.order) {
        clear(storeFilter);
        await refreshOrders();
        router.push(`/supermarket/order-confirmation?orderId=${result.order.id}`);
      } else {
        alert('Failed to create order. Please contact support.');
        setProcessing(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('An error occurred during checkout.');
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => router.back()} className="text-gray-500 hover:text-black transition-colors">← Back</button>
          <h1 className="text-3xl font-bold text-black capitalize">{storeFilter} Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-black mb-4">Shipping Address</h2>
              {userAddresses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No saved addresses</p>
                  <Link href="/supermarket/account/addresses" className="text-orange-600 hover:text-orange-700 font-medium">Add Address →</Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userAddresses.map(address => (
                    <div
                      key={address.id}
                      onClick={() => setSelectedAddress(address)}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${selectedAddress?.id === address.id ? 'border-orange-500 bg-orange-50' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-black font-semibold">{address.name}</h3>
                          <p className="text-gray-700 text-sm mt-1">{address.phone}</p>
                          <p className="text-gray-600 text-sm mt-1">{address.street}, {address.city}</p>
                        </div>
                        {address.isDefault && <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full uppercase font-bold">Default</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-black mb-4">Payment Method</h2>
              <div className="space-y-3">
                <div
                  onClick={() => setPaymentMethod('paystack')}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'paystack' ? 'border-orange-500 bg-orange-50' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-2xl">💳</div>
                    <div>
                      <h3 className="text-black font-semibold">Paystack</h3>
                      <p className="text-gray-600 text-sm">Pay securely with card, bank transfer or USSD</p>
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
                      <Image src={item.image || ''} alt={item.name} fill className="object-cover rounded-lg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-black font-medium text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-gray-500 text-xs mt-1">Qty: {item.qty}</p>
                      <p className="text-orange-600 font-bold text-sm mt-1">₦{(item.price * item.qty).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="text-black font-medium">₦{orderTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-8">
                <div className="flex justify-between text-2xl font-black">
                  <span className="text-black">Total</span>
                  <span className="text-orange-600">₦{orderTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handlePaystackPayment}
                disabled={!selectedAddress || processing || !storeId}
                className={`w-full text-white py-4 rounded-xl font-bold text-lg mb-4 transition-all shadow-xl ${!selectedAddress || processing || !storeId ? 'bg-gray-200 cursor-not-allowed text-gray-400 shadow-none' : 'bg-orange-500 hover:bg-orange-600 shadow-orange-100 active:scale-[0.98]'}`}
              >
                {processing ? 'Processing...' : 'Complete Payment'}
              </button>

              <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                🔒 Your payment is secured and encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
