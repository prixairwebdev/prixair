'use client';
import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  name: string;
  text: string;
  rating: number;
}

interface BrandTestimonialsProps {
  reviews: Review[];
  accentColor?: string;
}

const BrandTestimonials: React.FC<BrandTestimonialsProps> = ({
  reviews,
  accentColor = "#F3A35C"
}) => {
  const [current, setCurrent] = useState(0);

  const next = React.useCallback(() => setCurrent((prev) => (prev + 1) % reviews.length), [reviews.length]);
  const prev = React.useCallback(() => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length), [reviews.length]);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section className="bg-[#fafaf8] py-24 px-6 border-t border-gray-100">
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: accentColor }}>
            Reviews
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">What Our Customers Say</h2>
        </div>

        <div className="relative bg-white border border-gray-100 rounded-3xl px-10 py-12 shadow-sm min-h-[220px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4"
                    fill={i < reviews[current].rating ? accentColor : "#E5E7EB"}
                    stroke="none"
                  />
                ))}
              </div>

              <p className="text-lg md:text-xl text-gray-800 font-medium leading-relaxed mb-6">
                &ldquo;{reviews[current].text}&rdquo;
              </p>

              <p className="text-sm font-bold text-gray-500">— {reviews[current].name}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === current ? accentColor : '#E5E7EB',
                  width: i === current ? '24px' : '8px',
                }}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={prev}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-300 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 flex items-center justify-center rounded-full text-white transition-all hover:opacity-90"
              style={{ backgroundColor: accentColor }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BrandTestimonials;
