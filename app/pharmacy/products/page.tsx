"use client";

import React from 'react';
import { dummyProducts } from '../../supermarket/data/dummy-data';
import ProductCard from '../../supermarket/components/ProductCard';
import Link from 'next/link';

export default function PharmacyProductsPage() {
  const pharmacyProducts = dummyProducts.filter(p => p.store === 'pharmacy');

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">Pharmacy Products</h1>
          <p className="text-gray-600">Browse our selection of medicines and health products</p>
        </div>

        {pharmacyProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">💊</div>
            <h2 className="text-2xl font-bold text-black mb-2">No Products Available</h2>
            <p className="text-gray-600 mb-6">Check back soon for pharmacy products</p>
            <Link
              href="/pharmacy"
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              Back to Pharmacy Home
            </Link>
          </div>
        ) : (
          <div>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <p className="text-black font-medium">{pharmacyProducts.length} product(s) available</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {pharmacyProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/pharmacy" className="text-green-600 hover:text-green-700 font-medium">
            ← Back to Pharmacy Home
          </Link>
        </div>
      </div>
    </div>
  );
}
