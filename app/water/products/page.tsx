"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion"; // ✅ Added Variants import
import { useState } from "react";

import BulkWaterSection from "../BulkWaterSection";

export default function Home() {
  const [isInView, setIsInView] = useState({
    hero: false,
    legacy: false,
  });

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const products = [
    {
      name: "50cl Bottle (Classic)",
      description:
        "Perfect for on-the-go hydration. Slim, recyclable, and always cool.",
      img: "/images/50cl-bottle.png",
    },
    {
      name: "75cl Sports Bottle",
      description: "Sturdy bottle, fits cup holders",
      img: "/images/75cl-bottle.png",
    },
    {
      name: "1.5L Family Bottle",
      description: "Great for shared use, picnics, or travel",
      img: "/images/1.5l-bottle.png",
    },
    {
      name: "19L Refill Bottle (Dispenser)",
      description: "Bulk water for homes, offices, events",
      img: "/images/19l-bottle.png",
    },
  ];

  const features = [
    { icon: "💧", text: "100% Natural Spring Source" },
    { icon: "🔬", text: "Microfiltered & UV Purified" },
    { icon: "♻️", text: "Sustainable & Recyclable Packaging" },
    { icon: "✅", text: "NAFDAC Certified" },
  ];

  // ✅ Explicitly typed Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
    exit: { opacity: 0 },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 16 },
    },
    exit: { opacity: 0, y: 20 },
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
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('/mainbg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          role="img"
          aria-label="Prixair Group corporate background"
        />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center sm:justify-start">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24">
            <motion.div
              className="max-w-2xl lg:max-w-3xl xl:max-w-4xl text-center sm:text-left"
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
                Stay Hydrated with Purity You Can Trust
              </motion.h1>

              <motion.p
                className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-400/90 leading-relaxed max-w-3xl mx-auto sm:mx-0"
                variants={item}
              >
                Explore our full range of bottled water products — available in
                various sizes and formats to suit your lifestyle.
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

      {/* Products section */}
      <section className="mt-40 md:mt-28 py-8 px-4 md:px-12">
        <motion.div
          className="mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h3
            variants={itemVariants}
            className="text-lg md:text-xl font-semibold mb-1"
          >
            Our Water Products
          </motion.h3>
          <motion.p variants={itemVariants} className="text-gray-600">
            Choose the right size for your lifestyle.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-sm p-4 flex flex-col items-center text-center rounded-lg"
              variants={itemVariants}
            >
              <div className="w-28 sm:w-32 h-36 sm:h-40 relative mb-4">
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>

              <h4 className="font-semibold text-sm sm:text-base">
                {product.name}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 mb-4">
                {product.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-100 text-xs sm:text-sm">
                  Request a Quote
                </button>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs sm:text-sm">
                  Buy Now
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Bulk water section */}
      <BulkWaterSection />
    </div>
  );
}
