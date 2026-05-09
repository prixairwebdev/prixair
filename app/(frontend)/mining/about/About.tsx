"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const values = [
  {
    number: "01",
    title: "Integrity",
    description:
      "Every decision we make is guided by transparency and adherence to the highest ethical standards — no shortcuts, no compromises.",
  },
  {
    number: "02",
    title: "Excellence",
    description:
      "We pursue superior performance and quality in every project, consistently surpassing expectations and setting new benchmarks.",
  },
  {
    number: "03",
    title: "Sustainability",
    description:
      "We adopt eco-friendly solutions and responsible practices to optimise efficiency while protecting the environments we operate in.",
  },
  {
    number: "04",
    title: "Innovation",
    description:
      "We leverage advanced technology and foster meaningful collaboration to transform traditional industry approaches and achieve shared goals.",
  },
];

export default function About() {
  return (
    <section className="bg-white">
      {/* About narrative */}
      <div className="max-w-7xl mx-auto px-6 md:px-14 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-3">
              Our Story
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              A Trailblazer in Nigeria's Mineral Sector
            </h2>
            <div className="w-12 h-0.5 bg-gray-900 mb-6" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-gray-600 text-sm leading-relaxed space-y-4"
          >
            <p>
              Prixair Resources Ltd, a flagship subsidiary of the Prixair Group,
              is a trailblazer in Nigeria's mineral exploration and development
              landscape. Founded in 2007 by Ademola Banjo — a visionary
              entrepreneur with a distinguished career in banking — the company
              harnesses the financial strength, operational expertise, and
              regional insight of its parent conglomerate.
            </p>
            <p>
              Prixair Resources is dedicated to the sustainable exploration,
              extraction, and processing of gold and rare earth elements,
              positioning itself as a leader in Africa's mining renaissance. By
              integrating advanced technologies, strategic partnerships, and a
              commitment to environmental and social responsibility, the company
              aims to unlock Nigeria's vast mineral potential while delivering
              exceptional value to stakeholders.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mb-14"
          >
            <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-3">
              What Guides Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Core Values
            </h2>
            <div className="w-12 h-0.5 bg-gray-900 mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {values.map((v, i) => (
              <motion.div
                key={i}
                className="border-t-2 border-gray-900 pt-6"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
              >
                <span className="text-xs font-mono text-gray-400">{v.number}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3">
                  {v.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
