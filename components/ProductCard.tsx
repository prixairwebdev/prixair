"use client";

import React from 'react';
import Image from 'next/image';
import { Heart, Plus, Minus, ShoppingBag } from 'lucide-react';
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
    <div className="group bg-white border border-gray-100 hover:border-gray-300 transition-all duration-300 flex flex-col">
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
          <div className="absolute top-3 left-3 bg-gray-800 text-white text-[10px] font-semibold px-2.5 py-1 tracking-wide">
            Sold Out
          </div>
        )}
        {isLowStock && !isOutOfStock && (
          <div
            className="absolute top-3 left-3 text-white text-[10px] font-semibold px-2.5 py-1 tracking-wide"
            style={{ backgroundColor: accentColor }}
          >
            {product.stock} left
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all ${
            inWishlist
              ? 'bg-red-500 text-white'
              : 'bg-white/90 text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-white' : ''}`} />
        </button>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {categoryName && (
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-1.5"
            style={{ color: accentColor }}
          >
            {categoryName}
          </span>
        )}

        <Link href={productLink}>
          <h3
            className="text-sm font-semibold text-gray-900 transition-colors line-clamp-2 leading-snug mb-3"
            style={{ ['--hover-color' as string]: accentColor }}
          >
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-auto mb-3">
          <span className="text-base font-bold text-gray-900">
            ₦{product.price.toLocaleString()}
          </span>
          {typeof product.rating === 'number' && product.rating > 0 && (
            <span className="text-xs text-gray-400">{product.rating.toFixed(1)} ★</span>
          )}
        </div>

        {cartItem ? (
          <div className="flex items-center justify-between bg-gray-50 border border-gray-100 p-1">
            <button
              onClick={() => updateQty(product.id, storeSlug, cartItem.qty - 1)}
              className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 text-gray-600 hover:border-gray-400 transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="font-bold text-sm text-gray-900 min-w-[2ch] text-center">{cartItem.qty}</span>
            <button
              onClick={() => updateQty(product.id, storeSlug, cartItem.qty + 1)}
              disabled={product.stock !== undefined && cartItem.qty >= product.stock}
              className="w-8 h-8 flex items-center justify-center text-white transition-colors disabled:opacity-30"
              style={{ backgroundColor: accentColor }}
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white transition-all disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            style={{ backgroundColor: isOutOfStock ? undefined : accentColor }}
          >
            {isOutOfStock ? 'Out of Stock' : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                Add to Cart
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
