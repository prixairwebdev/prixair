// components/Footer.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiMapPin, FiPhone } from 'react-icons/fi';
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-10 text-sm text-gray-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Address */}
        <div>
          <Image src="/logo.png" alt="GAVI Logo" width={80} height={40} className="mb-4" />
          <p className="mb-4">Freshly Baked Happiness, Every Day.</p>
          <div className="flex items-start gap-2 mb-2">
            <FiMapPin className="mt-1" />
            <p>
              Plot 688, Markus Kangye Blvd, Off Oladipo Diya Way, Gaduwa, Abuja.
            </p>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <FiPhone />
            <p>08181888892</p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Twitter">
              <FaXTwitter className="text-xl hover:text-black transition" />
            </a>
            <a href="#" aria-label="Facebook">
              <FaFacebookF className="text-xl hover:text-black transition" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn className="text-xl hover:text-black transition" />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2">
          <Link href="/menu">Menu</Link>
          <Link href="/about">About Us</Link>
          <Link href="/order">Order Online</Link>
        </div>

        <div className="flex flex-col gap-2">
          <Link href="/contact">Contact</Link>
          <Link href="/faq">FAQ</Link>
        </div>

        {/* Newsletter Form */}
        <div>
          <h4 className="font-semibold mb-4">STAY UPDATED</h4>
          <form className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Enter name"
              className="border border-gray-300 px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="email"
              placeholder="Enter email address"
              className="border border-gray-300 px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-200 pt-4 text-center text-xs text-gray-500">
        <p>&copy; 2025 GAVI BAKERY. ALL RIGHTS RESERVED.</p>
        <div className="mt-1 space-x-2">
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <span>|</span>
          <Link href="/terms" className="hover:underline">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
