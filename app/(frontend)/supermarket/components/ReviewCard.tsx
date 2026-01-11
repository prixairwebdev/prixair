import React from 'react';
import { Review } from '../types/types';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="text-black font-semibold">{review.userName}</h4>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex text-orange-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-sm">
                  {i < review.rating ? '★' : '☆'}
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-500">{formatDate(review.createdAt)}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-3">{review.comment}</p>

      <div className="flex items-center gap-4 text-xs text-gray-500">
        <button className="hover:text-orange-600 transition-colors">
          👍 Helpful ({review.helpful})
        </button>
      </div>
    </div>
  );
}
