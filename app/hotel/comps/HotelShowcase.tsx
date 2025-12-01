"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaStar, FaWifi, FaUtensils, FaCar, FaDumbbell, FaUserTie, FaSpa } from "react-icons/fa";

export default function HotelShowcase() {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-20 space-y-24 bg-white text-gray-800">
      
      {/* ====== ROOMS & SUITES ====== */}
      <div className="text-center">
        <motion.h2
          className="text-2xl md:text-3xl font-serif font-semibold mb-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Explore Our Rooms & Suites
        </motion.h2>
        <p className="text-gray-600 mb-10">
          Curated comfort for every type of traveler — from elegant standard rooms to indulgent luxury suites.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Standard Room", price: "45,000", img: "/room1.png", rating: 4.7 },
            { name: "Executive King Room", price: "65,000", img: "/room2.png", rating: 5.0 },
            { name: "Deluxe Suite", price: "90,000", img: "/room3.png", rating: 5.0 },
          ].map((room, i) => (
            <motion.div
              key={i}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
            >
              <Image
                src={room.img}
                alt={room.name}
                width={400}
                height={250}
                className="w-full h-56 object-cover"
              />
              <div className="p-5 text-left">
                <h3 className="text-lg font-semibold">{room.name}</h3>
                <p className="text-gray-600 text-sm mb-2">From ₦{room.price}/night</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-orange-500">
                    <FaStar className="mr-1" /> {room.rating}
                  </div>
                  <button className="bg-[#FB6404] hover:bg-[#E55A00] text-white text-sm font-medium px-4 py-2 rounded">
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <button className="mt-10 bg-[#FB6404] hover:bg-[#E55A00] text-white px-6 py-2 rounded-md">
          See More
        </button>
      </div>

      {/* ====== AMENITIES ====== */}
      <div className="text-center bg-gray-50 py-16 rounded-lg">
        <motion.h2
          className="text-2xl md:text-3xl font-serif font-semibold mb-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hotel Amenities & Guest Services
        </motion.h2>
        <p className="text-gray-600 mb-10">
          Enjoy full-service facilities tailored for business, leisure, and relaxation.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 justify-center">
          {[
            { icon: <FaSpa size={30} />, label: "Spa & Wellness" },
            { icon: <FaDumbbell size={30} />, label: "Gym" },
            { icon: <FaCar size={30} />, label: "Free Parking" },
            { icon: <FaUserTie size={30} />, label: "Concierge Services" },
            { icon: <FaUtensils size={30} />, label: "Complimentary Meals" },
            { icon: <FaWifi size={30} />, label: "Free WIFI" },
          ].map((amenity, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center justify-center bg-white rounded-full p-6 shadow-sm hover:shadow-md transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="text-[#FB6404] mb-2">{amenity.icon}</div>
              <p className="text-sm font-medium">{amenity.label}</p>
            </motion.div>
          ))}
        </div>

        <button className="mt-10 bg-[#FB6404] hover:bg-[#E55A00] text-white px-6 py-2 rounded-md">
          Browse Amenities
        </button>
      </div>

      {/* ====== LEGACY & ABOUT ====== */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-[#FB6404] font-semibold mb-3 font-serif">
            A Legacy of Warmth & Welcome
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            Nestled in the heart of the city, Prixair Hotel was founded with one mission: to make every stay feel unforgettable.
            Whether you’re here for business or leisure, our team is dedicated to delivering exceptional comfort, service, and local charm.
          </p>

          <div className="flex gap-10 text-sm">
            <div>
              <h4 className="text-xl font-bold text-gray-900">4.8</h4>
              <p className="text-gray-500">Rating</p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900">10+ years</h4>
              <p className="text-gray-500">Experience</p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900">24/7</h4>
              <p className="text-gray-500">Support</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="w-full h-64 md:h-80 bg-gray-200 flex items-center justify-center text-gray-500 text-sm rounded-lg"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hotel image
        </motion.div>
      </div>
    </section>
  );
}
