"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Acres Cultivated" },
  { value: "12+", label: "Crop Varieties" },
  { value: "5000+", label: "Families Served" },
  { value: "100%", label: "Natural Methods" },
];

const WhatWeDo = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative h-[480px] bg-gray-100 overflow-hidden"
          >
            <Image
              src="/farmbg.png"
              alt="Farm operations"
              fill
              className="object-cover"
            />
            {/* Stat overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gray-950/80 backdrop-blur-sm px-8 py-6 grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-white text-xl font-bold">{s.value}</p>
                  <p className="text-white/50 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">What We Do</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Sustainable Agriculture,<br />Delivered Fresh
            </h2>
            <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
              <p>
                At Prixair Farms, we are deeply committed to sustainable and responsible agriculture. Our operations focus on two key areas: crop farming and animal farming, producing maize, vegetables, and rice using eco-friendly hybrid methods that enrich the soil.
              </p>
              <p>
                Alongside our crops, we raise poultry, goats, cattle, and fish in well-maintained environments — ensuring humane care, natural feeding, and clean housing. Sustainability is at the core of everything we do.
              </p>
            </div>
            <div className="mt-8 flex gap-4">
              <a
                href="/farms/our-farm"
                className="inline-block px-6 py-3 bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors"
              >
                See Our Farm
              </a>
              <a
                href="/farms/contact"
                className="inline-block px-6 py-3 border border-gray-300 text-gray-700 text-sm font-semibold hover:border-gray-900 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
