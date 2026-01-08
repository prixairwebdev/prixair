"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// Dummy admin credentials
const ADMIN_CREDENTIALS = {
  email: 'admin@prixair.com',
  password: 'admin123', // In production, use proper authentication
};

const ADMIN_USER: AdminUser = {
  id: 'admin-001',
  email: 'admin@prixair.com',
  name: 'Admin User',
  role: 'admin',
};

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);

  useEffect(() => {
    // Check for existing admin session
    const storedAdmin = localStorage.getItem('admin_session');
    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch {
        localStorage.removeItem('admin_session');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Dummy authentication - replace with real authentication in production
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setAdmin(ADMIN_USER);
      localStorage.setItem('admin_session', JSON.stringify(ADMIN_USER));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin_session');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        login,
        logout,
        isAuthenticated: !!admin,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
