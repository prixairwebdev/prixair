"use client";

import React from 'react';
import Image from 'next/image';
import { Heart, Plus, Minus, Star } from 'lucide-react';
import { Product } from '@/app/actions/supermarket';
import { useCart } from '@/components/CartContext';
import { useWishlist } from '@/components/contexts/WishlistContext';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  accentColor?: string;
}

export default function ProductCard({ product, accentColor = '#f97316' }: ProductCardProps) {
  const { addItem, carts, updateQty } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const storeSlug = typeof product.store === 'string' ? product.store : product.store?.slug || 'store';
  const cartItem = carts[storeSlug]?.find(item => item.id === product.id);

  const imageUrl = typeof product.image === 'string'
    ? product.image
    : (product.image?.url || '/placeholder.png');

  const categoryName = typeof product.category === 'string'
    ? product.category
    : (product.category?.name || '');

  const isOutOfStock = product.stock === 0;
  const isLowStock = typeof product.stock === 'number' && product.stock > 0 && product.stock < 10;

  const handleAddToCart = () => {
    if (!product.id) return;
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

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    inWishlist ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  const productLink = `/${storeSlug}/product/${product.id}`;

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-300 flex flex-col">
      {/* Image */}
      <Link href={productLink} className="relative block aspect-square bg-gray-50 overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Stock badge */}
        {isOutOfStock && (
          <div className="absolute top-2.5 left-2.5 bg-gray-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            Sold Out
          </div>
        )}
        {isLowStock && !isOutOfStock && (
          <div className="absolute top-2.5 left-2.5 text-white text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: accentColor }}>
            Only {product.stock} left
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
            inWishlist ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-400 hover:text-red-400'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-white' : ''}`} />
        </button>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {categoryName && (
          <span className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: accentColor }}>
            {categoryName}
          </span>
        )}

        <Link href={productLink}>
          <h3 className="text-sm font-bold text-gray-900 hover:text-orange-500 transition-colors line-clamp-2 leading-snug mb-2">
            {product.name}
          </h3>
        </Link>

        {typeof product.rating === 'number' && product.rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-gray-700">{product.rating.toFixed(1)}</span>
            {product.reviewCount ? (
              <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
            ) : null}
          </div>
        )}

        {product.description && (
          <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed mb-3 flex-1">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto mb-3">
          <span className="text-base font-black text-gray-900">
            ₦{product.price.toLocaleString()}
          </span>
        </div>

        {cartItem ? (
          <div className="flex items-center justify-between rounded-xl p-1 bg-gray-50 border border-gray-100">
            <button
              onClick={() => updateQty(product.id, storeSlug, cartItem.qty - 1)}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-white shadow-sm text-gray-600 hover:bg-gray-50 transition-all"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-black text-sm text-gray-900">{cartItem.qty}</span>
            <button
              onClick={() => updateQty(product.id, storeSlug, cartItem.qty + 1)}
              disabled={product.stock !== undefined && cartItem.qty >= product.stock}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-white transition-all disabled:opacity-30"
              style={{ backgroundColor: accentColor }}
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-white transition-all disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            style={{ backgroundColor: isOutOfStock ? undefined : accentColor }}
          >
            {isOutOfStock ? 'Out of Stock' : (
              <>
                <Plus className="w-3.5 h-3.5" />
                Add to Cart
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
