"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { searchProducts } from '@/app/actions/products';
import { Product } from '@/app/actions/supermarket';
import ProductCard from '@/components/ProductCard';

const accentColor = '#8AD52E';

export default function PrescriptionSearch() {
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const latestQuery = useRef('');

    const runSearch = async (q: string) => {
        const id = q;
        latestQuery.current = id;
        setIsLoading(true);
        try {
            const result = await searchProducts('pharmacy', {
                query: q,
                category: 'Prescription',
                limit: 8,
                page: 1,
            });
            if (latestQuery.current !== id) return;
            setProducts(result.products);
            setTotal(result.total);
            setHasSearched(true);
        } catch (err) {
            console.error(err);
        } finally {
            if (latestQuery.current === id) setIsLoading(false);
        }
    };

    const handleInput = (value: string) => {
        setQuery(value);
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        if (!value.trim()) {
            setProducts([]);
            setHasSearched(false);
            setIsLoading(false);
            return;
        }
        debounceTimer.current = setTimeout(() => runSearch(value.trim()), 1000);
    };

    useEffect(() => () => { if (debounceTimer.current) clearTimeout(debounceTimer.current); }, []);

    return (
        <section id="prescription-search" className="w-full bg-gray-50 py-16 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: '-100px' }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
                        Search for a Prescription
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base">
                        Type the name of your medication or prescription to find it instantly.
                    </p>
                </motion.div>

                {/* Search Input */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: '-100px' }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative max-w-2xl mx-auto mb-10"
                >
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => handleInput(e.target.value)}
                        placeholder="e.g. Amoxicillin, Metformin, Ventolin..."
                        className="w-full border-2 rounded-2xl px-6 py-4 text-black text-base focus:outline-none transition-all placeholder:text-gray-400 pr-14 shadow-sm"
                        style={{ borderColor: query ? accentColor : '#E5E7EB' }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = accentColor)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = query ? accentColor : '#E5E7EB')}
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5" style={{ color: accentColor }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                            </svg>
                        )}
                    </span>
                </motion.div>

                {/* Results */}
                {!hasSearched && !isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-10 text-gray-400"
                    >
                        <div className="text-5xl mb-4">💊</div>
                        <p className="text-sm">Start typing to search prescriptions</p>
                    </motion.div>
                )}

                {hasSearched && !isLoading && products.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-10"
                    >
                        <div className="text-5xl mb-4">🔍</div>
                        <p className="text-gray-500">No prescriptions found for &ldquo;{query}&rdquo;</p>
                        <p className="text-sm text-gray-400 mt-1">Try a different name or <a href="/pharmacy/products" className="underline" style={{ color: accentColor }}>browse all products</a></p>
                    </motion.div>
                )}

                {products.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="text-sm text-gray-500 mb-6 text-center">
                            Found <span className="font-bold" style={{ color: accentColor }}>{total}</span> result{total !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
                        </p>
                        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 transition-opacity duration-200 ${isLoading ? 'opacity-40' : 'opacity-100'}`}>
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} accentColor={accentColor} />
                            ))}
                        </div>
                        {total > 8 && (
                            <div className="text-center mt-8">
                                <a
                                    href={`/pharmacy/products?q=${encodeURIComponent(query)}&category=Prescription`}
                                    className="inline-block px-8 py-3 rounded-xl font-bold text-white transition-all"
                                    style={{ backgroundColor: accentColor }}
                                >
                                    View All {total} Results
                                </a>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </section>
    );
}
