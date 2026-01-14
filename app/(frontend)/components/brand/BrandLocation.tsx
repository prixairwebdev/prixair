'use client';
import React, { useState } from "react";
import { Search, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface BrandLocationProps {
  brandName: string;
  bgImage?: string;
  accentColor?: string;
  openingHours?: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
}

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

const BrandLocation: React.FC<BrandLocationProps> = ({
  brandName,
  bgImage = "/iconbg.png",
  accentColor = "#F3A35C",
  openingHours = {
    weekday: "8:00am - 8:00pm",
    saturday: "9:00am - 5:00pm",
    sunday: "Closed",
  }
}) => {
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");

  return (
    <motion.section
      className="relative bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url('${bgImage}')` }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      <motion.div 
        className="relative z-10 py-24 px-6 max-w-4xl mx-auto text-center"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md">
                <MapPin className="w-8 h-8" style={{ color: accentColor }} />
            </div>
        </motion.div>

        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-4 text-white"
          variants={itemVariants}
        >
          Find <span style={{ color: accentColor }}>{brandName}</span> Near You
        </motion.h2>
        
        <motion.p 
            variants={itemVariants}
            className="text-gray-300 mb-12 text-lg"
        >
            Enter your location to find the nearest branch and enjoy fresh meals.
        </motion.p>

        {/* Search tool */}
        <motion.div 
          className="bg-white p-2 rounded-3xl shadow-2xl flex flex-col md:flex-row items-stretch gap-2 mb-16 overflow-hidden"
          variants={itemVariants}
        >
          <div className="flex-1 px-6 py-3 text-left">
            <label htmlFor="state" className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">State</label>
            <select
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full bg-transparent text-gray-900 font-bold focus:outline-none appearance-none cursor-pointer"
            >
              <option value="">Select State</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
            </select>
          </div>

          <div className="w-px bg-gray-100 hidden md:block my-2" />

          <div className="flex-1 px-6 py-3 text-left">
            <label htmlFor="lga" className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">LGA</label>
            <select
              id="lga"
              value={lga}
              onChange={(e) => setLga(e.target.value)}
              className="w-full bg-transparent text-gray-900 font-bold focus:outline-none appearance-none cursor-pointer"
            >
              <option value="">Select LGA</option>
              <option value="Ikeja">Ikeja</option>
              <option value="Maitama">Maitama</option>
            </select>
          </div>

          <motion.button 
            className="px-8 py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 transition-all"
            style={{ backgroundColor: accentColor }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </motion.button>
        </motion.div>

        {/* Opening Hours */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          variants={containerVariants}
        >
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
                <Clock className="w-6 h-6 mx-auto mb-4 text-gray-400" />
                <h4 className="text-white font-bold mb-2">Mon - Fri</h4>
                <p className="text-gray-400 font-medium">{openingHours.weekday}</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
                <Clock className="w-6 h-6 mx-auto mb-4 text-gray-400" />
                <h4 className="text-white font-bold mb-2">Saturday</h4>
                <p className="text-gray-400 font-medium">{openingHours.saturday}</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
                <Clock className="w-6 h-6 mx-auto mb-4 text-gray-400" />
                <h4 className="text-white font-bold mb-2">Sunday</h4>
                <p className="text-gray-400 font-medium">{openingHours.sunday}</p>
            </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default BrandLocation;
