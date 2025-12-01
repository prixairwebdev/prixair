// components/LaundryService.tsx
import React from "react";
import { motion, useAnimation, cubicBezier } from "framer-motion";
import { useInView } from "react-intersection-observer";

const LaundryService = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ 
    threshold: 0.2, 
    triggerOnce: false // Re-trigger animation on scroll up
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  // Container animation for stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  // Individual item animation with cubicBezier ease
  const itemVariants = {
    hidden: { opacity: 0, y: 50, x: -30 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.8,
        ease: cubicBezier(0.42, 0, 0.58, 1), // ✅ type-safe cubic-bezier
      },
    },
  };

  // Separate image animation
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: cubicBezier(0.42, 0, 0.58, 1),
        delay: 0.3,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="
        flex flex-col lg:flex-row 
        min-h-[400px] lg:h-[400px] 
        items-center justify-between 
        bg-blue-500 text-white 
        py-8 sm:py-10 lg:py-12 
        px-4 sm:px-6 lg:px-8
        gap-8 lg:gap-12
      "
    >
      {/* Animated Text Content */}
      <motion.div 
        variants={containerVariants} 
        className="
          w-full lg:max-w-xl 
          text-center lg:text-left
          order-2 lg:order-1
        "
      >
        <motion.h2 
          variants={itemVariants} 
          className="
            text-2xl sm:text-3xl lg:text-4xl 
            font-semibold 
            mb-3 sm:mb-4 
            leading-tight
          "
        >
          Laundry Service That Works Around You
        </motion.h2>
        <motion.p 
          variants={itemVariants} 
          className="
            text-base sm:text-lg 
            mb-4 sm:mb-6 
            opacity-90
            max-w-lg mx-auto lg:mx-0
          "
        >
          Convenient scheduling, fast turnarounds, and trusted service — right from your phone.
        </motion.p>
        <motion.button
          variants={itemVariants}
          className="
            px-6 sm:px-8 
            py-2.5 sm:py-3 
            bg-white text-blue-500 
            font-semibold rounded-lg 
            hover:bg-gray-100 
            transition-colors
            text-sm sm:text-base
            shadow-lg hover:shadow-xl
            transform hover:scale-105
          "
        >
          Book Now
        </motion.button>
      </motion.div>

      {/* Animated & Responsive Image */}
      <motion.div 
        variants={imageVariants} 
        className="
          w-full sm:w-80 md:w-96 lg:w-[500px] xl:w-[600px]
          h-48 sm:h-60 md:h-72 lg:h-80 xl:h-[380px]
          flex-shrink-0
          order-1 lg:order-2
        "
      >
        <img
          src="/laundry.png"
          alt="Laundry Service"
          className="
            w-full h-full 
            object-cover 
            rounded-lg shadow-lg
            hover:shadow-xl transition-shadow
          "
        />
      </motion.div>
    </motion.div>
  );
};

export default LaundryService;
