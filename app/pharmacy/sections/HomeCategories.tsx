"use client";

import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { name: "Prescription", icon: "/icons/pill.png" },
  { name: "Over the Counter", icon: "/icons/syrup.png" },
  { name: "Wellness", icon: "/icons/flower.png" },
  { name: "Baby & Mother Care", icon: "/icons/baby.png" },
  { name: "Personal Hygiene", icon: "/icons/plaster.png" },
  { name: "First Aid", icon: "/icons/drop.png" },
];

const products = [
  {
    name: "Pregnacare Original Tablets",
    price: "₦6,000",
    image: "/products/pregnacare.png",
  },
  {
    name: "Vitamin C 1000mg",
    price: "₦3,500",
    image: "/products/vitaminc.png",
  },
  {
    name: "Ventolin Inhaler",
    price: "₦12,000",
    image: "/products/ventolin.png",
  },
  {
    name: "Moko Hand Sanitizer 250ml",
    price: "₦1,000",
    image: "/products/sanitizer.png",
  },
];

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HomeCategories() {
  return (
    <div className="w-full px-6 py-10 max-w-7xl mx-auto">
      {/* Categories */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-100px" }}
        variants={container}
        className="text-center mb-8"
      >
        <motion.h2 variants={item} className="text-xl font-semibold">
          Explore Our Categories
        </motion.h2>
        <motion.p variants={item} className="text-gray-500 text-sm">
          Browse by category to get started.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-100px" }}
        variants={container}
        className="grid grid-cols-3 gap-4 sm:flex sm:gap-6 sm:overflow-x-auto sm:pb-4 sm:scrollbar-hide md:justify-center"
      >
        {categories.map((cat, idx) => (
          <motion.div
            key={idx}
            variants={item}
            className="flex flex-col items-center gap-2 p-2 sm:w-[200px] sm:flex-shrink-0"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 relative">
              <Image
                src={cat.icon}
                alt={cat.name}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-sm text-center md:text-base">{cat.name}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Today's Best Offer */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-100px" }}
        variants={container}
        className="mt-12 flex justify-between items-center mb-4"
      >
        <motion.h3 variants={item} className="text-lg font-semibold">
          Today&apos;s Best Offer
        </motion.h3>
        <motion.button
          variants={item}
          className="text-sm text-gray-500 hover:underline"
        >
          See all
        </motion.button>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-100px" }}
        variants={container}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {products.map((product, idx) => (
          <motion.div
            key={idx}
            variants={item}
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
            <h4 className="text-sm font-medium md:text-base">{product.name}</h4>
            <p className="text-green-600 text-sm md:text-base mt-1">
              {product.price}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
