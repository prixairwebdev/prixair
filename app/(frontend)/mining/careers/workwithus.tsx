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

function Whyworkwithus() {
  const contentParts = [
    <p key="subtitle" className="text-black font-bold mt-10 sm:-mt-10">
      Why work with us{" "}
    </p>,
 
    <p key="para1">
      At Prixair Group, meeting real human needs through innovation, service,
      and impact is at the heart of everything we do.
    </p>,
    <p key="para2">
      We are building a team of passionate professionals from diverse
      backgrounds, united by a common purpose — to deliver value that transforms
      lives and industries. Our work environment empowers people to thrive,
      contribute meaningfully, and grow — both personally and professionally —
      in a culture where every voice matters and every effort counts.
    </p>,

  ];

  return (
    <div
      id="Whyworkwithus"
      className="w-full bg-gray-50 h-screen flex flex-col items-center justify-center p-6"
    >
      <motion.div
        className="text-center max-w-3xl flex flex-col gap-2 text-md text-gray-700"
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

export default Whyworkwithus;
