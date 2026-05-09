"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const Vision = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-3">
            Our Vision
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
            Africa's Preeminent Gold &amp; Rare Earth Mining Company
          </h2>
          <div className="w-12 h-0.5 bg-white mb-8" />
          <p className="text-gray-300 text-base leading-relaxed mb-10">
            To become Africa's preeminent gold and rare earth mining company,
            delivering transformative value through innovative, sustainable, and
            ethical mining practices that empower communities and drive economic
            progress across the continent.
          </p>
          <Link
            href="/mining/contact"
            className="bg-white text-gray-900 px-7 py-3 text-sm font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Partner With Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Vision;
