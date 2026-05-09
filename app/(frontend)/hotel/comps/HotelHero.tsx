"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HotelHero() {
  return (
    <section className="relative h-screen min-h-[600px] w-full flex items-center">
      <Image src="/hotelbg.png" alt="Prixair Hotels" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 w-full pt-32">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.3em] uppercase text-white/60 font-medium mb-4 block"
        >
          Prixair Hotels
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight max-w-3xl"
        >
          Where Comfort Meets<br />Timeless Elegance
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-base md:text-lg text-white/75 max-w-xl leading-relaxed"
        >
          Unwind in style. Experience world-class comfort and personalised service at every Prixair property.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <Link href="/hotel/rooms" className="px-6 py-3 bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-colors">
            View Rooms
          </Link>
          <Link href="/hotel/contact" className="px-6 py-3 border border-white/40 text-white text-sm font-semibold hover:bg-white/10 transition-colors">
            Book Now
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
  );
}
