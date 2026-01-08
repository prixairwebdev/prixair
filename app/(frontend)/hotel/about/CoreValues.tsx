"use client";

import { motion } from "framer-motion";
import { FaHandsHelping, FaBroom, FaLeaf, FaUserTie } from "react-icons/fa";

export default function CoreValues() {
  const values = [
    {
      icon: <FaHandsHelping size={28} />,
      title: "Genuine Hospitality",
      text: "We believe in making every guest feel truly seen and valued — offering heartfelt service that transforms a simple stay into a memorable experience.",
    },
    {
      icon: <FaBroom size={28} />,
      title: "Impeccable Cleanliness",
      text: "Your comfort and peace of mind matter most — that’s why we maintain the highest standard of hygiene in every corner of our hotel, every single day.",
    },
    {
      icon: <FaLeaf size={28} />,
      title: "Mindful Comfort",
      text: "Your comfort is intentional — every room is designed to offer a serene, restful experience that supports your well-being.",
    },
    {
      icon: <FaUserTie size={28} />,
      title: "Professional Care",
      text: "From the front desk to room service, our team is trained to deliver prompt, polished, and personalized service that exceeds expectations.",
    },
  ];

  return (
    <section className="bg-white text-gray-800 py-20 px-6 md:px-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3">
          Our Core Values
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Guiding every stay with purpose — our values reflect the heart of who we are and how we care for every guest.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {values.map((val, i) => (
          <motion.div
            key={i}
            className="border rounded-lg p-6 text-center hover:shadow-md transition flex flex-col items-center space-y-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <div className="text-[#C0392B]">{val.icon}</div>
            <h3 className="font-semibold text-gray-900">{val.title}</h3>
            <p className="text-sm text-gray-600">{val.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
