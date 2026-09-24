"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Sections
import Ourcategories from "./sections/ourcategories";
import TopSellers from "./sections/topsellers";
import TestimonialCarousel from "./sections/TestimonialCarousel";
import RestaurantLocator from "./sections/RestaurantLocator";
import SpecialPromoBanner from "./sections/SpecialPromoBanner";
import OurPeopleSection from "./sections/OurPeopleSection";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {
  return (
    <div className="overflow-hidden">
      <section
        className="relative min-h-[100svh] w-full overflow-hidden bg-[#140b08] flex items-center"
        aria-label="Prixair Buka"
      >
        <Image
          src="/bukabg.png"
          alt="Jollof rice, chicken, pounded yam and egusi"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-10 pt-32 pb-20">
          <motion.div className="max-w-xl" variants={container} initial="hidden" animate="show">
            <motion.p variants={item} className="mb-4 text-base md:text-lg font-semibold text-[#FF4D4D]">
              Eat in &amp; take out
            </motion.p>

            <motion.h1
              variants={item}
              className="text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white"
            >
              The taste of <span className="text-[#FE0000]">home</span>, served fast.
            </motion.h1>

            <motion.p variants={item} className="mt-6 text-base md:text-lg text-white/80 leading-relaxed max-w-md">
              Smoky jollof, pounded yam with egusi, charcoal-grilled goat meat and more — authentic Nigerian dishes cooked fresh every day.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/buka/products"
                className="group inline-flex items-center gap-2 bg-[#FE0000] hover:bg-[#D90000] text-white pl-7 pr-6 py-4 rounded-full font-bold text-sm tracking-wide shadow-[0_10px_30px_-10px_rgba(254,0,0,0.6)] transition-colors"
              >
                Order Now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/buka/products"
                className="inline-flex items-center px-7 py-4 rounded-full font-bold text-sm tracking-wide text-white border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                View Menu
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Ourcategories />
      <TopSellers />
      <SpecialPromoBanner />
      <TestimonialCarousel />
      <OurPeopleSection />
      <RestaurantLocator />
    </div>
  );
}
