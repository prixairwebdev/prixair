"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

// Animation variants with proper TypeScript typing
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const FindGaviSection: React.FC = () => {
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");

  return (
    <motion.section
      className="bg-cover bg-center text-center"
      style={{
        backgroundImage: "url('/iconbg.png')",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Overlay for better text contrast */}
      <motion.div 
        className="bg-black/60 py-12 px-4 rounded-none w-full mx-auto text-white"
        variants={containerVariants}
      >
        {/* Title */}
        <motion.h2 
          className="text-yellow-400 text-lg font-medium mb-6"
          variants={itemVariants}
        >
          Find GAVI Near You
        </motion.h2>

        {/* Search box container */}
        <motion.div 
          className="bg-white shadow-md flex items-center justify-between max-w-2xl mx-auto rounded-none overflow-hidden"
          variants={itemVariants}
        >
          {/* State */}
          <div className="flex-1 border-r border-gray-200 text-left">
            <label
              htmlFor="state"
              className="block text-gray-600 text-sm pl-4 pt-2"
            >
              State
            </label>
            <select
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full bg-transparent text-gray-800 pl-4 pb-2 focus:outline-none appearance-none"
            >
              <option value="">Select</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Ogun">Ogun</option>
            </select>
          </div>

          {/* LGA */}
          <div className="flex-1 border-r border-gray-200 text-left">
            <label
              htmlFor="lga"
              className="block text-gray-600 text-sm pl-4 pt-2"
            >
              LGA
            </label>
            <select
              id="lga"
              value={lga}
              onChange={(e) => setLga(e.target.value)}
              className="w-full bg-transparent text-gray-800 pl-4 pb-2 focus:outline-none appearance-none"
            >
              <option value="">Select</option>
              <option value="Ikeja">Ikeja</option>
              <option value="Surulere">Surulere</option>
              <option value="Maitama">Maitama</option>
            </select>
          </div>

          {/* Search Button */}
          <motion.button 
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-5 flex items-center justify-center transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Opening Hours */}
        <motion.div 
          className="mt-10"
          variants={containerVariants}
        >
          <motion.h3 
            className="text-yellow-400 font-medium mb-2"
            variants={itemVariants}
          >
            Opening hours
          </motion.h3>
          <motion.p 
            className="text-white text-sm leading-relaxed"
            variants={itemVariants}
          >
            <span className="font-semibold">Monday - Friday:</span> 8:00am - 8:00pm
            <br />
            <span className="font-semibold">Saturday:</span> 9:00am - 5:00pm
            <br />
            <span className="font-semibold">Sunday:</span> Closed
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default FindGaviSection;