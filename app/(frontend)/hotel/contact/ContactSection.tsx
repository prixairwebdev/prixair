"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

interface FormData {
  firstName: string;
  email: string;
  businessUnit: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    email: "",
    businessUnit: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You can replace this with your API call or Next.js action
  };

  return (
    <section className="py-16 px-6 bg-white text-gray-800 flex flex-col items-center">
      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-8"
      >
        <h2 className="text-xl font-semibold text-center mb-6">Contact Form</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B1E0F]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B1E0F]"
            />
          </div>

          {/* Business Unit */}
          <div>
            <label className="block text-sm font-medium mb-1">Business Unit</label>
            <select
              name="businessUnit"
              value={formData.businessUnit}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#3B1E0F]"
            >
              <option value="">Select</option>
              <option value="hospitality">Hospitality</option>
              <option value="events">Events</option>
              <option value="support">Support</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-1">Your Message</label>
            <textarea
              name="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B1E0F]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#3B1E0F] text-white py-2 rounded-md font-medium hover:bg-[#2e160b] transition-colors"
          >
            Send Message
          </button>
        </form>
      </motion.div>

      {/* Hotel Finder */}
      <div className="mt-20 text-center max-w-lg">
        <h3 className="text-lg font-semibold mb-2">Discover a Hotel Close to You</h3>
        <p className="text-sm text-gray-600 mb-6">
          Find comfort and elegance just around the corner — explore our locations and
          book your next getaway with ease.
        </p>

        <div className="flex items-center justify-center bg-white shadow-md rounded-md overflow-hidden">
          <select className="px-4 py-3 border-r border-gray-200 focus:outline-none text-gray-700 w-1/2">
            <option>State</option>
            <option>Lagos</option>
            <option>Abuja</option>
            <option>Rivers</option>
          </select>

          <select className="px-4 py-3 border-r border-gray-200 focus:outline-none text-gray-700 w-1/2">
            <option>LGA</option>
            <option>Ikeja</option>
            <option>Garki</option>
            <option>Port Harcourt</option>
          </select>

          <button
            type="button"
            className="bg-[#3B1E0F] text-white p-4 hover:bg-[#2e160b] transition-colors"
          >
            <FaSearch />
          </button>
        </div>
      </div>
    </section>
  );
}
