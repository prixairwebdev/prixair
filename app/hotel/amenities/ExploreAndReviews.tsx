"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

export default function ExploreAndReviews() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <section className="px-6 md:px-16 lg:px-24 py-20 space-y-24 bg-white text-gray-800">
      {/* ====== EXPLORE OUR SPACES ====== */}
      <div className="text-center">
        <motion.h2
          className="text-2xl md:text-3xl font-serif font-semibold mb-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Explore Our Spaces
        </motion.h2>
        <p className="text-gray-600 mb-10">
          From cozy rooms to relaxing lounges, take a visual tour of everything waiting for you at Prixair Hotels.
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { name: "Dining and Restaurant", img: "/dining.png" },
            { name: "Spa", img: "/spa.png" },
            { name: "Pool", img: "/pool.png" },
            { name: "See More", img: "/room3.png" },
          ].map((space, i) => (
            <motion.div
              key={i}
              className="relative group overflow-hidden rounded-lg shadow-sm hover:shadow-md transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
            >
              <Image
                src={space.img}
                alt={space.name}
                width={500}
                height={400}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end">
                <p className="text-white text-lg font-medium p-4">{space.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ====== GUEST REVIEWS ====== */}
      <div className="text-center">
        <motion.h2
          className="text-2xl md:text-3xl font-serif font-semibold mb-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          What Our Guests Say
        </motion.h2>
        <p className="text-gray-600 mb-10">
          Thousands of guests have enjoyed their stay with us. Here's what they’re saying.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Amina O.",
              review:
                "The deluxe suite was dreamy, especially the spa bath. We had the most peaceful weekend. Highly recommended for couples.",
              rating: 5,
            },
            {
              name: "Tunde B.",
              review:
                "Our kids loved the pool and breakfast buffet! The staff were warm and welcoming — it felt like home away from home.",
              rating: 5,
            },
            {
              name: "Anita G.",
              review:
                "Exceptional service and immaculate rooms. Beautiful decor and delicious meals. I’ll definitely return!",
              rating: 5,
            },
          ].map((guest, i) => (
            <motion.div
              key={i}
              className="bg-white border border-gray-300 rounded-lg shadow-sm p-6 text-left hover:shadow-md transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
            >
              <h4 className="font-semibold text-gray-900 mb-2">{guest.name}</h4>
              <p className="text-gray-600 text-sm mb-4">{guest.review}</p>
              <div className="flex text-[#FB6404]">
                {Array(guest.rating)
                  .fill(0)
                  .map((_, idx) => (
                    <FaStar key={idx} />
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    <section className="bg-gray-900 text-white text-center py-20 px-6">
      <motion.h2
        className="text-2xl md:text-3xl font-serif font-semibold mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
       Indulge in Every Amenity Designed for You
      </motion.h2>
      <p className="text-gray-300 mb-8 max-w-xl mx-auto">
Whether you're here for business, pleasure, or relaxation, our curated amenities ensure your stay is seamless, stylish, and satisfying.      </p>
      <button className="bg-[#FB6404] text-white px-6 py-3 rounded hover:bg-orange-600 transition">
        Book Now
      </button>
    </section>
    </section>
  );
}
