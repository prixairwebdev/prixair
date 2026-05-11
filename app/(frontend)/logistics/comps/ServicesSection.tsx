"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, MapPin, ShieldCheck, Globe } from "lucide-react";

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
    icon: Clock,
    title: "On-Time Delivery",
    desc: "We pride ourselves on meeting your deadlines — with a 99% on-time delivery rate, you can count on us.",
  },
  {
    icon: MapPin,
    title: "Real-Time Tracking",
    desc: "Monitor shipments from pickup to final delivery — anytime, anywhere with our live tracking system.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Handling",
    desc: "Your packages are valuable. We ensure secure loading, transit, and unloading backed by full insurance.",
  },
  {
    icon: Globe,
    title: "Wide Coverage",
    desc: "From local drops to global shipments — our network spans 50+ countries for seamless transport.",
  },
];

const ServicesSection = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Services */}
      <section className="py-24 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">What We Offer</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-3 text-gray-500 max-w-lg">
              Flexible, reliable, and secure logistics solutions — tailored to your business needs.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="relative group overflow-hidden h-64"
              >
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/55 transition-colors duration-300 flex items-end">
                  <div className="p-5">
                    <p className="text-white text-sm font-semibold tracking-wide">{service.title}</p>
                    <p className="text-white/70 text-xs mt-1 leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gray-50 px-6 md:px-14">
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
              Built for Speed, Trust & Scale
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
                    <Icon className="w-9 h-9 text-[#FB6404]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesSection;
