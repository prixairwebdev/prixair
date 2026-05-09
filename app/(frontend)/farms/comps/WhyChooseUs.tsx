"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Leaf, MapPin, Clock } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Natural Farming",
    desc: "No synthetic fertilizers, pesticides, or growth hormones. Every harvest is as pure as nature intended.",
  },
  {
    icon: MapPin,
    title: "Locally Grown",
    desc: "Deeply connected to our local community — supporting the economy while ensuring freshness from farm to table.",
  },
  {
    icon: ShieldCheck,
    title: "Ethical Practices",
    desc: "We prioritise hygiene and humane animal treatment. Our animals thrive in low-stress, open environments.",
  },
  {
    icon: Clock,
    title: "Always Fresh",
    desc: "Harvested fresh — often within 24–48 hours of delivery — for maximum flavour, nutrition, and shelf life.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Why Choose Us</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 max-w-md">
            We Don't Just Grow Food — We Grow Trust
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="mb-5 group-hover:scale-110 transition-transform duration-300 w-fit">
                  <Icon className="w-9 h-9 text-[#3a8c3f]" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
