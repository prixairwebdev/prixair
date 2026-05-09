"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Wheat, Bird, Package } from "lucide-react";

const products = [
  {
    icon: Wheat,
    title: "Crops",
    desc: "Fresh organic produce grown without synthetic fertilizers. From staple grains to leafy greens, every harvest is nutrient-rich and carefully cultivated.",
    items: ["Maize", "Rice", "Vegetables", "Leafy Greens"],
  },
  {
    icon: Bird,
    title: "Livestock",
    desc: "Animals raised in clean, natural environments with ethical care. Healthy, well-fed livestock means superior quality products for our customers.",
    items: ["Poultry", "Cattle", "Goats", "Fish"],
  },
  {
    icon: Package,
    title: "Processed Products",
    desc: "Select farm products processed with hygiene and quality control — ready for homes, vendors, and wholesalers at scale.",
    items: ["Packaged Grains", "Processed Poultry", "Dairy Derivatives", "Bulk Orders"],
  },
];

const ProductsSection = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">What We Offer</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">Our Products</h2>
          <p className="mt-3 text-gray-500 max-w-lg">
            Farm-fresh goods grown, raised, and processed with care — from field to your door.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ y: -6 }}
                className="bg-white border-t-2 border-gray-200 hover:border-[#3a8c3f] p-8 transition-all duration-300 group"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300 w-fit">
                  <Icon className="w-8 h-8 text-[#3a8c3f]" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{item.desc}</p>
                <ul className="space-y-1 mb-6">
                  {item.items.map((i) => (
                    <li key={i} className="text-xs text-gray-400 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#3a8c3f] inline-block" />
                      {i}
                    </li>
                  ))}
                </ul>
                <Link href="/farms/contact" className="text-sm font-semibold text-gray-900 flex items-center gap-2 group-hover:gap-3 transition-all">
                  Enquire Now <span className="text-[#3a8c3f]">→</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
