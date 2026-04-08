"use client";

import React, { useState, useEffect, useRef, useCallback, useTransition } from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { searchProducts } from '@/app/actions/products';
import { Product, Category } from '@/app/actions/supermarket';

interface StoreProductsListProps {
    initialProducts: Product[];
    initialTotal: number;
    initialTotalPages: number;
    categories: Category[];
    storeSlug: string;
    storeName: string;
    accentColor?: string;
}

const ITEMS_PER_PAGE = 12;

export default function StoreProductsList({
    initialProducts,
    initialTotal,
    initialTotalPages,
    categories,
    storeSlug,
    storeName,
    accentColor = '#f97316'
}: StoreProductsListProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [selectedCategory, setSelectedCategory] = useState<string>(() => searchParams.get('category') || 'All');
    const [sortBy, setSortBy] = useState<string>(() => searchParams.get('sort') || 'name');
    const [searchQuery, setSearchQuery] = useState<string>(() => searchParams.get('q') || '');
    const [currentPage, setCurrentPage] = useState<number>(() => parseInt(searchParams.get('page') || '1'));

    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [total, setTotal] = useState<number>(initialTotal);
    const [totalPages, setTotalPages] = useState<number>(initialTotalPages);
    const [isLoading, setIsLoading] = useState(false);

    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const latestQueryRef = useRef<string>('');

    const fetchProducts = useCallback(
        async (query: string, category: string, page: number, sort: string) => {
            const requestId = `${query}-${category}-${page}-${sort}`;
            latestQueryRef.current = requestId;

            setIsLoading(true);
            try {
                const result = await searchProducts(storeSlug, {
                    query,
                    category,
                    page,
                    sortBy: sort,
                    limit: ITEMS_PER_PAGE,
                });

                // Discard stale responses
                if (latestQueryRef.current !== requestId) return;

                setProducts(result.products);
                setTotal(result.total);
                setTotalPages(result.totalPages);
            } catch (err) {
                console.error('Search error:', err);
            } finally {
                if (latestQueryRef.current === requestId) {
                    setIsLoading(false);
                }
            }
        },
        [storeSlug]
    );

    // Sync URL params
    const updateURL = useCallback(
        (query: string, category: string, page: number, sort: string) => {
            const params = new URLSearchParams();
            if (query) params.set('q', query);
            if (category !== 'All') params.set('category', category);
            if (page > 1) params.set('page', page.toString());
            if (sort !== 'name') params.set('sort', sort);
            const qs = params.toString();
            startTransition(() => {
                router.replace(qs ? `?${qs}` : '?', { scroll: false });
            });
        },
        [router]
    );

    const handleSearchInput = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);

        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
            updateURL(value, selectedCategory, 1, sortBy);
            fetchProducts(value, selectedCategory, 1, sortBy);
        }, 1000);
    };

    const handleCategoryChange = (category: string) => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        setSelectedCategory(category);
        setCurrentPage(1);
        updateURL(searchQuery, category, 1, sortBy);
        fetchProducts(searchQuery, category, 1, sortBy);
    };

    const handleSortChange = (sort: string) => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        setSortBy(sort);
        setCurrentPage(1);
        updateURL(searchQuery, selectedCategory, 1, sort);
        fetchProducts(searchQuery, selectedCategory, 1, sort);
    };

    const handlePageChange = (page: number) => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        setCurrentPage(page);
        updateURL(searchQuery, selectedCategory, page, sortBy);
        fetchProducts(searchQuery, selectedCategory, page, sortBy);
    };

    const handleClearFilters = () => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        setSelectedCategory('All');
        setSearchQuery('');
        setSortBy('name');
        setCurrentPage(1);
        updateURL('', 'All', 1, 'name');
        fetchProducts('', 'All', 1, 'name');
    };

    // Cleanup debounce on unmount
    useEffect(() => {
        return () => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
        };
    }, []);

    const categoryNames = ['All', ...Array.from(new Set(categories.map(c => c.name)))];
    const paginatedProducts = products; // Already paginated by server

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
                                        onChange={(e) => handleSearchInput(e.target.value)}
                                        placeholder="What are you looking for?"
                                        className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-black focus:outline-none transition-all placeholder:text-gray-400 pr-10"
                                        onFocus={(e) => e.currentTarget.style.borderColor = accentColor}
                                        onBlur={(e) => e.currentTarget.style.borderColor = '#F3F4F6'}
                                    />
                                    <span className="absolute right-4 top-3.5 text-gray-400">
                                        {isLoading ? (
                                            <svg className="animate-spin h-5 w-5" style={{ color: accentColor }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                            </svg>
                                        ) : '🔍'}
                                    </span>
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
                                            disabled={isLoading}
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
                                    onChange={(e) => handleSortChange(e.target.value)}
                                    disabled={isLoading}
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
                                Showing <span style={{ color: accentColor }} className="font-bold">{paginatedProducts.length}</span> of <span className="text-black font-bold">{total}</span> results
                                {selectedCategory !== 'All' && <span> in <span style={{ color: accentColor }} className="font-bold">{selectedCategory}</span></span>}
                                {searchQuery && <span> for <span style={{ color: accentColor }} className="font-bold">&ldquo;{searchQuery}&rdquo;</span></span>}
                            </p>
                            {isLoading && (
                                <span className="text-sm font-medium" style={{ color: accentColor }}>Searching...</span>
                            )}
                        </div>

                        {paginatedProducts.length === 0 && !isLoading ? (
                            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-20 text-center">
                                <div className="text-8xl mb-6">🏜️</div>
                                <h2 className="text-3xl font-black text-black mb-4">No Products Found</h2>
                                <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto">We couldn&apos;t find any products matching your current criteria. Try resetting your filters.</p>
                                <button
                                    onClick={handleClearFilters}
                                    className="bg-black text-white px-10 py-4 rounded-xl hover:bg-gray-800 transition-all font-bold shadow-lg"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-200 ${isLoading ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                                    {paginatedProducts.map(product => (
                                        <ProductCard key={product.id} product={product} accentColor={accentColor} />
                                    ))}
                                </div>

                                {/* Pagination Controls */}
                                {totalPages > 1 && (
                                    <div className="mt-16 flex justify-center items-center gap-3">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1 || isLoading}
                                            className="px-6 py-3 rounded-xl border-2 border-gray-100 bg-white font-bold text-gray-700 disabled:opacity-30 transition-all"
                                            onMouseEnter={(e) => { if (currentPage !== 1) { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.color = accentColor; } }}
                                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#F3F4F6'; e.currentTarget.style.color = '#374151'; }}
                                        >
                                            Previous
                                        </button>

                                        <div className="flex gap-2">
                                            {[...Array(totalPages)].map((_, i) => {
                                                const pageNum = i + 1;
                                                if (
                                                    pageNum === 1 ||
                                                    pageNum === totalPages ||
                                                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                                                ) {
                                                    return (
                                                        <button
                                                            key={pageNum}
                                                            onClick={() => handlePageChange(pageNum)}
                                                            disabled={isLoading}
                                                            style={{
                                                                backgroundColor: currentPage === pageNum ? accentColor : 'white',
                                                                borderColor: currentPage === pageNum ? accentColor : '#F3F4F6',
                                                                color: currentPage === pageNum ? 'white' : '#374151'
                                                            }}
                                                            className={`w-12 h-12 rounded-xl border-2 font-bold transition-all ${currentPage === pageNum ? 'shadow-lg' : 'hover:border-gray-300'}`}
                                                            onMouseEnter={(e) => { if (currentPage !== pageNum) { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.color = accentColor; } }}
                                                            onMouseLeave={(e) => { if (currentPage !== pageNum) { e.currentTarget.style.borderColor = '#F3F4F6'; e.currentTarget.style.color = '#374151'; } }}
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
                                            disabled={currentPage === totalPages || isLoading}
                                            className="px-6 py-3 rounded-xl border-2 border-gray-100 bg-white font-bold text-gray-700 disabled:opacity-30 transition-all"
                                            onMouseEnter={(e) => { if (currentPage !== totalPages) { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.color = accentColor; } }}
                                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#F3F4F6'; e.currentTarget.style.color = '#374151'; }}
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
