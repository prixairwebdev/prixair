"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function ConciergeHelp() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_HOTEL || "";
  const whatsappUrl = whatsappNumber 
    ? `https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent("Hello, I need help choosing a room at Prixair Hotel.")}`
    : "#";

  return (
    <section className="bg-gray-900 text-white text-center py-20 px-6">
      <motion.h2
        className="text-2xl md:text-3xl font-serif font-semibold mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Need Help Choosing?
      </motion.h2>
      <p className="text-gray-300 mb-8 max-w-xl mx-auto">
        Every guest deserves the perfect stay. Our concierge team is ready to guide you to the room that fits your style, needs, and comfort.
      </p>
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#FB6404] text-white px-6 py-3 rounded hover:bg-orange-600 transition"
      >
        <FaWhatsapp size={20} />
        Contact Concierge
      </a>
    </section>
  );
}
