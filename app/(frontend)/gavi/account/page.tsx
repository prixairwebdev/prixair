"use client";

import React from 'react';
import { useAuth } from '@/components/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function GaviAccountPage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    if (!user) {
        router.push('/gavi/account/login');
        return null;
    }

    return (
        <div className="min-h-screen bg-[#fcfbf9] py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[#373435]">My Account</h1>
                        <p className="text-gray-600">Welcome back, {user.name}</p>
                    </div>
                    <button
                        onClick={() => {
                            logout();
                            router.push('/gavi');
                        }}
                        className="text-red-500 hover:text-red-700 font-medium border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        Sign Out
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link href="/gavi/account/orders" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                        <div className="w-12 h-12 bg-[#F3A35C]/10 rounded-full flex items-center justify-center mb-4 text-[#F3A35C] group-hover:scale-110 transition-transform">
                            📦
                        </div>
                        <h3 className="text-lg font-semibold text-[#373435] mb-2">Orders</h3>
                        <p className="text-gray-500 text-sm">View and track your orders</p>
                    </Link>

                    <Link href="/gavi/account/addresses" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                        <div className="w-12 h-12 bg-[#F3A35C]/10 rounded-full flex items-center justify-center mb-4 text-[#F3A35C] group-hover:scale-110 transition-transform">
                            📍
                        </div>
                        <h3 className="text-lg font-semibold text-[#373435] mb-2">Addresses</h3>
                        <p className="text-gray-500 text-sm">Manage shipping addresses</p>
                    </Link>

                    <Link href="/gavi/account/profile" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                        <div className="w-12 h-12 bg-[#F3A35C]/10 rounded-full flex items-center justify-center mb-4 text-[#F3A35C] group-hover:scale-110 transition-transform">
                            👤
                        </div>
                        <h3 className="text-lg font-semibold text-[#373435] mb-2">Profile</h3>
                        <p className="text-gray-500 text-sm">Update personal information</p>
                    </Link>

                    <Link href="/gavi/account/wishlist" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                        <div className="w-12 h-12 bg-[#F3A35C]/10 rounded-full flex items-center justify-center mb-4 text-[#F3A35C] group-hover:scale-110 transition-transform">
                            ❤️
                        </div>
                        <h3 className="text-lg font-semibold text-[#373435] mb-2">Wishlist</h3>
                        <p className="text-gray-500 text-sm">View your favorite products</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
