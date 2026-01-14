"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

const categories = [
  { title: "Rice Dishes", image: "/categories/rice.png" },
  { title: "Soups & Swallows", image: "/categories/soup.png" },
  { title: "Grilled Foods", image: "/categories/grilled.png" },
  { title: "Drinks & Extras", image: "/categories/drinks.png" },
];

// ✅ Correctly typed container variants
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// ✅ Correctly typed item variants with "type" as specific string
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring", // <-- Typed correctly
      stiffness: 100,
      damping: 15,
    },
  },
};

const buttonItem: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8,
    },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
  },
};

export default function OurCategories() {
  return (
    <div className="w-full py-10 bg-white flex flex-col items-center justify-center text-black">
      <h1 className="text-xl sm:text-2xl font-semibold mb-8">Our Categories</h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-gray-50 shadow-md rounded-lg p-6 flex flex-col items-center justify-center w-[240px] h-[260px]"
          >
            <Image
              src={cat.image}
              alt={cat.title}
              width={80}
              height={80}
              className="mb-4"
            />
            <p className="text-sm text-center font-medium">{cat.title}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.a
        href="/order"
        className="text-white bg-[#FE0000] hover:bg-[#D90000] px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold shadow-md rounded-md"
        variants={buttonItem}
        initial="hidden"
        whileInView="show"
        whileHover="hover"
        whileTap="tap"
        viewport={{ once: false, amount: 0.4 }}
      >
        Order Now
      </motion.a>
    </div>
  );
}
