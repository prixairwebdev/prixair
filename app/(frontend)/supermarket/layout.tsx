"use client";

import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import FloatingCart from '@/app/(frontend)/components/brand/FloatingCart';
import SubsidiaryBar from '@/app/(frontend)/components/SubsidiaryBar';

interface SupermarketLayoutProps {
  children: React.ReactNode;
  params?: Promise<Record<string, never>>;
}

export default function SupermarketLayout({ children }: SupermarketLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SubsidiaryBar name="Prixair Supermarket" color="#c2450e" />
      <div className="pt-9">
        <Navbar />
        <main className="flex-1">{children}</main>
        <FloatingCart storeSlug="supermarket" accentColor="#f97316" />
        <Footer />
      </div>
    </div>
  );
}


