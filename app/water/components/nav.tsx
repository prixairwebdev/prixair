"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/water" },
    { name: "About us", href: "/water/about" },
    { name: "Products", href: "/water/products" },
    { name: "Contact", href: "/water/contact" },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navLinkClass = (isScrolled: boolean) =>
    `text-sm font-medium transition-colors duration-300 ${
      isScrolled ? "text-gray-700 hover:text-blue-500" : "text-gray-700 hover:text-blue-500"
    }`;

  return (
    <nav
      className={`flex items-center justify-between px-6 md:px-12 py-3 fixed top-0 left-0 w-full z-[60] transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md text-black" : "bg-white text-black"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/water" onClick={closeMobileMenu}>
          <Image
            src="/waterlogo.png"
            alt="Prixair Logo"
            width={130}
            height={40}
            className="cursor-pointer"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex ml-8 lg:ml-10 space-x-8 lg:space-x-12">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href} 
                className={navLinkClass(isScrolled)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="hidden md:block">
        <Link
          href="/water/contact"
          className="px-5 py-2 rounded-md bg-orange-400 hover:bg-orange-500 text-white font-semibold transition-colors shadow-md hover:shadow-lg text-sm"
        >
          Contact us
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={
            isScrolled
              ? "text-black hover:text-[#FB6404] transition-colors"
              : "text-black hover:text-[#FB6404] transition-colors"
          }
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg
              className="h-5 w-5"
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
              className="h-5 w-5"
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
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="md:hidden fixed inset-0 bg-black bg-opacity-95 z-40 pt-20 px-6 overflow-y-auto"
          >
            <button
              onClick={closeMobileMenu}
              className="absolute top-5 right-6 text-gray-300 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="h-6 w-6"
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
            </button>

            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block text-gray-300 hover:text-white text-base py-2 border-b border-gray-800 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              {/* Mobile CTA */}
              <li className="pt-3">
                <Link
                  href="/water/contact"
                  className="inline-block w-full px-5 py-3 text-center text-white bg-orange-400 hover:bg-orange-500 rounded-lg font-semibold transition-colors text-sm"
                  onClick={closeMobileMenu}
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Nav;