"use client";

import React from 'react';
import { useAuth } from '@/components/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const PRIMARY_COLOR = "#F5A623";
const SECONDARY_COLOR = "#E30000";
const STORE_SLUG = "shawarmanomnow";

export default function AccountPage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    if (!user) {
        router.push(`/${STORE_SLUG}/account/login`);
        return null;
    }

    return (
        <div className="min-h-screen bg-[#fcfbf9] py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1A1A1A]">My Account</h1>
                        <p className="text-gray-600">Welcome back, {user.name}</p>
                    </div>
                    <button
                        onClick={() => {
                            logout();
                            router.push(`/${STORE_SLUG}`);
                        }}
                        className="text-red-500 hover:text-red-700 font-medium border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        Sign Out
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link href={`/${STORE_SLUG}/account/orders`} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${PRIMARY_COLOR}1A`, color: PRIMARY_COLOR }}>
                            📦
                        </div>
                        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">Orders</h3>
                        <p className="text-gray-500 text-sm">View and track your orders</p>
                    </Link>

                    <Link href={`/${STORE_SLUG}/account/addresses`} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${PRIMARY_COLOR}1A`, color: PRIMARY_COLOR }}>
                            📍
                        </div>
                        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">Addresses</h3>
                        <p className="text-gray-500 text-sm">Manage shipping addresses</p>
                    </Link>

                    <Link href={`/${STORE_SLUG}/account/profile`} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${PRIMARY_COLOR}1A`, color: PRIMARY_COLOR }}>
                            👤
                        </div>
                        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">Profile</h3>
                        <p className="text-gray-500 text-sm">Update personal information</p>
                    </Link>

                    <Link href={`/${STORE_SLUG}/account/wishlist`} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${SECONDARY_COLOR}1A`, color: SECONDARY_COLOR }}>
                            ❤️
                        </div>
                        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">Wishlist</h3>
                        <p className="text-gray-500 text-sm">View your favourite products</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
