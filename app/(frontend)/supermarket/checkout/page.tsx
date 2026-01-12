"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/components/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAddresses } from '@/app/actions/addresses';
import { Address } from '../types/types';
// import PaystackPop from '@paystack/inline-js';
import { createOrder } from '@/app/actions/orders';
import { useOrders } from '../contexts/OrderContext';

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
  const { items, total, clear } = useCart();
  const { user } = useAuth();
  const { refreshOrders } = useOrders();
  const router = useRouter();

  // Initialize state with null, will be populated via useEffect
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [userAddresses, setUserAddresses] = useState<Address[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'paypal' | 'card'>('paystack');
  const [processing, setProcessing] = useState(false);

  // Fetch user addresses
  useEffect(() => {
    async function fetchAddresses() {
      if (user) {
        try {
          const addresses = await getAddresses();
          setUserAddresses(addresses);
        } catch (error) {
          console.error("Failed to load addresses", error);
        }
      }
    }
    fetchAddresses();
  }, [user]);

  // Set default address when user loads or addresses change
  useEffect(() => {
    if (userAddresses.length > 0 && !selectedAddress) {
      const defaultAddr = userAddresses.find(addr => addr.isDefault) || userAddresses[0] || null;
      if (defaultAddr) {
        setSelectedAddress(defaultAddr);
      }
    }
  }, [userAddresses, selectedAddress]);

  if (!user) {
    // In a real app, you'd redirect to login or show a login modal
    // For now, let's assume if we are here we might have context or just redirect
    // But since this is client side, we should safely handle null user
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
          <p className="mb-4">Your cart is empty.</p>
          <Link href="/supermarket" className="text-orange-600">Go Shopping</Link>
        </div>
      </div>
    );
  }

  const orderTotal = total();

  // Paystack Config
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // Replace with env var

  const handlePaystackPayment = async () => {
    if (!selectedAddress) {
      alert('Please select a shipping address');
      return;
    }

    const PaystackPop = (await import('@paystack/inline-js')).default;
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: publicKey,
      email: user.email,
      amount: Math.round(orderTotal * 100), // Paystack expects amount in kobo
      metadata: {
        name: user.name,
        phone: user.phone || '',
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

    const validItems = items.filter(item => {
      const itemId = String(item.id || '').trim();
      if (!itemId) {
        console.warn('Skipping item without ID:', item);
        return false;
      }
      return true;
    });

    if (validItems.length === 0) {
      alert('Error: No valid items in cart');
      setProcessing(false);
      return;
    }

    if (validItems.length < items.length) {
      console.warn(`Filtered out ${items.length - validItems.length} items without valid IDs`);
    }

    const orderData = {
      userId: user.id,
      items: validItems.map(item => {
        let imageUrl = '';
        if (typeof item.image === 'string') {
          imageUrl = item.image;
        } else if (item.image && typeof item.image === 'object' && 'url' in item.image) {
          imageUrl = (item.image as Record<string, string>).url;
        }
        return {
          product_id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.qty,
          image: imageUrl,
        };
      }),
      total: orderTotal,
      status: 'pending' as const,
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
    };
    
    console.log('Items in cart:', items);
    console.log('Valid items being ordered:', validItems);
    console.log('Order data to be sent:', orderData);

    const result = await createOrder(orderData);

    if (result.success && result.order) {
      clear();
      await refreshOrders();
      router.push(`/supermarket/order-confirmation?orderId=${result.order.id}`);
    } else {
      alert('Failed to create order. Please contact support.');
      setProcessing(false);
    }
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
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${selectedAddress?.id === address.id
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
                  onClick={() => setPaymentMethod('paystack')}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'paystack'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">💳</div>
                    <div>
                      <h3 className="text-black font-semibold">Paystack</h3>
                      <p className="text-gray-600 text-sm">Pay securely with Paystack</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold text-black mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map(item => {
                  const imageUrl = typeof item.image === 'string' 
                    ? item.image 
                    : (item.image && typeof item.image === 'object' && 'url' in item.image 
                      ? (item.image as Record<string, string>).url 
                      : null);
                  
                  return (
                    <div key={item.id} className="flex gap-3">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="text-black font-medium text-sm line-clamp-2">{item.name}</h4>
                        <p className="text-gray-500 text-xs">Qty: {item.qty}</p>
                        <p className="text-orange-600 font-semibold text-sm">
                          NGN {(item.price * item.qty).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>NGN {orderTotal.toFixed(2)}</span>
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
                  <span className="text-orange-600">NGN {orderTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePaystackPayment}
                disabled={!selectedAddress || processing}
                className={`w-full text-white py-4 rounded-lg font-semibold text-lg mb-3 transition-colors ${!selectedAddress || processing
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600'
                  }`}
              >
                {processing ? 'Processing...' : 'Pay Now'}
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
