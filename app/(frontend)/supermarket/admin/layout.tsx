"use client";

import React, { useEffect } from 'react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { AdminAuthProvider } from '../contexts/AdminAuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminProtectedRoute>{children}</AdminProtectedRoute>
    </AdminAuthProvider>
  );
}

function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Allow access to login page without authentication
    if (!isAuthenticated && pathname !== '/supermarket/admin/login') {
      router.push('/supermarket/admin/login');
    }
  }, [isAuthenticated, pathname, router]);

  // Show loading or redirect for non-authenticated users
  if (!isAuthenticated && pathname !== '/supermarket/admin/login') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🔒</div>
          <p className="text-gray-600">Redirecting to admin login...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
