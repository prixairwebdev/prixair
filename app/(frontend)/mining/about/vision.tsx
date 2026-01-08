"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Vision = () => {
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
    <div className="relative w-full bg-white py-12">
      <motion.div
        className="relative max-w-4xl mx-auto text-center w-full bg-gray-100 p-6 md:p-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-100px" }}
        variants={container}
      >
        <motion.h2
          className="text-black text-2xl font-bold mb-4"
          variants={item}
        >
          Our Vision
        </motion.h2>

        <motion.p
          className="text-gray-700 text-base md:text-lg leading-relaxed mb-6"
          variants={item}
        >
          To become Africa’s preeminent gold and rare earth mining company, delivering transformative value through innovative, sustainable, and ethical mining practices that empower communities and drive economic progress.
        </motion.p>

        <motion.a
          href="#"
          className="text-sm font-semibold text-black hover:text-orange-600 border-b-2 border-orange-600"
          variants={item}
        >
          Contact us
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Vision;
