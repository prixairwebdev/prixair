"use client";

import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

interface SupermarketLayoutProps {
  children: React.ReactNode;
  params?: Promise<Record<string, never>>;
}

export default function SupermarketLayout({ children }: SupermarketLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}


