"use client";

import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '@/components/CartContext';
import Link from 'next/link';

interface FloatingCartProps {
    storeSlug: string;
    accentColor?: string;
}

const FloatingCart: React.FC<FloatingCartProps> = ({
    storeSlug,
    accentColor = "#FB6404"
}) => {
    const { getCartCount } = useCart();
    const count = getCartCount(storeSlug);

    return (
        <Link
            href={`/${storeSlug}/cart`}
            className="fixed bottom-28 right-8 z-[100] flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 group"
            style={{ backgroundColor: accentColor }}
        >
            <div className="relative text-white">
                <FiShoppingCart size={28} />
                {count > 0 && (
                    <span className="absolute -top-3 -right-3 bg-white text-black text-[10px] w-6 h-6 flex items-center justify-center rounded-full font-bold border-2" style={{ borderColor: accentColor }}>
                        {count}
                    </span>
                )}
            </div>

            {/* Tooltip-like label */}
            <span className="absolute right-full mr-4 bg-black/80 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold uppercase tracking-wider">
                View Cart
            </span>
        </Link>
    );
};

export default FloatingCart;
