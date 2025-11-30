"use client";
import { ShieldCheck, MapPin, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

interface Reason {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const reasons: Reason[] = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-orange-500" />,
    title: "Safety & Compliance",
    description:
      "We maintain strict adherence to national and international safety standards in every operation.",
  },
  {
    icon: <MapPin className="w-6 h-6 text-orange-500" />,
    title: "Nationwide Reach",
    description:
      "Our logistics network ensures timely product delivery across Nigeria's cities and industrial zones.",
  },
  {
    icon: <Clock className="w-6 h-6 text-orange-500" />,
    title: "On-Time Delivery",
    description:
      "We operate with precision and efficiency, minimizing downtime for our clients.",
  },
  {
    icon: <Users className="w-6 h-6 text-orange-500" />,
    title: "Expert Team",
    description:
      "Our experienced professionals bring years of expertise in energy management and client support.",
  },
];

interface StatsItem {
  value: string;
  label: string;
}

const stats: StatsItem[] = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "50+", label: "Expert Team" },
  { value: "24/7", label: "Support" },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-white text-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            With years of expertise in the energy sector, we deliver reliable, safe, 
            and efficient solutions tailored to your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason: Reason, index: number) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-orange-200 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-orange-50 rounded-lg mb-6 group-hover:bg-orange-100 transition-colors duration-300">
                {reason.icon}
              </div>
              <h3 className="font-bold text-xl mb-4 text-gray-900">
                {reason.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Stats Section */}
  
      </div>
    </section>
  );
}