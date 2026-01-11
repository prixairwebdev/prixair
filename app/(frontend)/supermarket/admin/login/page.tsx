"use client";

import React, { useState } from 'react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdminAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.push('/supermarket/admin');
      } else {
        setError('Invalid admin credentials. Try: admin@prixair.com / admin123');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white border-2 border-gray-200 rounded-lg p-8 shadow-sm">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🔐</div>
            <h1 className="text-3xl font-bold text-black mb-2">Admin Login</h1>
            <p className="text-gray-600">Access the admin dashboard</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-black font-medium mb-2">
                Admin Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="admin@prixair.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-black font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Logging in...' : 'Login as Admin'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-2">
              Demo credentials:
            </p>
            <p className="text-sm text-black text-center font-mono bg-gray-100 p-2 rounded">
              admin@prixair.com / admin123
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/supermarket" className="text-orange-600 hover:text-orange-700">
            ← Back to Supermarket
          </Link>
        </div>
      </div>
    </div>
  );
}
