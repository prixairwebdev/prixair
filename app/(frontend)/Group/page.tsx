"use client";
import { motion } from "framer-motion";
import { useState, MouseEvent } from "react";
// import TeamSection from "./sections/TeamSection";
import PhilosophySection from "./sections/PhilosophySection";
import SubsidiariesSection from "./sections/SubsidiariesSection";
import NewsRoomSection from "./sections/NewsRoomSection";
import Image from "next/image";
import Legacy from "./sections/legacy";

export default function Home() {
  const [isInView, setIsInView] = useState({
    hero: false,
    legacy: false,
  });

  const [showPopup, setShowPopup] = useState(false); // show promo on load

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

  const item = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const handleOutsideClick = () => {
    setShowPopup(false);
  };

  const handleInsideClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Promo Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center"
          onClick={handleOutsideClick}
        >
          <div
            className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-md w-full"
            onClick={handleInsideClick}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-3 text-black text-4xl font-bold hover:text-red-500"
            >
              ×
            </button>

            {/* Promo Image */}
            <Image
              src="/prixairpromo.jpg" // Change to your promo image path
              alt="New Branch Launch Promo"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </div>
      )}

      <div className="relative">
        {/* Hero section */}
        <section
          className="relative h-screen w-full"
          aria-label="Prixair Group Hero Section"
        >
          {/* Background image with gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('/landingpagebg.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            role="img"
            aria-label="Prixair Group corporate background"
          />

          {/* Content container */}
          <div className="relative z-10 h-full flex items-center justify-center sm:justify-start">
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
                viewport={{ once: false }}
              >
                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-white"
                  variants={item}
                >
                  Defining Excellence Across Nigeria&apos;s Key Industries
                </motion.h1>

                <motion.p
                  className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-400/90 leading-relaxed max-w-3xl"
                  variants={item}
                >
                  Since 2009, Prixair Group—under Ademola Banjo&apos;s leadership
                  in Abuja has led innovation across real estate, hospitality,
                  manufacturing, media, and mining with integrity and
                  operational excellence.
                </motion.p>

                <motion.div
                  className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
                  variants={item}
                >
                  <button
                    className="px-6 py-2 sm:px-8 sm:py-3 bg-[#FB6404] hover:bg-[#E55A00] text-white font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FB6404] focus:ring-opacity-50"
                    aria-label="Learn more about Prixair Group"
                  >
                    LEARN MORE
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

        {/* Legacy section */}
        <Legacy />

        {/* Other sections */}
        {/* <TeamSection /> */}
        <PhilosophySection />
        <SubsidiariesSection />
        <NewsRoomSection />
      </div>
    </>
  );
}
