"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

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
    {
      name:"Home",
      href:"/mining"
    },
    {
      name: "About us",
      href: "/mining/about",
    },
  
    {
      name: "Our Operations",
      href: "/mining/operations",
    },
    {
      name: "Team",
      href: "/mining/team",
    },
    {
      name: "News",
      href: "/mining/news",
    },
    { name: "Contact", href: "/mining/contact" },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "ar", name: "العربية" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const toggleLanguageDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLanguageDropdownOpen(!languageDropdownOpen);
  };

  const selectLanguage = (language: { code: string; name: string }) => {
    setSelectedLanguage(language);
    setLanguageDropdownOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setLanguageDropdownOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav
      className={`flex items-center justify-between px-8 py-4 fixed top-0 left-0 w-full z-[60] transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md text-black"
          : "bg-white text-black"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center text-md font-semibold ">
        <div className="flex-shrink-0">
          <Link href="/mining" onClick={closeMobileMenu}>
            <Image
              src="/logomining.png"
              alt="Prixair Logo"
              width={190}
              height={120}
              className="cursor-pointer hover:opacity-90 transition-opacity bg-black rounded-md shadow-md"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex ml-10 space-x-12">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`hover:text-[#FB6404] transition-colors ${
                  isScrolled ? "text-black" : "text-black"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop CTA Button and Language Dropdown */}
      <div className="hidden md:flex items-center gap-4">
        <div className="relative">
          <button
            onClick={toggleLanguageDropdown}
            className={`px-4 py-2 text-sm font-medium transition-colors flex items-center justify-center text-center gap-2 ${
              isScrolled ? "text-black" : "text-black"
            }`}
          >
            {selectedLanguage.name}
            <span className="material-symbols-outlined">
              {languageDropdownOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
            </span>
          </button>

          <AnimatePresence>
            {languageDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
              >
                <div className="py-1">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => selectLanguage(language)}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        selectedLanguage.code === language.code
                          ? "bg-gray-100 text-[#FB6404]"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {language.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Navigation Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={
            isScrolled
              ? "text-black hover:text-[#FB6404]"
              : "text-black hover:text-[#FB6404]"
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
              className="absolute top-6 right-6 text-gray-300 hover:text-white focus:outline-none"
              aria-label="Close menu"
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

              {/* Mobile Language Dropdown */}
              <li className="pt-4">
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLanguageDropdownOpen(!languageDropdownOpen);
                    }}
                    className="w-full text-left px-4 py-3 text-lg text-gray-300 border border-gray-700 rounded-lg flex justify-between items-center"
                  >
                    {selectedLanguage.name}
                    <span className="material-symbols-outlined">
                      {languageDropdownOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {languageDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 space-y-2 pl-4">
                          {languages.map((language) => (
                            <button
                              key={language.code}
                              onClick={(e) => {
                                e.stopPropagation();
                                selectLanguage(language);
                              }}
                              className={`block w-full text-left py-2 text-lg ${
                                selectedLanguage.code === language.code
                                  ? "text-[#FB6404]"
                                  : "text-gray-400 hover:text-white"
                              }`}
                            >
                              {language.name}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>

              <li className="pt-6">
                <Link
                  href="/mining/join"
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