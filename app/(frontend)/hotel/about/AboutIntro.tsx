"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutIntro() {
  return (
    <section className="bg-white py-20 px-6 md:px-16 lg:px-24 text-gray-800">
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h3 className="text-[#C0392B] text-lg font-semibold">
            A Legacy of Warmth & Welcome
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Nestled in the heart of the city, Prixair Hotel was founded with one mission: 
            to make every stay truly unforgettable. Whether you’re here for business or leisure, 
            our team is dedicated to delivering exceptional comfort, service, and local charm.
          </p>

          <div className="grid grid-cols-3 gap-6 mt-8">
            <div>
              <h4 className="text-2xl font-bold text-gray-900">4.8</h4>
              <p className="text-sm text-gray-600 uppercase tracking-wide">Rating</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-gray-900">10+ years</h4>
              <p className="text-sm text-gray-600 uppercase tracking-wide">Experience</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-gray-900">24/7</h4>
              <p className="text-sm text-gray-600 uppercase tracking-wide">Support</p>
            </div>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center"
        >
          {/* Replace with your hotel image */}
          <p className="text-gray-500">Hotel image</p>
        </motion.div>
      </div>
    </section>
  );
}
