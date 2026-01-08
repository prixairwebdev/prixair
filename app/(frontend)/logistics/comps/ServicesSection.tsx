"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaClock, FaMapMarkedAlt, FaShieldAlt, FaGlobeAfrica } from "react-icons/fa";

const ServicesSection = () => {
  const services = [
    {
      title: "Cargo Transport",
      desc: "Move bulk goods safely with our wide fleet — local or cross-border.",
      img: "/cargo.png",
    },
    {
      title: "Express Delivery",
      desc: "Same day or next-day delivery for urgent business or personal needs.",
      img: "/express.png",
    },
    {
      title: "International Shipping",
      desc: "Global reach with customs clearance and real-time tracking.",
      img: "/international.png",
    },
    {
      title: "Warehousing & Storage",
      desc: "Secure, scalable storage for your inventory with on-demand access.",
      img: "/warehouse.png",
    },
  ];

  const features = [
    {
      icon: <FaClock className="text-[#FB6404] text-3xl mb-3" />,
      title: "On-Time Delivery",
      desc: "We pride ourselves on meeting your deadlines — with a 99% on-time delivery rate, you can count on us to keep your business moving without delay.",
    },
    {
      icon: <FaMapMarkedAlt className="text-[#FB6404] text-3xl mb-3" />,
      title: "Real-Time Tracking",
      desc: "Stay updated every step of the way. Our tracking system lets you monitor shipments from pickup to final delivery — anytime, anywhere.",
    },
    {
      icon: <FaShieldAlt className="text-[#FB6404] text-3xl mb-3" />,
      title: "Secure Handling",
      desc: "Your packages are valuable — and so is your trust. That’s why we ensure secure loading, transit, and unloading, backed by full insurance coverage.",
    },
    {
      icon: <FaGlobeAfrica className="text-[#FB6404] text-3xl mb-3" />,
      title: "Wide Coverage",
      desc: "Whether it’s a local drop or a global shipment, our network spans over 50+ countries ensuring seamless transport wherever your goods go.",
    },
  ];

  return (
    <section className="w-full bg-white py-20 px-6 md:px-16 lg:px-32">
      {/* --- WHAT WE OFFER --- */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-800">
          What We Offer
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Flexible, reliable, and secure logistics solutions — tailored to your business needs.
        </p>
      </div>

      {/* --- Services Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group overflow-hidden rounded-xl shadow-md"
          >
            <Image
              src={service.img}
              alt={service.title}
              width={500}
              height={400}
              className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 bg-opacity-40 group-hover:bg-opacity-60 transition duration-300" />
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="text-sm text-gray-200 mt-1">{service.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- WHY CHOOSE US --- */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-800">
          Why Choose Us
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Guiding every step with purpose — our values reflect the heart of who we are and how we care for every guest.
        </p>
      </div>

      {/* --- Features Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center hover:shadow-lg transition-shadow duration-300"
          >
            {item.icon}
            <h4 className="text-lg font-semibold mb-2 text-gray-800">{item.title}</h4>
            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
