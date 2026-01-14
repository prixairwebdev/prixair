"use client";
import { useState, useEffect } from "react";
import { motion, useAnimation, easeInOut } from "framer-motion";
import Image from "next/image";

// Sections
import Ourcategories from "./sections/ourcategories";
import TopSellers from "./sections/topsellers";
import TestimonialCarousel from "./sections/TestimonialCarousel";
import RestaurantLocator from "./sections/RestaurantLocator";
import SpecialPromoBanner from "./sections/SpecialPromoBanner";
import OurPeopleSection from "./sections/OurPeopleSection";

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(true);



  useEffect(() => {
    const savedLocation = localStorage.getItem("selectedLocation");
    if (savedLocation) {
      setSelectedLocation(savedLocation);
      setShowModal(false);
    }
  }, []);

  const handleSelectLocation = (location: string) => {
    setSelectedLocation(location);
    localStorage.setItem("selectedLocation", location);
    setShowModal(false);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
        duration: 0.7,
      },
    },
  };

  const buttonItem = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
    },
  };

  const scrollIndicator = {
    animate: {
      y: [0, 15, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: easeInOut,
      },
    },
  };

  const locations = [
    "PRIXAIR BUKA GADUWA",
    "PRIXAIR BUKA ZONE 6",
    "PRIXAIR BUKA JABI MALL",
    "PRIXAIR BUKA GATEWAY MALL",
    "PRIXAIR BUKA MINNA",
  ];

  return (
    <div className="overflow-hidden">
      {/* Location Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
            <h2 className="text-xl font-bold mb-4 text-center">Select Your Location or Branch</h2>
            <p className="text-sm text-gray-600 mb-4 text-center">
              Each branch offers a unique menu experience. Choose your nearest location.
            </p>
            <div className="space-y-3">
              {locations.map((location) => (
                <div
                  key={location}
                  className={`border rounded px-4 py-2 cursor-pointer transition-all ${
                    selectedLocation === location
                      ? "border-red-500 bg-red-100"
                      : "border-gray-300 hover:border-red-400"
                  }`}
                  onClick={() => handleSelectLocation(location)}
                >
                  {location}
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                if (selectedLocation) setShowModal(false);
              }}
              disabled={!selectedLocation}
              className={`mt-6 w-full py-2 text-white font-semibold rounded ${
                selectedLocation
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Select
            </button>
          </div>
        </div>
      )}

      {/* Main Page Content (only shows after modal is closed) */}
      {!showModal && (
        <>
          <section
            className="relative h-screen w-full overflow-hidden"
            aria-label="Prixair Group Hero Section"
          >
            <motion.div
              className="absolute inset-0 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Image
                src="/bukabg.png"
                alt="Prixair Group corporate background"
                fill
                priority
                quality={100}
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
            </motion.div>

            <div className="relative z-10 h-full flex items-center justify-center sm:justify-start px-4 sm:px-6 lg:px-8">
              <div className="container mx-auto">
                <motion.div
                  className="max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto text-center sm:text-left"
                  variants={container}
                  initial="hidden"
                  animate="show"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-white"
                    variants={item}
                  >
                    Bringing You the <span className="text-[#FE0000]">Taste</span> of Home
                  </motion.h1>

                  <motion.p
                    className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl"
                    variants={item}
                  >
                    Authentic Nigerian dishes made fresh, served fast.
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-10 sm:mt-12"
                    variants={container}
                  >
                    <motion.a
                      href="/menu"
                      className="bg-[#FE0000] hover:bg-[#D90000] text-white px-6 sm:px-8 py-4 sm:py-5 text-lg sm:text-xl flex items-center justify-center gap-2 w-full sm:w-auto min-w-[180px] font-semibold shadow-lg"
                      variants={buttonItem}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <span className="material-symbols-outlined">menu_book</span>
                      View Menu
                    </motion.a>
                    <motion.a
                      href="/order"
                      className="text-[#FE0000] hover:text-[#D90000] bg-white hover:bg-gray-100 px-6 sm:px-8 py-4 sm:py-5 text-lg sm:text-xl flex items-center justify-center gap-2 w-full sm:w-auto min-w-[180px] font-semibold  shadow-lg"
                      variants={buttonItem}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <span className="material-symbols-outlined">shopping_bag</span>
                      Order Now
                    </motion.a>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
              variants={scrollIndicator}
              animate="animate"
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

          <Ourcategories />
          <TopSellers />
          <TestimonialCarousel />
          <SpecialPromoBanner />
          <OurPeopleSection />
          <RestaurantLocator />
        </>
      )}
    </div>
  );
}
