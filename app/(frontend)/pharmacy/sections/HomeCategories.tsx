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

export default function HomeCategories() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    searchProducts("pharmacy", { sortBy: "price-low", limit: 4, page: 1 }).then((result) => {
      setProducts(result.products);
      setIsLoading(false);
    });
  }, []);

  const handleCategoryClick = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white">
      {/* Categories */}
      <section className="py-24 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Browse</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">Explore Our Categories</h2>
            <p className="mt-3 text-gray-500 max-w-lg">Find what you need — from prescriptions to wellness essentials.</p>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {categories.map((cat, i) => {
              const content = (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center gap-3 p-5 border border-gray-100 hover:border-[#8AD52E] transition-all duration-300 cursor-pointer group"
                  onClick={cat.href.startsWith("#") ? () => handleCategoryClick(cat.href) : undefined}
                >
                  <div className="w-10 h-10 relative group-hover:scale-110 transition-transform duration-300">
                    <Image src={cat.icon} alt={cat.name} fill className="object-contain" />
                  </div>
                  <span className="text-xs text-center text-gray-600 font-medium leading-snug">{cat.name}</span>
                </motion.div>
              );

              return cat.href.startsWith("#") ? (
                <div key={i}>{content}</div>
              ) : (
                <Link key={i} href={cat.href}>{content}</Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Today's Best Offer */}
      <section className="py-24 bg-gray-50 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-14"
          >
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Featured</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">Today&apos;s Best Offers</h2>
            </div>
            <Link href="/pharmacy/products" className="text-sm font-semibold text-gray-900 border-b border-gray-900 pb-0.5 hover:border-gray-400 transition-colors whitespace-nowrap">
              See all →
            </Link>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-100 animate-pulse h-64" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <ProductCard product={product} accentColor={accentColor} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
