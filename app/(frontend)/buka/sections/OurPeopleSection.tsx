"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const OurPeopleSection = () => {
  return (
    <section className="px-5 md:px-10 py-20 md:py-28 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/restaurantplaceholder.jpg"
            alt="Inside a Prixair Buka restaurant"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold text-[#FE0000] mb-2">Our people</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6">
            More than a restaurant — a family.
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              We&apos;re chefs, servers, farmers, delivery riders and food lovers with one goal: to bring the
              warmth of Nigerian food to every customer we serve.
            </p>
            <p>
              From the grandmother in Ibadan whose egusi recipe has fed generations, to the young graduate in
              Abuja who finds comfort in a plate of smoky jollof, our food celebrates the richness of Nigerian
              life.
            </p>
            <p>
              This buka was built for the people, by the people. At Prixair Buka, every plate is made with pride.
            </p>
          </div>
          <p className="mt-6 font-bold text-gray-900">Welcome to the family.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default OurPeopleSection;
