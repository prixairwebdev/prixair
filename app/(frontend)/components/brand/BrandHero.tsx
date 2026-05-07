'use client';
import { motion, Variants } from "framer-motion";
import FloatingCart from "./FloatingCart";

interface BrandHeroProps {
  title: React.ReactNode;
  subtitle: string;
  bgImage: string;
  tagline?: string;
  primaryColor?: string;
  secondaryColor?: string;
  onOrderClick?: () => void;
  onMenuClick?: () => void;
  store?: string;
}

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
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
  store,
}: BrandHeroProps) => {
  return (
    <section className="relative min-h-screen flex items-end justify-start px-6 pb-24 md:pb-32 overflow-hidden">
      {store && <FloatingCart storeSlug={store} accentColor={secondaryColor} />}

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.03]"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />

      {/* Dark gradient overlay — left-heavy for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      <motion.div
        className="relative z-10 max-w-2xl"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {tagline && (
          <motion.span
            variants={item}
            className="inline-flex items-center px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase text-white rounded-full border border-white/30 backdrop-blur-sm"
            style={{ backgroundColor: `${primaryColor}30` }}
          >
            {tagline}
          </motion.span>
        )}

        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-5 leading-[1.05] tracking-tight text-white"
          variants={item}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-white/70 mb-10 max-w-md leading-relaxed font-normal"
          variants={item}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center gap-3"
          variants={item}
        >
          {onOrderClick && (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOrderClick}
              className="text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wide shadow-lg transition-all"
              style={{ backgroundColor: primaryColor }}
            >
              Order Now
            </motion.button>
          )}
          {onMenuClick && (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onMenuClick}
              className="px-8 py-3.5 rounded-full font-bold text-sm tracking-wide bg-white/10 text-white border border-white/30 backdrop-blur-sm transition-all hover:bg-white/20"
            >
              View Menu
            </motion.button>
          )}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 opacity-40">
        <span className="text-white text-[10px] tracking-[0.2em] uppercase font-bold rotate-90 origin-center">Scroll</span>
      </div>
    </section>
  );
};

export default BrandHero;
