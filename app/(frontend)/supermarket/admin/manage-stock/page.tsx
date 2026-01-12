"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { dummyProducts } from '../../data/dummy-data';
import { Product } from '../../types/types';
import ProductEditModal from '../../components/ProductEditModal';

export default function ManageStockPage() {
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStock, setEditStock] = useState<number>(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(p => {
    const categoryName = typeof p.category === 'string' ? p.category : p.category.name;
    return (
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      categoryName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleUpdateStock = (productId: string) => {
    setProducts(products.map(p =>
      p.id === productId ? { ...p, stock: editStock } : p
    ));
    setEditingId(null);
    setEditStock(0);
  };

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setEditStock(product.stock || 0);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    setProducts(products.map(p =>
      p.id === updatedProduct.id ? updatedProduct : p
    ));
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
          <h1 className="text-3xl font-bold text-black mb-2">Manage Stock</h1>
          <p className="text-gray-600">Update product inventory and stock levels</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name or category..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-black font-semibold">Product</th>
                  <th className="text-left px-6 py-4 text-black font-semibold">Category</th>
                  <th className="text-left px-6 py-4 text-black font-semibold">Price</th>
                  <th className="text-left px-6 py-4 text-black font-semibold">Stock</th>
                  <th className="text-left px-6 py-4 text-black font-semibold">Status</th>
                  <th className="text-left px-6 py-4 text-black font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12">
                          <Image
                            src={typeof product.image === 'string' ? product.image : product.image.url || ''}
                            alt={product.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <span className="text-black font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {typeof product.category === 'string' ? product.category : product.category.name}
                    </td>
                    <td className="px-6 py-4 text-black font-semibold">NGN {product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      {editingId === product.id ? (
                        <input
                          type="number"
                          value={editStock}
                          onChange={(e) => setEditStock(parseInt(e.target.value) || 0)}
                          className="w-24 border border-gray-300 rounded px-3 py-1 text-black"
                          min="0"
                        />
                      ) : (
                        <span className={`font-semibold ${
                          (product.stock || 0) === 0 ? 'text-red-600' :
                          (product.stock || 0) < 10 ? 'text-orange-600' :
                          'text-green-600'
                        }`}>
                          {product.stock ?? 0}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {(product.stock || 0) === 0 ? (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                          Out of Stock
                        </span>
                      ) : (product.stock || 0) < 10 ? (
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                          Low Stock
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          In Stock
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === product.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateStock(product.id)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm font-medium"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400 text-sm font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditing(product)}
                            className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                          >
                            Edit Stock
                          </button>
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                          >
                            Edit Product
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found</p>
            </div>
          )}
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            💡 <strong>Note:</strong> Stock changes are saved locally for demo purposes. In production, these will be synced with your Supabase database.
          </p>
        </div>

        {selectedProduct && (
          <ProductEditModal
            product={selectedProduct}
            isOpen={showEditModal}
            onClose={() => {
              setShowEditModal(false);
              setSelectedProduct(null);
            }}
            onSave={handleSaveProduct}
          />
        )}
      </div>
    </div>
  );
}
