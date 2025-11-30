import React from "react";
import { motion } from "framer-motion";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

function About() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 text-justify">
      {/* About Us Section */}
      <motion.div 
        className="bg-white shadow-2xl rounded p-6 max-w-5xl mx-auto mb-12"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-100px" }}
        variants={container}
      >
        <motion.h1 className="font-semibold text-2xl mb-4 text-orange-600" variants={item}>
          About Us
        </motion.h1>
        <motion.p className="text-gray-700 leading-relaxed" variants={item}>
          Prixair Resources Ltd, a flagship subsidiary of the Prixair Group, is a trailblazer in Nigeria's mineral exploration and development landscape. Founded in 2007 by Ademola Banjo, a visionary entrepreneur with a distinguished career in banking, the company harnesses the financial strength, operational expertise, and regional insight of its parent conglomerate, which spans hospitality, real estate, media, food and beverage, and logistics across Nigeria and the United States. Prixair Resources is dedicated to the sustainable exploration, extraction, and processing of gold and rare earth elements, positioning itself as a leader in Africa's mining renaissance. By integrating advanced technologies, strategic partnerships, and a commitment to environmental and social responsibility, the company aims to unlock Nigeria's vast mineral potential while delivering exceptional value to stakeholders.
        </motion.p>
      </motion.div>

      {/* Core Values Section */}
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2 
          className="text-2xl font-semibold mb-6 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          Core Values
        </motion.h2>
        <motion.p 
          className="mb-10 text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          At the heart of our operations are principles that guide every decision, action, and partnership
        </motion.p>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-100px" }}
          variants={container}
        >
          {/* Integrity */}
          <motion.div className="bg-white p-6 shadow-lg rounded" variants={item}>
            <div className="text-orange-600 text-3xl mb-2">🛡️</div>
            <h3 className="font-semibold text-lg mb-2">Integrity</h3>
            <p className="text-gray-600 text-sm">
              We drive every decision, ensuring transparency and adherence to the highest ethical standards.
            </p>
          </motion.div>

          {/* Excellence */}
          <motion.div className="bg-white p-6 shadow-lg rounded" variants={item}>
            <div className="text-orange-600 text-3xl mb-2">🏅</div>
            <h3 className="font-semibold text-lg mb-2">Excellence</h3>
            <p className="text-gray-600 text-sm">
              We give relentless pursuit of superior performance and quality, surpassing expectations and setting new benchmarks.
            </p>
          </motion.div>

          {/* Sustainability */}
          <motion.div className="bg-white p-6 shadow-lg rounded" variants={item}>
            <div className="text-orange-600 text-3xl mb-2">🌱</div>
            <h3 className="font-semibold text-lg mb-2">Sustainability</h3>
            <p className="text-gray-600 text-sm">
              We fuel the adoption of cutting-edge, eco-friendly solutions to optimize efficiency.
            </p>
          </motion.div>

          {/* Innovation */}
          <motion.div className="bg-white p-6 shadow-lg rounded" variants={item}>
            <div className="text-orange-600 text-3xl mb-2">💡</div>
            <h3 className="font-semibold text-lg mb-2">Innovation</h3>
            <p className="text-gray-600 text-sm">
              We foster meaningful collaboration that transforms traditional industry approaches to achieve shared goals.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;