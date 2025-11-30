"use client";

import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function VisionMissionValues() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-100px" }}
      variants={containerVariants}
      className="w-full min-h-screen flex flex-col md:flex-row justify-center items-center gap-4 p-6 bg-white"
    >
      {/* Vision */}
      <motion.div
        variants={itemVariants}
        className="bg-white shadow-md p-6 w-full md:w-1/3 text-center justify-center h-[350px] flex flex-col items-center"
      >
        <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
        <p className="text-sm text-gray-700">
          Is To Become A Global Enterprise In The Provision Of Quality Products
          And Services.
        </p>
      </motion.div>

      {/* Core Values */}
      <motion.div
        variants={itemVariants}
        className="bg-[#FB6404] text-white p-6 w-full md:w-1/3 shadow-lg text-center h-[450px] flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold mb-4">Our Core Values</h2>
        <p className="text-sm mb-4">
          At Prixair Group, Our Core Values Are The Foundation Of Our Operations
          And Guide Our Interactions With Clients, Partners, And Communities.
          Our Key Principles Include:
        </p>
        <ul className="text-sm text-left list-disc list-inside space-y-1 flex flex-col gap-4">
          <li className="flex gap-4 ">
            <span className="material-symbols-outlined">cognition_2</span>
            <strong>Knowledge</strong>
          </li>
          <li className="flex gap-4 ">
            <span className="material-symbols-outlined">lightbulb</span>
            <strong>Innovation</strong>
          </li>
          <li className="flex gap-4 ">
            <span className="material-symbols-outlined">diversity_3</span>
            <strong>Teamwork</strong>
          </li>
          <li className="flex gap-4 ">
            <span className="material-symbols-outlined">assured_workload</span>
            <strong>Integrity</strong>
          </li>
          <li className="flex gap-4 ">
            <span className="material-symbols-outlined">business_center</span>
            <strong>Professionalism</strong>
          </li>
        </ul>
      </motion.div>

      {/* Mission */}
      <motion.div
        variants={itemVariants}
        className="bg-white shadow-md p-6 w-full md:w-1/3 text-center justify-center h-[350px] flex flex-col items-center"
      >
        <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
        <p className="text-sm text-gray-700">
          Is To Leverage On Our Unique Skills And Competence in Providing
          Products And Services That Create Value And Meet The Need Of
          Customers.
        </p>
      </motion.div>
    </motion.div>
  );
}
