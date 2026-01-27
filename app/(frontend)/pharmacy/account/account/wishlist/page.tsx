"use client";

import React, { useEffect } from 'react';
import { useAuth } from '@/components/contexts/AuthContext';
import { useWishlist } from '@/components/contexts/WishlistContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
  const { user } = useAuth();
  const { items } = useWishlist();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/pharmacy/account/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/pharmacy/account" className="text-orange-600 hover:text-orange-700">
            ← Back to Account
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-black mb-2">My Wishlist</h1>
          <p className="text-gray-600">Save your favorite items for later</p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">❤️</div>
            <h2 className="text-2xl font-bold text-black mb-2">Your Wishlist is Empty</h2>
            <p className="text-gray-600 mb-6">Add items you love to your wishlist</p>
            <Link
              href="/pharmacy"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <p className="text-black font-medium">{items.length} item(s) in your wishlist</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
