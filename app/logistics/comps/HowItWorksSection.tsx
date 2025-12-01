"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const HowItWorksSection = () => {
  const steps = [
    {
      title: "Book Your Delivery",
      desc: "Start by requesting a quote or scheduling a pickup through our website or customer support. It’s quick, easy, and completely hassle-free.",
      icon: "/icons/book.png",
    },
    {
      title: "Pickup at Your Location",
      desc: "Our professional drivers will arrive at your chosen location and time to collect the package — no need to drop it off yourself.",
      icon: "/icons/pickup.png",
    },
    {
      title: "In Transit",
      desc: "Your shipment moves through our secure, optimized logistics network — monitored in real-time for efficiency and safety.",
      icon: "/icons/transit.png",
    },
    {
      title: "Delivered Safely",
      desc: "We complete the journey with a safe and timely delivery — right to the doorstep or your warehouse, with confirmation at every stage.",
      icon: "/icons/delivered.png",
    },
  ];

  const testimonials = [
    {
      name: "Jordan A.",
      text: "Working with [Your Logistics Brand] has been a game-changer. Fast, reliable, and their support is top-notch.",
      rating: 5,
    },
    {
      name: "Samantha R.",
      text: "They deliver on time, every time. Couldn’t ask for a more dependable logistics partner.",
      rating: 5,
    },
    {
      name: "Michael T.",
      text: "We scaled our business faster because our shipments are always in good hands. Tracking and delivery are always spot-on.",
      rating: 5,
    },
  ];

  return (
    <section className="w-full bg-white py-20 px-6 md:px-16 lg:px-32">
      {/* --- HOW IT WORKS --- */}
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
          How It Works
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Getting your package from point A to point B has never been easier.
        </p>
      </div>

      {/* --- Steps --- */}
      <div className="relative flex flex-col items-center md:items-stretch">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gray-200 -translate-x-1/2"></div>

        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className={`flex flex-col md:flex-row items-center md:items-start justify-between w-full mb-16 ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="md:w-1/2 flex flex-col items-center md:items-center">
              <Image
                src={step.icon}
                alt={step.title}
                width={90}
                height={90}
                className="mb-4"
              />
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm text-center md:text-left max-w-sm">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- CTA Button --- */}
      <div className="text-center mt-6 mb-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-[#FB6404] text-white font-semibold px-8 py-3 rounded-md shadow hover:bg-[#e25900] transition"
        >
          Request a Quote
        </motion.button>
      </div>

      {/* --- TESTIMONIALS --- */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
          What Our Clients Say
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          We don’t just move packages — we move businesses forward. Here’s what our clients have to say about working with us.
        </p>
      </div>

      {/* --- Testimonials Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative hover:shadow-md transition"
          >
            <FaQuoteLeft className="text-[#FB6404] text-2xl mb-3" />
            <p className="text-gray-600 text-sm leading-relaxed mb-4">“{t.text}”</p>
            <h4 className="font-semibold text-gray-800">{t.name}</h4>
            <div className="flex mt-2">
              {[...Array(t.rating)].map((_, i) => (
                <FaStar key={i} className="text-[#FB6404] text-sm" />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-[#FB6404] text-white font-semibold px-8 py-3 rounded-md shadow hover:bg-[#e25900] transition"
        >
          More reviews
        </motion.button>
      </div>
    </section>
  );
};

export default HowItWorksSection;
