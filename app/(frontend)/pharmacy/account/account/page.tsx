"use client";

import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useOrders } from '../contexts/OrderContext';

export default function AccountPage() {
  const { user, logout } = useAuth();
  const { orders } = useOrders();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/pharmacy/account/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const userOrders = orders.filter(order => order.userId === user.id);
  const recentOrders = userOrders.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">My Account</h1>
              <p className="text-gray-600">Welcome back, {user.name}!</p>
            </div>
            <button
              onClick={() => {
                logout();
                router.push('/pharmacy');
              }}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/pharmacy/account/orders" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">📦</div>
            <h3 className="text-xl font-semibold text-black mb-2">My Orders</h3>
            <p className="text-gray-600 text-sm">View and track your orders</p>
            <p className="text-orange-600 font-bold mt-2">{userOrders.length} orders</p>
          </Link>

          <Link href="/pharmacy/account/wishlist" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">❤️</div>
            <h3 className="text-xl font-semibold text-black mb-2">Wishlist</h3>
            <p className="text-gray-600 text-sm">Manage your saved items</p>
          </Link>

          <Link href="/pharmacy/account/addresses" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">📍</div>
            <h3 className="text-xl font-semibold text-black mb-2">Addresses</h3>
            <p className="text-gray-600 text-sm">Manage delivery addresses</p>
          </Link>

          <Link href="/pharmacy/account/profile" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">👤</div>
            <h3 className="text-xl font-semibold text-black mb-2">Profile Settings</h3>
            <p className="text-gray-600 text-sm">Update your information</p>
          </Link>

          <Link href="/pharmacy/account/reviews" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">⭐</div>
            <h3 className="text-xl font-semibold text-black mb-2">My Reviews</h3>
            <p className="text-gray-600 text-sm">View and manage reviews</p>
          </Link>

          <Link href="/pharmacy" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">🛒</div>
            <h3 className="text-xl font-semibold text-black mb-2">Continue Shopping</h3>
            <p className="text-gray-600 text-sm">Browse our products</p>
          </Link>
        </div>

        {recentOrders.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-black">Recent Orders</h2>
              <Link href="/pharmacy/account/orders" className="text-orange-600 hover:text-orange-700 font-medium">
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-semibold text-black">Order #{order.id}</span>
                      <span className="text-gray-500 text-sm ml-3">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    {order.items.length} item(s) • NGN {order.total.toFixed(2)}
                  </p>
                  <Link
                    href={`/pharmacy/account/orders`}
                    className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
