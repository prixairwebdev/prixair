'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BrandInfoProps {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  buttonText?: string;
  onLinkClick?: () => void;
  reverse?: boolean;
}

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
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const BrandInfo = ({
  title,
  description,
  image,
  imageAlt = "Brand image",
  buttonText = "Learn more",
  onLinkClick,
  reverse = false,
}: BrandInfoProps) => {
  return (
    <motion.section 
      className="w-full bg-white py-16 px-4 md:px-12 p-10 text-black"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className={`max-w-6xl mx-auto flex justify-between items-center gap-10 flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
        {/* Image */}
        <motion.div 
          className="flex-shrink-0 w-full md:w-1/2"
          variants={itemVariants}
        >
          <div className="relative w-full aspect-[3/2]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="rounded-2xl object-cover"
            />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div 
          className="text-center md:text-left md:w-1/2"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 text-gray-900"
            variants={itemVariants}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="text-gray-700 mb-8 leading-relaxed text-lg"
            variants={itemVariants}
          >
            {description}
          </motion.p>
          <motion.button 
            className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all font-semibold"
            variants={itemVariants}
            onClick={onLinkClick}
          >
            {buttonText}
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BrandInfo;
