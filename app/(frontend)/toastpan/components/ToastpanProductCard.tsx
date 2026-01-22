'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/app/actions/supermarket';
import { useCart } from '@/components/CartContext';

interface ToastpanProductCardProps {
  product: Product;
}

export default function ToastpanProductCard({ product }: ToastpanProductCardProps) {
  const { addItem } = useCart();

  const imageUrl = typeof product.image === 'string' 
    ? product.image 
    : (product.image?.url || '/placeholder.png');
  const categoryName = typeof product.category === 'string' ? product.category : product.category.name;

  const handleAddToCart = () => {
    const productId = String(product.id || '').trim();
    if (!productId) {
      console.error('Cannot add product to cart: missing ID', product);
      return;
    }
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      image: imageUrl,
      stock: product.stock,
      store: product.store,
    });
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="relative h-48 bg-gray-50">
        <Image
          src={imageUrl || ''}
          alt={product.name}
          fill
          className="object-cover"
        />
        {typeof product.stock === 'number' && product.stock === 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-[#2D2D2D] font-bold text-base line-clamp-1 flex-1 pr-2">
            {product.name}
          </h3>
          <span className="text-[#B5D04E] font-bold text-base">
            ₦{product.price.toLocaleString()}
          </span>
        </div>

        {product.description && (
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[40px]">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">
            {categoryName}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="bg-[#B5D04E] text-white px-4 py-2 rounded-lg hover:bg-[#A3BC46] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-sm font-bold transition-colors shadow-sm active:transform active:scale-95"
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
