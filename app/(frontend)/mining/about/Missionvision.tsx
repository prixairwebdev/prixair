"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Mission = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-14 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        {/* Image */}
        <motion.div
          className="relative w-full h-[380px] overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/mission.png"
            alt="Prixair Resources mission"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-3">
            Our Mission
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            What We're Here to Do
          </h2>
          <div className="w-12 h-0.5 bg-gray-900 mb-6" />
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Prixair Resources is committed to exploring, extracting, and
            processing high-quality gold and rare earth minerals with precision
            and responsibility.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            The company seeks to contribute to national development by creating
            employment opportunities, promoting local content, and implementing
            environmentally sound practices. Through strategic alliances,
            technological innovation, and operational excellence, Prixair aims
            to build long-term value for shareholders, communities, and industry
            partners while meeting global demand for critical minerals.
          </p>
          <a
            href="/mining/contact"
            className="text-sm font-medium border-b border-gray-900 hover:opacity-60 transition-opacity"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;
