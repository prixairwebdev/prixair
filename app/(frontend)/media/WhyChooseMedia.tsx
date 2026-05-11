"use client";

import { motion } from "framer-motion";
import { Mic, Wrench, Truck, CalendarCheck } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Top-Tier Brand Quality",
    description: "We only lend high-end equipment from industry-recognised brands for maximum reliability.",
  },
  {
    icon: Wrench,
    title: "Full Technical Support",
    description: "Our team provides setup assistance and on-site technical monitoring during your events.",
  },
  {
    icon: Truck,
    title: "Timely Delivery",
    description: "We understand event timelines — we deliver and set up well before your start time.",
  },
  {
    icon: CalendarCheck,
    title: "Flexible Rental Plans",
    description: "Whether it's 2 hours or 2 weeks, we offer competitive rates tailored to your duration.",
  },
];

export default function WhyChooseMedia() {
  return (
    <div>
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
              Why Partner with Prixair Media?
            </h2>
            <p className="mt-3 text-gray-500 max-w-lg">
              We don't just provide equipment — we ensure your event sounds and looks professional from start to finish.
            </p>
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
                  <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-gray-950 px-6 md:px-14">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-white/40 font-medium">Elevate Your Event</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white leading-tight">
              Ready to Elevate Your Event?
            </h2>
            <p className="mt-4 text-white/60 leading-relaxed">
              Get a free consultation and quotation for your equipment needs. We'll make sure your event is unforgettable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="px-6 py-3 bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              Get a Quote
            </a>
            <a
              href="mailto:media@prixair.com"
              className="px-6 py-3 border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Email Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
