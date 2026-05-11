"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const PrixairIntro: React.FC = () => {
  return (
    <section className="py-24 bg-gray-950 px-6 md:px-14">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-white/40 font-medium">About Us</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white leading-tight">
            Nigeria&apos;s Destination for Premium Interior Finishing
          </h2>
          <p className="mt-5 text-white/60 leading-relaxed">
            Prixair Properties Nigeria Limited specialises in retailing unique building construction finishing
            and interior furnishing materials. Our product line includes Sanitary Wares, Glass Products,
            Porcelain and Ceramic Tiles, Security and Panel Doors, Stone Coated Roofing Sheets, Wallpapers,
            Sofas, Dining Sets, Bed Sets, and Wardrobes — all designed with quality and modern architectural
            finishing in mind.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-6"
        >
          {[
            { value: "10+", label: "Years in Business" },
            { value: "500+", label: "Products Available" },
            { value: "24/7", label: "Customer Support" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="border-b border-white/10 pb-6 last:border-0"
            >
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/40 mt-1 tracking-wide">{stat.label}</p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Link
              href="/properties/shop"
              className="px-6 py-3 bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              View Products
            </Link>
            <Link
              href="/properties/contact"
              className="px-6 py-3 border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrixairIntro;
