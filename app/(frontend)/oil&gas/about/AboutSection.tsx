"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stats = [
  { value: "10+", label: "Years in the Energy Sector" },
  { value: "500+", label: "Projects Delivered" },
  { value: "30+", label: "States Covered" },
  { value: "24/7", label: "Operational Support" },
];

const pillars = [
  {
    number: "01",
    title: "Quality",
    description:
      "We source and distribute only premium-grade petroleum products, ensuring every delivery meets the highest industry standards. Quality is non-negotiable at every stage of our supply chain.",
  },
  {
    number: "02",
    title: "Safety",
    description:
      "From storage facilities to last-mile delivery, our operations are governed by strict national and international safety protocols. We invest in training, equipment, and compliance to protect people and the environment.",
  },
  {
    number: "03",
    title: "Integrity",
    description:
      "We operate with full transparency — honest pricing, reliable timelines, and accountable service. Our clients trust us because we consistently do what we say we'll do.",
  },
];

export default function AboutSection() {
  return (
    <section className="bg-white text-gray-800 overflow-hidden">

      {/* Overview */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-3">
              Our Story
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Driven by a Commitment to Reliable Energy
            </h2>
            <div className="w-12 h-0.5 bg-gray-900 mb-6" />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-4 text-gray-600 text-sm leading-relaxed"
          >
            <p>
              At Prixair Oil &amp; Gas, we are driven by a commitment to deliver
              reliable, efficient, and sustainable energy solutions across Nigeria
              and beyond. We specialise in the distribution of premium petroleum
              products, logistics support, and energy consultancy services designed
              to keep businesses and industries running without interruption.
            </p>
            <p>
              Our operations are built on three pillars — quality, safety, and
              integrity. From sourcing and storage to delivery, every step reflects
              our dedication to excellence and compliance with global energy standards.
            </p>
            <p>
              With a team of experienced professionals and a growing logistics
              network, Prixair Oil &amp; Gas continues to power progress, fuel
              innovation, and support the nation's energy needs responsibly.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gray-900 py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Our Pillars */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-14"
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-3">
            Our Foundation
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            The Three Pillars We Stand On
          </h2>
          <div className="w-12 h-0.5 bg-gray-900 mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="border-t-2 border-gray-900 pt-6"
            >
              <span className="text-xs font-mono text-gray-400">{p.number}</span>
              <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">
                {p.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-3">
              Mission
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              What We're Here to Do
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              To be the most dependable energy distribution and consultancy company
              in Nigeria — delivering premium petroleum products with precision,
              speed, and an unwavering commitment to safety and customer satisfaction.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-3">
              Vision
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Where We're Going
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              To build a cleaner, more reliable energy future for West Africa —
              expanding our operations beyond petroleum into renewable energy
              integration, becoming a full-spectrum energy partner for industries,
              governments, and communities across the continent.
            </p>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
