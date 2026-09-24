"use client";

import { motion, Variants } from "framer-motion";
import { Star } from "lucide-react";

type Testimonial = {
  name: string;
  review: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    name: "Amina O.",
    review:
      "The egusi soup was exactly how my grandmother used to make it — thick, flavorful, and packed with perfectly seasoned meat. The pounded yam was soft and fresh, and it felt like eating at home again. I'll definitely be ordering weekly!",
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

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function TestimonialCarousel() {
  return (
    <section className="w-full bg-[#1a0f0b] py-20 md:py-24 px-5 md:px-10 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-semibold text-[#FF4D4D] mb-2">From our customers</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            &ldquo;It felt like eating at home again.&rdquo;
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              variants={item}
              className="flex flex-col justify-between rounded-3xl bg-white/[0.06] border border-white/10 p-7"
            >
              <div>
                <div className="flex gap-1 mb-5" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < t.rating ? "fill-[#FFB800] text-[#FFB800]" : "text-white/20"}`}
                    />
                  ))}
                </div>
                <blockquote className="text-white/85 leading-relaxed">{t.review}</blockquote>
              </div>
              <figcaption className="mt-7 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-[#FE0000] flex items-center justify-center font-bold text-sm">
                  {t.name.charAt(0)}
                </span>
                <span className="font-semibold">{t.name}</span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
