"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const equipment = [
  {
    name: "Professional Dual Wireless Mic",
    description: "High-clarity wireless microphone system for clear speech and vocals.",
    img: "https://images.unsplash.com/photo-1620245446020-879dc5cf2414?q=80&w=1335&auto=format&fit=crop",
  },
  {
    name: "Powered PA Speakers (1000W)",
    description: "Premium sound quality for large gatherings, indoor or outdoor events.",
    img: "https://plus.unsplash.com/premium_photo-1677159499898-b061fb5bd2d7?q=80&w=1364&auto=format&fit=crop",
  },
  {
    name: "Digital Audio Mixer",
    description: "Multichannel mixer for precise control over your event's soundscape.",
    img: "https://images.unsplash.com/photo-1657000504217-b64a0dd32a66?q=80&w=1740&auto=format&fit=crop",
  },
  {
    name: "HD Multimedia Projector",
    description: "Bright and crisp visuals for presentations, weddings, and parties.",
    img: "https://images.unsplash.com/photo-1699767592631-2e22cb9c0df8?q=80&w=1974&auto=format&fit=crop",
  },
  {
    name: "LED Stage Wash Lights",
    description: "Vibrant lighting to set the perfect mood for your venue.",
    img: "https://images.unsplash.com/photo-1712580121590-3f1f57d2dc2c?q=80&w=1744&auto=format&fit=crop",
  },
  {
    name: "Fog Machine",
    description: "Add atmosphere and dramatic effects to your performances.",
    img: "https://images.unsplash.com/photo-1620398155783-00a7906bade5?q=80&w=1740&auto=format&fit=crop",
  },
  {
    name: "Podium & Lectern",
    description: "Elegant podium for speakers, complete with mounted mic options.",
    img: "https://images.unsplash.com/photo-1764874299006-bf4266427ec9?q=80&w=1365&auto=format&fit=crop",
  },
  {
    name: "Complete Event Backdrop",
    description: "Professional stage backdrops and branding surfaces.",
    img: "https://images.unsplash.com/photo-1767780648463-2ba4c5866438?q=80&w=1740&auto=format&fit=crop",
  },
];

export default function MediaEquipment() {
  return (
    <section id="equipment" className="py-24 bg-white px-6 md:px-14">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Equipment</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">Premium Equipment for Every Event</h2>
          <p className="mt-3 text-gray-500 max-w-lg">
            From intimate gatherings to large-scale corporate events — we provide the highest grade audio-visual technology.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {equipment.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="border-t-2 border-gray-200 hover:border-[#FB6404] transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-gray-50">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="pt-5 pb-6 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 text-sm mb-2">{item.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-5 flex-1">{item.description}</p>
                <a
                  href="#contact"
                  className="text-sm font-semibold text-gray-900 flex items-center gap-2 group-hover:gap-3 transition-all w-fit"
                >
                  Request a Quote <span className="text-[#FB6404]">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
