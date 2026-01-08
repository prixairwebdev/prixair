"use client";

import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdLocationOn, MdPhone } from "react-icons/md";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#3B1306] text-gray-200 py-12 px-6 md:px-12 lg:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 md:gap-20">
        {/* Column 1 - Logo & Info */}
        <div>
          <Image
            src="/hotellogo.png"
            alt="Prixair Group"
            width={150}
            height={60}
            className="mb-4"
          />
          <p className="text-sm mb-4 leading-relaxed">
            Comfort. Style. Hospitality.
          </p>

          <div className="flex items-start space-x-2 mb-2">
            <MdLocationOn className="text-[#FB6404] mt-1" />
            <p className="text-sm">
              Plot 688, Markus Kangye Blvd, Off Oladipo Diya Way, Gaduwa, Abuja.
            </p>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <MdPhone className="text-[#FB6404]" />
            <p className="text-sm">08181888892</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-sm">SOCIALS</h3>
            <div className="flex items-center space-x-4 text-lg">
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-[#FB6404] transition-colors"
              >
                <FaXTwitter />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-[#FB6404] transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-[#FB6404] transition-colors"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="font-semibold mb-4 text-sm tracking-wide uppercase">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="/hotel/room" className="hover:text-[#FB6404] transition-colors">
                Book a Room
              </a>
            </li>
            <li>
              <a href="/hotel/room" className="hover:text-[#FB6404] transition-colors">
                Check Availability
              </a>
            </li>
            <li>
              <a href="/hotel/about" className="hover:text-[#FB6404] transition-colors">
                Testimonials
              </a>
            </li>
            <li>
              <a href="/hotel/gallery" className="hover:text-[#FB6404] transition-colors">
                Gallery
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 - Newsletter */}
        <div>
          <h3 className="font-semibold mb-4 text-sm tracking-wide uppercase">
            Newsletter
          </h3>
          <form className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Enter name"
              className="px-3 py-2 text-sm rounded-sm text-gray-900 focus:outline-none bg-white"
            />
            <input
              type="email"
              placeholder="Enter email address"
              className="px-3 py-2 text-sm rounded-sm text-gray-900 focus:outline-none bg-white"
            />
            <button
              type="submit"
              className="bg-[#FB6404] hover:bg-[#E55A00] text-white text-sm font-semibold py-2 w-24 transition-colors"
            >
              SEND
            </button>
          </form>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-xs text-gray-400">
        © 2025 PRIXAIR GROUP. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
