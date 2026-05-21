"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import ServicesSection from "./comps/ServicesSection";
import HowItWorksSection from "./comps/HowItWorksSection";
import Ship from "./comps/Ship";

export default function LogisticsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-screen min-h-[600px] w-full flex items-center">
        <Image src="/landingbg.png" alt="Prixair Logistics" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 w-full pt-32">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.3em] uppercase text-white/60 font-medium mb-4 block"
          >
            Prixair Logistics
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight max-w-3xl"
          >
            Reliable Logistics,<br />Fast Delivery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-base md:text-lg text-white/75 max-w-xl leading-relaxed"
          >
            We move your goods with speed and care — local or international, we've got your logistics covered.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/logistics/contact"
              className="px-6 py-3 bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              Request a Quote
            </Link>
            <Link
              href="/logistics/services"
              className="px-6 py-3 border border-white/40 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Our Services
            </Link>
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

      <ServicesSection />
      <HowItWorksSection />
      <Ship />
    </>
  );
}
