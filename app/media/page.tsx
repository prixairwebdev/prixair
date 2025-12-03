"use client";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import NewsRoomSection from "../sections/NewsRoomSection";
import GallerySection from "./GallerySection";
import PressReleaseSection from "./PressReleaseSection";
import Footer from "../components/footer"
import Nav from "../components/nav"
function Page() {
  const [isInView, setIsInView] = useState({
    hero: false,
    cta: false,
  });

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, x: -50 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const ctaItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div>
      <Nav/>
      {/* Hero section */}
      <section
        className="relative h-screen w-full"
        aria-label="Prixair Group Hero Section"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('/mediabg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          role="img"
          aria-label="Prixair Group corporate background"
        />

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
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-white"
                variants={item}
              >
                Capturing Moments, Creating Stories
              </motion.h1>

              <motion.p
                className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-400/90 leading-relaxed max-w-3xl"
                variants={item}
              >
                Explore our latest news, press releases, and gallery highlights
                — bringing the Prixair experience to you.
              </motion.p>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
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

      {/* Sections */}
      <div id="news">
        <NewsRoomSection />
      </div>
      <GallerySection id="gallery" />
      <PressReleaseSection id="pressrelease" />

      {/* CTA Section */}
      <section className="w-full min-h-screen bg-[#181818] text-white flex flex-col justify-center items-center text-center px-4 py-16 sm:py-24">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          animate={isInView.cta ? "show" : "hidden"}
          onViewportEnter={() =>
            setIsInView((prev) => ({ ...prev, cta: true }))
          }
          onViewportLeave={() =>
            setIsInView((prev) => ({ ...prev, cta: false }))
          }
          viewport={{ once: false, margin: "-100px" }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
            variants={ctaItem}
          >
            Your vision, our execution.
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            variants={ctaItem}
          >
            From sound and lighting to event planning and special effects —
            let’s bring your moments to life.
          </motion.p>

          <motion.div
            className="flex justify-center"
            variants={ctaItem}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="mailto:hr@prixair.com"
              className="px-6 py-3 bg-[#FB6404] text-white font-medium text-base sm:text-lg transition-all duration-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FB6404] focus:ring-opacity-50"
            >
              Contact Us
            </a>
          </motion.div>
        </motion.div>
      </section>
      <Footer/>
    </div>
  );
}

export default Page;
