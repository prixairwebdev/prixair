"use client";

import React, { useState } from "react";
import { motion, easeOut } from "framer-motion";
// import ReCAPTCHA from "react-google-recaptcha";

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

// Replace this with your actual reCAPTCHA site key
// const RECAPTCHA_SITE_KEY = "6LfwrqQrAAAAAHbh6-Z8Rhoy-835iqSV7XfDYfYd";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessUnit: "",
    message: "",
  });

  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.businessUnit) {
      newErrors.businessUnit = "Please select a business unit.";
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    if (!captchaValue) {
      newErrors.recaptcha = "Please verify that you're not a robot.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    console.log("Submitted Data:", formData);

    // Reset form
    setFormData({
      name: "",
      email: "",
      businessUnit: "",
      message: "",
    });
    setCaptchaValue(null);

    // Safely access grecaptcha without using `any`
    // (window as Window & typeof globalThis).grecaptcha?.reset();
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center pb-10">
      <div className="w-full h-[80px] bg-black mb-8" />

      {/* Header */}
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

      {/* Contact Form */}
      <motion.div
        className="max-w-xl w-full bg-white p-6 rounded shadow"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <motion.div variants={itemVariants}>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              name="name"
              type="text"
              className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-500"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </motion.div>

          {/* Email */}
          <motion.div variants={itemVariants}>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-500"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </motion.div>

          {/* Business Unit */}
          <motion.div variants={itemVariants}>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Business Unit
            </label>
            <select
              name="businessUnit"
              className="w-full border rounded px-4 py-2 bg-white focus:ring-2 focus:ring-orange-500"
              value={formData.businessUnit}
              onChange={handleChange}
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
            {errors.businessUnit && (
              <p className="text-red-500 text-xs mt-1">{errors.businessUnit}</p>
            )}
          </motion.div>

          {/* Message */}
          <motion.div variants={itemVariants}>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Your Message
            </label>
            <textarea
              name="message"
              rows={4}
              className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-500"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </motion.div>

          {/* reCAPTCHA */}
          {/* <motion.div variants={itemVariants}>
            <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={setCaptchaValue} />
            {errors.recaptcha && <p className="text-red-500 text-xs mt-1">{errors.recaptcha}</p>}
          </motion.div> */}

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
            variants={itemVariants}
          >
            Send
          </motion.button>
        </form>
      </motion.div>

      {/* Address and Map */}
      <motion.div
        className="max-w-xl w-full mt-10 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2
          className="text-xl font-semibold mb-2"
          variants={itemVariants}
        >
          Our Address
        </motion.h2>
        <motion.p className="mb-4 text-gray-700" variants={itemVariants}>
          Plot 688, Markus Kangye Blvd, Off Oladipo Diya Way, Gaduwa, Abuja.
        </motion.p>
        <motion.div
          className="w-full h-64 rounded overflow-hidden"
          variants={itemVariants}
        >
          <iframe
            className="w-full h-full border-0"
            src="https://www.google.com/maps?q=Plot+688,+Markus+Kangye+Blvd,+Off+Oladipo+Diya+Way,+Gaduwa,+Abuja&output=embed"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ContactPage;
