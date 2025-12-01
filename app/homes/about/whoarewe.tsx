"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// WHO WE ARE SECTION
export default function WhoWeAre() {
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
    <motion.section
      className="w-full px-6 md:px-20 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 text-black bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-lg font-semibold mb-3">Who We Are</h2>
        <p className="text-sm text-gray-700 mb-4">
          At Prixair Homes, we believe your home is more than just a place—it's where your story begins, where comfort meets style,
          and where lasting memories are created. That's why we've dedicated ourselves to being more than just a marketplace. We
          are your trusted partner in building and designing spaces that truly reflect your taste and lifestyle.
        </p>
        <p className="text-sm text-gray-700 mb-4">
          From modern houses to premium furniture, durable doors, elegant tiles, and carefully curated interior essentials, we
          provide everything you need to transform a house into a welcoming home. Every product we offer is chosen with quality,
          functionality, and timeless design in mind, ensuring you don't just buy items—you invest in comfort, beauty, and durability.
        </p>
        <p className="text-sm text-gray-700">
          Our mission is simple: to make home ownership and furnishing accessible, stylish, and stress-free. Whether you're moving
          into your first house, renovating a space, or simply looking for that perfect finishing touch, Prixair Homes is here to
          guide you every step of the way.
        </p>
      </motion.div>

      {/* Using Next.js Image component */}
      <motion.div
        className="relative w-full h-80 bg-gray-200 rounded flex items-center justify-center"
        variants={itemVariants}
      >
        <Image
          src="/prixairhome.jpg" // Update this path to your actual image
          alt="Prixair Homes furniture store"
          fill
          className="object-cover rounded"
        />
      </motion.div>
    </motion.section>
  );
}