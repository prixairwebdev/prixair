"use client";

import React, { useState } from "react";
import { motion, easeOut } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessUnit: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center pb-10">
      <div className="w-full h-[80px] bg-black mb-8" />

      <motion.div
        className="max-w-xl w-full flex flex-col items-center text-center text-gray-600 text-sm"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.h1
          className="text-2xl font-semibold mb-2 text-black"
          variants={itemVariants}
        >
          Contact us
        </motion.h1>
        <motion.p className="mb-1" variants={itemVariants}>
          Working with Prixair group is more than a job.
        </motion.p>
        <motion.p className="mb-6" variants={itemVariants}>
          It’s about building businesses that shape communities, delivering
          services that matter, and creating lasting impact across industries.
        </motion.p>
      </motion.div>

      <motion.div
        className="max-w-xl w-full bg-white p-6 rounded shadow"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div variants={itemVariants}>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              name="name"
              type="text"
              placeholder=""
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder=""
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Business Unit
            </label>
            <select
              name="businessUnit"
              className="w-full border border-gray-300 rounded px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.businessUnit}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Prixair Supermarket">Prixair Supermarket</option>
              <option value="Prixair BUKA">Prixair BUKA</option>
              <option value="Prixair Resources">Prixair Resources</option>
              <option value="Prixair Hotels">Prixair Hotels</option>
              <option value="Prixair Furnitures">Prixair Furnitures</option>
              <option value="Prixair Farms">Prixair Farms</option>
              <option value="Prixair Real-Estates">Prixair Real-Estates</option>
              <option value="Prixair Waters">Prixair Waters</option>
              <option value="Prixair Logistics">Prixair Logistics</option>
            </select>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Your Message
            </label>
            <textarea
              name="message"
              placeholder="Enter your message"
              rows={4}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-[#8AD52E] text-white py-2 rounded hover:bg-[#a0d65d] transition"
            variants={itemVariants}
          >
            Send
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default ContactPage;
