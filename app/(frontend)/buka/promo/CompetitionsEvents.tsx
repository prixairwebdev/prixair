"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // delay between each section
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }, // ✅ TS-safe
  },
};

export default function CompetitionsEvents() {
  return (
    <motion.section
      className="w-full bg-red-600"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }} // retriggers on scroll
    >
      {/* Header Bar */}
      <motion.div
        className="bg-red-600 text-center py-2"
        variants={itemVariants}
      >
        <h2 className="text-white font-semibold text-lg md:text-xl">
          Competitions and Events
        </h2>
      </motion.div>

      {/* Main Image */}
      <motion.div
        className="flex justify-center items-center py-6"
        variants={itemVariants}
      >
        <Image
          src="/images/competitions-events.png" // 👉 replace with your image path
          alt="Competitions and Events"
          width={900}
          height={500}
          className="rounded-md shadow-md"
        />
      </motion.div>

      {/* Bottom Banner */}
      <motion.div
        className="bg-white text-center py-6"
        variants={itemVariants}
      >
        <h4 className="text-black font-semibold text-lg">
          Special Promo Just for You!
        </h4>
        <p className="text-gray-500 text-sm">
          Your favorite meals, now even better.
        </p>
      </motion.div>
    </motion.section>
  );
}
