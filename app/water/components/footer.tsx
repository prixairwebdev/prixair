"use client";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white text-black py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        {/* Left Section: Logo and Info */}
        <div>
          <Image
            src="/waterlogo.png"
            alt="Prixair Logo"
            width={150}
            height={80}
            className="mb-2"
          />
          <p className="mb-4 text-sm">
            Proudly serving homes &amp; businesses across Nigeria.
          </p>
          <div className="flex items-start gap-2 text-sm mb-2">
            <MdLocationOn className="text-xl" />
            <span>
              Plot 688, Markus Kangye Blvd, Off Oladipo Diya Way, Gaduwa, Abuja.
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaPhoneAlt />
            <span>08181888892</span>
          </div>

          <div className="mt-6">
            <h1 className="text-sm font-semibold uppercase">Socials</h1>
            <div className="flex gap-4 mt-3">
              <FaXTwitter className="w-5 h-5" />
              <FaFacebook className="w-5 h-5" />
              <FaLinkedin className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Middle Left - Links */}
        <div>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-orange-500">Home</a></li>
            <li><a href="#" className="hover:text-orange-500">About Us</a></li>
            <li><a href="#" className="hover:text-orange-500">Products</a></li>
            <li><a href="#" className="hover:text-orange-500">Bulk Orders</a></li>
            <li><a href="#" className="hover:text-orange-500">Shop Now</a></li>
          </ul>
        </div>

        {/* Middle Right - Contact / FAQ */}
        <div>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-orange-500">Contact</a></li>
            <li><a href="#" className="hover:text-orange-500">FAQ</a></li>
          </ul>
        </div>

        {/* Right Section - Stay Updated */}
        <div>
          <h3 className="font-semibold mb-3 uppercase text-sm">Stay Updated</h3>
          <form className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Enter name"
              className="px-4 py-2 text-black bg-white border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Enter email address"
              className="px-4 py-2 text-black bg-white border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 font-semibold w-fit"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} GROUP. ALL RIGHTS RESERVED.{" "}
        <a href="#" className="hover:text-orange-500">Privacy Policy</a> |{" "}
        <a href="#" className="hover:text-orange-500">Terms of Use</a>
      </div>
    </footer>
  );
}
