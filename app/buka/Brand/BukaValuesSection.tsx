"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const values = [
  {
    title: "Authentic Nigerian Flavours",
    description:
      "We celebrate our rich culinary heritage by offering meals rooted in tradition, made with fresh ingredients and local spices that capture the true taste of Nigeria.",
  },
  {
    title: "Community & Togetherness",
    description:
      "Prixair Buka is more than a restaurant — it&rsquo;s a gathering place where people connect, laugh, and share hearty meals. We believe food brings people together.",
  },
  {
    title: "Quality & Consistency",
    description:
      "Every plate from our kitchen is prepared with care, meeting the same high standards of quality, cleanliness, and taste — every time, everywhere.",
  },
  {
    title: "Affordability with Value",
    description:
      "Every plate from our kitchen is prepared with care, meeting the same high standards of quality, cleanliness, and taste — every time, everywhere.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut" as const,
    },
  },
};

export default function BukaValuesSection() {
  return (
    <section className="w-full">
      {/* Top Values Section with black patterned background */}
      <div
        className="relative bg-black py-12 px-6 md:px-16"
        style={{
          backgroundImage: "url('/fastfoodicons.png')", // your background icons file (make sure to add it in public folder)
          backgroundRepeat: "repeat",
          backgroundSize: "120px",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {values.map((val, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="bg-white rounded-lg shadow-md p-6 text-center"
            >
              <h3 className="text-red-600 font-bold text-lg mb-3">
                {val.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {val.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Call to Action Section */}
      <div className="bg-white py-12 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-4">
            <Image
              src="/buka-logo.png" // replace with your logo path
              alt="Prixair Buka Logo"
              width={80}
              height={80}
            />
          </div>
          <h2 className="text-xl font-semibold mb-2">Join the Buka Movement</h2>
          <p className="text-gray-600 mb-6">
            Whether you&apos;re craving bold Nigerian flavors or looking for a place
            that feels like home, Prixair Buka is where tradition meets taste.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-md text-sm font-medium">
              🍴 View Menu
            </button>
            <button className="bg-white border border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded-lg shadow-md text-sm font-medium">
              🛒 Order Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
