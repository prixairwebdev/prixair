"use client";
import Image from "next/image";
import { FaPhoneAlt, FaFacebook, FaLinkedin, FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-gray-300 py-12 px-6 md:px-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Column 1 - Company Info */}
        <div>
          <div className="flex items-center mb-3">
            <Image
              src="/mainlogo.png"
              alt="Prixair Group Logo"
              width={120}
              height={60}
              priority
            />
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Your trusted partner in finding the perfect home.
          </p>
          <div className="flex items-start gap-2 mb-2">
            <MdLocationOn className="text-lg text-orange-500 mt-1" />
            <span className="text-sm leading-relaxed">
              Plot 688, Markus Kangye Blvd, Off Oladipo Diya Way, Gaduwa, Abuja.
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaPhoneAlt className="text-orange-500" />
            <span>08181888892</span>
          </div>

          {/* Socials */}
          <div className="mt-8">
            <h4 className="text-white font-semibold uppercase text-sm mb-3">Socials</h4>
            <div className="flex gap-4 text-xl">
              <FaXTwitter className="hover:text-orange-500 transition-colors cursor-pointer" />
              <FaFacebook className="hover:text-orange-500 transition-colors cursor-pointer" />
              <FaInstagram className="hover:text-orange-500 transition-colors cursor-pointer" />
              <FaYoutube className="hover:text-orange-500 transition-colors cursor-pointer" />
              <FaPinterest className="hover:text-orange-500 transition-colors cursor-pointer" />
              <FaLinkedin className="hover:text-orange-500 transition-colors cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h4 className="text-white font-semibold uppercase mb-4 text-sm">
            Quick Link
          </h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-orange-500 transition">Home</a></li>
            <li><a href="/services" className="hover:text-orange-500 transition">Services</a></li>
            <li><a href="/about" className="hover:text-orange-500 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-orange-500 transition">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 3 - Resources */}
        <div>
          <h4 className="text-white font-semibold uppercase mb-4 text-sm">
            Resources
          </h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/track" className="hover:text-orange-500 transition">Track your item</a></li>
            <li><a href="/quote" className="hover:text-orange-500 transition">Request Quote</a></li>
            <li><a href="/faq" className="hover:text-orange-500 transition">FAQs</a></li>
            <li><a href="/terms" className="hover:text-orange-500 transition">Terms & Conditions</a></li>
            <li><a href="/privacy" className="hover:text-orange-500 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 4 - Newsletter */}
        <div>
          <h4 className="text-white font-semibold uppercase mb-4 text-sm">
            Newsletter
          </h4>
          <form className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Enter name"
              className="px-4 py-2 bg-white text-black text-sm placeholder-gray-600 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Enter email address"
              className="px-4 py-2 bg-white text-black text-sm placeholder-gray-600 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 text-sm transition"
            >
              SEND
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-12 text-xs text-gray-500 border-t border-gray-800 pt-6">
        © {new Date().getFullYear()} Prixair Real Estate. All rights reserved.
      </div>
    </footer>
  );
}
