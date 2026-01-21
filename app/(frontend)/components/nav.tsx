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

  const subsidiaries = [
    {
      name: "Prixair Oil & Gas ",
      imageUrl: "/subsidiaries/oilandgas.png",
      href: "/oil&gas",
    },
    {
      name: "Prixair Mining",
      imageUrl: "/subsidiaries/mining.png",
      href: "/mining",
    },
    {
      name: "Prixair Resturants",
      imageUrl: "/subsidiaries/food.jpg",
      href: "/food",
    },
    {
      name: "Prixair Farms",
      imageUrl: "/subsidiaries/farm.png",
      href: "/farms",
    },
    {
      name: "Prixair Hotels",
      imageUrl: "/subsidiaries/hotel.png",
      href: "/hotel",
    },
    {
      name: "Prixair Supermarket",
      imageUrl: "/supermarket.jpg",
    href: "/supermarket",
    },
    {
      name: "Prixair Pharmacy",
      imageUrl: "/subsidiaries/pharmacy.jpg",
      href: "/pharmacy",
    },
    {
      name: "Prixair Water",
      imageUrl: "/subsidiaries/water.png",
      href: "/water",
    },
    {
      name: "Prixair Properties",
      imageUrl: "/subsidiaries/properties.png",
      href: "/homes",
    },
    {
      name: "Prixair Transport & Logistics",
      imageUrl: "/subsidiaries/logistics.jpg",
      href: "/logistics",
    },
    {
      name: "Prixair Media",
      imageUrl: "/subsidiaries/media.jpg",
      href: "/news",
    },
    {
      name: "Prixair Home",
      imageUrl: "/subsidiaries/prixairhome.jpg",
      href: "/realestate",
    },
  ];

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
      name: 'NEWS',
      href: '/news',
      dropdown: [
        {name: 'Latest News', href: '/news#latest'},
        { name: 'Press Releases', href: '/news#press' },
        { name: 'Gallery', href: '/news#gallery' }
      ]
    },
    {
      name: 'SUBSIDIARIES',
      href: '/subsidiaries',
      dropdown: true
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

  const handleMouseEnter = (itemName: string) => {
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
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
            onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center cursor-pointer">
              {item.dropdown ? (
                <div 
                  className={`hover:text-[#FB6404] font-medium text-sm lg:text-base transition-colors duration-200 ${isScrolled ? "text-black" : "text-gray-300 hover:text-white"}`}
                  onClick={() => toggleDropdown(item.name)}
                >
                  {item.name}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`hover:text-[#FB6404] font-medium text-sm lg:text-base transition-colors duration-200 ${isScrolled ? "text-black" : "text-gray-300 hover:text-white"}`}
                >
                  {item.name}
                </Link>
              )}
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
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                  className={`absolute top-full left-0 mt-2 rounded-md shadow-lg py-1 z-50 ${isScrolled ? "bg-white" : "bg-gray-900"} ${
                    item.name === 'SUBSIDIARIES' 
                      ? 'w-64 max-h-[80vh] overflow-y-auto' 
                      : 'w-48'
                  }`}
                >
                  {item.name === 'SUBSIDIARIES' ? (
                    <div className="p-2">
                      <div className="grid grid-cols-2 gap-2">
                        {subsidiaries.map((subsidiary) => (
                          <Link
                            key={subsidiary.name}
                            href={subsidiary.href}
                            className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                              isScrolled 
                                ? "hover:bg-gray-100 hover:text-[#FB6404]" 
                                : "hover:bg-gray-800 hover:text-white"
                            }`}
                            onClick={closeMobileMenu}
                          >
                            <div className="w-12 h-12 mb-2 relative">
                              <Image
                                src={subsidiary.imageUrl}
                                alt={subsidiary.name}
                                fill
                                className="object-cover rounded-full"
                              />
                            </div>
                            <span className="text-xs font-medium text-center leading-tight">
                              {subsidiary.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <Link
                        href="/subsidiaries"
                        className={`block mt-2 text-center px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
                          isScrolled
                            ? "bg-[#FB6404] text-white hover:bg-[#E55A00]"
                            : "bg-gray-800 text-white hover:bg-gray-700"
                        }`}
                        onClick={closeMobileMenu}
                      >
                        View All Subsidiaries
                      </Link>
                    </div>
                  ) : item.name === 'ABOUT US' ? (
                    <>
                      <Link
                        href="/about/#whoarewe"
                        className={`block px-4 py-2 text-sm hover:bg-opacity-10 hover:bg-[#FB6404] ${isScrolled ? "text-gray-700 hover:text-[#FB6404]" : "text-gray-300 hover:text-white"}`}
                        onClick={closeMobileMenu}
                      >
                        Who Are We
                      </Link>
                      <Link
                        href="/about/#leadership"
                        className={`block px-4 py-2 text-sm hover:bg-opacity-10 hover:bg-[#FB6404] ${isScrolled ? "text-gray-700 hover:text-[#FB6404]" : "text-gray-300 hover:text-white"}`}
                        onClick={closeMobileMenu}
                      >
                        Leadership
                      </Link>
                      <Link
                        href="/about/#philosophy"
                        className={`block px-4 py-2 text-sm hover:bg-opacity-10 hover:bg-[#FB6404] ${isScrolled ? "text-gray-700 hover:text-[#FB6404]" : "text-gray-300 hover:text-white"}`}
                        onClick={closeMobileMenu}
                      >
                        Philosophy
                      </Link>
                    </>
                  ) : item.name === 'NEWS' ? (
                    <>
                      <Link
                        href="/news#latest"
                        className={`block px-4 py-2 text-sm hover:bg-opacity-10 hover:bg-[#FB6404] ${isScrolled ? "text-gray-700 hover:text-[#FB6404]" : "text-gray-300 hover:text-white"}`}
                        onClick={closeMobileMenu}
                      >
                        Latest News
                      </Link>
                      <Link
                        href="/news#press"
                        className={`block px-4 py-2 text-sm hover:bg-opacity-10 hover:bg-[#FB6404] ${isScrolled ? "text-gray-700 hover:text-[#FB6404]" : "text-gray-300 hover:text-white"}`}
                        onClick={closeMobileMenu}
                      >
                        Press Releases
                      </Link>
                      <Link
                        href="/news#gallery"
                        className={`block px-4 py-2 text-sm hover:bg-opacity-10 hover:bg-[#FB6404] ${isScrolled ? "text-gray-700 hover:text-[#FB6404]" : "text-gray-300 hover:text-white"}`}
                        onClick={closeMobileMenu}
                      >
                        Gallery
                      </Link>
                    </>
                  ) : null}
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
                    {item.dropdown ? (
                      <span>{item.name}</span>
                    ) : (
                      <Link href={item.href} onClick={closeMobileMenu}>
                        {item.name}
                      </Link>
                    )}
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
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 mt-2 overflow-hidden"
                    >
                      {item.name === 'SUBSIDIARIES' ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            {subsidiaries.map((subsidiary) => (
                              <Link
                                key={subsidiary.name}
                                href={subsidiary.href}
                                className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                                onClick={closeMobileMenu}
                              >
                                <div className="w-10 h-10 mb-1 relative">
                                  <Image
                                    src={subsidiary.imageUrl}
                                    alt={subsidiary.name}
                                    fill
                                    className="object-cover rounded-full"
                                  />
                                </div>
                                <span className="text-xs text-gray-300 text-center leading-tight">
                                  {subsidiary.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                          <Link
                            href="/subsidiaries"
                            className="block text-center px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                            onClick={closeMobileMenu}
                          >
                            View All Subsidiaries
                          </Link>
                        </div>
                      ) : item.name === 'ABOUT US' ? (
                        <ul className="space-y-3">
                          <li>
                            <Link
                              href="/about/#whoarewe"
                              className="block text-gray-400 hover:text-white py-2 text-lg"
                              onClick={closeMobileMenu}
                            >
                              Who Are We
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/about/#leadership"
                              className="block text-gray-400 hover:text-white py-2 text-lg"
                              onClick={closeMobileMenu}
                            >
                              Leadership
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/about/#philosophy"
                              className="block text-gray-400 hover:text-white py-2 text-lg"
                              onClick={closeMobileMenu}
                            >
                              Philosophy
                            </Link>
                          </li>
                        </ul>
                      ) : item.name === 'NEWS' ? (
                        <ul className="space-y-3">
                          <li>
                            <Link
                              href="/news#latest"
                              className="block text-gray-400 hover:text-white py-2 text-lg"
                              onClick={closeMobileMenu}
                            >
                              Latest News
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/news#pressrelease"
                              className="block text-gray-400 hover:text-white py-2 text-lg"
                              onClick={closeMobileMenu}
                            >
                              Press Releases
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/news#gallery"
                              className="block text-gray-400 hover:text-white py-2 text-lg"
                              onClick={closeMobileMenu}
                            >
                              Gallery
                            </Link>
                          </li>
                        </ul>
                      ) : null}
                    </motion.div>
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