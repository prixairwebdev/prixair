"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const categories = [
  { title: "Rice Dishes", note: "Jollof, fried rice, ofada", image: "/images/jollof-chicken.png" },
  { title: "Soups & Swallows", note: "Egusi, okro, ogbono", image: "/images/egusi-pounded-yam.png" },
  { title: "Grilled Foods", note: "Goat, turkey, catfish", image: "/images/grilled-goat.png" },
  { title: "Drinks & Extras", note: "Chapman, zobo, tiger nut", image: "/images/chapman.png" },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function OurCategories() {
  return (
    <section className="w-full bg-white py-20 md:py-24 px-5 md:px-10 text-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold text-[#FE0000] mb-2">What are you craving?</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Categories</h2>
          </div>
          <Link
            href="/buka/products"
            className="text-sm font-bold text-gray-500 hover:text-gray-900 underline underline-offset-4 transition-colors"
          >
            See everything
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {categories.map((cat) => (
            <motion.div key={cat.title} variants={itemVariants}>
              <Link
                href="/buka/products"
                className="group relative block aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(min-width:1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 flex items-end justify-between gap-2">
                  <div>
                    <h3 className="text-white font-bold text-base md:text-lg leading-tight">{cat.title}</h3>
                    <p className="text-white/70 text-xs md:text-sm mt-1">{cat.note}</p>
                  </div>
                  <span className="hidden sm:flex flex-shrink-0 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm items-center justify-center text-white transition-colors group-hover:bg-[#FE0000]">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
