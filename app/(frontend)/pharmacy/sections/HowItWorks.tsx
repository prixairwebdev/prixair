"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Truck } from "lucide-react";

const accentColor = "#8AD52E";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Search Your Medication",
    desc: "Type the name of your prescription or browse our catalog for the medications you need.",
  },
  {
    icon: ShoppingCart,
    step: "02",
    title: "Add to Cart & Pay",
    desc: "Select your items, review your cart, and checkout securely with multiple payment options.",
  },
  {
    icon: Truck,
    step: "03",
    title: "Get Fast Delivery",
    desc: "Your order is processed by a licensed pharmacist and delivered safely to your doorstep.",
  },
];

export default function HowItWorks() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/pharmacy/products?q=${encodeURIComponent(query.trim())}&category=Prescription`);
  };

  return (
    <div className="bg-white">
      {/* How It Works */}
      <section className="py-24 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Process</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-3 text-gray-500 max-w-lg">
              Order your medications in just a few easy steps.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  whileHover={{ y: -6 }}
                  className="border-t-2 border-gray-200 hover:border-[#8AD52E] transition-all duration-300 pt-8 pb-6 group"
                >
                  <p className="text-4xl font-bold text-gray-100 mb-4 font-mono">{s.step}</p>
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300 w-fit">
                    <Icon className="w-8 h-8 text-[#8AD52E]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Prescription Search */}
      <section id="prescription-search" className="py-24 bg-gray-50 px-6 md:px-14">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Prescription</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Have a Prescription?
            </h2>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Type the name of your prescribed medication and our pharmacists will verify availability,
              recommend alternatives if needed, and prepare your order for fast delivery.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
              <label className="text-sm font-medium text-gray-700">Search prescription by name</label>
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Amoxicillin, Metformin, Ventolin..."
                  className="w-full border border-gray-200 px-5 py-4 text-sm text-gray-900 focus:outline-none focus:border-[#8AD52E] transition-colors placeholder:text-gray-400 bg-white pr-12"
                  onFocus={(e) => (e.currentTarget.style.borderColor = accentColor)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = query ? accentColor : "#E5E7EB")}
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity"
                >
                  <Search className="w-4 h-4 text-gray-400 hover:text-gray-700" />
                </button>
              </div>
              <button
                type="submit"
                disabled={!query.trim()}
                className="w-full py-4 font-semibold text-white text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: accentColor }}
              >
                Search Prescriptions
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
