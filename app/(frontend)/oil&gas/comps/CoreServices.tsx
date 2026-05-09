"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const services = [
  {
    title: "Oilfield Logistics & Support",
    description:
      "Delivering reliable logistics, technical, and operational support for oil and gas field operations.",
    image: "/images/service1.png",
  },
  {
    title: "Energy Consultancy",
    description:
      "Helping organizations optimize energy efficiency, regulatory and operational strategies.",
    image: "/images/service2.png",
  },
  {
    title: "Renewable Integration",
    description:
      "Exploring sustainable and cleaner alternatives to reduce environmental impact.",
    image: "/images/service3.png",
  },
  {
    title: "Project Management",
    description:
      "End-to-end project management services for energy infrastructure development.",
    image: "/images/service4.png",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export default function CoreServices() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" as const }}
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-3">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Core Services
          </h2>
          <div className="w-12 h-0.5 bg-gray-900 mt-4" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white group cursor-pointer overflow-hidden"
              variants={cardVariant}
              whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" as const } }}
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority={index < 2}
                />
              </div>
              <div className="p-6 border border-t-0 border-gray-100 group-hover:border-gray-300 transition-colors duration-300">
                <span className="text-xs text-gray-400 font-mono font-medium">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-bold text-gray-900 mt-2 mb-2 leading-snug">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
