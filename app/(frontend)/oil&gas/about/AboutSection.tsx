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
        className="bg-black text-white py-16 text-center px-6"
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
       At Prixair Oil & Gas, we are driven by a commitment to deliver reliable, efficient, and sustainable energy solutions across Nigeria and beyond. We specialize in the distribution of premium petroleum products, logistics support, and energy consultancy services designed to keep businesses and industries running without interruption.
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="max-w-3xl mx-auto leading-relaxed mt-4 text-gray-300"
        >
        
Our operations are built on three pillars — quality, safety, and integrity. From sourcing and storage to delivery, every step reflects our dedication to excellence and compliance with global energy standards.

With a team of experienced professionals and a growing logistics network, Prixair Oil & Gas continues to power progress, fuel innovation, and support the nation’s energy needs responsibly
        </motion.p>
      </motion.div>

     
    </section>
  );
}