"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "North Core Ridge",
    mineral: "Copper",
    location: "Northern Plateau, Nigeria",
    status: "In Production",
    image: "/tractor.png",
  },
  {
    title: "Zara Lithium Field",
    mineral: "Lithium",
    location: "Eastern Rift, Tanzania",
    status: "Exploration Phase",
    image: "/images/mining2.png",
  },
  {
    title: "Kofa Gold Basin",
    mineral: "Gold",
    location: "Western Highlands, Ghana",
    status: "Development Stage",
    image: "/images/mining1.png",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export default function FeaturedProjects() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <motion.div
          className="flex items-end justify-between mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" as const }}
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-3">
              Portfolio
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Featured Projects
            </h2>
            <div className="w-12 h-0.5 bg-gray-900 mt-4" />
          </div>
          <a
            href="/mining/operations"
            className="text-sm font-medium border-b border-gray-900 hover:opacity-60 transition-opacity hidden md:block"
          >
            See All Projects
          </a>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white overflow-hidden group cursor-pointer"
              variants={cardVariant}
              whileHover={{ y: -8, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.12)", transition: { duration: 0.25, ease: "easeOut" as const } }}
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-5 border border-t-0 border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-900">{project.title}</h3>
                  <span className="text-xs border border-gray-300 text-gray-500 px-2 py-1 shrink-0 ml-2">
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium text-gray-800">Mineral:</span>{" "}
                  {project.mineral}
                </p>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <MapPin className="w-4 h-4 text-gray-400 mr-1 shrink-0" />
                  {project.location}
                </p>
                <motion.a
                  href="#"
                  className="mt-4 inline-block text-sm font-medium border-b border-gray-900 hover:opacity-60 transition-opacity"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.15 }}
                >
                  View Project
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-8 md:hidden">
          <a href="/mining/operations" className="text-sm font-medium border-b border-gray-900 hover:opacity-60 transition-opacity">
            See All Projects
          </a>
        </div>
      </div>
    </section>
  );
}
