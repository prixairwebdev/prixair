'use client';

import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SpecialPromoBanner = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section 
      className="bg-white py-8"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-100px" }} // Adjust margin as needed
      variants={containerVariants}
    >
      {/* Promo Card */}
      <motion.div 
        className="bg-red-600 py-10 flex justify-center relative"
        variants={itemVariants}
      >
        {/* Left Arrow */}
        <motion.button 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl"
          variants={itemVariants}
        >
          <FaChevronLeft />
        </motion.button>

        {/* Image Container */}
        <motion.div 
          className="relative"
          variants={itemVariants}
        >
          <Image
            src="/banner.png" 
            alt="Delicious Chicken"
            width={500}
            height={500}
            className="object-contain"
          />
        </motion.div>

        {/* Right Arrow */}
        <motion.button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl"
          variants={itemVariants}
        >
          <FaChevronRight />
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default SpecialPromoBanner;