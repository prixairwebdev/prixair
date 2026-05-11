"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface BulkWaterSectionProps {
  title?: string;
  description?: string;
}

export default function BulkWaterSection({
  title = "Need Water in Bulk?",
  description = "We deliver to businesses, events, and institutions — fast, fresh, and affordable. Whether you're planning an event, running a hotel, or need daily supply for your office, we offer reliable and timely delivery at discounted rates.",
}: BulkWaterSectionProps) {
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
          <span className="text-xs tracking-[0.3em] uppercase text-white/40 font-medium">Bulk Orders</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white leading-tight">{title}</h2>
          <p className="mt-4 text-white/60 leading-relaxed">{description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-4"
        >
          <Link
            href="/water/quote"
            className="px-6 py-3 bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-colors"
          >
            Request a Quote
          </Link>
          <Link
            href="/water/contact"
            className="px-6 py-3 border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
