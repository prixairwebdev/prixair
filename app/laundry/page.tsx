"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import LaundryServices from "./comps/LaundryServices";
import CustomerReviews from "./comps/CustomerReviews";
import Cardservice from "./comps/Cardservice";
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  const [isInView, setIsInView] = useState({ hero: false });

  return (
    <div className="">
      {/* Hero section */}
      <section
        className="relative min-h-screen w-full"
        aria-label="Prixair Group Hero Section"
      >
        {/* Background image with gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('/laundrybg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          role="img"
          aria-label="Prixair Group corporate background"
        />

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center sm:justify-start">
          <div className="w-full flex justify-center sm:justify-start">
            <motion.div
              className="
                w-full sm:w-[90vw] md:w-[500px] lg:w-[600px]
                px-4 py-8
                sm:ml-10 md:ml-16 lg:ml-24
                text-center sm:text-left
              "
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
                Laundry Day, Done Your Way.
              </motion.h1>

              <motion.p
                className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-400/90 leading-relaxed max-w-3xl mx-auto sm:mx-0"
                variants={item}
              >
                From wash and fold to dry cleaning, enjoy fast, affordable, and
                reliable laundry services right at your doorstep.
              </motion.p>

              {/* Buttons */}
              <motion.div
                className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start"
                variants={item}
              >
                <a
                  href="/products"
                  className="w-auto px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base text-white font-semibold bg-blue-500 hover:bg-blue-600  transition-colors"
                >
                  Shop now
                </a>
                <a
                  href="/quote"
                  className="w-auto px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base text-gray-900 font-semibold bg-white hover:bg-gray-100 transition-colors"
                >
                  Request quote
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      <LaundryServices />
      <CustomerReviews />
      <Cardservice />
    </div>
  );
}
