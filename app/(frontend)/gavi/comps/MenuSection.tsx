"use client";
import React from "react";
import { motion } from "framer-motion";

interface MenuItem {
  name: string;
  price: string;
  image: string;
  pack?: string;
}

const bestSellers: MenuItem[] = [
  { name: "Sourdough Bread", price: "₦1,500", image: "/foodimg/bestsellers/sourdough.png" },
  { name: "Red Velvet Cupcakes", price: "₦2,000 (6-pack)", image: "/foodimg/bestsellers/cupcakes.png" },
  { name: "Butter Croissants", price: "₦1,200", image: "/foodimg/bestsellers/croissant.png" },
  { name: "Choco-Chip Cookies", price: "₦1,500", image: "/foodimg/bestsellers/cookies.png" },
];

const dailySpecials: MenuItem[] = [
  { name: "Agege Bread", price: "₦2,000", image: "/foodimg/dailyspecials/agege.png" },
  { name: "Meat Pie", price: "₦1,000 (6-pack)", image: "/foodimg/dailyspecials/meatpie.png" },
  { name: "Bread Sandwich", price: "₦800", image: "/foodimg/dailyspecials/sandwich.png" },
  { name: "Chocolate cake slice", price: "₦4,000", image: "/foodimg/dailyspecials/chocolatecake.png" },
];

// Animation variants with TypeScript-compliant easing
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const MenuSection: React.FC = () => {
  return (
    <section className="bg-[#f4f3f1] py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-800">Our Best-Sellers</h2>
          <button className="bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition">
            View menu
          </button>
        </motion.div>

        {/* Best Sellers */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {bestSellers.map((item, index) => (
            <motion.div 
              key={index} 
              className="bg-white shadow-md"
              variants={itemVariants}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-gray-800 font-medium">{item.name}</h3>
                <p className="text-gray-700 text-sm mb-3">{item.price}</p>
                <button className="bg-gray-800 text-white text-sm px-4 py-2 rounded-full hover:bg-gray-700 transition">
                  Order Now
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Daily Specials Header */}
        <motion.h2 
          className="text-2xl font-semibold text-gray-800 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Daily Specials
        </motion.h2>

        {/* Daily Specials */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {dailySpecials.map((item, index) => (
            <motion.div 
              key={index} 
              className="bg-white shadow-md"
              variants={itemVariants}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-gray-800 font-medium">{item.name}</h3>
                <p className="text-gray-700 text-sm mb-3">{item.price}</p>
                <button className="bg-gray-800 text-white text-sm px-4 py-2 rounded-full hover:bg-gray-700 transition">
                  Order Now
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MenuSection;