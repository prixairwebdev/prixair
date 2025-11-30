// app/components/TopSellersAndReviews.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const topProducts = [
  {
    name: 'Panadol Extra 500mg',
    price: '₦1,200',
    image: '/products/panadol.png',
  },
  {
    name: 'Multivitamin Gummies',
    price: '₦8,500',
    image: '/products/gummies.png',
  },
  {
    name: 'Dettol Antibacterial Soap',
    price: '₦2,000',
    image: '/products/dettol.png',
  },
  {
    name: 'Pampers Baby-Dry size 3',
    price: '₦4,500',
    image: '/products/pampers.png',
  },
  {
    name: 'Pregnacare Original Tablets',
    price: '₦6,000',
    image: '/products/pregnacare.png',
  },
  {
    name: 'Vitamin C 1000mg',
    price: '₦3,500',
    image: '/products/vitaminc.png',
  },
  {
    name: 'Ventolin Inhaler',
    price: '₦12,000',
    image: '/products/ventolin.png',
  },
  {
    name: 'Moko Hand Sanitizer 250ml',
    price: '₦1,000',
    image: '/products/sanitizer.png',
  },
];

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
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="w-full px-6 py-12 space-y-12">
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
          <motion.button variants={itemVariants} className="text-sm text-gray-500 hover:underline">
            See all
          </motion.button>
        </div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {topProducts.map((product, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition"
            >
              <div className="relative w-full h-40 mb-3">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
                <Heart className="absolute top-2 right-2 w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" />
              </div>
              <h4 className="text-sm font-medium">{product.name}</h4>
              <p className="text-green-600 text-sm mt-1">{product.price}</p>
            </motion.div>
          ))}
        </motion.div>
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