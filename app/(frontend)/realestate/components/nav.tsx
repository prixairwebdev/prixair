"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/realestate" },
    { name: "About us", href: "/realestate/about" },
    { name: "Properties", href: "/realestate/properties" },
    { name: "Contact", href: "/realestate/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[60] transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo */}
        <Link href="/realestate" className="flex items-center space-x-2">
          <Image
            src="/realestatelogo.png"
            alt="Prixair Group Logo"
            width={120}
            height={60}
            priority
            className="transition-all duration-300 p-2 bg-black rounded-md"
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`transition-colors duration-200 ${
                  isScrolled
                    ? "text-gray-800 hover:text-[#FB6404]"
                    : "text-gray-800 hover:text-[#FB6404]"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side (Search + Language) */}
        <div className="hidden md:flex items-center space-x-5">
          <FaSearch
            className={`text-lg cursor-pointer ${
              isScrolled ? "text-gray-700" : "text-gray-800"
            }`}
          />
          <div
            className="relative cursor-pointer"
            onClick={() => setLanguageOpen(!languageOpen)}
          >
            <div
              className={`flex items-center space-x-1 ${
                isScrolled ? "text-gray-700" : "text-gray-800"
              }`}
            >
              <span>English</span>
              <IoChevronDown className="text-sm" />
            </div>
            <AnimatePresence>
              {languageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-28 bg-white text-black rounded-md shadow-md"
                >
                  <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                    English
                  </div>
                  <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                    French
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`focus:outline-none ${
              isScrolled ? "text-gray-800" : "text-gray-800"
            }`}
          >
            {menuOpen ? (
              // Close Icon
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger Icon
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white shadow-md absolute top-full left-0 w-full flex flex-col items-start px-6 py-4 space-y-4 border-t border-gray-100"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 font-medium hover:text-[#FB6404] transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Search + Language */}
            <div className="flex items-center space-x-5">
              <FaSearch className="text-gray-700 text-lg cursor-pointer" />
              <div
                className="relative cursor-pointer"
                onClick={() => setLanguageOpen(!languageOpen)}
              >
                <div className="flex items-center space-x-1 text-gray-700">
                  <span>English</span>
                  <IoChevronDown className="text-sm" />
                </div>
                {languageOpen && (
                  <div className="absolute right-0 mt-2 w-28 bg-white text-black rounded-md shadow-md">
                    <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                      English
                    </div>
                    <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                      French
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
