"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { searchProducts } from "@/app/actions/products";
import { Product } from "@/app/actions/supermarket";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    searchProducts("pharmacy", { sortBy: "price-low", limit: 8, page: 1 }).then((result) => {
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
      <section className="py-16 px-6 md:px-14 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Browse</span>
              <h2 className="mt-1 text-xl font-bold text-gray-900">Shop by Category</h2>
            </div>
            <Link href="/pharmacy/products" className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors">
              All products <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {categories.map((cat, i) => {
              const inner = (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  whileHover={{ y: -3 }}
                  onClick={cat.href.startsWith("#") ? () => handleCategoryClick(cat.href) : undefined}
                  className="flex flex-col items-center gap-2.5 py-5 px-3 bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-300 transition-all duration-200 cursor-pointer group"
                >
                  <div className="w-9 h-9 relative group-hover:scale-110 transition-transform duration-300">
                    <Image src={cat.icon} alt={cat.name} fill sizes="36px" className="object-contain" />
                  </div>
                  <span className="text-[11px] text-center text-gray-600 font-medium leading-tight">{cat.name}</span>
                </motion.div>
              );

              return cat.href.startsWith("#") ? (
                <div key={i}>{inner}</div>
              ) : (
                <Link key={i} href={cat.href}>{inner}</Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Featured</span>
              <h2 className="mt-1 text-xl font-bold text-gray-900">Today&apos;s Best Offers</h2>
            </div>
            <Link
              href="/pharmacy/products"
              className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors whitespace-nowrap"
            >
              See all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-50 border border-gray-100 animate-pulse aspect-square" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
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
