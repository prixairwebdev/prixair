"use client";

import { motion } from "framer-motion";
import { CalendarCheck, PackageCheck, Truck, MapPinCheck } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: CalendarCheck,
    step: "01",
    title: "Book Your Delivery",
    desc: "Request a quote or schedule a pickup through our website or customer support — quick and hassle-free.",
  },
  {
    icon: PackageCheck,
    step: "02",
    title: "Pickup at Your Location",
    desc: "Our professional drivers arrive at your chosen location and time to collect the package.",
  },
  {
    icon: Truck,
    step: "03",
    title: "In Transit",
    desc: "Your shipment moves through our secure, optimised logistics network — monitored in real-time.",
  },
  {
    icon: MapPinCheck,
    step: "04",
    title: "Delivered Safely",
    desc: "Safe and timely delivery right to the doorstep or your warehouse, with confirmation at every stage.",
  },
];

const testimonials = [
  {
    name: "Jordan A.",
    text: "Working with Prixair Logistics has been a game-changer. Fast, reliable, and their support is top-notch.",
  },
  {
    name: "Samantha R.",
    text: "They deliver on time, every time. Couldn't ask for a more dependable logistics partner.",
  },
  {
    name: "Michael T.",
    text: "We scaled our business faster because our shipments are always in good hands. Tracking is always spot-on.",
  },
];

const HowItWorksSection = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* How It Works */}
      <section className="py-24 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Process</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-3 text-gray-500 max-w-lg">
              Getting your package from point A to point B has never been easier.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  whileHover={{ y: -6 }}
                  className="border-t-2 border-gray-200 hover:border-[#FB6404] transition-all duration-300 pt-8 pb-6 group"
                >
                  <p className="text-4xl font-bold text-gray-100 mb-4 font-mono">{s.step}</p>
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300 w-fit">
                    <Icon className="w-8 h-8 text-[#FB6404]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12"
          >
            <Link
              href="/logistics/contact"
              className="inline-block px-6 py-3 bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors"
            >
              Request a Quote
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Client Reviews</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">What Our Clients Say</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 border-t-2 border-gray-200 hover:border-[#FB6404] transition-all duration-300"
              >
                <p className="text-3xl text-gray-200 font-serif mb-4">"</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{t.text}</p>
                <p className="text-gray-900 font-semibold text-sm">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksSection;
