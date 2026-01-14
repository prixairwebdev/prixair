"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

interface BulkWaterSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  imageSrc?: string;
}

export default function BulkWaterSection({
  title = "Need Water in Bulk?",
  description = "We deliver to businesses, events, and institutions fast, fresh, and affordable. Whether you’re planning an event, running a hotel, or need daily supply for your office, we offer reliable and timely delivery in bulk at discounted rates.",
  buttonText = "Request a Quote",
  imageSrc = "/infographic.png", // Replace later
}: BulkWaterSectionProps) {
  // Parent container animation settings
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Each item animation settings
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.17, 0.67, 0.83, 0.67], // easeOut cubic-bezier
      },
    },
  };

  return (
    <section className="bg-black text-white py-16">
      <motion.div
        className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }} // retrigger on scroll up
      >
        {/* Left Text Content */}
        <div className="max-w-lg space-y-6">
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold"
          >
            {title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-300 leading-relaxed"
          >
            {description}
          </motion.p>

          <motion.button
            variants={itemVariants}
            className="bg-white text-black px-6 py-3 rounded shadow hover:bg-gray-200 transition font-medium"
          >
            {buttonText}
          </motion.button>
        </div>

        {/* Right Image */}
        <motion.div
          variants={itemVariants}
          className="w-full md:w-1/2 flex justify-center"
        >
          <div className="relative w-[520px] h-[360px]">
            <Image
              src={imageSrc}
              alt="Bulk Water Delivery Illustration"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
