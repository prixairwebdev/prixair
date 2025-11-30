"use client";

import { motion } from "framer-motion";

export default function MissionVision() {
  return (
    <section className="bg-gray-900 text-white text-center py-20 px-6">
      <div className="max-w-3xl mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3">
            Mission
          </h2>
          <p className="text-gray-300">
            To provide unforgettable stays with warmth, elegance, and unmatched comfort.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3">
            Vision
          </h2>
          <p className="text-gray-300">
            To be the preferred hospitality destination in Abuja, known for quality, culture, and care.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
