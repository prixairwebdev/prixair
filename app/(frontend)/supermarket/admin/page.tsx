"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { dummyProducts } from './../data/dummy-data';
import { dummyOrders } from './../data/dummy-data';

export default function AdminDashboard() {
  const lowStockProducts = dummyProducts.filter((p) => p.stock < 10);
  const recentOrders = dummyOrders.slice(0, 5);
  const totalProducts = dummyProducts.length;
  const totalOrders = dummyOrders.length;
  const totalRevenue = dummyOrders.reduce((sum: number, order) => sum + order.total, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your supermarket inventory and orders</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-3xl mb-2">📦</div>
            <h3 className="text-gray-600 text-sm mb-1">Total Products</h3>
            <p className="text-3xl font-bold text-black">{totalProducts}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-3xl mb-2">🛒</div>
            <h3 className="text-gray-600 text-sm mb-1">Total Orders</h3>
            <p className="text-3xl font-bold text-black">{totalOrders}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="text-gray-600 text-sm mb-1">Total Revenue</h3>
            <p className="text-3xl font-bold text-black">NGN {totalRevenue.toFixed(2)}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-3xl mb-2">⚠️</div>
            <h3 className="text-gray-600 text-sm mb-1">Low Stock Items</h3>
            <p className="text-3xl font-bold text-orange-600">{lowStockProducts.length}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/supermarket/admin/manage-stock" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-xl font-semibold text-black mb-2">Manage Stock</h3>
            <p className="text-gray-600 text-sm">Update product inventory and stock levels</p>
          </Link>

          <Link href="/supermarket/admin/orders" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">📋</div>
            <h3 className="text-xl font-semibold text-black mb-2">Manage Orders</h3>
            <p className="text-gray-600 text-sm">View and update order statuses</p>
          </Link>

          <Link href="/supermarket/admin/products" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">➕</div>
            <h3 className="text-xl font-semibold text-black mb-2">Add Products</h3>
            <p className="text-gray-600 text-sm">Add new products to your inventory</p>
          </Link>
        </div>

        {/* Low Stock Alert */}
        {lowStockProducts.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-black">⚠️ Low Stock Alert</h2>
              <Link href="/supermarket/admin/manage-stock" className="text-orange-600 hover:text-orange-700 font-medium">
                Manage Stock →
              </Link>
            </div>

            <div className="space-y-3">
              {lowStockProducts.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12">
                      <Image
                        src={typeof product.image === 'string' ? product.image : product.image.url || ''}
                        alt={product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div>
                      <h4 className="text-black font-semibold">{product.name}</h4>
                      <p className="text-gray-600 text-sm">{typeof product.category === 'string' ? product.category : product.category?.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-600 font-bold">{product.stock} left</p>
                    <p className="text-gray-500 text-sm">NGN {product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-black">Recent Orders</h2>
            <Link href="/supermarket/admin/orders" className="text-orange-600 hover:text-orange-700 font-medium">
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="text-black font-semibold">Order #{order.id}</h4>
                  <p className="text-gray-600 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-black font-bold">NGN {order.total.toFixed(2)}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/supermarket" className="text-orange-600 hover:text-orange-700 font-medium">
            ← Back to Supermarket
          </Link>
        </div>
      </div>
    </div>
  );
}
