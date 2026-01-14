"use client";

import { motion } from "framer-motion";
import FeaturedProperties from "./comps/FeaturedProperties";
import TestimonialsAndFAQ from "./comps/TestimonialsAndFAQ"
import HeroFindHome from "./comps/HeroFindHome";
import PropertySearch from "./comps/PropertySearch";
export default function HeroSection() {
  return (
    <>
    <section
      className="relative h-screen w-full bg-cover bg-center flex flex-col justify-center items-start px-10 md:px-24"
      style={{ backgroundImage: "url('/realestatebg.png')" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-2xl text-white"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Find Your Dream <br /> Home Today
        </h1>
        <p className="text-lg mb-8">
          Browse thousands of verified listings across your favorite locations —
          from cozy apartments to spacious villas.
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-md font-semibold text-white">
          Get started
        </button>
      </motion.div>

      <div className="absolute bottom-10 left-10 text-white flex space-x-10 z-10">
        <div>
          <p className="text-2xl font-bold">1000+</p>
          <p className="text-sm text-gray-300">Verified Listings</p>
        </div>
        <div>
          <p className="text-2xl font-bold">200+</p>
          <p className="text-sm text-gray-300">Trusted Agents</p>
        </div>
        <div>
          <p className="text-2xl font-bold">5,000+</p>
          <p className="text-sm text-gray-300">Happy Clients</p>
        </div>
      </div>
    </section>
    <PropertySearch />
    <FeaturedProperties />
    <TestimonialsAndFAQ />
    <HeroFindHome />
    </>
  );
}
