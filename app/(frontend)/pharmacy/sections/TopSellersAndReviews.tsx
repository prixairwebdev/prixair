// app/components/TopSellersAndReviews.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { searchProducts } from '@/app/actions/products';
import { Product } from '@/app/actions/supermarket';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

const accentColor = '#8AD52E';

const testimonials = [
  {
    name: 'Jordan A.',
    message: 'I uploaded my prescription and got my meds delivered the same day — so convenient!',
    rating: 5,
  },
  {
    name: 'Jordan A.',
    message: 'I uploaded my prescription and got my meds delivered the same day — so convenient!',
    rating: 5,
  },
  {
    name: 'Jordan A.',
    message: 'I uploaded my prescription and got my meds delivered the same day — so convenient!',
    rating: 5,
  },
];

// Animation variants with proper typing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function TopSellersAndReviews() {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    searchProducts('pharmacy', { sortBy: 'rating', limit: 8, page: 1 }).then(result => {
      setTopProducts(result.products);
      setIsLoading(false);
    });
  }, []);

  return (
    <div ref={ref} className="w-full px-6 py-12 space-y-12 text-black">
      {/* Top Sellers */}
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="flex justify-between items-center mb-4">
          <motion.h3 variants={itemVariants} className="text-lg font-semibold">
            Top Sellers
          </motion.h3>
          <Link href="/pharmacy/products">
            <motion.span variants={itemVariants} className="text-sm text-gray-500 hover:underline cursor-pointer">
              See all
            </motion.span>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-sm border animate-pulse h-64" />
            ))}
          </div>
        ) : (
          <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {topProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} accentColor={accentColor} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Testimonials */}
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="text-center mt-16"
      >
        <motion.h3 variants={itemVariants} className="text-lg font-semibold">
          What Our Customers Say
        </motion.h3>
        <motion.p variants={itemVariants} className="text-sm text-gray-500">
          Real Stories, Real Satisfaction
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="grid md:grid-cols-3 gap-6 mt-6"
      >
        {testimonials.map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="border rounded-lg p-6 shadow-sm bg-white"
          >
            <h4 className="font-medium text-sm mb-2">{item.name}</h4>
            <p className="text-sm text-gray-600 mb-4">{item.message}</p>
            <div className="flex space-x-1 text-yellow-400">
              {[...Array(item.rating)].map((_, starIdx) => (
                <Star key={starIdx} size={16} fill="currentColor" />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center mt-6"
      >
        <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">
          See All Review
        </button>
      </motion.div>
    </div>
  );
}