"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { searchProducts } from "@/app/actions/products";
import { Product } from "@/app/actions/supermarket";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
      <section className="py-16 px-6 md:px-14 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Popular</span>
              <h2 className="mt-1 text-xl font-bold text-gray-900">Top Sellers</h2>
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
              {topProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <ProductCard product={product} accentColor={accentColor} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-gray-50 px-6 md:px-14 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Reviews</span>
            <h2 className="mt-1 text-xl font-bold text-gray-900">What Our Customers Say</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="bg-white p-7 border-t-2 border-gray-200 hover:border-[#8AD52E] transition-all duration-300"
              >
                <p className="text-3xl text-gray-200 font-serif mb-3">"</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{t.message}</p>
                <p className="text-gray-900 font-semibold text-sm">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
