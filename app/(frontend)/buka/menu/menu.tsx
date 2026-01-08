"use client";
import Image from "next/image";
import { MenuItem } from "./data/menu";
import { motion } from "framer-motion";

type Props = {
  title: string;
  color: string; // Tailwind color classes
  items: MenuItem[];
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // delay between items
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }, // ✅ TypeScript safe
  },
};

export default function MenuSection({ title, color, items }: Props) {
  return (
    <section className="mb-10">
      {/* Header */}
      <div
        className={`${color} text-white flex justify-between items-center px-4 py-2`}
      >
        <h2 className="text-lg font-bold">{title}</h2>
        <button className="text-sm items-center flex justify-center">
          See all{" "}
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>

      {/* Items Grid with animation */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }} // retriggers when scrolling back
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="bg-gray-100 shadow-md rounded-lg overflow-hidden"
            variants={itemVariants}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={400}
              height={300}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex flex-col">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-600 text-sm flex-1">
                {item.description}
              </p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-red-600 font-bold">
                  From ₦{item.price.toLocaleString()}
                </span>
                <button className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700">
                  Order Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
