"use client";

import React, { useState } from 'react';
import { dummyProducts } from '../data/dummy-data';
import ProductCard from '../components/ProductCard';
import Link from 'next/link';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('name');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...Array.from(new Set(dummyProducts.map(p => p.category)))];

  let filteredProducts = dummyProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-black mb-2">All Products</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/supermarket" className="hover:text-orange-600">Home</Link>
            <span>›</span>
            <span className="text-black">Products</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold text-black mb-4">Filters</h2>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-black font-semibold mb-2">Search</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                />
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-black font-semibold mb-2">Category</label>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-black hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-black font-semibold mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <p className="text-black font-medium">
                Showing {filteredProducts.length} product(s)
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-black mb-2">No Products Found</h2>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
