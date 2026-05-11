"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SubsidiaryBar from "../../components/SubsidiaryBar";

const navItems = [
  { name: "Home", href: "/logistics" },
  { name: "Services", href: "/logistics/services" },
  { name: "Track Shipment", href: "/logistics/track" },
  { name: "About", href: "/logistics/about" },
  { name: "Contact", href: "/logistics/contact" },
];

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <SubsidiaryBar name="Prixair Logistics" color="#b35300" />
      <nav
        className={`fixed top-9 left-0 w-full z-[60] transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-5 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/logistics">
            <Image
              src={isScrolled ? "/blacklogo.png" : "/mainlogo.png"}
              alt="Prixair Logistics"
              width={120}
              height={40}
              priority
              className="transition-all duration-300"
            />
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`relative group pb-0.5 transition-colors duration-300 ${
                    isScrolled ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-current group-hover:w-full transition-[width] duration-300 ease-out" />
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href="/logistics/contact"
            className={`hidden md:inline-block px-5 py-2 text-sm font-semibold transition-colors ${
              isScrolled
                ? "bg-gray-900 text-white hover:bg-gray-700"
                : "bg-white text-gray-900 hover:bg-gray-100"
            }`}
          >
            Request a Quote
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg
              className={`w-6 h-6 transition-colors duration-300 ${isScrolled ? "text-gray-900" : "text-white"}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-gray-950 text-white flex flex-col items-center space-y-6 py-10 px-6"
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors tracking-wide"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/logistics/contact"
                onClick={() => setMenuOpen(false)}
                className="px-6 py-3 bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-colors"
              >
                Request a Quote
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
