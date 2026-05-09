"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/oil&gas" },
  { name: "Services", href: "/oil&gas/services" },
  { name: "About Us", href: "/oil&gas/about" },
  { name: "Contact", href: "/oil&gas/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/oil&gas" ? pathname === "/oil&gas" : pathname.startsWith(href);

  return (
    <>
      <nav
        className={`fixed top-9 left-0 w-full z-[60] transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm py-3"
            : "bg-gradient-to-b from-black/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <Link href="/oil&gas" className="flex-shrink-0">
            <Image
              src="/mainlogo.png"
              alt="Prixair Oil & Gas"
              width={110}
              height={55}
              priority
              className={`transition-all duration-300 ${
                isScrolled ? "brightness-100" : "brightness-0 invert"
              }`}
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`relative group pb-0.5 transition-colors duration-200 ${
                      isScrolled
                        ? active ? "text-black" : "text-gray-500 hover:text-black"
                        : active ? "text-white" : "text-white/65 hover:text-white"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute bottom-0 left-0 h-px bg-current transition-[width] duration-300 ease-out ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <Link
            href="/oil&gas/contact"
            className={`hidden md:inline-block px-5 py-2 text-sm font-semibold transition-all duration-300 ${
              isScrolled
                ? "bg-gray-900 text-white hover:bg-gray-700"
                : "bg-white text-gray-900 hover:bg-gray-100"
            }`}
          >
            Get in Touch
          </Link>

          {/* Animated burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className={`md:hidden w-8 h-8 flex flex-col justify-center gap-1.5 focus:outline-none ${
              isScrolled || menuOpen ? "text-gray-900" : "text-white"
            }`}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block h-px w-full bg-current origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block h-px w-full bg-current"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block h-px w-full bg-current origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile panel */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[58] bg-black/50 md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-9 right-0 h-[calc(100%-2.25rem)] w-[75vw] max-w-xs bg-white z-[59] md:hidden flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">Menu</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-400 hover:text-gray-900 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col px-6 py-8 gap-1 flex-1">
                {navItems.map((item, i) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 + 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center justify-between py-3.5 text-base font-medium border-b border-gray-50 transition-colors ${
                          active ? "text-black" : "text-gray-500 hover:text-black"
                        }`}
                      >
                        {item.name}
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="px-6 pb-8">
                <Link
                  href="/oil&gas/contact"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full bg-gray-900 text-white py-3 text-sm font-semibold text-center hover:bg-gray-700 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
