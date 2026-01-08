// components/Footer.tsx
"use client";

import { FaPhoneAlt } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaPinterest,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] text-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Column 1: Logo + Address */}
        <div>
          <Image
            src="/mainlogo.png"
            alt="Prixair Logo"
            width={160}
            height={90}
            priority
            className="mb-4"
          />

          <p className="text-gray-300 mb-6">
            Your trusted partner for your oil production and delivery
          </p>

          <div className="flex items-start gap-3 mb-3">
            <MdLocationOn className="text-xl" />
            <span className="text-gray-300">
              Plot 688, Markus Kangye Blvd, Off Oladipo Diya Way, Gaduwa, Abuja.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-base" />
            <span className="text-gray-300">08181888892</span>
          </div>

          {/* Social Icons */}
          <div className="mt-10">
            <h3 className="text-white font-semibold mb-4 tracking-wider uppercase">
              Socials
            </h3>

            <div className="flex gap-4 text-xl">
              <FaXTwitter />
              <FaFacebook />
              <FaInstagram />
              <FaYoutube />
              <FaPinterest />
              <FaLinkedin />
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="font-semibold mb-5 text-white tracking-wider uppercase">
            Quick Link
          </h3>

          <ul className="space-y-3 text-gray-300">
            <li><a href="/oil&gas" className="hover:text-orange-500">Home</a></li>
            <li><a href="/oil&gas/services" className="hover:text-orange-500">Services</a></li>
            <li><a href="/oil&gas/about" className="hover:text-orange-500">About Us</a></li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div>
          <h3 className="font-semibold mb-5 text-white tracking-wider uppercase">
            Resources
          </h3>

          <ul className="space-y-3 text-gray-300">
            <li><a href="/track" className="hover:text-orange-500">Track your item</a></li>
            <li><a href="/quote" className="hover:text-orange-500">Request Quote</a></li>
            <li><a href="/faqs" className="hover:text-orange-500">FAQs</a></li>
            <li><a href="/terms" className="hover:text-orange-500">Terms & Conditions</a></li>
            <li><a href="/privacy" className="hover:text-orange-500">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h3 className="font-semibold mb-5 text-white tracking-wider uppercase">
            Newsletter
          </h3>

          <form className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Enter name"
              className="px-4 py-3 bg-white text-black focus:outline-none"
            />

            <input
              type="email"
              placeholder="Enter email address"
              className="px-4 py-3 bg-white text-black focus:outline-none"
            />

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 w-[100px] font-semibold"
            >
              SEND
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-gray-400 text-sm mt-20">
        © {new Date().getFullYear()} Prixair Oil & Gas. All rights reserved.
      </div>
    </footer>
  );
}
