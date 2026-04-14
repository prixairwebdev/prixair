"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FaBed, FaCrown, FaSuitcase, FaBriefcase } from "react-icons/fa";

export default function RoomsCategories() {
  const searchParams = useSearchParams();
  const currentType = searchParams.get("type");

  const categories = [
    { name: "All", value: "all", icon: <FaBed size={28} /> },
    { name: "Standard", value: "standard", icon: <FaBed size={28} /> },
    { name: "Executive", value: "executive", icon: <FaSuitcase size={28} /> },
    { name: "Deluxe", value: "deluxe", icon: <FaCrown size={28} /> },
    { name: "Business", value: "business", icon: <FaBriefcase size={28} /> },
    { name: "Suite", value: "suite", icon: <FaCrown size={28} /> },
    { name: "Presidential", value: "presidential", icon: <FaCrown size={28} /> },
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

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-6xl mx-auto px-4">
        {categories.map((cat, i) => {
          const isActive = (currentType === cat.value) || (!currentType && cat.value === "all");
          
          return (
            <Link
              key={i}
              href={cat.value === "all" ? "/hotel/rooms" : `/hotel/rooms?type=${cat.value}`}
              scroll={false}
            >
              <motion.div
                className={`border rounded-lg p-6 hover:shadow-md transition text-center flex flex-col items-center justify-center space-y-2 cursor-pointer h-full ${
                  isActive ? "border-[#FB6404] bg-orange-50" : "border-gray-200"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className={isActive ? "text-[#FB6404]" : "text-gray-400"}>{cat.icon}</div>
                <h3 className={`font-medium text-sm ${isActive ? "text-[#FB6404]" : "text-gray-800"}`}>
                  {cat.name}
                </h3>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
