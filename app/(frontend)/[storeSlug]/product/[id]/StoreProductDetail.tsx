"use client";

import React, { useState } from 'react';
import { useCart } from '@/components/CartContext';
import { useWishlist } from '@/components/contexts/WishlistContext';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/app/actions/supermarket';

interface StoreProductDetailProps {
    product: Product;
    storeSlug: string;
    storeName: string;
    accentColor?: string;
}

export default function StoreProductDetail({ product, storeSlug, storeName, accentColor = '#f97316' }: StoreProductDetailProps) {
    const [quantity, setQuantity] = useState(1);
    const { addItem, carts, updateQty } = useCart();
    const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

    const imageUrl = typeof product.image === 'string' ? product.image : product.image?.url || '/placeholder.png';
    const categoryName = typeof product.category === 'string' ? product.category : product.category?.name || 'Uncategorized';
    const currentStock = product.stock ?? 0;

    const cartItem = carts[storeSlug]?.find(item => item.id === product.id);

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            qty: quantity,
            image: imageUrl || undefined,
            stock: currentStock,
            store: storeSlug,
        });
    };

    const handleWishlistToggle = () => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-gray-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Link href={`/${storeSlug}`} className="hover:underline">{storeName}</Link>
                        <span>›</span>
                        <Link href={`/${storeSlug}/products`} className="hover:underline">Products</Link>
                        <span>›</span>
                        <span className="text-black">{product.name}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div>
                        <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 relative h-96">
                            <Image
                                src={imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    <div>
                        <div className="mb-2">
                            <span className="text-sm text-gray-500">{categoryName}</span>
                        </div>
                        <h1 className="text-3xl font-bold text-black mb-3">{product.name}</h1>

                        {typeof product.rating === 'number' && (
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex text-lg" style={{ color: '#fbbf24' }}>
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}>{i < Math.floor(product.rating || 0) ? '★' : '☆'}</span>
                                    ))}
                                </div>
                                <span className="text-gray-600">
                                    {product.rating.toFixed(1)} ({product.reviewCount || 0} reviews)
                                </span>
                            </div>
                        )}

                        <div className="mb-6">
                            <span className="text-4xl font-bold" style={{ color: accentColor }}>
                                NGN {product.price.toLocaleString()}
                            </span>
                        </div>

                        {product.description && (
                            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
                        )}

                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-black font-semibold">Availability:</span>
                                {currentStock > 0 ? (
                                    <span className="text-green-600 font-medium">In Stock ({currentStock} available)</span>
                                ) : (
                                    <span className="text-red-600 font-medium">Out of Stock</span>
                                )}
                            </div>
                        </div>

                        {!cartItem ? (
                            <>
                                <div className="mb-6">
                                    <label className="block text-black font-semibold mb-2">Quantity:</label>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 border border-gray-300 rounded hover:bg-gray-100 text-black font-bold"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, Math.min(currentStock, parseInt(e.target.value) || 1)))}
                                            className="w-20 text-center border border-gray-300 rounded px-3 py-2 text-black"
                                            min="1"
                                            max={currentStock}
                                        />
                                        <button
                                            onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                                            className="w-10 h-10 border border-gray-300 rounded hover:bg-gray-100 text-black font-bold"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-3 mb-4">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={currentStock === 0}
                                        style={{ backgroundColor: currentStock === 0 ? undefined : accentColor }}
                                        className="flex-1 text-white px-8 py-4 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed text-lg font-semibold transition-colors"
                                    >
                                        {currentStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                    </button>
                                    <button
                                        onClick={handleWishlistToggle}
                                        className={`px-6 py-4 rounded-lg border-2 transition-colors ${isInWishlist(product.id)
                                            ? 'bg-red-50 border-red-300 text-red-600 hover:bg-red-100'
                                            : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        {isInWishlist(product.id) ? '❤️' : '🤍'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-4">
                                <label className="block text-black font-semibold mb-2">In your cart:</label>
                                <div className="flex items-center justify-between bg-gray-50 border-2 border-gray-100 rounded-xl p-1 max-w-[180px]">
                                    <button
                                        onClick={() => updateQty(product.id, storeSlug, cartItem.qty - 1)}
                                        style={{ color: accentColor }}
                                        className="w-10 h-10 flex items-center justify-center font-black text-xl hover:bg-white hover:shadow-sm rounded-lg transition-all"
                                    >
                                        -
                                    </button>
                                    <span className="font-black text-black">{cartItem.qty}</span>
                                    <button
                                        onClick={() => updateQty(product.id, storeSlug, cartItem.qty + 1)}
                                        disabled={currentStock !== undefined && cartItem.qty >= currentStock}
                                        style={{ color: accentColor }}
                                        className="w-10 h-10 flex items-center justify-center font-black text-xl hover:bg-white hover:shadow-sm rounded-lg transition-all disabled:opacity-20"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        )}

                        <Link
                            href={`/${storeSlug}/checkout`}
                            className="block w-full text-center text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                            style={{ backgroundColor: '#1f2937' }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#111827')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1f2937')}
                        >
                            Go to Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
