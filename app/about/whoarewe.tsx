import React from "react";
import { motion, Variants } from "framer-motion";

// Animation variants with proper typing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut", 
    },
  },
};

function WhoAreWe() {

  const contentParts = [
    <p key="subtitle" className="text-[#FB6404] mt-10 sm:-mt-10">
      Who Are We
    </p>,
    <h1 key="title" className="text-black font-semibold text-lg">
      A LEGACY OF INNOVATION AND EXCELLENCE ACROSS NIGERIA SINCE 2009
    </h1>,
    <p key="para1">
      Prixair Group is a dynamic and diversified Nigerian conglomerate
      established in 2009 by visionary entrepreneur, Ademola Banjo. With its
      corporate headquarters in Abuja, Prixair has grown steadily to become a
      respected player across a wide range of industries.
    </p>,
    <p key="para2">
      Our core areas of operation include Oil & Gas, Solid Minerals Mining,
      Transportation & Logistics, Real Estate, Agriculture, Hospitality,
      Supermarket, Media, and Food.
    </p>,
    <p key="para3">
      Driven by innovation, operational excellence, and a commitment to quality
      service delivery, Prixair Group continues to expand its footprint across
      Nigeria, delivering value to clients, partners, and communities alike. We
      are guided by a clear vision—to lead in every sector we operate—while
      maintaining integrity, professionalism, and sustainable growth at the
      heart of our business operations.
    </p>,
  ];

  return (
    <div
      id="whoarewe"
      className="w-full bg-gray-50 h-screen flex flex-col items-center justify-center p-6"
    >
      <motion.div
        className="text-center max-w-3xl flex flex-col gap-4 text-md text-gray-700"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        variants={containerVariants}
      >
        {contentParts.map((part, index) => (
          <motion.div key={index} variants={itemVariants}>
            {part}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default WhoAreWe;
