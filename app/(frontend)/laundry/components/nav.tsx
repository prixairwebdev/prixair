"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () =>
      setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { name: "Home", href: "/laundry" },
    { name: "Services", href: "/laundry/service" },
    { name: "Booking", href: "/laundry/booking" },
    { name: "Service Area", href: "/laundry/servicearea" },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navLinkClass = (isScrolled: boolean) =>
    `hover:text-[#FB6404] transition-colors ${
      isScrolled ? "text-black" : "text-gray-700"
    }`;

  return (
    <nav
      className={`flex items-center justify-between px-8 py-4 fixed top-0 left-0 w-full z-[60] transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md text-black"
          : "bg-white text-gray-700"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center text-md font-semibold">
        <Link href="/laundry" onClick={closeMobileMenu}>
          <Image
            src={isScrolled ? "/laundrylogo.png" : "/laundrylogo.png"}
            alt="Logo"
            width={150}
            height={80}
            className="cursor-pointer hover:opacity-90 transition-opacity"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex ml-10 space-x-12">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className={navLinkClass(isScrolled)}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="hidden md:block">
        <Link
          href="/laundry/contact"
          className="px-6 py-2.5 rounded-md bg-blue-400 hover:bg-blue-500 text-white font-semibold transition-colors"
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
              ? "text-black hover:text-[#FB6404]"
              : "text-gray-700 hover:text-black"
          }
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
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
          ) : (
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
            transition={{ type: "tween" }}
            className="md:hidden fixed inset-0 bg-black bg-opacity-95 z-40 pt-24 px-6 overflow-y-auto"
            onClick={closeMobileMenu}
          >
            <button
              onClick={closeMobileMenu}
              className="absolute top-6 right-6 text-gray-300 hover:text-white"
            >
              <svg
                className="h-8 w-8"
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

            <ul className="space-y-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block text-gray-300 hover:text-white text-lg py-3 border-b border-gray-800"
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              {/* Mobile CTA */}
              <li className="pt-6">
                <Link
                  href="/contact"
                  className="inline-block w-full px-6 py-4 text-center text-white bg-blue-400 hover:bg-blue-500 rounded-lg font-semibold"
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
