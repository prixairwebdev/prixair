"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

const dishes = [
  {
    name: "Jollof Rice & Chicken",
    price: "₦2,500",
    desc: "Smoky jollof with spicy grilled chicken and fried plantain",
    image: "/dishes/jollof.png",
  },
  {
    name: "Pounded Yam & Egusi",
    price: "₦3,000",
    desc: "Soft pounded yam served with thick melon seed soup",
    image: "/dishes/py.png",
  },
  {
    name: "Fried Rice & Turkey",
    price: "₦2,800",
    desc: "Golden fried rice with peppered turkey and salad",
    image: "/dishes/friedrice.png",
  },
  {
    name: "Rice & Ofada Sauce",
    price: "₦2,200",
    desc: "Local white rice with spicy ofada sauce and egg",
    image: "/dishes/ofada.png",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function TopSellers() {
  return (
    <section className="w-full bg-[#faf7f2] py-20 md:py-24 px-5 md:px-10 text-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold text-[#FE0000] mb-2">Most loved dishes</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Top Sellers</h2>
          </div>
          <Link
            href="/buka/products"
            className="text-sm font-bold text-gray-500 hover:text-gray-900 underline underline-offset-4 transition-colors"
          >
            View full menu
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {dishes.map((dish) => (
            <motion.div key={dish.name} variants={item}>
              <Link
                href="/buka/products"
                className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-black/5 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)] transition-shadow duration-300"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-base leading-snug">{dish.name}</h3>
                  <p className="mt-1.5 text-sm text-gray-500 leading-relaxed flex-grow">{dish.desc}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-lg font-extrabold text-gray-900">
                      <span className="text-xs font-semibold text-gray-400 mr-1">from</span>
                      {dish.price}
                    </span>
                    <span className="w-10 h-10 rounded-full bg-[#FE0000] text-white flex items-center justify-center transition-transform group-hover:scale-110">
                      <Plus className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
