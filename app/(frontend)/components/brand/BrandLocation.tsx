'use client';
import React from "react";
import { MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface BrandLocationProps {
  brandName: string;
  bgImage?: string;
  accentColor?: string;
  location?: string;
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
  location: locationProp,
  openingHours = {
    weekday: "8:00am - 8:00pm",
    saturday: "9:00am - 5:00pm",
    sunday: "Closed",
  }
}) => {
  const location = locationProp ?? "Plot 688, Markus Kangye Blvd, Off Oladipo Diya Way, Gaduwa, Abuja";

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
          Visit <span style={{ color: accentColor }}>{brandName}</span>
        </motion.h2>
        
        <motion.p 
            variants={itemVariants}
            className="text-gray-300 mb-8 text-lg"
        >
          We're located at a convenient spot for you to enjoy fresh meals.
        </motion.p>

        {/* Location Display */}
        <motion.div 
          className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md mb-16 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="w-6 h-6" style={{ color: accentColor }} />
            <h3 className="text-xl font-bold text-white">Our Location</h3>
          </div>
          <p className="text-gray-300 text-lg font-medium leading-relaxed">
            {location}
          </p>
          <motion.a
            href={`https://maps.google.com/?q=${encodeURIComponent(location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 px-6 py-3 rounded-2xl text-white font-bold transition-all hover:shadow-lg"
            style={{ backgroundColor: accentColor }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Open in Google Maps
          </motion.a>
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