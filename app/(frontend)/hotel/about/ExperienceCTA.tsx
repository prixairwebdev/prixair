"use client";

import { motion } from "framer-motion";

export default function ExperienceCTA() {
  return (
    <section className="bg-gray-900 text-white text-center py-20 px-6">
      <motion.h2
        className="text-2xl md:text-3xl font-serif font-semibold mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Experience Hospitality That Truly Cares
      </motion.h2>
      <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
        Ready to discover what comfort, care, and calm truly feel like? Book your stay with us and 
        let our values speak for themselves.
      </p>
      <motion.button
        className="bg-[#FB6404] text-white px-6 py-3 rounded hover:bg-orange-600 transition"
        whileHover={{ scale: 1.05 }}
      >
        Explore Our Rooms
      </motion.button>
    </section>
  );
}
