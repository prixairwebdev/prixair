'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function WhereWeOperate() {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="bg-gray-50 py-16 px-6">
      <motion.div 
        className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-100px" }}
        variants={container}
      >
        {/* Text content */}
        <motion.div className="md:w-1/2 text-gray-800" variants={item}>
          <motion.h2 
            className="text-xl md:text-2xl font-semibold mb-4"
            variants={item}
          >
            Where We Operate
          </motion.h2>
          <motion.p 
            className="text-sm md:text-base leading-relaxed"
            variants={item}
          >
            Prixair Resources operates primary mining sites in Niger, Kaduna, Nasarawa, and Plateau States, 
            with exploration activities in Zamfara, Kogi, and Kwara. Operations commence in high-grade, 
            near-surface deposits, progressing in a north-south direction to maximize efficiency. 
            The joint venture with Niger State facilitates access to valuable gold and lithium deposits, 
            with Prixair funding 100% of the capital for shared ownership of mining licenses. 
            The company targets export markets in China, India, the UAE, and the European Union, 
            adhering to global compliance standards.
          </motion.p>
        </motion.div>

        {/* Map image */}
        <motion.div className="md:w-1/2" variants={item}>
          <Image
            src="/images/nigeria-map.png"
            alt="Nigeria mining locations"
            width={600}
            height={500}
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}