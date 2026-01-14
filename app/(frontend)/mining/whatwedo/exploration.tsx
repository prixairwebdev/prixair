'use client';

import { motion } from 'framer-motion';

export default function Exploration() {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="relative bg-cover bg-center bg-no-repeat py-20 px-6" style={{ backgroundImage: "url('/images/exploration-bg.png')" }}>
      <motion.div 
        className="max-w-4xl mx-auto bg-white/95 p-8 rounded-md shadow-lg text-gray-800"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-100px" }} // Re-triggers when scrolling back up
        variants={container}
      >
        <motion.h2 
          className="text-xl md:text-2xl font-bold text-red-800 mb-4"
          variants={item}
        >
          Exploration and Development
        </motion.h2>
        <motion.p 
          className="text-sm md:text-base leading-relaxed"
          variants={item}
        >
          Prixair maintains an active exploration program, targeting high-potential mineral belts across Nigeria. Using advanced geophysical and geochemical techniques, the company identifies and develops strategic assets to build a robust pipeline of opportunities. The focus on gold and lithium, supported by partnerships with state governments, ensures a steady progression from exploration to production, optimizing resource recovery and shareholder value.
        </motion.p>
      </motion.div>
    </section>
  );
}