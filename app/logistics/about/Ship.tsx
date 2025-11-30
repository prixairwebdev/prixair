"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Ship() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section
      className="relative py-20 w-full flex items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/shipbg.png')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <motion.div
        className="relative z-10 px-6 md:px-12 max-w-4xl"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h1
          variants={fadeUp}
          className="text-white text-3xl md:text-5xl font-bold mb-4 leading-tight"
        >
          Need a Custom Logistics Solution? <br className="hidden md:block" />
          We've Got You Covered.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          transition={{ delay: 0.2 }}
          className="text-gray-200 mb-8 text-sm md:text-lg max-w-2xl mx-auto"
        >
          Whether you're shipping locally, internationally, or need full supply
          chain support — our team is ready to create a solution that works for
          your business.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={fadeUp}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="/quote"
            className="bg-[#FB6404] text-white px-6 py-3 rounded-md font-medium hover:bg-[#E55A00] transition-colors duration-200"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
          >
            Request a Quote
          </motion.a>

          <motion.a
            href="/track"
            className="bg-white text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
          >
            Track Shipment
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}