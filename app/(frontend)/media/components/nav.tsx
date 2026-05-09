"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Menu } from "lucide-react";
import SubsidiaryBar from "../../components/SubsidiaryBar";

const navItems = [
  { name: "Home", href: "/media" },
  { name: "Equipment", href: "#equipment" },
  { name: "Why Us", href: "#why-us" },
  { name: "Contact", href: "#contact" },
];

function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      <SubsidiaryBar name="Prixair Media" color="#b35300" />

      <nav
        className={`fixed top-9 left-0 w-full z-[60] transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-4 max-w-7xl mx-auto">

          {/* Logo */}
          <Link href="/media" className="flex-shrink-0">
            <div className="relative w-[120px] h-[36px]">
              <Image
                src={isScrolled ? "/blacklogo.png" : "/mainlogo.png"}
                alt="Prixair Media"
                fill
                className="object-contain transition-all duration-300"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`relative group py-1 transition-colors duration-300 ${
                    isScrolled
                      ? "text-gray-500 hover:text-gray-900"
                      : "text-white/75 hover:text-white"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-[width] duration-300 ease-out ${
                      isScrolled ? "bg-gray-900" : "bg-white"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="#contact"
              className={`text-sm font-medium transition-colors duration-300 ${
                isScrolled ? "text-gray-500 hover:text-gray-900" : "text-white/75 hover:text-white"
              }`}
            >
              Get a Quote
            </Link>
            <Link
              href="#equipment"
              className={`px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                isScrolled
                  ? "bg-gray-900 text-white hover:bg-gray-700"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              }`}
            >
              View Equipment
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden focus:outline-none p-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className={`w-6 h-6 transition-colors duration-300 ${isScrolled ? "text-gray-900" : "text-white"}`} />
            ) : (
              <Menu className={`w-6 h-6 transition-colors duration-300 ${isScrolled ? "text-gray-900" : "text-white"}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-gray-950"
            >
              <div className="flex flex-col px-6 py-8 space-y-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.25 }}
                  >
                    <Link
                      href={item.href}
                      className="block py-3 text-sm font-medium text-white/60 hover:text-white border-b border-white/5 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.06, duration: 0.25 }}
                  className="pt-6"
                >
                  <Link
                    href="#equipment"
                    className="block w-full text-center px-6 py-3 bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    View Equipment
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

export default Nav;
