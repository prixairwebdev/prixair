"use client";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import HeroSection from "../sections/HeroSection";
import Whoweare from "./whoweare";
function Page() {
  const [isInView, setIsInView] = useState({
    hero: false,
    legacy: false,
    cta: false,
  });

  // Animation variants with proper typing
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, x: -50 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1], // Using cubic bezier array
      },
    },
  };

  // const legacyContainer: Variants = {
  //   hidden: { opacity: 0 },
  //   show: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.1,
  //       delayChildren: 0.3,
  //     },
  //   },
  // };

  // const legacyItem: Variants = {
  //   hidden: { opacity: 0, x: 50 },
  //   show: {
  //     opacity: 1,
  //     x: 0,
  //     transition: {
  //       duration: 0.5,
  //       ease: [0.16, 1, 0.3, 1]
  //     }
  //   },
  // };

  const ctaItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div>
      {/* Hero section */}
      <section
        className="relative h-screen w-full"
        aria-label="Prixair Group Hero Section"
      >
        {/* Background image with gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('/aboutpharmabg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          role="img"
          aria-label="Prixair Group corporate background"
        />

        {/* Content container */}
        <div className="relative z-10 h-full flex items-center justify-center sm:justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24">
            <motion.div
              className="max-w-2xl lg:max-w-3xl xl:max-w-4xl"
              variants={container}
              initial="hidden"
              animate={isInView.hero ? "show" : "hidden"}
              onViewportEnter={() =>
                setIsInView((prev) => ({ ...prev, hero: true }))
              }
              onViewportLeave={() =>
                setIsInView((prev) => ({ ...prev, hero: false }))
              }
              viewport={{ once: false, margin: "-100px" }}
            >
              <motion.h1
                className="text-3xl sm:text-4xl  font-bold leading-tight tracking-tight text-white"
                variants={item}
              >
                Your Health, Our Priority.{" "}
              </motion.h1>

              <motion.p
                className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-400/90 leading-relaxed max-w-3xl"
                variants={item}
              >
                At Prixair Pharmacy, we go beyond prescriptions to deliver care,
                convenience, and trust.
              </motion.p>
            </motion.div>
            <motion.div
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
              variants={item}
            >
              <button
                className="px-6 py-2 sm:px-8 sm:py-3 bg-[#8AD52E] hover:bg-[#a0c86f] text-white font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FB6404] focus:ring-opacity-50"
                aria-label="Learn more about Prixair Group"
              >
                Contact us
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut", // Using predefined easing
          }}
        >
          <Image
            src="/arrowdown.png"
            alt="Scroll down indicator"
            width={30}
            height={40}
            className="w-6 h-10"
            priority
          />
        </motion.div>
      </section>

      {/* CTA Section */}
      <Whoweare />
      <HeroSection />
    </div>
  );
}

export default Page;
