"use client";
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Whyworkwithus from "./workwithus";

function Page() {  // Changed from 'page' to 'Page'
  const [isInView, setIsInView] = useState({
    hero: false,
    legacy: false,
    cta: false,
  });

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const legacyItem = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };
  
  const item = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const ctaItem = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/joinusbg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          role="img"
          aria-label="Prixair Group corporate background"
        />

        {/* Content container */}
        <div className="relative z-10 h-full flex items-center justify-center sm:justify-start">
          <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24">
            <motion.div
              className="max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto"
              variants={container}
              initial="hidden"
              animate={isInView.hero ? "show" : "hidden"}
              onViewportEnter={() =>
                setIsInView((prev) => ({ ...prev, hero: true }))
              }
              onViewportLeave={() =>
                setIsInView((prev) => ({ ...prev, hero: false }))
              }
              viewport={{ once: false }}
            >
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-white"
                variants={item}
              >
                Your Future Starts Here
              </motion.h1>

              <motion.p
                className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-400/90 leading-relaxed max-w-3xl"
                variants={item}
              >
                At Prixair Group, we&apos;re not just building businesses — we&apos;re
                building people, careers, and legacies.
              </motion.p>

              <motion.div
                className="flex justify-center mt-6"
                variants={legacyItem}
              >
                <button
                  className="px-4 py-2 bg-[#FB6404] hover:bg-[#E55A00] text-white font-medium text-sm transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FB6404] focus:ring-opacity-50"
                  aria-label="Partner with Prixair Group"
                >
                  Partner with us
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <Image
            src="/arrowdown.png"
            alt="Scroll down indicator"
            width={30}
            height={40}
            className="w-6 h-10"
            priority
          />
        </div>
      </section>
      
      <Whyworkwithus />
      
      {/* CTA Section */}
      <section className="w-full min-h-screen bg-[#181818] text-white flex flex-col justify-center items-center text-center px-4 py-16 sm:py-24">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-100px" }}
          onViewportEnter={() => setIsInView((prev) => ({ ...prev, cta: true }))}
          onViewportLeave={() => setIsInView((prev) => ({ ...prev, cta: false }))}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
            variants={ctaItem}
          >
            Ready To Take The Next Step?
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            variants={ctaItem}
          >
            Join A Team That&apos;s Shaping Industries And Changing Lives.
          </motion.p>
          
          <motion.div 
            className="flex justify-center"
            variants={ctaItem}
          >
            <a href="mailto:hr@prixair.com"
              className="px-6 py-3 bg-[#FB6404] hover:bg-[#E55A00] text-white font-medium text-base sm:text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FB6404] focus:ring-opacity-50 rounded"
              aria-label="Contact HR at Prixair Group"
            >
              Contact HR
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

export default Page;  // Changed from 'page' to 'Page'