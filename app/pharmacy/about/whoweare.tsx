'use client';

import React from 'react';
import {
  ShieldCheck,
  Zap,
  GraduationCap,
  CheckCircle,
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';

// Values Data
const values = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-lime-500" />,
    title: 'Integrity',
    description:
      'Honesty and transparency guide every interaction — from our pricing to the advice we give.',
  },
  {
    icon: <Zap className="h-8 w-8 text-lime-500" />,
    title: 'Efficiency',
    description:
      'We believe your time and health are important. That’s why we offer fast, accurate, and seamless services.',
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-lime-500" />,
    title: 'Expertise',
    description:
      'Our licensed pharmacists and trained staff stay updated with the latest in medicine and wellness, ensuring you receive the best care.',
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-lime-500" />,
    title: 'Accountability',
    description:
      'We are committed to delivering safe, reliable products and advice you can depend on — every single time.',
  },
];

// Animation Variants
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.25, 0.1, 0.25, 1], // Cubic-bezier curve
      duration: 0.6,
    },
  },
};

const About = () => {
  return (
    <section className="bg-white text-gray-800 py-16 px-4">
      {/* Who We Are Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="bg-gray-200 w-full h-[400px] flex items-center justify-center text-gray-500 text-lg ">
          Pharmacy Photo
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
          <p className="text-gray-600">
            Prixair Pharmacy is a trusted provider of high-quality pharmaceutical care. With a strong commitment to customer health and safety, we offer a wide range of prescription and over-the-counter medications, wellness products, and expert health advice — all tailored to meet the unique needs of our communities.
          </p>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="max-w-6xl mx-auto mt-20 text-center">
        <h3 className="text-3xl font-bold mb-4">Core Values</h3>
        <p className="text-gray-600 mb-12">
          At Prixair Pharmacy, our values define how we serve, how we care, and how we grow.
        </p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white border rounded-xl p-6 text-left shadow-sm"
            >
              {value.icon}
              <h4 className="text-lg font-semibold mt-4 mb-2">{value.title}</h4>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
