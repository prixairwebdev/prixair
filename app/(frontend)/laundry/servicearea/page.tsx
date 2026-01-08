'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaMapMarkerAlt, FaClock, FaTruck } from 'react-icons/fa';
import Locators from '../comps/Locators';
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function ServiceArea() {
  const [isInView, setIsInView] = useState({ hero: false });

  const serviceAreas = [
    {
      area: "Downtown District",
      zones: ["Central Business District", "Financial Quarter", "Arts District"],
      deliveryTime: "30-45 minutes",
      icon: <FaMapMarkerAlt className="text-blue-500 text-2xl" />
    },
    {
      area: "Residential Areas",
      zones: ["Suburbs North", "Suburbs South", "Garden District"],
      deliveryTime: "45-60 minutes",
      icon: <FaTruck className="text-green-500 text-2xl" />
    },
    {
      area: "University Area",
      zones: ["Campus District", "Student Housing", "Faculty Area"],
      deliveryTime: "20-35 minutes",
      icon: <FaClock className="text-purple-500 text-2xl" />
    }
  ];

  return (
    <div className="bg-white text-black">
      {/* Hero Section - Same as landing page */}
      <section
        className="relative min-h-screen w-full"
        aria-label="Service Area Hero Section"
      >
        {/* Background image with gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('/laundrybg.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          role="img"
          aria-label="Prixair Group service area background"
        />

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="w-full sm:w-[90vw] md:w-[600px] lg:w-[700px] xl:w-[900px] px-4 py-8 text-center">
            <motion.div
              className="mx-auto"
              variants={container}
              initial="hidden"
              animate={isInView.hero ? 'show' : 'hidden'}
              onViewportEnter={() =>
                setIsInView((prev) => ({ ...prev, hero: true }))
              }
              onViewportLeave={() =>
                setIsInView((prev) => ({ ...prev, hero: false }))
              }
              viewport={{ once: false }}
            >
              <motion.h1
                className="text-xl sm:text-3xl font-bold leading-tight tracking-tight text-white"
                variants={item}
              >
We’re in Your Neighborhood!              </motion.h1>

              <motion.p
                className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-400/90 leading-relaxed max-w-3xl mx-auto sm:mx-0"
                variants={item}
              >
             Check if we serve your area and enjoy fresh, clean laundry at your doorstep.
              </motion.p>

         
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Areas Content Section */}
      <section className="py-16 px-4 ">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
Check If We Serve Your Area           </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
Easily find out if your location is eligible for pickup and delivery. Just enter your Details            </p>
          </div>

        </div>
      </section>
     <Locators />
    </div>
  );
}
