"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Whoareewe from "./whoarewe";
import Ceoprofile from "./ceoprofile";
import Management from "./management";
import PhilosophySection from "../sections/PhilosophySection";
import VisionMissionValues from "./VisionMissionValues";
function Page() {
  const [isInView, setIsInView] = useState({
    hero: false,
    legacy: false,
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

  const item = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
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
                Building Excellence Across Sectors{" "}
              </motion.h1>

              <motion.p
                className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-400/90 leading-relaxed max-w-3xl"
                variants={item}
              >
                Since  2009, Prixair Group has grown into one of Nigeria’s most
                trusted multi-sector conglomerates—delivering value, innovation,
                and reliability across the board.
              </motion.p>
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
      {/* who are we  */}
      <Whoareewe />
      <VisionMissionValues />
      <Ceoprofile />
      <Management />
      <PhilosophySection />
    </div>
  );
}

export default Page;
