"use client";
import React from "react";
import { motion } from "framer-motion";
import AboutSection from "./AboutSection";
import Ship from "./Ship";

export default function HeroSection() {
  return (
    <>
    <section
      className="relative h-screen w-full flex items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/aboutlgs.png')", // replace with your hero image
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
About Us        </h1>
        <p className="text-gray-200 mb-8 text-sm md:text-lg">
Delivering More Than Just Packages — We Deliver Trust, Speed, and Peace of Mind.        </p>

      
      </motion.div>
    </section>
  <AboutSection />
  <Ship />
    </>
  );
}
