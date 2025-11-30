"use client";

import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

export default function GuestReviews() {
  const reviews = [
    {
      name: "Amina O.",
      review:
        "The deluxe suite was dreamy, especially the spa bath. We had the most peaceful weekend. Highly recommended for couples.",
    },
    {
      name: "Tunde B.",
      review:
        "Our kids loved the pool and breakfast buffet! The staff were warm and welcoming — it felt like home away from home.",
    },
    {
      name: "Anita G.",
      review:
        "Exceptional service and immaculate rooms. Beautiful decor and delicious meals. I’ll definitely return!",
    },
  ];

  return (
    <section className="py-20 bg-white text-center text-gray-800">
      <motion.h2
        className="text-2xl md:text-3xl font-serif font-semibold mb-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        What Our Guests Say
      </motion.h2>
      <p className="text-gray-600 mb-10">
        Thousands of guests have enjoyed their stay with us. Here's what they’re saying.
      </p>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            className="border border-gray-400 rounded-lg p-6 shadow-sm hover:shadow-md transition text-left bg-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <h4 className="font-semibold mb-2">{r.name}</h4>
            <p className="text-sm text-gray-600 mb-4">{r.review}</p>
            <div className="flex text-[#FB6404]">
              {Array(5)
                .fill(0)
                .map((_, idx) => (
                  <FaStar key={idx} />
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
