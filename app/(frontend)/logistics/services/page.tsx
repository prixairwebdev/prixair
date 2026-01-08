"use client";
import React from "react";
import { motion } from "framer-motion";
import ServicesSection from "../comps/ServicesSection";
import HowItWorksSection from "../comps/HowItWorksSection";
import Ship from "../comps/Ship";

export default function HeroSection() {
  return (
    <>
    <section
      className="relative h-screen w-full flex items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/landingbg.png')", // replace with your hero image
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 bg-opacity-50" />

      <motion.div
        className="relative z-10 px-6 md:px-12 max-w-4xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-white text-3xl md:text-5xl font-bold mb-4 leading-tight">
          Reliable Logistics Solutions for  <br /> Every Business.
        </h1>
        <p className="text-gray-200 mb-8 text-sm md:text-lg">
        From express deliveries to international freight, we deliver smarter — every time.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href="/quote"
            className="bg-[#FB6404] text-white px-6 py-3 rounded-md font-medium hover:bg-[#E55A00] transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
          >
            Request a Quote
          </motion.a>
          <motion.a
            href="/track"
            className="bg-white text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
          >
            Track Shipment
          </motion.a>
        </div>
      </motion.div>
    </section>
    <ServicesSection />
    <HowItWorksSection />
    <Ship />
    </>
  );
}
