"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LiveChat() {
  const openTawkChat = () => {
    const Tawk_API = (window as any).Tawk_API;
    if (Tawk_API) {
      if (typeof Tawk_API.maximize === "function") {
        Tawk_API.maximize();
      } else if (typeof Tawk_API.toggle === "function") {
        Tawk_API.toggle();
      } else {
        // Fallback: Show it if hidden and hope it works
        if (Tawk_API.showWidget) Tawk_API.showWidget();
      }
    } else {
      console.error("Tawk_API not found. Still loading?");
    }
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[9999] cursor-pointer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={openTawkChat}
    >
      <div className="bg-white p-2 rounded-full shadow-2xl border border-gray-200 flex items-center justify-center w-16 h-16 relative">
        <Image
          src="/iconlogo.png"
          alt="Live Chat"
          width={48}
          height={48}
          className="object-contain"
        />
        {/* Notification Badge */}
        <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full border-2 border-white"></span>
      </div>
    </motion.div>
  );
}
