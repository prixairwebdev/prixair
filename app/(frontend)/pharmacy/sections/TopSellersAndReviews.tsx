"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { searchProducts } from "@/app/actions/products";
import { Product } from "@/app/actions/supermarket";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const accentColor = "#8AD52E";

const testimonials = [
  {
    name: "Jordan A.",
    message: "I uploaded my prescription and got my meds delivered the same day — so convenient!",
  },
  {
    name: "Fatima O.",
    message: "Finally a pharmacy that actually stocks everything I need. The checkout process is seamless.",
  },
  {
    name: "Emeka B.",
    message: "Fast, reliable, and professional. My go-to for all wellness products and prescription meds.",
  },
];

export default function TopSellersAndReviews() {
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    searchProducts("pharmacy", { sortBy: "rating", limit: 8, page: 1 }).then((result) => {
      setTopProducts(result.products);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="bg-white">
      {/* Top Sellers */}
      <section className="py-24 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-14"
          >
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Popular</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">Top Sellers</h2>
            </div>
            <Link
              href="/pharmacy/products"
              className="text-sm font-semibold text-gray-900 border-b border-gray-900 pb-0.5 hover:border-gray-400 transition-colors whitespace-nowrap"
            >
              See all →
            </Link>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-50 border border-gray-100 animate-pulse h-64" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {topProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <ProductCard product={product} accentColor={accentColor} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-gray-50 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Customer Reviews</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 border-t-2 border-gray-200 hover:border-[#8AD52E] transition-all duration-300"
              >
                <p className="text-3xl text-gray-200 font-serif mb-4">"</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{t.message}</p>
                <p className="text-gray-900 font-semibold text-sm">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
