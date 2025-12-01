import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";

function CeoProfile() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  // Animation variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1] as [number, number, number, number] // Properly typed cubic-bezier
      }
    }
  };

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={containerVariants}
      className="w-full bg-black text-white min-h-screen flex flex-col lg:flex-row items-center justify-center p-6 gap-8 lg:gap-16"
    >
      {/* Image container with proper sizing and aspect ratio */}
      <motion.div 
        variants={itemVariants}
        className="relative w-full lg:w-[40%] max-w-[500px] aspect-square"
      >
        <Image
          src="/ceo.png"
          alt="Demola Banjo, CEO of Prixair Group"
          fill
          className="rounded-full object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>
      
      {/* Content container */}
      <motion.div 
        variants={itemVariants}
        className="w-full lg:w-[50%] max-w-3xl flex flex-col gap-4 lg:gap-6 text-center lg:text-left"
      >
        <motion.p variants={itemVariants} className="text-gray-400 text-lg">Ademola Banjo, Group CEO</motion.p>
        <motion.h1 variants={itemVariants} className="text-2xl lg:text-3xl font-bold text-white">
          Group Chief Executive Officer
        </motion.h1>
        <motion.p variants={itemVariants} className="text-gray-300 leading-relaxed text-base lg:text-lg">
          Demola Banjo is the visionary founder and CEO of Prixair Group. Since
          establishing the company in  2009, he has led its growth into a
          respected Nigerian conglomerate with thriving ventures in real estate,
          hospitality, retail, logistics, and more. Known for his innovative
          mindset and passion for excellence, Demola continues to drive the
          Group&apos;s mission of delivering value, impact, and sustainable growth
          across every sector.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-4 flex justify-center lg:justify-start">
          <button
            className="px-8 py-3 bg-[#FB6404] hover:bg-[#E55A00] text-white font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FB6404] focus:ring-opacity-50"
            aria-label="Learn more about Demola Banjo"
          >
            READ MORE
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default CeoProfile;