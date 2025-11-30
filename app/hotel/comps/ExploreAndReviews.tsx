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

      {/* ====== FAQ SECTION ====== */}
      <div className="bg-gray-50 p-10 rounded-lg grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mb-6">
            Below, you’ll find answers to the most common inquiries our guests have, so you can book with complete
            confidence and peace of mind.
          </p>
          <a
            href="/faqs"
            className="text-[#FB6404] font-medium hover:underline"
          >
            More FAQs →
          </a>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "What time is check-in and check-out?",
              a: "Check-in is from 2:00 PM, and check-out is until 12:00 PM.",
            },
            {
              q: "Do you offer free parking?",
              a: "Yes, we provide free, secure parking for all guests during their stay.",
            },
            {
              q: "Is breakfast included in the room rate?",
              a: "Yes, complimentary breakfast is included with every booking.",
            },
            {
              q: "Are pets allowed in the hotel?",
              a: "Unfortunately, pets are not allowed in our property at this time.",
            },
          ].map((faq, i) => (
            <motion.div
              key={i}
              className="bg-white border border-gray-300 rounded-md shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <button
                className="w-full flex justify-between items-center text-left p-4 text-gray-800 font-medium"
                onClick={() => toggleFAQ(i)}
              >
                {faq.q}
                <span
                  className={`transform transition-transform duration-300 ${
                    activeFAQ === i ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              {activeFAQ === i && (
                <div className="p-4 border-t text-gray-600 text-sm">{faq.a}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
