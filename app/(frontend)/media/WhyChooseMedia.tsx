"use client";

import { motion, Variants } from "framer-motion";
import { FaMicrophone, FaTruck, FaTools, FaCheckCircle } from "react-icons/fa";
import { ReactNode } from "react";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function WhyChooseMedia() {
  const features: Feature[] = [
    {
      icon: <FaMicrophone className="text-orange-500 text-4xl" />,
      title: "Top-Tier Brand Quality",
      description:
        "We only lend high-end equipment from industry-recognized brands for maximum reliability.",
    },
    {
      icon: <FaTools className="text-orange-500 text-4xl" />,
      title: "Full Technical Support",
      description:
        "Our team provides setup assistance and on-site technical monitoring during your events.",
    },
    {
      icon: <FaTruck className="text-orange-500 text-4xl" />,
      title: "Timely Delivery",
      description:
        "We understand the pressure of event timelines. We deliver and set up well before your start time.",
    },
    {
      icon: <FaCheckCircle className="text-orange-500 text-4xl" />,
      title: "Flexible Rental Plans",
      description:
        "Whether it's for 2 hours or 2 weeks, we offer competitive rates tailored to your duration.",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="why-us" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
            Why Partner with Prixair Media?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-600 max-w-2xl mx-auto">
            We don't just provide equipment; we provide the peace of mind that your event will sound and look professional from start to finish.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-black"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm p-8 text-center hover:shadow-md transition-shadow"
            >
              <div className="mb-6 flex justify-center">{feature.icon}</div>
              <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Quick CTA */}
      <div className="mt-20 flex justify-center px-6">
        <motion.div 
          className="bg-orange-500 text-white p-8 md:p-12 rounded-2xl max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Ready to elevate your event?</h3>
            <p className="text-orange-100">Get a free consultation and quotation for your equipment needs.</p>
          </div>
          <a 
            href="#contact"
            className="bg-white text-orange-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            Reach Out via Mail
          </a>
        </motion.div>
      </div>
    </section>
  );
}
