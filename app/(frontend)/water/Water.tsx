"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Droplets, FlaskConical, Package2, Truck } from "lucide-react";

const products = [
  {
    name: "50cl Bottle (Classic)",
    description: "Perfect for on-the-go hydration. Slim, recyclable, and always cool.",
    img: "/images/50cl-bottle.png",
  },
  {
    name: "75cl Sports Bottle",
    description: "Sturdy bottle, fits cup holders — great for active lifestyles.",
    img: "/images/75cl-bottle.png",
  },
  {
    name: "1.5L Family Bottle",
    description: "Great for shared use, picnics, or travel.",
    img: "/images/1.5l-bottle.png",
  },
  {
    name: "19L Refill Bottle",
    description: "Bulk water for homes, offices, and events.",
    img: "/images/19l-bottle.png",
  },
];

const features = [
  { icon: Droplets, text: "100% Natural Spring Source" },
  { icon: FlaskConical, text: "Microfiltered & UV Purified" },
  { icon: Package2, text: "Sustainable Packaging" },
  { icon: Truck, text: "NAFDAC Certified" },
];

export default function WaterProducts() {
  return (
    <div className="bg-white text-gray-800">
      {/* Info Banner */}
      <section className="relative">
        <div className="relative w-full h-72 md:h-80 overflow-hidden">
          <Image src="/waterbg.png" alt="Water source" fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-14 -mt-20 relative z-10 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white p-10 md:p-14 shadow-sm border border-gray-100"
          >
            <div className="max-w-3xl">
              <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Our Source</span>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900">
                Bottled at the Source, Delivered with Care
              </h2>
              <p className="mt-4 text-gray-500 leading-relaxed">
                Our water is sourced from deep underground springs, naturally filtered through layers of rock
                and bottled at the source to retain its freshness. At Prixair, we believe hydration should be
                clean, sustainable, and accessible.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex flex-col gap-3"
                  >
                    <Icon className="w-6 h-6 text-sky-600" strokeWidth={1.5} />
                    <p className="text-xs font-medium text-gray-600">{f.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="py-24 bg-gray-50 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Range</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">Our Water Products</h2>
            <p className="mt-3 text-gray-500 max-w-lg">Choose the right size for your lifestyle.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="bg-white border-t-2 border-gray-200 hover:border-sky-600 transition-all duration-300 p-8 group flex flex-col items-center text-center"
              >
                <div className="relative w-28 h-40 mb-6 group-hover:scale-105 transition-transform duration-500">
                  <Image src={product.img} alt={product.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-contain" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{product.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-6">{product.description}</p>
                <div className="flex gap-3 mt-auto">
                  <Link
                    href="/water/quote"
                    className="px-4 py-2 border border-gray-200 text-gray-700 text-xs font-semibold hover:border-gray-900 hover:text-gray-900 transition-colors"
                  >
                    Get a Quote
                  </Link>
                  <Link
                    href="/water/products"
                    className="px-4 py-2 bg-gray-900 text-white text-xs font-semibold hover:bg-gray-700 transition-colors"
                  >
                    Buy Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
