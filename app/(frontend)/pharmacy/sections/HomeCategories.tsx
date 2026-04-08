"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { searchProducts } from "@/app/actions/products";
import { Product } from "@/app/actions/supermarket";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const accentColor = "#8AD52E";

const categories = [
  { name: "Prescription", icon: "/icons/pill.png", href: "#prescription-search" },
  { name: "Over the Counter", icon: "/icons/syrup.png", href: "/pharmacy/products?category=Over+the+Counter" },
  { name: "Wellness", icon: "/icons/flower.png", href: "/pharmacy/products?category=Wellness" },
  { name: "Baby & Mother Care", icon: "/icons/baby.png", href: "/pharmacy/products?category=Baby+%26+Mother+Care" },
  { name: "Personal Hygiene", icon: "/icons/plaster.png", href: "/pharmacy/products?category=Personal+Hygiene" },
  { name: "First Aid", icon: "/icons/drop.png", href: "/pharmacy/products?category=First+Aid" },
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
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    searchProducts('pharmacy', { sortBy: 'price-low', limit: 4, page: 1 }).then(result => {
      setProducts(result.products);
      setIsLoading(false);
    });
  }, []);

  const handleCategoryClick = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            className="flex flex-col items-center gap-2 p-2 sm:w-[200px] sm:flex-shrink-0 cursor-pointer"
            onClick={() => cat.href.startsWith('#') ? handleCategoryClick(cat.href) : undefined}
          >
            {cat.href.startsWith('#') ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 md:w-14 md:h-14 relative">
                  <Image src={cat.icon} alt={cat.name} fill className="object-contain" />
                </div>
                <span className="text-sm text-center md:text-base hover:underline" style={{ color: accentColor }}>{cat.name}</span>
              </div>
            ) : (
              <Link href={cat.href} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 md:w-14 md:h-14 relative">
                  <Image src={cat.icon} alt={cat.name} fill className="object-contain" />
                </div>
                <span className="text-sm text-center md:text-base hover:underline">{cat.name}</span>
              </Link>
            )}
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
        <Link href="/pharmacy/products">
          <motion.span variants={item} className="text-sm text-gray-500 hover:underline cursor-pointer">
            See all
          </motion.span>
        </Link>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm border animate-pulse h-64" />
          ))}
        </div>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-100px" }}
          variants={container}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={item}>
              <ProductCard product={product} accentColor={accentColor} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
