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
    description: "Explore our delicious range of fresh meals and traditional treats.",
    icon: "/notebook.png",
  },
  {
    title: "Add to Cart & Pay",
    description: "Choose your favorites, add them to cart, and select pickup or delivery.",
    icon: "/cart.png",
  },
  {
    title: "Enjoy Your Meal!",
    description: "Pick up from our store or enjoy fast delivery right to your door.",
    icon: "/vehicle.png",
  },
];

const BrandHowToOrder: React.FC<BrandHowToOrderProps> = ({
  steps = defaultSteps,
  primaryColor = "#B5D04E",
  store = "noodlelicious"
}) => {
  return (
    <section className="bg-[#fcfbf9] py-24 px-6 border-t border-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">How to Order</h2>
        <p className="text-gray-500 mb-16 text-lg">Deliciousness delivered in 3 simple steps</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Animated Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-1/4 left-1/4 right-1/4 h-px border-t-2 border-dashed border-gray-200 -z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative z-10 bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="w-20 h-20 mx-auto mb-8 relative bg-gray-50 rounded-3xl flex items-center justify-center p-4 group-hover:scale-110 transition-transform">
                <div
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full text-white font-bold flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: primaryColor }}
                >
                  {index + 1}
                </div>
                <div className="relative w-full h-full">
                  <Image
                    src={step.icon}
                    alt={step.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <Link href={store === 'supermarket' ? `/supermarket/cart?store=${store}` : `/${store}/products`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-16 text-white px-12 py-4 rounded-full font-bold text-lg shadow-xl transition-all"
            style={{ backgroundColor: primaryColor }}
          >
            Order Now
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default BrandHowToOrder;
