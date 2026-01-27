"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartContext';
import { useWishlist } from '@/components/contexts/WishlistContext';
import Link from 'next/link';
import Image from 'next/image';
import ReviewCard from '../../components/ReviewCard';
import { Product } from '@/app/actions/supermarket';
import { dummyReviews } from '../../data/dummy-data';

interface ProductDetailsProps {
    product: Product;
    relatedProducts: Product[];
}

export default function ProductDetails({ product, relatedProducts }: ProductDetailsProps) {
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCart();
    const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

    const productReviews = dummyReviews.filter(r => r.productId === product.id);

    const handleAddToCart = () => {
        const currentStock = product.stock ?? 0;
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
            qty: quantity,
            image: imageUrl || undefined,
            stock: currentStock,
            store: typeof product.store === 'string' ? product.store : product.store.slug,
        });
        alert('Added to cart!');
    };

    const handleWishlistToggle = () => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const imageUrl = typeof product.image === 'string' ? product.image : product.image.url;
    const categoryName = typeof product.category === 'string' ? product.category : product.category.name;
    const currentStock = product.stock ?? 0;

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/supermarket" className="hover:text-orange-600">Home</Link>
                        <span>›</span>
                        <Link href="/supermarket/products" className="hover:text-orange-600">Products</Link>
                        <span>›</span>
                        <span className="text-black">{product.name}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Product Image */}
                    <div>
                        <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 relative h-96">
                            <Image
                                src={imageUrl || ''}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="mb-2">
                            <span className="text-sm text-gray-500">{categoryName}</span>
                        </div>
                        <h1 className="text-3xl font-bold text-black mb-3">{product.name}</h1>

                        {typeof product.rating === 'number' && (
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex text-orange-400 text-lg">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}>
                                            {i < Math.floor(product.rating || 0) ? '★' : '☆'}
                                        </span>
                                    ))}
                                </div>
                                <span className="text-gray-600">
                                    {product.rating.toFixed(1)} ({product.reviewCount || 0} reviews)
                                </span>
                            </div>
                        )}

                        <div className="mb-6">
                            <span className="text-4xl font-bold text-orange-600">NGN {product.price.toFixed(2)}</span>
                        </div>

                        <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-black font-semibold">Availability:</span>
                                {currentStock > 0 ? (
                                    <span className="text-green-600 font-medium">In Stock ({currentStock} available)</span>
                                ) : (
                                    <span className="text-red-600 font-medium">Out of Stock</span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-black font-semibold">Store:</span>
                                <span className="text-gray-700 capitalize">
                                    {typeof product.store === 'string' ? product.store : product.store.name || product.store.slug}
                                </span>
                            </div>
                        </div>

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

                        <div className="flex gap-3 mb-6">
                            <button
                                onClick={handleAddToCart}
                                disabled={currentStock === 0}
                                className="flex-1 bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-lg font-semibold transition-colors"
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

                        <button
                            onClick={() => router.push('/supermarket/cart')}
                            className="w-full bg-gray-800 text-white px-8 py-4 rounded-lg hover:bg-gray-900 text-lg font-semibold transition-colors"
                            disabled={currentStock === 0}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-black mb-6">Customer Reviews</h2>
                    {productReviews.length === 0 ? (
                        <div className="bg-gray-50 rounded-lg p-8 text-center">
                            <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {productReviews.map(review => (
                                <ReviewCard key={review.id} review={review} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-black mb-6">Related Products</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {relatedProducts.map(relatedProduct => {
                                const relatedImageUrl = typeof relatedProduct.image === 'string'
                                    ? relatedProduct.image
                                    : relatedProduct.image?.url;

                                return (
                                    <Link key={relatedProduct.id} href={`/supermarket/product/${relatedProduct.id}`}>
                                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                                            <div className="h-40 bg-gray-100 relative">
                                                <Image
                                                    src={relatedImageUrl || ''}
                                                    alt={relatedProduct.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="p-3">
                                                <h3 className="text-black font-semibold text-sm mb-1 line-clamp-2">
                                                    {relatedProduct.name}
                                                </h3>
                                                <p className="text-orange-600 font-bold">NGN {relatedProduct.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
