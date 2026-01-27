"use client";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import MediaEquipment from "./MediaEquipment";
import WhyChooseMedia from "./WhyChooseMedia";

export default function MediaHome() {
  const [isInView, setIsInView] = useState({
    hero: false,
  });

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.17, 0.67, 0.83, 0.67] } },
  };

  return (
    <div className="overflow-hidden">
      {/* Hero section */}
      <section className="relative h-[85vh] w-full" aria-label="Prixair Media Hero Section">
        {/* Background image with high-end overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4)), url('/mediabg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          role="img"
          aria-label="Prixair Media background"
        />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6 md:px-12 xl:px-24">
            <motion.div
              className="max-w-3xl text-center md:text-left"
              variants={container}
              initial="hidden"
              animate={isInView.hero ? "show" : "hidden"}
              onViewportEnter={() => setIsInView((prev) => ({ ...prev, hero: true }))}
              viewport={{ once: true }}
            >
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white mb-6"
                variants={item}
              >
                Crystal Clear Sound, <br />
                <span className="text-orange-500">Unforgettable Events.</span>
              </motion.h1>

              <motion.p
                className="text-sm sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto md:mx-0 mb-10"
                variants={item}
              >
                Professional-grade audio and visual equipment rentals. We lend high-quality mics, speakers, and projectors to make your events truly premium.
              </motion.p>

              {/* Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                variants={item}
              >
                <a
                  href="#equipment"
                  className="px-8 py-4 text-white font-bold bg-orange-500 hover:bg-orange-600 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  Explore Equipment
                </a>
                <a
                  href="#contact"
                  className="px-8 py-4 text-white font-bold border-2 border-white hover:bg-white hover:text-black rounded-lg transition-all"
                >
                  Request a Quotation
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Image src="/arrowdown.png" alt="Scroll down" width={24} height={32} className="opacity-70" />
        </motion.div>
      </section>

      {/* Main Sections */}
      <MediaEquipment />
      
      <WhyChooseMedia />

      {/* Contact Section Placeholder (as requested) */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Reach Out Today</h2>
          <p className="text-gray-600 mb-12 max-w-xl mx-auto">
            Ready to secure your equipment? Email us at <span className="text-orange-600 font-semibold">media@prixair.com</span> or fill out the form in the footer to get a custom quotation immediately.
          </p>
          <div className="flex justify-center gap-6">
             <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl w-48">
                <span className="text-orange-500 text-3xl mb-2">📞</span>
                <span className="font-bold">Call Us</span>
                <span className="text-sm text-gray-500">08181888892</span>
             </div>
             <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl w-48">
                <span className="text-orange-500 text-3xl mb-2">✉️</span>
                <span className="font-bold">Email Us</span>
                <span className="text-sm text-gray-500">media@prixair.com</span>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
