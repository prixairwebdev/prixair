"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WhatWeOffer() {
  const items = [
    { title: "Doors", img: "/offer/doors.png" },
    { title: "Smart Doors", img: "/offer/smartdoors.png" },
    { title: "Wall Panels", img: "/offer/panels.png" },
    { title: "Living Room Sofas", img: "/offer/sofas.png" },
    { title: "Living Room Sets", img: "/offer/sets.png" },
    { title: "Wallpaper", img: "/offer/wallpaper.png" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.17, 0.67, 0.83, 0.67] as const },
    },
  };

  return (
    <section className="w-full px-6 md:px-20 py-16 text-black bg-white">
      <motion.div
        className="text-center mb-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h3 variants={itemVariants} className="text-lg font-semibold">What We Offer</motion.h3>
        <motion.p variants={itemVariants} className="text-xs text-gray-700 mt-1 max-w-md mx-auto">
          Discover high-quality tiles, doors, and fittings designed for beauty and durability.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-6 gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={containerVariants}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="cursor-pointer text-center"
            variants={itemVariants}
          >
            <div className="relative w-full h-28 rounded overflow-hidden">
              <Image src={item.img} alt={item.title} fill className="object-cover" />
            </div>
            <p className="text-xs mt-2 font-medium">{item.title}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}