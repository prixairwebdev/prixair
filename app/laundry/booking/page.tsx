'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  const [isInView, setIsInView] = useState({ hero: false });

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    service: '',
    pickupDateTime: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You can replace this with an API call or backend integration
  };

  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <section
        className="relative min-h-screen w-full"
        aria-label="Prixair Group Hero Section"
      >
        {/* Background image with gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('/laundrybg.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          role="img"
          aria-label="Prixair Group corporate background"
        />

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="w-full sm:w-[90vw] md:w-[600px] lg:w-[700px] xl:w-[900px] px-4 py-8 text-center">
            <motion.div
              className="mx-auto"
              variants={container}
              initial="hidden"
              animate={isInView.hero ? 'show' : 'hidden'}
              onViewportEnter={() =>
                setIsInView((prev) => ({ ...prev, hero: true }))
              }
              onViewportLeave={() =>
                setIsInView((prev) => ({ ...prev, hero: false }))
              }
              viewport={{ once: false }}
            >
              <motion.h1
                className="text-xl sm:text-3xl font-bold leading-tight tracking-tight text-white"
                variants={item}
              >
                Book a Laundry Pickup
              </motion.h1>

              <motion.p
                className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-400/90 leading-relaxed max-w-3xl mx-auto sm:mx-0"
                variants={item}
              >
                Schedule your laundry pickup in seconds. Choose your preferred
                service, time, and any special instructions.
              </motion.p>

              {/* Buttons or other hero elements can go here */}
              <motion.div
                className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start"
                variants={item}
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="flex justify-center items-center min-h-screen bg-white px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-10 md:p-16"
        >
          <h2 className="text-center text-2xl font-bold mb-8">
            Booking Form
          </h2>

          {/* Personal Details */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Enter"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Booking Details */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Service
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="cleaning">Cleaning</option>
                <option value="transport">Transport</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pickup Date & Time
              </label>
              <div className="relative">
                <input
                  type="datetime-local"
                  name="pickupDateTime"
                  value={formData.pickupDateTime}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <FaCalendarAlt className="absolute right-3 top-3 text-gray-500" />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Special Instructions
              </label>
              <textarea
                name="message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition"
          >
            Send
          </button>
        </form>
      </section>
    </div>
  );
}
