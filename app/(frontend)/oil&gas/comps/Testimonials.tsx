"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Jordan A.",
    role: "Operations Manager",
    message:
      "Working with Prixair Oil & Gas has been a game-changer. Fast, reliable, and their support team is always available when we need them.",
  },
  {
    name: "Casey M.",
    role: "Procurement Lead",
    message:
      "We scaled our operations faster because of their expert team. Supply tracking and delivery are consistently accurate.",
  },
  {
    name: "Taylor R.",
    role: "Plant Director",
    message:
      "Smooth deliveries every time. Couldn't ask for a better partner to keep our facility running without interruption.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-3">
            Client Feedback
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our Clients Say
          </h2>
          <div className="w-12 h-0.5 bg-gray-900 mt-4" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 border border-gray-100 cursor-default"
              variants={cardVariant}
              whileHover={{ y: -6, boxShadow: "0 16px 40px -12px rgba(0,0,0,0.12)", transition: { duration: 0.25, ease: "easeOut" as const } }}
            >
              <p className="text-6xl text-gray-200 font-serif leading-none select-none mb-4">
                &ldquo;
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mb-8">
                {t.message}
              </p>
              <div className="border-t border-gray-100 pt-5">
                <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
