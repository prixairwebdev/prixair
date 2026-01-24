"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Floating Icon */}
      <motion.div
        className="fixed bottom-6 right-6 z-[9999] cursor-pointer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleModal}
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

      {/* Live Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-24 right-6 z-[9999] w-[350px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-[#FB6404] p-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white p-1 rounded-full">
                  <Image
                    src="/iconlogo.png"
                    alt="Prixair"
                    width={24}
                    height={24}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Prixair Group</h3>
                  <div className="flex items-center text-[10px]">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>
                    Online
                  </div>
                </div>
              </div>
              <button
                onClick={toggleModal}
                className="hover:bg-white hover:bg-opacity-20 p-1 rounded-full transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Chat Body */}
            <div className="h-[400px] p-4 bg-gray-50 flex flex-col justify-end overflow-y-auto">
              {/* Welcome Message */}
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-700 max-w-[80%] mb-4">
                Hello! How can we help you today?
              </div>
              {/* Informational Message */}
              <div className="text-center text-xs text-gray-400 mt-2 italic">
                Live Chat API will be integrated here soon.
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-1 focus:ring-[#FB6404]"
                disabled
              />
              <button className="bg-[#FB6404] text-white p-2 rounded-full opacity-50 cursor-not-allowed">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
