"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import MediaEquipment from "./MediaEquipment";
import WhyChooseMedia from "./WhyChooseMedia";

export default function MediaHome() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen min-h-[600px] w-full flex items-center">
        <Image src="/mediabg.png" alt="Prixair Media" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 w-full pt-32">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.3em] uppercase text-white/60 font-medium mb-4 block"
          >
            Prixair Media
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight max-w-3xl"
          >
            Crystal Clear Sound,<br />Unforgettable Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-base md:text-lg text-white/75 max-w-xl leading-relaxed"
          >
            Professional-grade audio and visual equipment rentals for events that demand excellence.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#equipment"
              className="px-6 py-3 bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore Equipment
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-white/40 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Request a Quote
            </a>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-px h-12 bg-white/30 mx-auto" />
        </motion.div>
      </section>

      <MediaEquipment />
      <WhyChooseMedia />

      {/* Contact */}
      <section id="contact" className="py-24 bg-white px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Contact</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">Reach Out Today</h2>
            <p className="mt-3 text-gray-500 max-w-lg">
              Ready to secure your equipment? Contact us for a custom quotation.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-lg">
            {[
              { label: "Call Us", value: "08181888892" },
              { label: "Email Us", value: "media@prixair.com" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="border-t-2 border-gray-200 hover:border-[#FB6404] transition-colors duration-300 pt-6"
              >
                <p className="text-xs tracking-widest uppercase text-gray-400 font-medium mb-2">{item.label}</p>
                <p className="text-gray-900 font-semibold text-sm">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
