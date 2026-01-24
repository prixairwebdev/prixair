"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Product, Category } from '@/app/actions/supermarket';
import ToastpanProductCard from '../components/ToastpanProductCard';
import { ChevronLeft, Search, Filter, SlidersHorizontal, X } from 'lucide-react';
import FloatingCart from '../../components/brand/FloatingCart';

interface ProductsListProps {
    products: Product[];
    categories: Category[];
}

export default function ProductsList({ products, categories: initialCategories }: ProductsListProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [sortBy, setSortBy] = useState<string>('name');
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        const query = searchParams.get('q');
        const category = searchParams.get('category');
        
        if (query) setSearchQuery(query);
        if (category) setSelectedCategory(category);
    }, [searchParams]);

    const categoryNames = ['All', ...initialCategories.map(c => c.name)];

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
            case 'name':
            default:
                return a.name.localeCompare(b.name);
        }
    });

    // Pagination logic
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery, sortBy]);

    return (
        <div className="min-h-screen bg-[#fcfbf9]">
            <FloatingCart storeSlug="toastpan" accentColor="#B5D04E" />
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link 
                            href="/toastpan"
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-600" />
                        </Link>
                        <h1 className="text-xl font-bold text-[#2D2D2D]">Toastpan Catalog</h1>
                    </div>
                    
                    <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-96">
                        <Search className="w-4 h-4 text-gray-400 mr-2" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search our delicious toasts..."
                            className="bg-transparent border-none focus:outline-none text-sm w-full text-gray-700"
                        />
                    </div>

                    <button 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-full"
                    >
                        <Filter className="w-6 h-6 text-gray-600" />
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-24 space-y-8">
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <SlidersHorizontal className="w-4 h-4" />
                                    Sort By
                                </h3>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#B5D04E] focus:border-transparent transition-all"
                                >
                                    <option value="name">Name (A-Z)</option>
                                    <option value="price-low">Price (Low to High)</option>
                                    <option value="price-high">Price (High to Low)</option>
                                </select>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Categories</h3>
                                <div className="space-y-2">
                                    {categoryNames.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                                selectedCategory === category
                                                    ? 'bg-[#B5D04E] text-white shadow-md shadow-[#B5D04E]/20'
                                                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
                                            }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Mobile Filter Drawer */}
                    {isFilterOpen && (
                        <div className="fixed inset-0 z-50 lg:hidden">
                            <div className="absolute inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)} />
                            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 shadow-xl">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-xl font-bold">Filters</h2>
                                    <button onClick={() => setIsFilterOpen(false)} className="p-2">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                                
                                <div className="space-y-8">
                                    <div className="relative md:hidden">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search toasts..."
                                            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Sort By</h3>
                                        <div className="grid grid-cols-1 gap-2">
                                            {['name', 'price-low', 'price-high'].map((opt) => (
                                                <button
                                                    key={opt}
                                                    onClick={() => setSortBy(opt)}
                                                    className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
                                                        sortBy === opt 
                                                            ? 'border-[#B5D04E] bg-[#B5D04E]/5 text-[#B5D04E]' 
                                                            : 'border-gray-100 text-gray-600'
                                                    }`}
                                                >
                                                    {opt === 'name' ? 'Alphabetical' : opt === 'price-low' ? 'Price: Low to High' : 'Price: High to Low'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Categories</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {categoryNames.map(category => (
                                                <button
                                                    key={category}
                                                    onClick={() => setSelectedCategory(category)}
                                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                                        selectedCategory === category
                                                            ? 'bg-[#B5D04E] text-white shadow-sm'
                                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                    }`}
                                                >
                                                    {category}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => setIsFilterOpen(false)}
                                    className="absolute bottom-6 left-6 right-6 bg-[#B5D04E] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#B5D04E]/20"
                                >
                                    Show Results
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-sm text-gray-500 font-medium">
                                Showing <span className="text-gray-900 font-bold">{filteredProducts.length}</span> results
                                {selectedCategory !== 'All' && <span> in <span className="text-[#B5D04E]">{selectedCategory}</span></span>}
                            </p>
                        </div>

                        {paginatedProducts.length === 0 ? (
                            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="w-10 h-10 text-gray-300" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">No matches found</h2>
                                <p className="text-gray-500 mb-8">Try adjusting your filters or search terms</p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory('All');
                                        setSearchQuery('');
                                    }}
                                    className="text-[#B5D04E] font-bold hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {paginatedProducts.map(product => (
                                        <ToastpanProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-12 flex justify-center items-center gap-2">
                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage(prev => prev - 1)}
                                            className="p-2 rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                                                    currentPage === i + 1
                                                        ? 'bg-[#B5D04E] text-white shadow-md shadow-[#B5D04E]/20'
                                                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                                }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                        <button
                                            disabled={currentPage === totalPages}
                                            onClick={() => setCurrentPage(prev => prev + 1)}
                                            className="p-2 rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors rotate-180"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
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
