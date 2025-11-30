"use client";
import { useState, useEffect } from "react";
import { motion, easeInOut } from "framer-motion";
import Image from "next/image";
import OurCategories from "../sections/ourcategories";
import { menuItems } from "./data/menu";
import MenuSection from "./menu";

export default function Home() {

  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const savedLocation = localStorage.getItem("selectedLocation");
    if (savedLocation) {
      setShowModal(false);
    }
  }, []);

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

  const scrollIndicator = {
    animate: {
      y: [0, 15, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: easeInOut, // ✅ fixed typing
      },
    },
  };

  return (
    <div className="overflow-hidden">
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
                src="/bgbuka.png"
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
                  className="max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto text-center"
                  variants={container}
                  initial="hidden"
                  animate="show"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-white"
                    variants={item}
                  >
                    Our Menu
                  </motion.h1>

                  <motion.p
                    className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto"
                    variants={item}
                  >
                    Every dish tells a story. At Prixair Buka, we bring you the
                    rich, authentic flavors of Nigerian home cooking — prepared
                    with care, tradition, and love
                  </motion.p>
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

          <OurCategories />

          <main className="bg-white min-h-screen sm:px-10">
            <MenuSection
              title="Top Sellers"
              color="bg-black"
              items={menuItems.filter((item) => item.category === "top-sellers")}
            />

            <MenuSection
              title="Rice Dishes"
              color="bg-[#FE0000]"
              items={menuItems.filter((item) => item.category === "rice")}
            />

            <MenuSection
              title="Soups & Swallow"
              color="bg-[#004F1D]"
              items={menuItems.filter((item) => item.category === "soups")}
            />

            <MenuSection
              title="Grilled Foods"
              color="bg-[#450A0A]"
              items={menuItems.filter((item) => item.category === "grilled")}
            />

            <MenuSection
              title="Drinks"
              color="bg-[#450A0A]"
              items={menuItems.filter((item) => item.category === "drinks")}
            />
          </main>
        </>
      )}
    </div>
  );
}
