"use client";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white text-black py-10 px-6 md:px-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        {/* Left Section: Logo and Info */}
        <div>
          <Image
            src="/mainlogo-dark.png"
            alt="Prixair Media Logo"
            width={120}
            height={60}
            className="mb-2 object-contain"
          />
          <p className="mb-4 text-sm">
            Professional media equipment rentals for events across Nigeria.
          </p>
          <div className="flex items-start gap-2 text-sm mb-2">
            <MdLocationOn className="text-xl text-orange-500" />
            <span>
              Plot 688, Markus Kangye Blvd, Off Oladipo Diya Way, Gaduwa, Abuja.
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaPhoneAlt className="text-orange-500" />
            <span>08181888892</span>
          </div>

          <div className="mt-6">
            <h1 className="text-sm font-semibold uppercase">Socials</h1>
            <div className="flex gap-4 mt-3">
              <FaXTwitter className="w-5 h-5 hover:text-orange-500 cursor-pointer" />
              <FaFacebook className="w-5 h-5 hover:text-orange-500 cursor-pointer" />
              <FaLinkedin className="w-5 h-5 hover:text-orange-500 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Middle Left - Links */}
        <div>
          <h3 className="font-semibold mb-3 uppercase text-sm">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/media" className="hover:text-orange-500">Home</a></li>
            <li><a href="#equipment" className="hover:text-orange-500">Our Equipment</a></li>
            <li><a href="#why-us" className="hover:text-orange-500">Why Choose Us</a></li>
            <li><a href="#contact" className="hover:text-orange-500">Request Quote</a></li>
          </ul>
        </div>

        {/* Middle Right - Contact / FAQ */}
        <div>
          <h3 className="font-semibold mb-3 uppercase text-sm">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-orange-500">Contact Support</a></li>
            <li><a href="#" className="hover:text-orange-500">Rental Terms</a></li>
            <li><a href="#" className="hover:text-orange-500">FAQ</a></li>
          </ul>
        </div>

        {/* Right Section - Stay Updated */}
        <div>
          <h3 className="font-semibold mb-3 uppercase text-sm">Inquire Now</h3>
          <form className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              className="px-4 py-2 text-black bg-white border border-gray-300 rounded focus:border-orange-500 outline-none"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="px-4 py-2 text-black bg-white border border-gray-300 rounded focus:border-orange-500 outline-none"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 font-semibold transition-colors"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} PRIXAIR MEDIA. ALL RIGHTS RESERVED.{" "}
        <a href="#" className="hover:text-orange-500">Privacy Policy</a> |{" "}
        <a href="#" className="hover:text-orange-500">Terms of Use</a>
      </div>
    </footer>
  );
}
