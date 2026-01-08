"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: 'HOME', href: '/' },
    {
      name: 'ABOUT US',
      href: '/about',
      dropdown: [
        { name: 'Who Are We', href: '/about/#whoarewe' },
        { name: 'Leadership', href: '/about/#leadership' },
        { name: 'Philosophy', href: '/about/#philosophy' }
      ]
    },
    {
      name: 'MEDIA',
      href: '/media',
      dropdown: [
        {name: 'News', href: '/media#news'},
        { name: 'Press Releases', href: '/media#press' },
        { name: 'Gallery', href: '/media#gallery' }
      ]
    },
    {
      name: 'SUBSIDIARIES',
      href: '/subsidiaries',
      // dropdown: [
      //   { name: 'Prixair Oil&Gas', href: '/subsidiaries' },
      //   { name: 'Prixair Resources', href: '/subsidiaries' },
      //   { name: 'Prixair Properties', href: '/subsidiaries' }
      // ]
    },
    { name: 'CONTACT', href: '/contact' }
  ];

  const toggleDropdown = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className={`flex items-center justify-between px-6 py-4 fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md text-black" : "bg-transparent text-gray-300"}`}>
      <div className="flex-shrink-0">
        <Link href="/" onClick={closeMobileMenu}>
          <Image
            src={isScrolled ? "/blacklogo.png" : "/mainlogo.png"}
            alt="Prixair Logo"
            width={150}
            height={80}
            className="cursor-pointer hover:opacity-90 transition-opacity"
            priority
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center space-x-6 lg:space-x-8">
        {navItems.map((item) => (
          <li
            key={item.name}
            className="relative"
            onMouseEnter={() => item.dropdown && toggleDropdown(item.name)}
            onMouseLeave={() => item.dropdown && toggleDropdown(item.name)}
          >
            <div className="flex items-center">
              <Link
                href={item.href}
                className={`hover:text-[#FB6404]  font-medium text-sm lg:text-base transition-colors duration-200 ${isScrolled ? "text-black" : "text-gray-300 hover:text-white"}`}
              >
                {item.name}
              </Link>
              {item.dropdown && (
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                  className="ml-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.span>
              )}
            </div>

            <AnimatePresence>
              {item.dropdown && activeDropdown === item.name && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50 ${isScrolled ? "bg-white" : "bg-gray-900"}`}
                >
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className={`block px-4 py-2 text-sm hover:bg-opacity-10 hover:bg-[#FB6404] ${isScrolled ? "text-gray-700 hover:text-[#FB6404]" : "text-gray-300 hover:text-white"}`}
                      onClick={closeMobileMenu}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
        <li>
          <Link
            href="/join"
            className="ml-4 px-4 py-2 text-sm lg:text-base font-medium text-white bg-[#FB6404] hover:bg-[#E55A00] transition-colors duration-200 rounded"
          >
            JOIN US
          </Link>
        </li>
      </ul>

      {/* Mobile Navigation Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={isScrolled ? "text-black hover:text-[#FB6404]" : "text-gray-300 hover:text-white"}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween' }}
            className="md:hidden fixed inset-0 bg-black bg-opacity-95 z-40 pt-24 px-6 overflow-y-auto"
          >
            <button
              onClick={closeMobileMenu}
              className="absolute top-6 right-6 text-gray-300 hover:text-white focus:outline-none"
              aria-label="Close menu"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <ul className="space-y-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <div
                    className="flex items-center justify-between text-gray-300 hover:text-white text-xl py-3 border-b border-gray-800 cursor-pointer"
                    onClick={() => {
                      if (!item.dropdown) {
                        closeMobileMenu();
                      } else {
                        toggleDropdown(item.name);
                      }
                    }}
                  >
                    <Link href={item.href} onClick={closeMobileMenu}>
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <motion.span
                        animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                        className="ml-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.span>
                    )}
                  </div>

                  {item.dropdown && activeDropdown === item.name && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 space-y-3 mt-2"
                    >
                      {item.dropdown.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            href={subItem.href}
                            className="block text-gray-400 hover:text-white py-2 text-lg"
                            onClick={closeMobileMenu}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </li>
              ))}
              <li className="pt-6">
                <Link
                  href="/join"
                  className="inline-block w-full px-6 py-4 text-lg font-medium text-center text-white bg-[#FB6404] hover:bg-[#E55A00] transition-colors duration-200 rounded-lg"
                  onClick={closeMobileMenu}
                >
                  JOIN US
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