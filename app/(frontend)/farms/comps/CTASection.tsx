"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 md:px-14 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-white/40 font-medium">From Farm to Table</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white leading-tight">
            Ready to Taste the Difference?
          </h2>
          <p className="mt-4 text-white/60 leading-relaxed">
            Whether you're a home cook, restaurant, or bulk buyer — Prixair Farms is your trusted source for natural, farm-fresh produce.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-4"
        >
          <Link
            href="/farms/our-farm"
            className="px-6 py-3 bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-colors"
          >
            Our Farm
          </Link>
          <Link
            href="/farms/contact"
            className="px-6 py-3 border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
