"use client";

import Image from "next/image";
import { Leaf, Users, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const metrics = [
  { icon: <Leaf className="w-5 h-5 text-gray-900" />, label: "Environmental", value: "95%", sub: "water recycled" },
  { icon: <Users className="w-5 h-5 text-gray-900" />, label: "Community", value: "500+", sub: "local jobs created" },
  { icon: <ShieldCheck className="w-5 h-5 text-gray-900" />, label: "Safety", value: "100%", sub: "incident-free record" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const metricVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function ESGSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-14 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-3">
            ESG Commitment
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            Committed to Responsible Mining
          </h2>
          <div className="w-12 h-0.5 bg-gray-900 mb-6" />
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            We believe that mining should enrich not only economies, but ecosystems and communities too.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-10">
            From water recycling and land reclamation to community healthcare and safety programs, our ESG approach is woven into every operation.
          </p>

          <motion.div
            className="grid grid-cols-3 gap-6 mb-10"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                className="border-t-2 border-gray-900 pt-4 group cursor-default"
                variants={metricVariant}
                whileHover={{ borderColor: "#6b7280", transition: { duration: 0.2 } }}
              >
                <div className="mb-2 group-hover:scale-110 transition-transform duration-200">{m.icon}</div>
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium mb-1">{m.label}</p>
                <p className="text-2xl font-bold text-gray-900">{m.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{m.sub}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.a
            href="#"
            className="text-sm font-medium border-b border-gray-900 hover:opacity-60 transition-opacity inline-block"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.15 }}
          >
            View Full ESG Report
          </motion.a>
        </motion.div>

        {/* Right: Image */}
        <motion.div
          className="relative w-full h-[420px] overflow-hidden"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
        >
          <Image
            src="/images/forest.png"
            alt="Land reclamation and environmental responsibility"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
