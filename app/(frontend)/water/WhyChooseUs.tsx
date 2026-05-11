"use client";

import { motion } from "framer-motion";
import { Droplets, ShieldCheck, Truck, BadgeCheck } from "lucide-react";

const features = [
  {
    icon: Droplets,
    title: "Natural Spring Source",
    description: "Our water is drawn from underground springs, naturally filtered through rock for pure, clean taste.",
  },
  {
    icon: ShieldCheck,
    title: "99.9% Purity Guaranteed",
    description: "Each bottle undergoes rigorous quality checks and multi-stage purification processes.",
  },
  {
    icon: Truck,
    title: "Fast & Reliable Delivery",
    description: "Whether it's a home or a business, we deliver fresh water promptly and consistently.",
  },
  {
    icon: BadgeCheck,
    title: "NAFDAC Certified",
    description: "Registered and approved by NAFDAC for your complete safety and confidence.",
  },
];

const reviews = [
  {
    name: "Jordan A.",
    text: "Best bottled water I've had in Nigeria. I can actually taste the difference.",
  },
  {
    name: "Blessing O.",
    text: "Always arrives on time and perfectly chilled. Perfect for our office meetings.",
  },
  {
    name: "Emeka R.",
    text: "We ordered in bulk for our event and they delivered flawlessly. Highly recommend.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <div className="bg-white text-gray-800">
      {/* Why Choose Us */}
      <section className="py-24 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Why Choose Us</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
              We Don't Just Sell Water — We Deliver Purity
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className="mb-5 group-hover:scale-110 transition-transform duration-300 w-fit">
                    <Icon className="w-9 h-9 text-sky-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-gray-50 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Reviews</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 border-t-2 border-gray-200 hover:border-sky-600 transition-all duration-300"
              >
                <p className="text-3xl text-gray-200 font-serif mb-4">"</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{review.text}</p>
                <p className="text-gray-900 font-semibold text-sm">{review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
