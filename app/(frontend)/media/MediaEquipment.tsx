"use client";
import Image from "next/image";
import { FC } from "react";
import { motion, Variants } from "framer-motion";

const equipment = [
  {
    name: "Professional Dual Wireless Mic",
    description: "High-clarity wireless microphone system for clear speech and vocals.",
    img: "https://images.unsplash.com/photo-1620245446020-879dc5cf2414?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Powered PA Speakers (1000W)",
    description: "Premium sound quality for large gatherings, indoor or outdoor events.",
    img: "https://plus.unsplash.com/premium_photo-1677159499898-b061fb5bd2d7?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Digital Audio Mixer",
    description: "Multichannel mixer for precise control over your event's soundscape.",
    img: "https://images.unsplash.com/photo-1657000504217-b64a0dd32a66?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "HD Multimedia Projector",
    description: "Bright and crisp visuals for presentations, weddings, and parties.",
    img: "https://images.unsplash.com/photo-1699767592631-2e22cb9c0df8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "LED Stage Wash Lights",
    description: "Vibrant lighting to set the perfect mood for your venue.",
    img: "https://images.unsplash.com/photo-1712580121590-3f1f57d2dc2c?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Fog Machine",
    description: "Add atmosphere and dramatic effects to your performances.",
    img: "https://images.unsplash.com/photo-1620398155783-00a7906bade5?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Podium & Lectern",
    description: "Elegant podium for speakers, complete with mounted mic options.",
    img: "https://images.unsplash.com/photo-1764874299006-bf4266427ec9?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Complete Event Backdrop",
    description: "Professional stage backdrops and branding surfaces.",
    img: "https://images.unsplash.com/photo-1767780648463-2ba4c5866438?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const MediaEquipment: FC = () => {
  return (
    <div id="equipment" className="w-full text-black bg-white py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Premium Equipment for Every Event
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-600 max-w-2xl mx-auto">
            From intimate gatherings to large-scale corporate events, we provide the highest grade of audio-visual technology to ensure your message is heard and seen clearly.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {equipment.map((item, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 border border-gray-100 p-6 flex flex-col items-center text-center rounded-xl hover:shadow-lg transition-shadow"
              variants={itemVariants}
            >
              <div className="w-full h-48 relative mb-6 rounded-lg overflow-hidden bg-white p-4">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>

              <h4 className="font-bold text-lg mb-2">
                {item.name}
              </h4>
              <p className="text-sm text-gray-600 mb-6 flex-grow">
                {item.description}
              </p>
              
              <div className="w-full">
                <a 
                   href="#contact"
                   className="block w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium transition-colors text-sm"
                >
                  Request a Quote
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MediaEquipment;
