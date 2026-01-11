"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { dummyProducts } from '../../data/dummy-data';
import { Product } from '../../types/types';
import ImageUpload from '../../components/ImageUpload';
import CategoryDropdown from '../../components/CategoryDropdown';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    image: '',
    store: 'supermarket' as 'supermarket' | 'bakery' | 'pharmacy',
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      ...formData,
      rating: 0,
      reviewCount: 0,
    };

    setProducts([...products, newProduct]);
    setShowAddForm(false);
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: '',
      stock: 0,
      image: '',
      store: 'supermarket',
    });
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/supermarket/admin" className="text-orange-600 hover:text-orange-700">
            ← Back to Admin Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">Product Management</h1>
              <p className="text-gray-600">Add, edit, or remove products from your inventory</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              + Add Product
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-bold text-black mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-black font-medium mb-2">Product Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                    required
                  />
                </div>
                <CategoryDropdown
                  value={formData.category}
                  onChange={(category) => setFormData({ ...formData, category })}
                  required
                />
              </div>

              <div>
                <label className="block text-black font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-black font-medium mb-2">Price (NGN)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-black font-medium mb-2">Stock Quantity</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-black font-medium mb-2">Store</label>
                  <select
                    value={formData.store}
                    onChange={(e) => setFormData({ ...formData, store: e.target.value as any })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                  >
                    <option value="supermarket">Supermarket</option>
                    <option value="bakery">Bakery</option>
                    <option value="pharmacy">Pharmacy</option>
                  </select>
                </div>
              </div>

              <ImageUpload
                value={formData.image}
                onChange={(image) => setFormData({ ...formData, image })}
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
                >
                  Add Product
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-200 text-black px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-black mb-4">All Products ({products.length})</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <h3 className="text-black font-semibold mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-orange-600 font-bold">NGN {product.price.toFixed(2)}</span>
                  <span className="text-gray-500 text-sm">Stock: {product.stock}</span>
                </div>
                <p className="text-gray-500 text-xs mb-3">{product.category} • {product.store}</p>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-sm font-medium"
                >
                  Delete Product
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            💡 <strong>Note:</strong> Product changes are saved locally for demo purposes. In production, these will be synced with your Supabase database.
          </p>
        </div>
      </div>
    </div>
  );
}
