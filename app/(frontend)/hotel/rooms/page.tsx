"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FindRoomBar from "../components/FindRoomBar";
import RoomsCategories from "./RoomsCategories";
import FeaturedRooms from "./FeaturedRooms";
import GuestReviews from "./GuestReviews";
import ConciergeHelp from "./ConciergeHelp";

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
        >Find Your Perfect Stay 
        </motion.h1>

        <motion.p
          className="mt-4 text-base md:text-lg text-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Browse our selection of elegant, comfortable rooms designed for every traveler.
        </motion.p>

        <motion.a
          href="/rooms"
          className="inline-block mt-8 bg-[#FB6404] hover:bg-[#E55A00] text-white font-medium px-6 py-3 rounded transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          View Rooms
        </motion.a>
      </div>

     
    </section>
   <FindRoomBar />
   <RoomsCategories />
   <FeaturedRooms />
   <GuestReviews    />
   <ConciergeHelp />
   
    </>
  );
}
