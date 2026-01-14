// Updated NavBar Component with white background and black text on scroll
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/oil&gas" },
    { name: "Services", href: "/oil&gas/services" },
    { name: "About us", href: "/oil&gas/about" },
    { name: "Contact", href: "/oil&gas/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[60] transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/mainlogo.png"
            alt="Prixair Group Logo"
            width={120}
            height={60}
            priority
            className={`transition-all duration-300 ${
              isScrolled ? "" : ""
            }`}
          />
        </Link>

        <ul className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`transition-colors duration-200 ${
                  isScrolled
                    ? "text-black hover:text-[#FB6404]"
                    : "text-white hover:text-[#FB6404]"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className={`hidden md:inline-block px-4 py-2 rounded text-sm font-medium transition-colors duration-200 bg-[#FB6404] text-white hover:bg-[#E55A00]`}
        >
          Contact Us
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`focus:outline-none ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            {menuOpen ? (
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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className={`md:hidden bg-white shadow-md absolute top-full left-0 w-full flex flex-col items-start px-6 py-4 space-y-4 border-t border-gray-100`}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block text-gray-800 font-medium hover:text-[#FB6404] transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="bg-[#FB6404] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#E55A00] transition-colors duration-200 w-full text-center"
            >
              Contact Us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}