"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Mission = () => {
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
          src="/commitment.png"
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
              src="/commitment.png"
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
              className="flex flex-col gap-2 text-gray-800 text-lg leading-relaxed mb-6 font-medium text-justify"
              variants={item}
            >
                            <span className="text-black font-bold">Our Commitment to Communities & Sustainability</span>

Sustainability & Community Engagement  Prixair Resources is deeply  committed  to  sustainable  development and community  empowerment. The company  collaborates closely with host  communities to deliver inclusive  growth through education,  vocational training, healthcare,  and clean water initiatives. Local  content programs prioritize job creation and skills development, fostering  economic resilience. Environmental rehabilitation and land restoration efforts  minimize ecological impact, aligning with global sustainability goals. By integrating  community feedback into operational planning, Prixair ensures its activities  contribute to long-term regional prosperity.            </motion.p>
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
           
             
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Mission;