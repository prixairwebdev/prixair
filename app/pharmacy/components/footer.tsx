"use client";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#E7E7E7] text-black py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        {/* Left Section: Logo and Contact Info */}
        <div>
          <Image
            src="/pharmalogo.png"
            alt="Prixair Logo"
            width={150}
            height={80}
            className="mb-2"
          />
          <p className="mb-4 text-sm">
            Prixair Pharmacy is a trusted provider of verified health products
            and prescription services across Nigeria.
          </p>
          <div className="flex items-start gap-2 text-sm">
            <MdLocationOn className="text-xl" />
            <span>
              Plot 688, Markus Kangye Blvd, Off Oladipo Diya Way, Gaduwa,
              Abuja.
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm">
            <FaPhoneAlt />
            <span>08181888892</span>
          </div>
           <div className="mt-10">
            <h1 className=" text-lg text-semibold uppercase">Socials</h1>
          <div className="flex gap-4 mt-4">
            <FaXTwitter className="w-5 h-5" />
            <FaFacebook className="w-5 h-5" />
            <FaLinkedin className="w-5 h-5" />
          </div>
        </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3 uppercase text-sm">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-orange-500">Shop</a></li>
            <li><a href="#" className="hover:text-orange-500">My Account</a></li>
            <li><a href="#" className="hover:text-orange-500">Order</a></li>
          </ul>
        </div>

        {/* Help & Info */}
        <div>
          <h3 className="font-semibold mb-3 uppercase text-sm">Help & Info</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-orange-500">Upload Prescription</a></li>
            <li><a href="#" className="hover:text-orange-500">FAQs</a></li>
            <li><a href="#" className="hover:text-orange-500">Terms & Privacy</a></li>
          </ul>

          <h3 className="font-semibold mt-6 mb-3 uppercase text-sm">Contact</h3>
          <ul className="space-y-2">
            <li><a href="mailto:support@prixair.ng" className="hover:text-orange-500">support@prixair.ng</a></li>
            <li><a href="#" className="hover:text-orange-500">Terms & Privacy</a></li>
          </ul>
        </div>

        {/* Talk to a Doctor Form */}
        <div>
          <h3 className="font-semibold mb-3 uppercase text-sm">Talk to a Doctor</h3>
          <form className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Enter name"
              className="px-4 py-2 text-black bg-white border border-gray-300 rounded"
            />
            <textarea
              placeholder="Message"
              rows={3}
              className="px-4 py-2 text-black bg-white border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="bg-[#8AD52E] hover:bg-[#9ac466] text-white py-2 font-semibold w-24 rounded-sm"
            >
              SEND
            </button>
          </form>
        </div>
      </div>

      <div className="mt-16 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} PRIXAIR GROUP. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
