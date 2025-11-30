"use client";

import { motion, Variants } from "framer-motion";
import { FaTint, FaTruck, FaShieldAlt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { ReactNode } from "react";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface Review {
  name: string;
  text: string;
}

export default function WhyChooseUsSection() {
  const features: Feature[] = [
    {
      icon: <FaTint className="text-blue-500 text-4xl" />,
      title: "Natural Spring Source",
      description:
        "Our water is drawn from underground springs, naturally filtered through rock.",
    },
    {
      icon: <FaShieldAlt className="text-blue-500 text-4xl" />,
      title: "99.9% Purity Guaranteed",
      description:
        "Each bottle undergoes rigorous quality checks and purification processes.",
    },
    {
      icon: <FaTruck className="text-blue-500 text-4xl" />,
      title: "Fast & Reliable Delivery",
      description:
        "Whether it’s a home or a business, we deliver fresh water promptly.",
    },
    {
      icon: <MdVerified className="text-green-500 text-4xl" />,
      title: "NAFDAC Certified",
      description:
        "Registered and approved by NAFDAC for your safety and confidence.",
    },
  ];

  const reviews: Review[] = [
    {
      name: "Jordan A.",
      text: "Best bottled water I’ve had in Nigeria. I can actually taste the difference.",
    },
    {
      name: "Jordan A.",
      text: "Always arrives on time and super cold. Perfect for our meetings.",
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.17, 0.67, 0.83, 0.67] },
    },
  };

  return (
    <section className="py-16">
      {/* Why Choose Us */}
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-2">
            Why Choose Us
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-600">
            We’re not just selling water—we’re delivering purity, care, and consistency.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white rounded-lg shadow p-6 text-center"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Customer Reviews */}
      <div className="bg-gray-50 mt-16 py-16">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: false, amount: 0.3 }}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-2">
              What Our Customers Say
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-500">
              Real Stories, Real Satisfaction
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            {reviews.map((review, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white rounded-lg shadow p-6"
              >
                <h4 className="font-semibold mb-2">{review.name}</h4>
                <p className="text-gray-600 mb-4">{review.text}</p>
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-center mt-8">
            <button className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600 transition">
              See All Review
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
