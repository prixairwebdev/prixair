'use client';
import { motion, Variants } from "framer-motion";

interface BrandHeroProps {
  title: React.ReactNode;
  subtitle: string;
  bgImage: string;
  tagline?: string;
  primaryColor?: string;
  secondaryColor?: string;
  onOrderClick?: () => void;
  onMenuClick?: () => void;
}

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const BrandHero = ({
  title,
  subtitle,
  bgImage,
  tagline,
  primaryColor = "#B5D04E",
  secondaryColor = "#F3A35C",
  onOrderClick,
  onMenuClick,
}: BrandHeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/60 backdrop-blur-[2px]" />

      <motion.div
        className="relative z-10 text-center max-w-3xl"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {tagline && (
          <motion.span 
            variants={item}
            className="inline-block px-4 py-1 mb-6 text-sm font-bold tracking-widest uppercase text-white rounded-full shadow-sm"
            style={{ backgroundColor: secondaryColor }}
          >
            {tagline}
          </motion.span>
        )}

        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-gray-900"
          variants={item}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-800 mb-10 max-w-xl mx-auto font-medium"
          variants={item}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={item}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOrderClick}
            className="w-full sm:w-auto text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg transition-all"
            style={{ backgroundColor: primaryColor }}
          >
            Order Now
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMenuClick}
            className="w-full sm:w-auto border-2 px-10 py-4 rounded-full font-bold text-lg bg-white/80 backdrop-blur-md transition-all"
            style={{ borderColor: secondaryColor, color: secondaryColor }}
          >
            View Menu
          </motion.button>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div 
            className="w-1 h-12 rounded-full" 
            style={{ background: `linear-gradient(to b, ${primaryColor}, transparent)` }}
          />
      </div>
    </section>
  );
};

export default BrandHero;
