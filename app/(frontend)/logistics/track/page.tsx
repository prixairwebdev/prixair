"use client";
import React from "react";
import { motion } from "framer-motion";
import FAQAccordion from "./FAQAccordion";
export default function HeroSection() {
  return (
    <>
      <section
        className="relative h-screen w-full flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/trackbr.png')", // Replace with your map+package hero image
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 bg-opacity-50" />

        <motion.div
          className="relative z-10 px-6 md:px-12 max-w-2xl w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Track Your Shipment in Real-Time
          </h1>
          <p className="text-gray-200 mb-7 text-md md:text-lg">
            Enter your tracking number to see your package's current location, estimated delivery time, and history.
          </p>
          <form
            className="flex flex-col sm:flex-row items-center justify-center mb-7 gap-2 "
            onSubmit={e => {
              e.preventDefault(); // Add tracking lookup logic here
            }}
          >
            <input
              type="text"
              placeholder="Enter"
              className="w-full sm:w-auto px-4 py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FB6404] bg-white"
            />
            <button
              type="submit"
              className="bg-[#FB6404] text-white px-6 py-3 rounded-md font-medium hover:bg-[#E55A00] transition-colors duration-200 mt-3 sm:mt-0"
            >
              Track
            </button>
          </form>
         
        </motion.div>
      </section>
    <FAQAccordion />
    </>
  );
}
