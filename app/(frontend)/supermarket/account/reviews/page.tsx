"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/components/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { dummyReviews } from "../../data/dummy-data";
import ReviewCard from "../../components/ReviewCard";
import { AccountSidebar } from "../../components/account/AccountSidebar";
import { Star } from "lucide-react";

export default function ReviewsPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/supermarket/account/login");
  }, [user, router]);

  if (!user) return null;

  const userReviews = dummyReviews.filter((r) => r.userId === user.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <p className="text-xs text-gray-400 mb-1">
            <Link href="/supermarket/account" className="hover:text-orange-500">Account</Link> / Reviews
          </p>
          <h1 className="text-xl font-bold text-gray-900">My Reviews</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        <AccountSidebar />

        <main className="flex-1 min-w-0">
          {userReviews.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-16 text-center">
              <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-amber-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h2>
              <p className="text-sm text-gray-500 mb-6">Share your experience with products you&apos;ve purchased</p>
              <Link
                href="/supermarket/account/orders"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                View Orders
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">{userReviews.length}</span> review{userReviews.length !== 1 ? "s" : ""}
              </p>
              {userReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
