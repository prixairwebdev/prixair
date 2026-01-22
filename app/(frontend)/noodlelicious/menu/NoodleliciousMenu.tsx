"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Product, Category } from '../../supermarket/types/types';
import ProductCard from '../../supermarket/components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';

interface NoodleliciousMenuProps {
    initialProducts: Product[];
    initialCategories: Category[];
}

const ITEMS_PER_PAGE = 9;

export default function NoodleliciousMenu({ initialProducts, initialCategories }: NoodleliciousMenuProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [currentPage, setCurrentPage] = useState(1);

    // Filter products based on search and category
    const filteredProducts = useMemo(() => {
        return initialProducts.filter(product => {
            const categoryName = typeof product.category === 'string'
                ? product.category
                : product.category?.name;

            const matchesCategory = selectedCategory === 'All' || categoryName === selectedCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.description || '').toLowerCase().includes(searchQuery.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [initialProducts, selectedCategory, searchQuery]);

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery]);

    // Derived category names
    const categoryNames = useMemo(() => {
        const names = new Set<string>();
        initialProducts.forEach(p => {
            const name = typeof p.category === 'string' ? p.category : p.category?.name;
            if (name) names.add(name);
        });
        return ['All', ...Array.from(names).sort()];
    }, [initialProducts]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="mb-12 text-center">
                <Link href="/noodlelicious" className="text-orange-600 hover:text-orange-700 font-medium mb-4 inline-block">
                    ← Back to Landing Page
                </Link>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                    Noodlelicious <span className="text-[#F3A35C]">Menu</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    From spicy ramen to savory stir-fry, discover our full range of delicious noodles.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar/Filters */}
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <div className="sticky top-24 space-y-8">
                        {/* Search */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Search</h3>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Find your favorite..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#F3A35C] focus:border-transparent transition-all outline-none"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Categories */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Categories</h3>
                            <div className="flex flex-wrap lg:flex-col gap-2">
                                {categoryNames.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all text-left ${selectedCategory === category
                                                ? 'bg-[#F3A35C] text-white shadow-md transform scale-105'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="flex-1">
                    <div className="mb-6 flex items-center justify-between">
                        <p className="text-gray-600">
                            Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> items
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {paginatedProducts.length > 0 ? (
                            <motion.div
                                key={currentPage + selectedCategory + searchQuery}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                            >
                                {paginatedProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200"
                            >
                                <div className="text-5xl mb-4">🍜</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No noodles found</h3>
                                <p className="text-gray-600 mb-6">Try broadening your search or choosing another category.</p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedCategory('All');
                                    }}
                                    className="px-6 py-2 bg-[#F3A35C] text-white rounded-xl font-bold hover:bg-[#e2924a] transition-all"
                                >
                                    Clear All Filters
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-12 flex justify-center items-center gap-4">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="p-2 border border-gray-200 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-all"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            <div className="flex items-center gap-2">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === i + 1
                                                ? 'bg-[#F3A35C] text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 border border-gray-200 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-all"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
