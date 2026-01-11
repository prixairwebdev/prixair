"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types/types';
import { dummyUsers } from '../data/dummy-data';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage on mount
    try {
      const savedUser = localStorage.getItem('prixair_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Failed to load user from localStorage', e);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Dummy authentication - check against dummy users
    const foundUser = dummyUsers.find(u => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('prixair_user', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const register = async (name: string, email: string, password: string, phone?: string): Promise<boolean> => {
    // Dummy registration - create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      phone,
      createdAt: new Date().toISOString(),
    };
    
    setUser(newUser);
    localStorage.setItem('prixair_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('prixair_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
