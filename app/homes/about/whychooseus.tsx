"use client";

import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Quality Assurance",
      desc: "Every product we offer is carefully selected and tested for durability, safety, and performance.",
      icon: "🛡️",
    },
    {
      title: "Modern & Stylish Designs",
      desc: "Our products combine elegance with functionality, giving your home a contemporary look.",
      icon: "✨",
    },
    {
      title: "Fast & Reliable Delivery",
      desc: "Our logistics team ensures your orders arrive quickly, safely, and stress-free.",
      icon: "📦",
    },
    {
      title: "Customer-First Service",
      desc: "We build relationships, not transactions. Our dedicated team ensures satisfaction every step of the way.",
      icon: "🤝",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.17, 0.67, 0.83, 0.67] as const },
    },
  };

  return (
    <section className="w-full px-6 md:px-20 py-16 bg-white text-black">
      <motion.div
        className="text-center mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h3 variants={itemVariants} className="text-lg font-semibold">Why Choose Us</motion.h3>
        <motion.p variants={itemVariants} className="text-xs text-gray-700 mt-1 max-w-lg mx-auto">
          We’re not just selling furnitures — we’re delivering purity, care, and consistency.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={containerVariants}
      >
        {features.map((item, index) => (
          <motion.div
            key={index}
            className="border p-5 rounded shadow-sm bg-white"
            variants={itemVariants}
          >
            <div className="text-3xl mb-3">{item.icon}</div>
            <h4 className="text-sm font-semibold mb-1">{item.title}</h4>
            <p className="text-xs text-gray-700">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}