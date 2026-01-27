"use client";

import React from 'react';
import { FiCheckCircle } from 'react-icons/fi'; // Using CheckCircle for Checkout
import { useCart } from '@/components/CartContext';
import Link from 'next/link';

interface FloatingCheckoutProps {
    storeSlug: string;
    accentColor?: string;
}

const FloatingCheckout: React.FC<FloatingCheckoutProps> = ({
    storeSlug,
    accentColor = "#0077CC" // Defaulting to Seaside blue-ish if not provided, or generic
}) => {
    const { getCartCount, getCartTotal } = useCart();
    const count = getCartCount(storeSlug);
    const total = getCartTotal(storeSlug);

    // Only show if there are items in the cart
    if (count === 0) return null;

    return (
        <Link
            href={`/${storeSlug}/checkout`}
            className="fixed bottom-8 right-8 z-[100] flex items-center justify-between gap-3 px-6 py-4 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 group text-white font-bold text-lg"
            style={{ backgroundColor: accentColor }}
        >
            <div className="flex items-center gap-2">
                <FiCheckCircle size={24} />
                <span>Checkout</span>
            </div>

            <div className="flex items-center gap-2 pl-4 border-l border-white/30">
                <span className="text-sm font-medium opacity-90">{count} items</span>
                <span className="bg-white text-black px-2 py-1 rounded text-sm font-bold">
                    ₦{total.toLocaleString()}
                </span>
            </div>
        </Link>
    );
};

export default FloatingCheckout;
