'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
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
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], // easeOutQuad
    },
  },
};

const BakedWithHeart = () => {
  return (
    <motion.section 
      className="w-full bg-white py-16 px-4 md:px-12 p-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center gap-10 flex-col md:flex-row">
        {/* Image */}
        <motion.div 
          className="flex-shrink-0 w-full md:w-1/2"
          variants={itemVariants}
        >
          <Image
            src="/bwh.png"
            alt="Dough being kneaded"
            width={600}
            height={400}
            className="rounded-2xl object-cover w-full h-auto"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div 
          className="text-center md:w-1/2"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-semibold mb-4"
            variants={itemVariants}
          >
            Baked With Heart
          </motion.h2>
          <motion.p 
            className="text-gray-700 mb-6 leading-relaxed"
            variants={itemVariants}
          >
            At GAVI, we believe baking is an art of love. Every loaf, pastry, and cake is made fresh daily with premium
            ingredients and a passion for perfection. Whether it&apos;s a family gathering or a sweet solo treat, we&apos;ve got
            something for everyone.
          </motion.p>
          <motion.button 
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
            variants={itemVariants}
          >
            Learn more
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BakedWithHeart;