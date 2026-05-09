"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SubsidiaryBar from "../../components/SubsidiaryBar";

const navLinks = [
  { name: "Home", href: "/farms" },
  { name: "Our Farm", href: "/farms/our-farm" },
  { name: "Contact", href: "/farms/contact" },
];

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <SubsidiaryBar name="Prixair Farms" color="#3a8c3f" />
      <nav
        className={`fixed top-9 left-0 w-full z-[60] transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-5 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/farms">
            <Image
              src="/farmlogo.png"
              alt="Prixair Farms"
              width={120}
              height={40}
              priority
              className={`cursor-pointer transition-all duration-300 ${
                isScrolled ? "brightness-0" : "brightness-0 invert"
              }`}
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`relative group pb-0.5 transition-colors duration-300 ${
                    isScrolled ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-current group-hover:w-full transition-[width] duration-300 ease-out" />
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href="/farms/contact"
            className={`hidden md:inline-block px-5 py-2 text-sm font-semibold transition-colors ${
              isScrolled
                ? "bg-gray-900 text-white hover:bg-gray-700"
                : "bg-white text-gray-900 hover:bg-gray-100"
            }`}
          >
            Contact Us
          </Link>

          {/* Mobile Toggle */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 transition-colors duration-300 ${isScrolled ? "text-gray-900" : "text-white"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={mobileMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-gray-950 text-white flex flex-col items-center space-y-6 py-10 px-6"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenu(false)}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors tracking-wide"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/farms/contact"
                onClick={() => setMobileMenu(false)}
                className="px-6 py-3 bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Nav;
