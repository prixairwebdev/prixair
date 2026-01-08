"use client";

import React, { ReactElement } from "react";
import { Briefcase, ShieldCheck, Search, Rocket } from "lucide-react";
import { motion, Variants } from "framer-motion";

// Animation variants with proper typing
const fadeUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const buttonVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.95
  }
};

interface CoreValue {
  icon: ReactElement;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

const coreValues: CoreValue[] = [
  {
    icon: <Briefcase className="w-8 h-8 text-gray-800" />,
    title: "Experienced Professionals",
    description:
      "A team of real estate experts with deep market knowledge and a passion for helping clients succeed.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-gray-800" />,
    title: "Transparent & Trustworthy",
    description:
      "No hidden fees or surprises — just clear, honest communication from the start.",
  },
  {
    icon: <Search className="w-8 h-8 text-gray-800" />,
    title: "Tailored Property Matches",
    description:
      "We focus on understanding your needs to help you find the right fit — not just any listing.",
  },
  {
    icon: <Rocket className="w-8 h-8 text-gray-800" />,
    title: "Efficient Processes",
    description:
      "From virtual tours to instant communication, we simplify your real estate journey with modern tools.",
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Jordan A.",
    text: "I found my dream home within 3 days of browsing. The process was so smooth and professional. I'd definitely recommend them!",
    rating: 5,
  },
  {
    name: "Sarah M.",
    text: "As a first-time buyer, I was nervous, but the team guided me through everything. Now I own a beautiful home!",
    rating: 5,
  },
  {
    name: "Michael T.",
    text: "Listed my property and got real offers in just a week. It's been an excellent experience!",
    rating: 5,
  },
];

export default function CoreValuesAndTestimonials() {
  return (
    <section className="w-full bg-white px-4 py-16 md:px-12 lg:px-24">
      {/* WHO WE ARE */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-gray-900 text-white py-16 text-center px-6 rounded-2xl mb-16"
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-4xl font-semibold mb-4"
        >
          Who We Are
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="max-w-3xl mx-auto leading-relaxed text-gray-300"
        >
          We are a modern logistics company committed to bridging distances with
          reliability, speed, and care. Whether it's across town or across the
          country, we specialize in moving goods efficiently—powered by
          technology, people, and purpose.
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="max-w-3xl mx-auto leading-relaxed mt-4 text-gray-300"
        >
          Founded with a vision to simplify deliveries for businesses and
          individuals alike, our team brings together logistics experts, support
          staff, and passionate couriers who believe every package tells a
          story. With every delivery, we strive to build trust, support commerce,
          and bring smiles to doorsteps.
        </motion.p>
      </motion.div>

      {/* Core Values Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">
          Our Core Values
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Guiding every stay with purpose — our values reflect the heart of who
          we are and how we care for every guest.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid md:grid-cols-4 sm:grid-cols-2 gap-6 mb-20"
      >
        {coreValues.map((value, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.3 }
            }}
            className="border rounded-lg p-6 flex flex-col items-start space-y-4 shadow-sm hover:shadow-xl transition-all duration-300 bg-white"
          >
            <motion.div
              whileHover={{ 
                scale: 1.1,
                rotate: 5 
              }}
              transition={{ duration: 0.2 }}
            >
              {value.icon}
            </motion.div>
            <h4 className="font-semibold text-lg">{value.title}</h4>
            <p className="text-gray-600 text-sm">{value.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">
          What Our Clients Say
        </h2>
        <p className="text-gray-500">
          Real stories from real people who found their perfect home with us.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid md:grid-cols-3 gap-6 mb-8"
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{ 
              y: -5,
              scale: 1.02 
            }}
            className="border rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 text-left bg-white"
          >
            <h4 className="font-semibold mb-2">{t.name}</h4>
            <p className="text-gray-600 mb-3 text-sm">{t.text}</p>
            <motion.div 
              className="flex space-x-1"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              {Array.from({ length: t.rating }).map((_, i) => (
                <motion.span 
                  key={i} 
                  className="text-yellow-500 text-lg"
                  whileHover={{ scale: 1.2 }}
                >
                  ★
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={buttonVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        whileHover="hover"
        whileTap="tap"
        className="text-center"
      >
        <motion.button 
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition font-medium shadow-md hover:shadow-lg"
        >
          More reviews
        </motion.button>
      </motion.div>
    </section>
  );
}