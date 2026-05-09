"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Pill } from 'lucide-react';
import { searchProducts } from '@/app/actions/products';
import { Product } from '@/app/actions/supermarket';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

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
    debounceTimer.current = setTimeout(() => runSearch(value.trim()), 800);
  };

  useEffect(() => () => { if (debounceTimer.current) clearTimeout(debounceTimer.current); }, []);

  return (
    <section id="prescription-search" className="py-16 px-6 md:px-14 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Prescription</span>
          <h2 className="mt-1 text-xl font-bold text-gray-900">Search for a Medication</h2>
          <p className="mt-1 text-sm text-gray-500">Type the name of your prescription and we'll find it for you.</p>
        </motion.div>

        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative max-w-2xl mb-10"
        >
          <div className="flex items-center border border-gray-200 focus-within:border-gray-900 transition-colors bg-white">
            <span className="pl-4 text-gray-400">
              {isLoading ? (
                <svg className="animate-spin h-4 w-4" style={{ color: accentColor }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                <Search className="w-4 h-4" />
              )}
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => handleInput(e.target.value)}
              placeholder="e.g. Amoxicillin, Metformin, Ventolin..."
              className="flex-1 px-4 py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 bg-transparent"
            />
            {query && (
              <button
                onClick={() => { setQuery(''); setProducts([]); setHasSearched(false); }}
                className="pr-4 text-gray-400 hover:text-gray-700 text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* Empty state */}
        <AnimatePresence mode="wait">
          {!hasSearched && !isLoading && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 py-12 text-center"
            >
              <Pill className="w-8 h-8 text-gray-200" strokeWidth={1} />
              <p className="text-sm text-gray-400">Start typing to search prescriptions</p>
            </motion.div>
          )}

          {hasSearched && !isLoading && products.length === 0 && (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 py-12 text-center"
            >
              <Search className="w-8 h-8 text-gray-200" strokeWidth={1} />
              <p className="text-sm text-gray-600">No results for &ldquo;{query}&rdquo;</p>
              <Link
                href="/pharmacy/products"
                className="text-xs font-semibold underline text-gray-400 hover:text-gray-700"
              >
                Browse all products
              </Link>
            </motion.div>
          )}

          {products.length > 0 && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs text-gray-400 mb-6">
                <span className="font-semibold text-gray-900">{total}</span> result{total !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
              </p>
              <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-opacity duration-200 ${isLoading ? 'opacity-40' : 'opacity-100'}`}>
                {products.map(product => (
                  <ProductCard key={product.id} product={product} accentColor={accentColor} />
                ))}
              </div>
              {total > 8 && (
                <div className="mt-8">
                  <Link
                    href={`/pharmacy/products?q=${encodeURIComponent(query)}&category=Prescription`}
                    className="inline-block px-6 py-3 text-sm font-semibold text-white transition-colors"
                    style={{ backgroundColor: accentColor }}
                  >
                    View All {total} Results
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
