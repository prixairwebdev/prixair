"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/CartContext";
import { FiShoppingCart } from "react-icons/fi";
import { Menu, X, ArrowRight } from "lucide-react";
import SubsidiaryBar from "../../components/SubsidiaryBar";

const navItems = [
  { name: "Home", href: "/buka" },
  { name: "Menu", href: "/buka/menu" },
  { name: "Promo", href: "/buka/promo" },
  { name: "Locate us", href: "/buka/locate-us" },
  { name: "Brand", href: "/buka/Brand" },
];

function Nav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount("buka");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <SubsidiaryBar name="Prixair Buka" color="#FE0000" />

      <nav
        className={`fixed top-9 left-0 w-full z-[60] bg-white transition-shadow duration-300 ${
          isScrolled || mobileMenuOpen ? "shadow-[0_4px_20px_-8px_rgba(0,0,0,0.15)]" : "border-b border-black/5"
        }`}
      >
        <div className="max-w-7xl mx-auto h-16 px-5 md:px-10 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/buka" className="flex-shrink-0 flex items-center">
            <Image
              src="/bukalogo.png"
              alt="Prixair Buka"
              width={48}
              height={48}
              className="w-11 h-11 md:w-12 md:h-12 object-contain"
              priority
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1 text-sm font-semibold">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`relative block px-4 py-2 rounded-full transition-colors ${
                      isActive ? "text-[#FE0000]" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="buka-nav-active"
                        className="absolute inset-0 rounded-full bg-[#FE0000]/10"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className="relative">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/buka/cart"
              aria-label="Cart"
              className="relative w-10 h-10 flex items-center justify-center rounded-full text-gray-800 hover:bg-gray-100 transition-colors"
            >
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#FE0000] text-white text-[10px] min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/buka/products"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#FE0000] hover:bg-[#D90000] text-white text-sm font-bold pl-5 pr-4 h-10 rounded-full transition-colors"
            >
              Order online
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full text-gray-800 hover:bg-gray-100 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden border-t border-black/5 bg-white"
            >
              <ul className="px-5 py-4 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                          isActive ? "bg-[#FE0000]/10 text-[#FE0000]" : "text-gray-800 hover:bg-gray-50"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="px-5 pb-5">
                <Link
                  href="/buka/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-[#FE0000] hover:bg-[#D90000] text-white font-bold py-3.5 rounded-full transition-colors"
                >
                  Order online
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

export default Nav;
