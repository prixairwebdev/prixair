'use client';
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

interface OrderStep {
  title: string;
  description: string;
  icon: string;
}

interface BrandHowToOrderProps {
  steps?: OrderStep[];
  primaryColor?: string;
  store?: string;
}

const defaultSteps: OrderStep[] = [
  {
    title: "Browse the Menu",
    description: "Explore our fresh selection and pick your favourites.",
    icon: "/notebook.png",
  },
  {
    title: "Add to Cart",
    description: "Choose your items and select pickup or delivery.",
    icon: "/cart.png",
  },
  {
    title: "Enjoy Your Meal",
    description: "We'll have it ready fast — piping hot, every time.",
    icon: "/vehicle.png",
  },
];

const BrandHowToOrder: React.FC<BrandHowToOrderProps> = ({
  steps = defaultSteps,
  primaryColor = "#B5D04E",
  store = "noodlelicious"
}) => {
  return (
    <section className="bg-[#fafaf8] py-24 px-6 border-t border-gray-100">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: primaryColor }}>
            Simple & Fast
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">How to Order</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-md transition-shadow"
            >
              {/* Step number */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold mb-6"
                style={{ backgroundColor: primaryColor }}
              >
                {index + 1}
              </div>

              <div className="w-12 h-12 relative mb-5 opacity-80">
                <Image src={step.icon} alt={step.title} fill sizes="48px" className="object-contain" />
              </div>

              <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px border-t-2 border-dashed border-gray-200 z-10" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href={`/${store}/products`}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="text-white px-10 py-3.5 rounded-full font-bold text-sm tracking-wide shadow-lg transition-all"
              style={{ backgroundColor: primaryColor }}
            >
              Order Now
            </motion.button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default BrandHowToOrder;
