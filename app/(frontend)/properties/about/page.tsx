"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "../components/nav";
import PremiumProducts from "../comps/products";
import Testimonials from "../comps/Testimonials";
import PrixairHomesText from "../comps/prixairhomestext";
import Footer from "../components/footer";
import WhatWeOffer from "./whatweoffer";
import WhoWeAre from "./whoarewe";
import WhyChooseUs from "./whychooseus";

export default function AboutPage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="relative w-full h-[500px] md:h-[600px] flex items-center">
        <Image src="/homesbg.png" alt="About Prixair Properties" fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 w-full">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.3em] uppercase text-white/60 font-medium block mb-4"
          >
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-2xl"
          >
            Building Homes & Lifestyles with Quality Materials
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-white/70 max-w-lg text-sm md:text-base leading-relaxed"
          >
            Top-quality building materials designed to last and impress.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/properties/shop"
              className="px-6 py-3 bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore Products
            </Link>
            <Link
              href="/properties/contact"
              className="px-6 py-3 border border-white/40 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      <WhoWeAre />
      <WhatWeOffer />
      <WhyChooseUs />
      <PremiumProducts />
      <Testimonials />
      <PrixairHomesText />
      <Footer />
    </>
  );
}
