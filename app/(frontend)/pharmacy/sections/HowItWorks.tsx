// app/components/HowItWorks.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const accentColor = '#8AD52E';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function HowItWorks() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/pharmacy/products?q=${encodeURIComponent(query.trim())}&category=Prescription`);
  };

  return (
    <div className="w-full px-6 py-12 space-y-12 text-black">
      {/* How it Works Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, margin: "-100px" }}
        className="text-center"
      >
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="text-gray-500 text-sm">Order your medications in just a few easy steps.</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          {
            title: 'Search Your Medication',
            desc: 'Type the name of your prescription or browse our catalog for the medications you need.',
            icon: '/icons/upload.png',
            step: '01',
          },
          {
            title: 'Add to Cart & Pay',
            desc: 'Select your items, review your cart, and checkout securely with multiple payment options.',
            icon: '/icons/cart.png',
            step: '02',
          },
          {
            title: 'Get Fast Delivery',
            desc: 'Your order is processed by a licensed pharmacist and delivered safely to your doorstep.',
            icon: '/icons/delivery.png',
            step: '03',
          },
        ].map((itemData, idx) => (
          <motion.div
            key={idx}
            variants={item}
            className="border rounded-lg p-6 text-center space-y-4 bg-white shadow-sm"
          >
            <div className="text-2xl font-bold text-gray-300">{itemData.step}</div>
            <Image src={itemData.icon} alt={itemData.title} width={60} height={60} className="mx-auto" />
            <h3 className="font-medium text-lg">{itemData.title}</h3>
            <p className="text-sm text-gray-500">{itemData.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Prescription Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, margin: "-100px" }}
        className="grid md:grid-cols-2 gap-8 items-center bg-[#F6F6F6] px-6 py-10 w-full rounded-xl"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: false }}
        >
          <h3 className="text-lg font-semibold mb-2">Have a Prescription?</h3>
          <p className="text-sm text-gray-600">
            Type the name of your prescribed medication and our pharmacists will verify availability,
            recommend alternatives if needed, and prepare your order for fast delivery to your doorstep.
          </p>
        </motion.div>

        {/* Search input */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: false }}
        >
          <form onSubmit={handleSearch} className="flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-700">Search prescription by name</label>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Amoxicillin, Metformin, Ventolin..."
                className="w-full border-2 rounded-xl px-5 py-3.5 text-black text-sm focus:outline-none transition-all placeholder:text-gray-400 pr-12 bg-white shadow-sm"
                style={{ borderColor: query ? accentColor : '#E5E7EB' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = accentColor)}
                onBlur={(e) => (e.currentTarget.style.borderColor = query ? accentColor : '#E5E7EB')}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg transition-all"
                style={{ backgroundColor: query ? accentColor : '#E5E7EB' }}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </button>
            </div>
            <button
              type="submit"
              disabled={!query.trim()}
              className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: accentColor }}
            >
              Search Prescriptions
            </button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
