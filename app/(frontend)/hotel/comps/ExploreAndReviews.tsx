"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const spaces = [
  { name: "Dining & Restaurant", img: "/dining.png" },
  { name: "Spa & Wellness", img: "/spa.png" },
  { name: "Swimming Pool", img: "/pool.png" },
  { name: "Guest Rooms", img: "/room3.png" },
];

const reviews = [
  {
    name: "Amina O.",
    review: "The deluxe suite was dreamy — especially the spa bath. We had the most peaceful weekend. Highly recommended for couples.",
    rating: 5,
  },
  {
    name: "Tunde B.",
    review: "Our kids loved the pool and breakfast buffet! The staff were warm and welcoming — it felt like home away from home.",
    rating: 5,
  },
  {
    name: "Anita G.",
    review: "Exceptional service and immaculate rooms. Beautiful decor and delicious meals. I'll definitely return.",
    rating: 5,
  },
];

const faqs = [
  { q: "What time is check-in and check-out?", a: "Check-in is from 2:00 PM, and check-out is until 12:00 PM." },
  { q: "Do you offer free parking?", a: "Yes, we provide free, secure parking for all guests during their stay." },
  { q: "Is breakfast included in the room rate?", a: "Yes, complimentary breakfast is included with every booking." },
  { q: "Are pets allowed in the hotel?", a: "Unfortunately, pets are not permitted at our properties at this time." },
];

export default function ExploreAndReviews() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  return (
    <div className="bg-white text-gray-800">
      {/* Spaces */}
      <section className="py-24 px-6 md:px-14 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Our Spaces</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">Explore Every Corner</h2>
          <p className="mt-3 text-gray-500 max-w-lg">From cosy rooms to relaxing lounges — a visual tour of everything waiting for you.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {spaces.map((space, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="relative group overflow-hidden h-64"
            >
              <Image src={space.img} alt={space.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 flex items-end">
                <p className="text-white text-sm font-semibold p-5 tracking-wide">{space.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-gray-50 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Guest Reviews</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">What Our Guests Say</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((guest, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 border-t-2 border-gray-200 hover:border-gray-900 transition-all duration-300"
              >
                <p className="text-3xl text-gray-200 font-serif mb-4">"</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{guest.review}</p>
                <p className="text-gray-900 font-semibold text-sm">{guest.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-14">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">FAQ</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Answers to the most common inquiries so you can book with complete confidence.
            </p>
            <a href="/hotel/contact" className="mt-6 inline-block text-sm font-semibold text-gray-900 border-b border-gray-900 pb-0.5 hover:border-gray-400 transition-colors">
              Ask us directly →
            </a>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="border-b border-gray-100"
              >
                <button
                  className="w-full flex justify-between items-center text-left py-5 text-gray-900 font-medium text-sm hover:text-gray-600 transition-colors"
                  onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                >
                  {faq.q}
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 ml-4 transition-transform duration-300 ${activeFAQ === i ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeFAQ === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
