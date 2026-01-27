"use client";

import React from 'react';
import Image from 'next/image';
import { Product } from '@/app/actions/supermarket';
import { useCart } from '@/components/CartContext';
import { useWishlist } from '@/components/contexts/WishlistContext';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, carts, updateQty } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  // Find if item is in cart
  const storeSlug = typeof product.store === 'string' ? product.store : product.store?.slug || 'store';
  const cartItem = carts[storeSlug]?.find(item => item.id === product.id);

  const imageUrl = typeof product.image === 'string'
    ? product.image
    : (product.image?.url || '/placeholder.png');

  const categoryName = typeof product.category === 'string'
    ? product.category
    : (product.category?.name || 'Uncategorized');

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
      store: storeSlug,
    });
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const productLink = `/${storeSlug}/product/${product.id}`;

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
      <Link href={productLink} className="relative block h-56 bg-gray-50 overflow-hidden">
        <Image
          src={imageUrl || '/placeholder.png'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {typeof product.stock === 'number' && product.stock < 10 && product.stock > 0 && (
            <div className="bg-orange-500 text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider shadow-lg">
              Low Stock
            </div>
          )}
          {typeof product.stock === 'number' && product.stock === 0 && (
            <div className="bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider shadow-lg">
              Out of Stock
            </div>
          )}
        </div>

        {/* Wishlist Button Overlay */}
        <button
          onClick={(e) => {
            e.preventDefault();
            handleWishlistToggle();
          }}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-all duration-300 ${inWishlist
              ? 'bg-red-500 text-white scale-110'
              : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:scale-110'
            }`}
        >
          {inWishlist ? '❤️' : '🤍'}
        </button>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2">
          <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{categoryName}</span>
          <Link href={productLink}>
            <h3 className="text-black font-extrabold text-base mb-1 hover:text-orange-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        {product.description && (
          <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed flex-1">
            {product.description}
          </p>
        )}

        {typeof product.rating === 'number' && (
          <div className="flex items-center gap-1.5 mb-4">
            <div className="flex text-orange-400 text-xs">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(product.rating!) ? '★' : '☆'}
                </span>
              ))}
            </div>
            <span className="text-[10px] font-bold text-gray-400">({product.reviewCount})</span>
          </div>
        )}

        <div className="flex items-center justify-between mb-5">
          <div className="flex flex-col">
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-tighter">Price</span>
            <span className="text-black font-black text-xl tracking-tight">
              <span className="text-sm mr-0.5">NGN</span>{product.price.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-auto">
          {cartItem ? (
            <div className="flex items-center justify-between bg-gray-50 border-2 border-gray-100 rounded-xl p-1">
              <button
                onClick={() => updateQty(product.id, storeSlug, cartItem.qty - 1)}
                className="w-10 h-10 flex items-center justify-center text-orange-600 font-black text-xl hover:bg-white hover:shadow-sm rounded-lg transition-all"
              >
                -
              </button>
              <span className="font-black text-black">{cartItem.qty}</span>
              <button
                onClick={() => updateQty(product.id, storeSlug, cartItem.qty + 1)}
                disabled={product.stock !== undefined && cartItem.qty >= product.stock}
                className="w-10 h-10 flex items-center justify-center text-orange-600 font-black text-xl hover:bg-white hover:shadow-sm rounded-lg transition-all disabled:opacity-20"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-black text-white py-3.5 rounded-xl font-black text-sm hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-100 transition-all duration-300 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {product.stock === 0 ? 'SOLD OUT' : 'ADD TO BAG'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
