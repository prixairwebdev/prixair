"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SubsidiaryBar from "../../components/SubsidiaryBar";

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
    <>
      <SubsidiaryBar name="Prixair Hotels" color="#b35300" />
      <nav
        className={`fixed top-9 left-0 w-full z-[60] transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 lg:px-12 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/hotel">
            <Image
              src="/hotellogo.png"
              alt="Prixair Hotels"
              width={110}
              height={40}
              priority
              className={`cursor-pointer transition-all duration-300 ${isScrolled ? "brightness-0" : "brightness-0 invert"}`}
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8 font-medium text-sm">
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
            href="/hotel/contact"
            className={`hidden md:inline-block px-5 py-2 text-sm font-semibold transition-colors ${
              isScrolled
                ? "bg-gray-900 text-white hover:bg-gray-700"
                : "bg-white text-gray-900 hover:bg-gray-100"
            }`}
          >
            Book a Room
          </Link>

          {/* Mobile Menu Button */}
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              key="mobile-menu"
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
                href="/hotel/contact"
                onClick={() => setMobileMenu(false)}
                className="px-6 py-3 bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-colors"
              >
                Book a Room
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Nav;
