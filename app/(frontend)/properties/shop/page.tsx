"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "../components/nav";
import PremiumProducts from "../comps/products";
import Footer from "../components/footer";
import CategoryBar from "../comps/CategoryBar";

export default function ShopPage() {
  return (
    <>
      <Nav />
      <CategoryBar />

      {/* Hero */}
      <section className="relative w-full h-64 md:h-80 flex items-center">
        <Image src="/homesbg.png" alt="Shop" fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 w-full">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.3em] uppercase text-white/60 font-medium block mb-3"
          >
            Shop
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl md:text-4xl font-bold text-white leading-tight"
          >
            Premium Tiles, Doors & Fittings
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-3 text-white/70 text-sm"
          >
            Top-quality building materials designed to last and impress.
          </motion.p>
        </div>
      </section>

      <PremiumProducts />
      <Footer />
    </>
  );
}
