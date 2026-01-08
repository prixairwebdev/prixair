'use client';

import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'North Core Ridge',
    mineral: 'Copper',
    location: 'Northern Plateau, Africa',
    status: 'In Production',
    image: '/tractor.png',
  },
  {
    title: 'Zara Lithium Field',
    mineral: 'Lithium',
    location: 'Eastern Rift, Tanzania',
    status: 'Exploration Phase',
    image: '/images/mining2.png',
  },
  {
    title: 'Kofa Gold Basin',
    mineral: 'Gold',
    location: 'Western Highlands, Ghana',
    status: 'Development Stage',
    image: '/images/mining1.png',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturedProjects() {
  return (
    <motion.section 
      className="px-6 md:px-16 py-12 bg-white text-black"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-100px" }}
      variants={container}
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Featured Project</h2>
        <a href="#" className="text-sm font-medium border-b-2 border-orange-500 hover:opacity-75">
          See All Projects
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div 
            key={index} 
            className="bg-white text-black rounded-lg shadow-sm overflow-hidden"
            variants={item}
          >
            <div className="relative h-48 w-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>

            <div className="p-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-md font-semibold">{project.title}</h3>
                <span className="text-xs border border-gray-400 rounded-full px-2 py-1">
                  {project.status}
                </span>
              </div>

              <p className="text-sm">
                <span className="font-medium">Mineral:</span> {project.mineral}
              </p>

              <p className="text-sm flex items-center mt-1">
                <MapPin className="w-4 h-4 text-orange-600 mr-1" />
                {project.location}
              </p>

              <a
                href="#"
                className="mt-4 inline-block text-sm font-medium border-b-2 border-orange-500 hover:opacity-75"
              >
                View Project
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
