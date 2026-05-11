"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart } from "lucide-react";
import SubsidiaryBar from "../../components/SubsidiaryBar";

const navLinks = [
  { name: "Home", href: "/properties" },
  { name: "Shop", href: "/properties/shop" },
  { name: "Blog", href: "/properties/blog" },
  { name: "About", href: "/properties/about" },
  { name: "Contact", href: "/properties/contact" },
];

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <SubsidiaryBar name="Prixair Properties" color="#c2762d" />

      <nav
        className={`sticky top-9 left-0 w-full z-[60] transition-all duration-300 bg-white ${
          isScrolled ? "shadow-sm border-b border-gray-100" : ""
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/properties">
            <Image
              src="/homeslogo.png"
              alt="Prixair Properties"
              width={140}
              height={50}
              priority
              className="cursor-pointer"
            />
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="relative group pb-0.5 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-current group-hover:w-full transition-[width] duration-300 ease-out" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden md:flex items-center">
              <AnimatePresence>
                {searchOpen && (
                  <motion.input
                    key="search"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="border-b border-gray-300 focus:border-gray-900 outline-none text-sm px-2 py-1 bg-transparent text-gray-900 placeholder:text-gray-400"
                    autoFocus
                  />
                )}
              </AnimatePresence>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-gray-500 hover:text-gray-900 transition-colors p-1"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Cart */}
            <button className="text-gray-500 hover:text-gray-900 transition-colors p-1 hidden md:block">
              <ShoppingCart className="w-4 h-4" />
            </button>

            {/* CTA */}
            <Link
              href="/properties/shop"
              className="hidden md:inline-block px-5 py-2 text-sm font-semibold bg-gray-900 text-white hover:bg-gray-700 transition-colors"
            >
              Shop Now
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden focus:outline-none text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
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
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors tracking-wide"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex gap-4 pt-2">
                <Link
                  href="/properties/shop"
                  onClick={() => setMenuOpen(false)}
                  className="px-6 py-3 bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
