import React from 'react';
import Image from 'next/image';
import { Product } from '@/types/store';
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
  const storeSlug = typeof product.store === 'string' ? product.store : product.store.slug;
  const cartItem = carts[storeSlug]?.find(item => item.id === product.id);

  const imageUrl = typeof product.image === 'string'
    ? product.image
    : (product.image?.url || '/placeholder.png');
  const categoryName = typeof product.category === 'string' ? product.category : product.category.name;

  const handleAddToCart = () => {
    const productId = String(product.id || '').trim();
    if (!productId) {
      console.error('Cannot add product to cart: missing ID', product);
      alert('Error: Product information is invalid. Please refresh and try again.');
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      image: imageUrl,
      stock: product.stock,
      store: storeSlug as any,
    });
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/supermarket/product/${product.id}`}>
        <div className="relative h-48 bg-gray-100">
          <Image
            src={imageUrl || ''}
            alt={product.name}
            fill
            className="object-cover"
          />
          {typeof product.stock === 'number' && product.stock < 10 && product.stock > 0 && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
              Only {product.stock} left
            </div>
          )}
          {typeof product.stock === 'number' && product.stock === 0 && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
              Out of Stock
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/supermarket/product/${product.id}`}>
          <h3 className="text-black font-semibold text-sm mb-1 hover:text-orange-600 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {product.description && <p className="text-gray-600 text-xs mb-2 line-clamp-2">{product.description}</p>}

        {typeof product.rating === 'number' && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex text-orange-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(product.rating!) ? '★' : '☆'}
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>
        )}

        <div className="flex items-center justify-between mb-3">
          <span className="text-black font-bold text-lg">NGN {product.price.toFixed(2)}</span>
          <span className="text-gray-500 text-xs">{categoryName}</span>
        </div>

        <div className="flex gap-2">
          {cartItem ? (
            <div className="flex-1 flex items-center justify-between bg-white border border-orange-500 rounded px-2 py-1">
              <button
                onClick={() => updateQty(product.id, storeSlug, cartItem.qty - 1)}
                className="text-orange-600 font-bold text-lg px-2 hover:bg-orange-50 rounded"
              >
                -
              </button>
              <span className="font-semibold text-black">{cartItem.qty}</span>
              <button
                onClick={() => updateQty(product.id, storeSlug, cartItem.qty + 1)}
                disabled={product.stock !== undefined && cartItem.qty >= product.stock}
                className="text-orange-600 font-bold text-lg px-2 hover:bg-orange-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium transition-colors"
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          )}
          <button
            onClick={handleWishlistToggle}
            className={`px-3 py-2 rounded border transition-colors ${inWishlist
              ? 'bg-red-50 border-red-300 text-red-600 hover:bg-red-100'
              : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {inWishlist ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
}
