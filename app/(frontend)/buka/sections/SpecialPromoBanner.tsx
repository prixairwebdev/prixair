'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const SpecialPromoBanner = () => {
  return (
    <section className="bg-white px-5 md:px-10 py-20 md:py-24">
      <motion.div
        className="relative max-w-7xl mx-auto rounded-[2rem] overflow-hidden bg-[#FE0000] grid md:grid-cols-2 items-stretch"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative z-10 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
            Hungry? Your plate is a few taps away.
          </h2>
          <p className="mt-5 text-white/85 text-base md:text-lg max-w-md leading-relaxed">
            Order online for pickup or delivery, or walk in and eat with us. Same kitchen, same flavour.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/buka/products"
              className="group inline-flex items-center gap-2 bg-white text-[#FE0000] pl-7 pr-6 py-4 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors"
            >
              Start your order
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/buka/locate-us"
              className="inline-flex items-center px-7 py-4 rounded-full font-bold text-sm text-white border border-white/40 hover:bg-white/10 transition-colors"
            >
              Find a Buka
            </Link>
          </div>
        </div>

        <div className="relative min-h-[260px] md:min-h-[420px]">
          <Image
            src="/bukabg.png"
            alt="Jollof rice, pounded yam and egusi"
            fill
            sizes="(min-width:768px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#FE0000] via-[#FE0000]/20 to-transparent md:via-transparent" />
        </div>
      </motion.div>
    </section>
  );
};

export default SpecialPromoBanner;
