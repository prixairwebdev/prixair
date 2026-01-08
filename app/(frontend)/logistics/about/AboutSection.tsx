"use client";

import { motion } from "framer-motion";
import { FaBolt, FaHeadset, FaLock, FaMapMarkerAlt } from "react-icons/fa";

export default function AboutSection() {
  const features = [
    {
      icon: <FaMapMarkerAlt className="text-[#FB6404] text-2xl" />,
      title: "Real-Time Tracking, Always",
      desc: "Get up-to-the-minute updates with live shipment tracking — know where your package is, every step of the way.",
    },
    {
      icon: <FaBolt className="text-[#FB6404] text-2xl" />,
      title: "Fast & Flexible Delivery Options",
      desc: "Whether it's same-day, next-day, or scheduled deliveries, we give you control over how and when your shipment arrives.",
    },
    {
      icon: <FaHeadset className="text-[#FB6404] text-2xl" />,
      title: "24/7 Customer Support",
      desc: "Our support team is always on standby to assist you — real people, real answers, anytime you need help.",
    },
    {
      icon: <FaLock className="text-[#FB6404] text-2xl" />,
      title: "Secure & Verified Handling",
      desc: "Every package is scanned, tagged, and handled with care. Safety and accountability are part of our promise.",
    },
  ];

  const testimonials = [
    {
      name: "Jordan A.",
      review:
        "Working with [Your Logistics Brand] has been a game-changer. Fast, reliable, and their support is top-notch.",
    },
    {
      name: "Jordan A.",
      review:
        "We scaled our business faster because we knew our shipments were in good hands. Tracking and delivery are seamless.",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" as const } 
    },
  };

  return (
    <section className="bg-white text-gray-800 overflow-hidden">
      {/* WHO WE ARE */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-gray-900 text-white py-16 text-center px-6"
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-4xl font-semibold mb-4"
        >
          Who We Are
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="max-w-3xl mx-auto leading-relaxed text-gray-300"
        >
          We are a modern logistics company committed to bridging distances with
          reliability, speed, and care. Whether it's across town or across the
          country, we specialize in moving goods efficiently—powered by
          technology, people, and purpose.
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="max-w-3xl mx-auto leading-relaxed mt-4 text-gray-300"
        >
          Founded with a vision to simplify deliveries for businesses and
          individuals alike, our team brings together logistics experts, support
          staff, and passionate couriers who believe every package tells a
          story. With every delivery, we strive to build trust, support commerce,
          and bring smiles to doorsteps.
        </motion.p>
      </motion.div>

      {/* WHAT SETS US APART */}
      <div className="py-16 px-6 text-center">
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-2xl md:text-3xl font-semibold mb-2"
        >
          What Sets Us Apart
        </motion.h3>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-gray-600 mb-10"
        >
          At the heart of our services is a commitment to reliability,
          technology, and customer-first delivery.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" as const } }}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-left hover:shadow-md transition"
            >
              <div className="mb-3">{f.icon}</div>
              <h4 className="font-semibold mb-2 text-gray-800">{f.title}</h4>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="bg-gray-50 py-16 text-center">
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-2xl md:text-3xl font-semibold mb-2"
        >
          What Our Clients Say
        </motion.h3>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-gray-600 mb-10"
        >
          We don't just move packages — we move businesses forward. Here's what
          our clients have to say about working with us.
        </motion.p>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: "easeOut" as const } }}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-left"
            >
              <p className="text-gray-700 mb-4">{t.review}</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800">{t.name}</span>
                <div className="flex space-x-1 text-[#FB6404]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ 
            scale: 1.05, 
            transition: { duration: 0.2, ease: "easeOut" as const } 
          }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 bg-[#FB6404] text-white px-6 py-3 rounded-md font-medium hover:bg-[#E55A00] transition-colors duration-200"
        >
          More reviews
        </motion.button>
      </div>
    </section>
  );
}