'use client';
import React, { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
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

  const next = () => setCurrent((prev) => (prev + 1) % reviews.length);
  const prev = () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white py-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
        >
            <Quote className="w-16 h-16 opacity-10" />
        </motion.div>

        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">Words from Our Family</h2>
        <p className="text-gray-500 mb-16 text-lg">Don&apos;t just take our word for it, hear from our customers</p>

        <div className="relative min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full"
                >
                    <div className="px-8 flex flex-col items-center">
                        <div className="flex gap-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <Star 
                                    key={i} 
                                    className={`w-5 h-5 ${i < reviews[current].rating ? 'fill-current' : 'text-gray-200'}`} 
                                    style={{ color: i < reviews[current].rating ? accentColor : undefined }}
                                />
                            ))}
                        </div>
                        
                        <p className="text-2xl md:text-3xl font-medium text-gray-800 italic leading-relaxed mb-8">
                            &quot;{reviews[current].text}&quot;
                        </p>
                        
                        <p className="font-bold text-xl text-gray-900">— {reviews[current].name}</p>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-4">
                <button 
                    onClick={prev}
                    className="p-4 rounded-full bg-gray-50 text-gray-400 hover:bg-white hover:text-gray-900 hover:shadow-xl transition-all pointer-events-auto"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                    onClick={next}
                    className="p-4 rounded-full bg-gray-50 text-gray-400 hover:bg-white hover:text-gray-900 hover:shadow-xl transition-all pointer-events-auto"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>

        {/* Indicators */}
        <div className="mt-12 flex justify-center gap-3">
            {reviews.map((_, i) => (
                <button 
                    key={i}
                    onClick={() => setCurrent(i)}
                    className="w-2 h-2 rounded-full transition-all"
                    style={{ 
                        backgroundColor: i === current ? accentColor : '#E5E7EB',
                        width: i === current ? '24px' : '8px'
                    }}
                />
            ))}
        </div>
      </div>
    </section>
  );
};

export default BrandTestimonials;
