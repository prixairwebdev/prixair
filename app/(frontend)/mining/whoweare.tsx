"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const WhoWeAre = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-[380px] overflow-hidden"
          >
            <Image
              src="/tractor.png"
              alt="Prixair Resources mining operations"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-3">
              Who We Are
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Sustainable Extraction of Essential Minerals
            </h2>
            <div className="w-12 h-0.5 bg-gray-900 mb-6" />
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              We are a mining company focused on the responsible extraction of
              critical minerals. Operating across multiple states in Nigeria, we
              leverage cutting-edge technology, skilled teams, and a people-first
              mindset to create lasting value for communities and investors alike.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              Founded by Ademola Banjo and backed by the Prixair Group, we bring
              financial strength, operational expertise, and deep regional insight
              to Africa's growing mineral sector.
            </p>

            <div className="flex items-center gap-4">
              <Image
                src="/ceo.png"
                alt="Ademola Banjo"
                width={44}
                height={44}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-sm text-gray-900">Ademola Banjo</p>
                <p className="text-xs text-gray-500">Group CEO, Prixair Resources</p>
              </div>
              <Link
                href="/mining/about"
                className="ml-auto text-sm font-medium border-b border-gray-900 hover:opacity-60 transition-opacity"
              >
                Find out more
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
