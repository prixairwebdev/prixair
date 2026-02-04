"use client";

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

import { Product, Category } from '@/app/actions/supermarket';

interface StoreProductsListProps {
    products: Product[];
    categories: Category[];
    storeSlug: string;
    storeName: string;
    accentColor?: string;
}

const ITEMS_PER_PAGE = 12;

export default function StoreProductsList({
    products,
    categories,
    storeSlug,
    storeName,
    accentColor = '#f97316'
}: StoreProductsListProps) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [sortBy, setSortBy] = useState<string>('name');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const query = searchParams.get('q');
        const category = searchParams.get('category');
        const page = searchParams.get('page');

        if (query) setSearchQuery(query);
        if (category) setSelectedCategory(category);
        if (page) setCurrentPage(parseInt(page));
    }, [searchParams]);

    const categoryNames = ['All', ...Array.from(new Set(categories.map(c => c.name)))];

    let filteredProducts = products.filter(product => {
        const productCategoryName = typeof product.category === 'string'
            ? product.category
            : product.category?.name;

        const matchesCategory = selectedCategory === 'All' || productCategoryName === selectedCategory;

        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.description || '').toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Sort products
    filteredProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return (b.rating || 0) - (a.rating || 0);
            case 'name':
            default:
                return a.name.localeCompare(b.name);
        }
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
        const params = new URLSearchParams(searchParams.toString());
        params.set('category', category);
        params.set('page', '1');
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <h1 className="text-4xl font-extrabold text-black mb-4">{storeName} Catalog</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Link 
                            href={`/${storeSlug}`} 
                            className="transition-colors font-medium"
                            style={{ color: 'inherit' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
                        >
                            Home
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-black font-semibold uppercase tracking-wider">Products</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-md p-8 sticky top-6 border border-gray-100">
                            <h2 className="text-2xl font-bold text-black mb-6 border-b pb-4">Refine Search</h2>

                            {/* Search */}
                            <div className="mb-8">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Keyword Search</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="What are you looking for?"
                                        className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-black focus:outline-none transition-all placeholder:text-gray-400"
                                        onFocus={(e) => e.currentTarget.style.borderColor = accentColor}
                                        onBlur={(e) => e.currentTarget.style.borderColor = '#F3F4F6'}
                                    />
                                    <span className="absolute right-4 top-3.5 text-gray-400">🔍</span>
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="mb-8">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Browse Categories</label>
                                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {categoryNames.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => handleCategoryChange(category)}
                                            style={{ 
                                                backgroundColor: selectedCategory === category ? accentColor : undefined,
                                                color: selectedCategory === category ? 'white' : undefined,
                                            }}
                                            className={`w-full text-left px-5 py-3 rounded-xl transition-all font-medium ${selectedCategory === category
                                                ? 'shadow-lg scale-[1.02]'
                                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                                }`}
                                            onMouseEnter={(e) => {
                                                if (selectedCategory !== category) {
                                                    e.currentTarget.style.color = accentColor;
                                                    e.currentTarget.style.backgroundColor = `${accentColor}10`;
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (selectedCategory !== category) {
                                                    e.currentTarget.style.color = '#374151';
                                                    e.currentTarget.style.backgroundColor = '#F9FAFB';
                                                }
                                            }}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sort */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Arrange By</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-black focus:outline-none transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207L10%2012L15%207%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_1rem_center]"
                                    onFocus={(e) => e.currentTarget.style.borderColor = accentColor}
                                    onBlur={(e) => e.currentTarget.style.borderColor = '#F3F4F6'}
                                >
                                    <option value="name">Alphabetical (A-Z)</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Customer Rating</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-8 flex justify-between items-center">
                            <p className="text-gray-700 font-medium">
                                Showing <span style={{ color: accentColor }} className="font-bold">{paginatedProducts.length}</span> of <span className="text-black font-bold">{filteredProducts.length}</span> results
                                {selectedCategory !== 'All' && <span> in <span style={{ color: accentColor }} className="font-bold">{selectedCategory}</span></span>}
                            </p>
                        </div>

                        {paginatedProducts.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-20 text-center">
                                <div className="text-8xl mb-6">🏜️</div>
                                <h2 className="text-3xl font-black text-black mb-4">No Products Found</h2>
                                <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto">We couldn't find any products matching your current criteria. Try resetting your filters.</p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory('All');
                                        setSearchQuery('');
                                        setCurrentPage(1);
                                    }}
                                    className="bg-black text-white px-10 py-4 rounded-xl hover:bg-gray-800 transition-all font-bold shadow-lg"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {paginatedProducts.map(product => (
                                        <ProductCard key={product.id} product={product} accentColor={accentColor} />
                                    ))}
                                </div>

                                {/* Pagination Controls */}
                                {totalPages > 1 && (
                                    <div className="mt-16 flex justify-center items-center gap-3">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="px-6 py-3 rounded-xl border-2 border-gray-100 bg-white font-bold text-gray-700 disabled:opacity-30 transition-all"
                                            onMouseEnter={(e) => { if (currentPage !== 1) e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.color = accentColor; }}
                                            onMouseLeave={(e) => { if (currentPage !== 1) e.currentTarget.style.borderColor = '#F3F4F6'; e.currentTarget.style.color = '#374151'; }}
                                        >
                                            Previous
                                        </button>

                                        <div className="flex gap-2">
                                            {[...Array(totalPages)].map((_, i) => {
                                                const pageNum = i + 1;
                                                // Simple pagination logic to show only few pages if many exist
                                                if (
                                                    pageNum === 1 ||
                                                    pageNum === totalPages ||
                                                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                                                ) {
                                                    return (
                                                        <button
                                                            key={pageNum}
                                                            onClick={() => handlePageChange(pageNum)}
                                                            style={{ 
                                                                backgroundColor: currentPage === pageNum ? accentColor : 'white',
                                                                borderColor: currentPage === pageNum ? accentColor : '#F3F4F6',
                                                                color: currentPage === pageNum ? 'white' : '#374151'
                                                            }}
                                                            className={`w-12 h-12 rounded-xl border-2 font-bold transition-all ${currentPage === pageNum
                                                                ? 'shadow-lg shadow-gray-100'
                                                                : 'hover:border-gray-300'
                                                                }`}
                                                            onMouseEnter={(e) => {
                                                                if (currentPage !== pageNum) {
                                                                    e.currentTarget.style.borderColor = accentColor;
                                                                    e.currentTarget.style.color = accentColor;
                                                                }
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                if (currentPage !== pageNum) {
                                                                    e.currentTarget.style.borderColor = '#F3F4F6';
                                                                    e.currentTarget.style.color = '#374151';
                                                                }
                                                            }}
                                                        >
                                                            {pageNum}
                                                        </button>
                                                    );
                                                } else if (
                                                    (pageNum === 2 && currentPage > 3) ||
                                                    (pageNum === totalPages - 1 && currentPage < totalPages - 2)
                                                ) {
                                                    return <span key={pageNum} className="flex items-end pb-2 px-1 text-gray-400">...</span>;
                                                }
                                                return null;
                                            })}
                                        </div>

                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="px-6 py-3 rounded-xl border-2 border-gray-100 bg-white font-bold text-gray-700 disabled:opacity-30 transition-all"
                                            onMouseEnter={(e) => { if (currentPage !== totalPages) e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.color = accentColor; }}
                                            onMouseLeave={(e) => { if (currentPage !== totalPages) e.currentTarget.style.borderColor = '#F3F4F6'; e.currentTarget.style.color = '#374151'; }}
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
