// app/Brand/brandoverview.tsx
"use client";

import Image from "next/image";
import { motion, type Variants, cubicBezier } from "framer-motion";

// ✅ Use cubicBezier helper instead of raw array
const EASE_OUT = cubicBezier(0.16, 1, 0.3, 1);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT }, // ✅ now type-safe
  },
};

export default function BrandOverviewPage() {
  return (
    <section className="w-full">
      {/* Top Brand Overview Section */}
      <motion.div
        className="relative bg-[#ea2222] text-white px-6 py-16 text-center overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="absolute inset-0 opacity-20 bg-[url('/fastfoodicons.png')] bg-cover bg-center" />

        <motion.div className="relative max-w-4xl mx-auto" variants={containerVariants}>
          <motion.h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            variants={itemVariants}
          >
            Brand Overview
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg leading-relaxed"
            variants={itemVariants}
          >
            Prixair Buka is a proudly Nigerian food brand serving delicious,
            affordable, and freshly made local meals inspired by the classic
            roadside bukas — but elevated with a clean, modern twist.
            <br />
            We combine the authenticity of traditional Nigerian cooking with the
            speed and consistency of modern QSR (Quick Service Restaurant)
            culture — making real local food accessible to students, workers,
            families, and foodies across Nigeria and beyond.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Our People Section */}
      <motion.div
        className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6 py-16 items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <motion.div
          className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-inner"
          variants={itemVariants}
        >
          <Image
            src="/prixairsupermarket.jpg"
            alt="Our People"
            fill
            priority
            className="object-cover"
          />
        </motion.div>

        <motion.div variants={containerVariants}>
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-red-600 mb-4"
            variants={itemVariants}
          >
            Our People
          </motion.h2>
          <motion.p
            className="text-gray-700 leading-relaxed mb-4"
            variants={itemVariants}
          >
            We are more than just a restaurant. We are a family of chefs,
            servers, farmers, delivery riders, and food lovers bound by a common
            goal: to bring the warmth of Nigerian food into the hands and hearts
            of every customer we serve.
          </motion.p>
          <motion.p
            className="text-gray-700 leading-relaxed mb-4"
            variants={itemVariants}
          >
            Our journey started with a simple belief — that food is not just
            fuel, it’s a connection to home, to culture, and to each other. From
            the grandmother in Ibadan whose egusi recipe has fed generations, to
            the young graduate in Abuja who finds comfort in a plate of smoky
            jollof rice, our food celebrates the richness and resilience of
            Nigerian life.
          </motion.p>
          <motion.p
            className="text-gray-700 leading-relaxed"
            variants={itemVariants}
          >
            We honor our customers, our community, and our culinary roots. We
            are proud to serve students, workers, mamas and papas, and everyone
            in between — because this buka was built for the people, by the
            people. <br />
            At Prixair Buka, every bite is made with pride, every plate with
            purpose. <br />
            Welcome to the family.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
