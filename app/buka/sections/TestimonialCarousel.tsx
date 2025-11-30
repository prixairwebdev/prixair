"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";

type Testimonial = {
  name: string;
  review: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    name: "Amina O.",
    review:
      "The egusi soup was exactly how my grandmother used to make it — thick, flavorful, and packed with perfectly seasoned meat. The pounded yam was soft and fresh, and it felt like eating at home again. I&apos;ll definitely be ordering weekly!",
    rating: 5,
  },
  {
    name: "Tunde B.",
    review:
      "Honestly, I was skeptical about ordering suya online, but they nailed it. The meat came hot and spicy with just the right pepper mix. Delivery was quicker than I expected!",
    rating: 5,
  },
  {
    name: "Jane D.",
    review:
      "Absolutely delicious! The jollof rice had that perfect party flavor. Will definitely reorder!",
    rating: 4,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setIndex((i) => (i + 1) % testimonials.length),
    onSwipedRight: () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length),
    trackMouse: true,
  });

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-100px" }}
      variants={containerVariants}
      className="w-full bg-[#FFFBEF] py-12 px-4 flex flex-col items-center text-center"
    >
      <motion.h2 
        variants={itemVariants}
        className="text-2xl sm:text-3xl font-semibold text-[#990000] mb-2"
      >
        What Our Customers Say
      </motion.h2>
      <motion.p 
        variants={itemVariants}
        className="text-sm text-gray-500 mb-8"
      >
        Real stories from real plates served.
      </motion.p>

      <motion.div 
        variants={itemVariants}
        {...swipeHandlers} 
        className="w-full max-w-3xl relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-lg shadow p-6 text-left min-h-[180px]"
          >
            <p className="text-sm sm:text-base text-gray-800 mb-4">&quot;{testimonials[index].review}&quot;</p>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">{testimonials[index].name}</span>
              <div className="flex space-x-1 text-yellow-500 text-lg">
                {Array.from({ length: testimonials[index].rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="flex mt-8 gap-4"
      >
        <button className="border border-red-400 text-red-600 text-sm px-4 py-2 rounded hover:bg-red-50 transition">
          See More Reviews
        </button>
        <button className="bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700 transition">
          Leave Feedback
        </button>
      </motion.div>
    </motion.section>
  );
}