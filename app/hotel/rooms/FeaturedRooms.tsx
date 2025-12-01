"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

export default function FeaturedRooms() {
  const rooms = [
    {
      name: "Standard Room",
      price: "₦45,000",
      rating: 4.7,
      img: "/room1.png",
    },
    {
      name: "Executive King Room",
      price: "₦65,000",
      rating: 5.0,
      img: "/room2.png",
    },
    {
      name: "Deluxe Suite",
      price: "₦90,000",
      rating: 5.0,
      img: "/room3.png",
    },
    {
      name: "The Urban Classic",
      price: "₦18,000",
      rating: 4.7,
      img: "/room4.png",
    },
    {
      name: "The Palm Deluxe",
      price: "₦25,000",
      rating: 5.0,
      img: "/room5.png",
    },
    {
      name: "The Monarch Suite",
      price: "₦45,000",
      rating: 5.0,
      img: "/room6.png",
    },
  ];

  return (
    <section className="py-20 bg-white text-gray-800">
      <motion.h2
        className="text-2xl md:text-3xl font-serif font-semibold text-center mb-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Featured Rooms
      </motion.h2>
      <p className="text-center text-gray-600 mb-10">
        Experience comfort and style in every stay.
      </p>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
        {rooms.map((room, i) => (
          <motion.div
            key={i}
            className="border border-gray-400 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <Image
              src={room.img}
              alt={room.name}
              width={600}
              height={400}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h4 className="font-semibold text-gray-800 mb-1">{room.name}</h4>
              <p className="text-sm text-gray-500 mb-3">
                From <span className="font-medium">{room.price}</span> / night
              </p>
              <div className="flex items-center text-[#FB6404] mb-3">
                {Array(Math.floor(room.rating))
                  .fill(0)
                  .map((_, idx) => (
                    <FaStar key={idx} />
                  ))}
                <span className="text-gray-700 ml-2 text-sm">{room.rating}</span>
              </div>
              <button className="bg-[#FB6404] text-white text-sm px-5 py-2 rounded hover:bg-orange-600 transition">
                Book Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button className="px-6 py-2 border border-[#FB6404] text-[#FB6404] rounded hover:bg-[#FB6404] hover:text-white transition">
          Load More
        </button>
      </div>
    </section>
  );
}
