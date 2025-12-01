"use client";
import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

// Animation variants with proper typing
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5,
      ease: "easeOut" as const // Proper typing for ease
    } 
  },
};

const minerals = [
  {
    name: 'Tantalite (coltan)',
    image: '/images/tantalite.png',
  },
  {
    name: 'Niobium',
    image: '/images/niobium.png',
  },
  {
    name: 'Tungsten',
    image: '/images/tungsten.png',
  },
  {
    name: 'Lithium',
    image: '/images/lithium.png',
  },
  {
    name: 'Beryllium',
    image: '/images/berryllium.png',
  },
];

export default function Mining() {
  return (
    <section className="bg-white text-gray-800 px-6 py-16">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, margin: "-100px" }}
        >
          Rare Earth Minerals Mining
        </motion.h1>
        
        <motion.p 
          className="text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: false, margin: "-100px" }}
        >
          We extract critical rare earth elements (REEs) vital to the renewable energy and tech sectors.
          <br />
          <span className="font-medium">Current capacity:</span> 500 tons/day
        </motion.p>

        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mt-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-100px" }}
        >
          {minerals.map((mineral, index) => (
            <motion.div
              key={index}
              className="rounded-lg overflow-hidden border shadow hover:shadow-lg transition duration-300"
              variants={item}
              whileHover={{ y: -5 }}
            >
              <Image
                src={mineral.image}
                alt={mineral.name}
                width={300}
                height={300}
                className="object-cover w-full h-32 sm:h-40"
              />
              <div className="p-2 text-sm font-medium">{mineral.name}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="relative w-full bg-white py-12 px-4">
          {/* Mobile background image (hidden on md+) */}
          <div className="md:hidden absolute inset-0 z-0 opacity-20">
            <Image
              src="/images/plant.png"
              alt="Mining operations"
              fill
              className="object-cover"
            />
          </div>

          {/* Main content container */}
          <motion.div
            className="relative max-w-7xl mx-auto z-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-100px" }}
            variants={container}
          >
            <div className="flex flex-col md:flex-row items-center justify-start">
              {/* Left image (visible on md+ screens) */}
              <motion.div 
                className="hidden md:block md:w-1/2 mt-8 md:mt-0 md:ml-10 h-1/2"
                variants={item}
              >
                <Image
                  src="/images/plant.png"
                  alt="Mining operations"
                  width={800}
                  height={500}
                  className="rounded object-cover"
                />
              </motion.div>

              {/* Right content */}
              <motion.div 
                className="w-full md:w-1/2 bg-white shadow-lg rounded p-6 md:p-10 md:absolute md:left-1/2 md:bottom-[1/2]"
                variants={item}
              >
                <motion.div 
                  className="text-orange-600 text-3xl font-bold mb-4"
                  variants={item}
                >
                  “
                </motion.div>
                <motion.p 
                  className="flex flex-col gap-2 text-gray-800 text-lg leading-relaxed mb-6 font-medium text-justify"
                  variants={item}
                >
                  <span className="text-black font-bold">Mineral Processing</span>
                  Prixair is developing advanced processing capabilities to support both gold and rare earth mineral beneficiation. The modular processing plant, under construction, will handle up to 1500 tons of ore daily, incorporating gravity concentration, flotation, magnetic separation, smelting, and refining for precious metals. For rare earths, the company produces high-quality concentrates for export and local industries, meeting stringent international standards. The processing infrastructure is designed for scalability, ensuring flexibility to accommodate growing production demands.
                </motion.p>
                <motion.div 
                  className="text-orange-600 text-3xl font-bold text-right mb-6"
                  variants={item}
                >
                  ”
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}