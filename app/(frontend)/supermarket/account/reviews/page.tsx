"use client";

import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { dummyReviews } from '../../data/dummy-data';
import ReviewCard from '../../components/ReviewCard';

export default function ReviewsPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/supermarket/account/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const userReviews = dummyReviews.filter(review => review.userId === user.id);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/supermarket/account" className="text-orange-600 hover:text-orange-700">
            ← Back to Account
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-black mb-2">My Reviews</h1>
          <p className="text-gray-600">View and manage your product reviews</p>
        </div>

        {userReviews.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">⭐</div>
            <h2 className="text-2xl font-bold text-black mb-2">No Reviews Yet</h2>
            <p className="text-gray-600 mb-6">Share your experience with products you've purchased</p>
            <Link
              href="/supermarket/account/orders"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              View Orders
            </Link>
          </div>
        ) : (
          <div>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <p className="text-black font-medium">{userReviews.length} review(s)</p>
            </div>
            <div className="space-y-4">
              {userReviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
