"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TopSellers() {
  return (
    <section className="w-full bg-white py-12 flex flex-col items-center sm:text-start text-black">
      <motion.h2 
        className="text-xl sm:text-2xl font-semibold mb-8 px-4 text-center sm:text-start"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, margin: "-100px" }}
      >
        Top Sellers – Most Loved Dishes
      </motion.h2>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 max-w-7xl w-full"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-50px" }}
      >
        {dishes.map((dish, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 shadow-md rounded-md overflow-hidden flex flex-col"
            variants={item}
          >
            <div className="w-full h-[180px] relative">
              <Image
                src={dish.image}
                alt={dish.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-sm">{dish.name}</h3>
                  <span className="text-red-600 text-sm font-medium">
                    From {dish.price}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{dish.desc}</p>
              </div>
              <button className="mt-4 bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-4 px-4 w-[100px] self-end">
                Order Now
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.a
        href="/order"
        className="mt-10 bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-sm font-semibold flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: false, margin: "-50px" }}
      >
        <span className="material-symbols-outlined">call</span>
        Start Your Order Now
      </motion.a>
    </section>
  );
}