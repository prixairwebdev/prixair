'use client';

import Image from 'next/image';
import { Leaf, Users, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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

export default function ESGSection() {
  const [ref, inView] = useInView({
    triggerOnce: false, // Allows animation to trigger again when scrolling back up
    threshold: 0.1
  });

  return (
    <section className="py-16 px-6 md:px-16 bg-white" ref={ref}>
      {/* Desktop layout */}
      <div className="hidden md:grid max-w-7xl mx-auto grid-cols-2 gap-12 items-center">
        <motion.div 
          className="text-center md:text-left"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.h2 className="text-2xl font-semibold mb-2" variants={item}>
            Committed to Responsible Mining
          </motion.h2>
          <motion.p className="text-gray-600 mb-6" variants={item}>
            We believe that mining should enrich not only economies, but ecosystems and communities too
          </motion.p>

          <motion.p className="text-gray-700 mb-8" variants={item}>
            From water recycling and land reclamation to community healthcare and safety programs,
            our ESG approach is woven into every operation.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row sm:justify-between text-center gap-6 mb-8"
            variants={container}
          >
            <motion.div variants={item}>
              <Leaf className="mx-auto text-green-600 mb-1" size={24} />
              <p className="text-xs font-medium text-gray-600">ENVIRONMENTAL</p>
              <h3 className="text-xl font-bold">95%</h3>
              <p className="text-sm text-gray-500">water recycled</p>
            </motion.div>
            <motion.div variants={item}>
              <Users className="mx-auto text-blue-600 mb-1" size={24} />
              <p className="text-xs font-medium text-gray-600">COMMUNITY</p>
              <h3 className="text-xl font-bold">500+</h3>
              <p className="text-sm text-gray-500">local jobs</p>
            </motion.div>
            <motion.div variants={item}>
              <ShieldCheck className="mx-auto text-orange-600 mb-1" size={24} />
              <p className="text-xs font-medium text-gray-600">SAFETY</p>
              <h3 className="text-xl font-bold">100%</h3>
              <p className="text-sm text-gray-500">incident free</p>
            </motion.div>
          </motion.div>

          <motion.a
            href="#"
            className="text-sm font-semibold border-b-2 border-orange-500 hover:opacity-75 inline-block"
            variants={item}
          >
            View Full ESG Report
          </motion.a>
        </motion.div>

        <motion.div 
          className="relative w-full h-96"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src="/images/forest.png"
            alt="Forest Reclamation"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </motion.div>
      </div>

      {/* Mobile layout */}
      <div className="relative md:hidden w-full h-[750px]">
        <Image
          src="/images/forest.png"
          alt="Forest Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <motion.div 
          className="relative z-10 top-16 bg-white/80 m-6 p-6 rounded-lg shadow-lg text-center"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.h2 className="text-lg font-semibold mb-1" variants={item}>
            Committed to Responsible Mining
          </motion.h2>
          <motion.p className="text-sm text-gray-600 mb-4" variants={item}>
            We believe that mining should enrich not only economies, but ecosystems and communities too
          </motion.p>

          <motion.p className="text-sm text-gray-700 mb-6" variants={item}>
            From water recycling and land reclamation to community healthcare and safety programs,
            our ESG approach is woven into every operation.
          </motion.p>

          <motion.div 
            className="grid grid-cols-1 gap-4 text-center"
            variants={container}
          >
            <motion.div variants={item}>
              <Leaf className="mx-auto text-green-600 mb-1" size={20} />
              <p className="text-xs text-gray-600 font-semibold">ENVIRONMENTAL</p>
              <h3 className="text-lg font-bold">95%</h3>
              <p className="text-xs text-gray-500">water recycled</p>
            </motion.div>
            <motion.div variants={item}>
              <Users className="mx-auto text-blue-600 mb-1" size={20} />
              <p className="text-xs text-gray-600 font-semibold">COMMUNITY</p>
              <h3 className="text-lg font-bold">500+</h3>
              <p className="text-xs text-gray-500">local jobs</p>
            </motion.div>
            <motion.div variants={item}>
              <ShieldCheck className="mx-auto text-orange-600 mb-1" size={20} />
              <p className="text-xs text-gray-600 font-semibold">SAFETY</p>
              <h3 className="text-lg font-bold">100%</h3>
              <p className="text-xs text-gray-500">incident free</p>
            </motion.div>
          </motion.div>

          <motion.a
            href="#"
            className="mt-6 inline-block text-sm font-semibold border-b-2 border-orange-500 hover:opacity-75"
            variants={item}
          >
            View Full ESG Report
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}