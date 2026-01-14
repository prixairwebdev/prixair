"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const WhoWeAre = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative w-full bg-white py-12 px-4">
      {/* Mobile background image (hidden on md+) */}
      <div className="md:hidden absolute inset-0 z-0 opacity-20">
        <Image
          src="/tractor.png"
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
          {/* Left image (visible on md+ screens) - your original layout */}
          <motion.div 
            className="hidden md:block md:w-1/2 mt-8 md:mt-0 md:ml-10 h-1/2"
            variants={item}
          >
            <Image
              src="/tractor.png"
              alt="Mining operations"
              width={800}
              height={500}
              className="rounded object-cover"
            />
          </motion.div>

          {/* Right content - your original layout with responsive adjustments */}
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
              className="text-gray-800 text-lg leading-relaxed mb-6 font-medium"
              variants={item}
            >
              We are a mining company focused on sustainable extraction of essential
              minerals. Operating across multiple countries, we leverage
              cutting-edge technology, skilled teams, and a people-first mindset to
              create lasting value for communities and investors alike.
            </motion.p>
            <motion.div 
              className="text-orange-600 text-3xl font-bold text-right mb-6"
              variants={item}
            >
              ”
            </motion.div>

            {/* Footer */}
            <motion.div 
              className="flex items-center justify-between"
              variants={container}
            >
              <motion.div 
                className="flex items-center gap-3"
                variants={item}
              >
                <Image
                  src="/ceo.png" 
                  alt="Demola Banjo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-sm">Ademola Banjo</p>
                  <p className="text-xs text-gray-500">Group CEO</p>
                </div>
              </motion.div>
              <motion.a 
                href="#" 
                className="text-sm font-semibold text-black hover:text-orange-600 border-b-2 border-orange-600"
                variants={item}
              >
                Find out more
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default WhoWeAre;