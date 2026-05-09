"use client";
import { ShieldCheck, MapPin, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

const reasons = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-gray-900" />,
    title: "Safety & Compliance",
    description:
      "We maintain strict adherence to national and international safety standards in every operation.",
  },
  {
    icon: <MapPin className="w-6 h-6 text-gray-900" />,
    title: "Nationwide Reach",
    description:
      "Our logistics network ensures timely product delivery across Nigeria's cities and industrial zones.",
  },
  {
    icon: <Clock className="w-6 h-6 text-gray-900" />,
    title: "On-Time Delivery",
    description:
      "We operate with precision and efficiency, minimizing downtime for our clients.",
  },
  {
    icon: <Users className="w-6 h-6 text-gray-900" />,
    title: "Expert Team",
    description:
      "Our experienced professionals bring years of expertise in energy management and client support.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-3">
            Our Strengths
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose Us
          </h2>
          <div className="w-12 h-0.5 bg-gray-900 mt-4" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="border-t-2 border-gray-200 pt-6 group cursor-default"
              variants={cardVariant}
              whileHover={{ borderColor: "#111827", transition: { duration: 0.2 } }}
            >
              <motion.div
                className="mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {reason.icon}
              </motion.div>
              <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-black transition-colors">
                {reason.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
