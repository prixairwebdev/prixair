'use client';

import Image from 'next/image';
import { FaHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Partnership() {
  return (
    <section className="bg-white py-16 px-6">
      <motion.div 
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-100px" }}
        variants={container}
      >
        {/* Left: Text Content */}
        <div className="md:w-1/2">
          <motion.div 
            className="flex flex-col items-start gap-3 mb-4"
            variants={item}
          >
            <FaHandshake className="text-orange-400 text-4xl" />
            <h2 className="text-xl md:text-2xl font-semibold">
              Building Stronger Together
            </h2>
          </motion.div>
          <motion.p 
            className="text-sm md:text-base text-gray-700 leading-relaxed mb-6"
            variants={item}
          >
            Collaboration is central to Prixair's growth strategy. The company actively seeks joint ventures,
            technical collaborations, and investments from partners who share its vision for responsible and
            profitable mining. The partnership with the Niger State Government exemplifies this approach, combining
            public-sector support with private-sector efficiency. Strong relationships with regulatory authorities
            and international off-takers ensure seamless operations and market access. Prixair's business development
            program continuously identifies opportunities to commercialize assets, enhancing shareholder value
            through strategic alliances.
          </motion.p>
          <motion.a
            href="#"
            className="inline-block text-sm font-semibold text-black border-b-3 border-orange-400 pb-2 hover:text-orange-400 hover:border-orange-700 transition"
            variants={item}
          >
            Explore Partnership Opportunities
          </motion.a>
        </div>

        {/* Right: Image */}
        <motion.div 
          className="md:w-1/2"
          variants={item}
        >
          <Image
            src="/images/handshake.png"
            alt="Partnership handshake"
            width={600}
            height={400}
            className="w-full h-auto object-cover rounded"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}