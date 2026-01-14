"use client";

import { motion } from "framer-motion";

import PropertySearch from "../comps/PropertySearch";
import FeaturedProperties from "./featuredproperties";
import HeroFindHome from "../comps/HeroFindHome";

export default function HeroSection() {
  return (
    <>
    <section
      className="relative h-screen w-full bg-cover bg-center flex flex-col justify-center items-start px-10 md:px-24"
      style={{ backgroundImage: "url('/realestatebg.png')" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0 " />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-2xl text-white"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
Explore Properties        </h1>
        <p className="text-lg mb-8">
Browse verified listings with detailed information, photos, and easy contact options.        </p>

      </motion.div>

   
    </section>
    <PropertySearch />
        <FeaturedProperties />
   
    <HeroFindHome />
    </>
  );
}
