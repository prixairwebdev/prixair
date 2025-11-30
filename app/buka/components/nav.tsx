"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Nav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/buka" },
    { name: "Menu", href: "/buka/menu" },
    { name: "Promo", href: "/buka/promo" },
    { name: "Locate us", href: "/buka/locate-us" },
    { name: "Brand", href: "/buka/Brand" },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <div
        className={`flex justify-between items-center px-12 py-4 bg-[#FE0000] text-sm text-gray-300 transition-all duration-300 ${
          isScrolled ? "fixed top-0 left-0 w-full z-40" : "relative"
        }`}
      ></div>

      <nav
        className={`flex items-center justify-between px-6 py-4 fixed top-0 left-0 w-full z-[60] transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md text-black" : "bg-white text-black"
        }`}
      >
        <div className="flex items-center font-semibold">
          <Link href="/buka" onClick={closeMobileMenu}>
            <Image
              src="/bukalogo.png"
              alt="Prixair Logo"
              width={80}
              height={80}
              className="cursor-pointer hover:opacity-90 transition-opacity"
              priority
            />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex ml-10 space-x-10 text-sm font-semibold md:text-base lg:text-lg">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`transition-colors duration-300 ${
                    isScrolled ? "text-black" : "text-black"
                  } hover:text-[#FB6404]`}
                >
                  {item.name}
                </Link>
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#FE0000]"
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* CTA Button - visible on all screens */}
        <div className="flex items-center gap-3">
          <button className="text-white text-sm font-medium flex items-center gap-2 bg-[#FE0000] hover:bg-[#E60000] px-4 py-3 transition-colors">
            <span className="material-symbols-outlined">
              delivery_truck_speed
            </span>
            Order online
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`transition-colors ${
              isScrolled ? "text-black hover:text-[#FB6404]" : "text-black"
            }`}
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
              className="md:hidden fixed inset-0 bg-black bg-opacity-95 z-40 pt-24 px-6"
              onClick={closeMobileMenu}
            >
              <ul className="space-y-6 text-white font-semibold">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`block py-2 text-lg border-b border-gray-700 ${
                        pathname === item.href
                          ? "underline underline-offset-4 text-[#FB6404]"
                          : ""
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}

                <li className="pt-4">
                  <button className="w-full bg-[#FB6404] hover:bg-[#E55A00] text-white py-4 rounded-md flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">
                      delivery_truck_speed
                    </span>
                    Order online
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

export default Nav;
