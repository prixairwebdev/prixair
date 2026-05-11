"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/components/contexts/AuthContext";
import { useWishlist } from "@/components/contexts/WishlistContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { AccountSidebar } from "../../components/account/AccountSidebar";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { user } = useAuth();
  const { items } = useWishlist();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/supermarket/account/login");
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <p className="text-xs text-gray-400 mb-1">
            <Link href="/supermarket/account" className="hover:text-orange-500">Account</Link> / Wishlist
          </p>
          <h1 className="text-xl font-bold text-gray-900">My Wishlist</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        <AccountSidebar />

        <main className="flex-1 min-w-0">
          {items.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-16 text-center">
              <div className="w-14 h-14 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-pink-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
              <p className="text-sm text-gray-500 mb-6">Save items you love and come back to them later</p>
              <Link
                href="/supermarket"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-900">{items.length}</span> saved item{items.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product as never} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
