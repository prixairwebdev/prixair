"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/farms" },
    { name: "Our Farm", href: "/farms/our-farm" },
    { name: "Contact", href: "/farms/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[60] transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md text-black" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo */}
        <Link href="/farms">
          <div className="transition-all duration-300 bg-black rounded-lg p-2">
            <Image
              src="/farmlogo.png"
              alt="PrixairFarm Logo"
              width={120}
              height={40}
              priority
              className="cursor-pointer"
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="hover:text-green-500 transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Contact Button */}
        <Link
          href="/contact"
          className="hidden md:inline-block bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition"
        >
          Contact Us
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-7 w-7 ${isScrolled ? "text-black" : "text-black"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                mobileMenu
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-green-900 text-white flex flex-col items-center space-y-6 py-10"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenu(false)}
                className="text-lg hover:text-green-400 transition"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/farms/contact"
              onClick={() => setMobileMenu(false)}
              className="px-6 py-2 bg-green-500 rounded-md hover:bg-green-600 transition"
            >
              Contact Us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
