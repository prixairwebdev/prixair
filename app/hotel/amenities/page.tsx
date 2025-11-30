"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import HotelAmenities from "./HotelAmenities";
import ExploreAndReviews from "./ExploreAndReviews";

export default function Home() {
  return (
    <>
    <section
      className="relative h-screen w-full flex items-center justify-center text-center text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('/hotelbg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay Content */}
      <div className="z-10 px-4">
        <motion.h1
          className="text-3xl md:text-5xl lg:text-6xl font-serif font-semibold"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Comfort Meets Luxury
        </motion.h1>

        <motion.p
          className="mt-4 text-base md:text-lg text-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Explore the exceptional amenities designed for your ultimate comfort and convenience.
        </motion.p>

       
      </div>

      {/* Background dim layer */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Optional scroll indicator */}
      {/* <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Image src="/arrowdown.png" alt="Scroll" width={25} height={25} />
      </div> */}
    </section>
  <HotelAmenities />
    <ExploreAndReviews  />
    </>
  );
}
