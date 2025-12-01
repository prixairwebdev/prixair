"use client";

import { motion } from "framer-motion";
import { FaBed, FaCrown, FaSuitcase, FaBriefcase } from "react-icons/fa";

export default function RoomsCategories() {
  const categories = [
    { name: "Standard", icon: <FaBed size={28} /> },
    { name: "Executive", icon: <FaSuitcase size={28} /> },
    { name: "Deluxe", icon: <FaCrown size={28} /> },
    { name: "Business", icon: <FaBriefcase size={28} /> },
  ];

  return (
    <section className="text-center py-20 bg-white">
      <motion.h2
        className="text-2xl md:text-3xl font-serif font-semibold mb-3"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Rooms Categories
      </motion.h2>
      <p className="text-gray-600 mb-10 max-w-xl mx-auto">
        Curated comfort for every type of traveler — from elegant standard rooms to indulgent luxury suites.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            className="border border-gray-400 rounded-lg p-6 hover:shadow-md transition text-center flex flex-col items-center justify-center space-y-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <div className="text-[#FB6404]">{cat.icon}</div>
            <h3 className="font-medium text-gray-800">{cat.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
