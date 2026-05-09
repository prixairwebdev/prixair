"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
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
          <span className="text-xs tracking-[0.3em] uppercase text-white/40 font-medium">NAFDAC Approved</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white leading-tight">
            Ready to Take Control of Your Health?
          </h2>
          <p className="mt-4 text-white/60 leading-relaxed">
            Order trusted medications, upload prescriptions, or get quick support — all in one smooth experience.
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
            href="/pharmacy/products"
            className="px-6 py-3 bg-[#8AD52E] text-white text-sm font-semibold hover:bg-[#7bc228] transition-colors"
          >
            Start Shopping
          </Link>
          <button
            onClick={() => {
              const el = document.getElementById("prescription-search");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              else window.location.href = "/pharmacy#prescription-search";
            }}
            className="px-6 py-3 border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            Search Prescription
          </button>
        </motion.div>
      </div>
    </section>
  );
}
