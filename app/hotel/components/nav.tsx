"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface NavLink {
  name: string;
  href: string;
}

const Nav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { name: "Home", href: "/hotel" },
    { name: "Rooms & Rates", href: "/hotel/rooms" },
    { name: "Amenities", href: "/hotel/amenities" },
    { name: "Gallery", href: "/hotel/gallery" },
    { name: "About Us", href: "/hotel/about" },
    { name: "Contact", href: "/hotel/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[60] transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md text-black" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 lg:px-12">
        {/* ✅ Logo with black rounded background on scroll */}
        <Link href="/hotel" className="flex items-center space-x-2">
          <div className="transition-all duration-300 bg-black rounded-lg p-2">
            <Image
              src="/hotellogo.png"
              alt="Prixair Group Logo"
              width={120}
              height={50}
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
                className={`transition-colors duration-200 hover:text-[#FB6404] ${
                  isScrolled ? "text-black" : "text-black"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Language Selector */}
        <div className="hidden md:flex items-center space-x-1 cursor-pointer">
          <span
            className={`${
              isScrolled ? "text-black" : "text-black"
            } text-sm font-medium`}
          >
            English
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ${isScrolled ? "text-black" : "text-black"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle Menu"
        >
          {mobileMenu ? (
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black bg-opacity-95 text-white flex flex-col items-center space-y-6 py-10"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenu(false)}
                className="text-lg hover:text-[#FB6404] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => setMobileMenu(false)}
              className="px-5 py-2 bg-[#FB6404] rounded-md hover:bg-[#E55A00] transition"
            >
              English
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
