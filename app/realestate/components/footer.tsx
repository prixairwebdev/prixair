"use client";

import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12 px-6 md:px-16 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-20">
        {/* Logo & Address Section */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Image
              src="/realestatelogo.png"
              alt="Prixair Group Logo"
              width={120}
              height={60}
              className="object-contain"
            />
          </div>
          <p className="text-sm mb-6">
            Your trusted partner in finding the perfect home.
          </p>
          <div className="space-y-2 text-sm">
            <p>📍 Plot 688, Markus Kangye Blvd, Off Oladipo Diya Way, Gaduwa, Abuja.</p>
            <p>📞 08181888892</p>
          </div>

          <div className="mt-6">
            <h4 className="text-white font-semibold mb-2">SOCIALS</h4>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Twitter" className="hover:text-[#FB6404]">
                <FaXTwitter size={18} />
              </Link>
              <Link href="#" aria-label="Facebook" className="hover:text-[#FB6404]">
                <FaFacebookF size={18} />
              </Link>
              <Link href="#" aria-label="Instagram" className="hover:text-[#FB6404]">
                <FaInstagram size={18} />
              </Link>
              <Link href="#" aria-label="YouTube" className="hover:text-[#FB6404]">
                <FaYoutube size={18} />
              </Link>
              <Link href="#" aria-label="Pinterest" className="hover:text-[#FB6404]">
                <FaPinterestP size={18} />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="hover:text-[#FB6404]">
                <FaLinkedinIn size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">QUICK LINK</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-[#FB6404]">Home</Link>
            </li>
            <li>
              <Link href="/properties" className="hover:text-[#FB6404]">Property Search</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#FB6404]">Contact</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#FB6404]">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white font-semibold mb-4">RESOURCES</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/blog" className="hover:text-[#FB6404]">Blog</Link>
            </li>
            <li>
              <Link href="/market-trends" className="hover:text-[#FB6404]">Market Trends</Link>
            </li>
            <li>
              <Link href="/faqs" className="hover:text-[#FB6404]">FAQs</Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-[#FB6404]">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-[#FB6404]">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-semibold mb-4">NEWSLETTER</h4>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col space-y-3"
          >
            <input
              type="text"
              placeholder="Enter name"
              className="px-3 py-2 rounded-sm text-sm text-black focus:outline-none"
            />
            <input
              type="email"
              placeholder="Enter email address"
              className="px-3 py-2 rounded-sm text-sm text-black focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FB6404] text-white py-2 text-sm font-semibold rounded-sm"
            >
              SEND
            </motion.button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-xs text-gray-400">
        © 2025 Prixair Real Estate. All rights reserved.
      </div>
    </footer>
  );
}
