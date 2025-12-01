"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";

interface FormData {
  fullName: string;
  phone: string;
  address: string;
  additionalDetails: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    address: "",
    additionalDetails: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Replace with API call or Next.js action here
  };

  return (
    <section className="py-16 px-6 bg-white text-gray-800 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-8"
      >
        <h2 className="text-xl font-semibold text-center mb-6">
          Contact Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B1E0F]"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B1E0F]"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B1E0F]"
            />
          </div>

          {/* Additional Details */}
          <div>
            <label className="block text-sm font-medium mb-1">Additional Details</label>
            <textarea
              name="additionalDetails"
              placeholder="Enter any additional details"
              value={formData.additionalDetails}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B1E0F]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#4CAF50] text-white py-2 rounded-md font-medium hover:bg-[#2e160b] transition-colors"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </section>
  );
}
