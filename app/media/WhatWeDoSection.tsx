'use client';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const services = [
  { title: 'Sound Engineering', image: '/images/sound.png' },
  { title: 'Lighting Design', image: '/images/lighting.png' },
  { title: 'Stage Setup', image: '/images/stage.png' },
  { title: 'Special Effects', image: '/images/effects.png' },
  { title: 'Video Production', image: '/images/video.png' },
  { title: 'Event Management', image: '/images/event.png' },
];

// Animation variants with proper typing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: 0.6 // Delay to animate after the service items
    }
  }
};

const WhatWeDoSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-12 bg-white">
      <div className="text-center mb-10">
        <motion.h2 
          className="text-xl font-semibold"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={itemVariants}
        >
          What We Do
        </motion.h2>
        <motion.p 
          className="text-sm text-gray-500 mt-1"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={itemVariants}
          transition={{ delay: 0.1 }}
        >
          Unleashing Creativity, Powering Experiences
        </motion.p>
      </div>

      <motion.div
        className="flex flex-wrap justify-center gap-4 px-4"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {services.map((service, idx) => (
          <motion.div 
            key={idx} 
            className="relative w-40 h-40 overflow-hidden rounded shadow"
            variants={itemVariants}
          >
            <Image src={service.image} alt={service.title} layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-black/30 bg-opacity-40 flex items-end p-2">
              <p className="text-white text-xs">{service.title}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="mt-8 text-center"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={buttonVariants}
      >
        <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition">
          Contact us
        </button>
      </motion.div>
    </section>
  );
};

export default WhatWeDoSection;