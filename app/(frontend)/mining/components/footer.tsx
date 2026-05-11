// components/Footer.tsx
"use client";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm text-gray-400">
        {/* Company Info */}
        <div>
            <Image
                      src="/mainlogo.png"
                      alt="Prixair Logo"
                      width={150}
                      height={80}
                      className="cursor-pointer hover:opacity-90 transition-opacity"
                      priority
                    />
          <p className="mt-2">Prixair Mining is a sustainable mining company operating across Africa, extracting value responsibly from copper, lithium, and gold</p>
          <div className="flex items-start mt-4 gap-2">
            <MdLocationOn className="text-3xl" />
            <span>Plot 688, Markus Kangye Blvd, Off Oladipo Diya Way, Gaduwa, Abuja.</span>
          </div>
          <div className="flex items-center mt-2 gap-2">
            <FaPhoneAlt />
            <span>08181888892</span>
          </div>
        <div className="mt-10">
            <h1 className="text-white text-lg text-semibold uppercase">Socials</h1>
          <div className="flex gap-4 mt-4">
            <FaXTwitter className="w-5 h-5" />
            <FaFacebook className="w-5 h-5" />
            <FaLinkedin className="w-5 h-5" />
          </div>
        </div>
        </div>

        {/* Quick Links */}
        <div>
          <ul className="space-y-3">
            {[
              { label: "About Us", href: "/mining/about" },
              { label: "Our Operations", href: "/mining/operations" },
              { label: "Investors", href: "/mining/about" },
              { label: "Sustainability", href: "/mining/operations" },
            ].map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="relative group w-fit inline-block hover:text-white transition-colors duration-200 pb-0.5">
                  {label}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-white group-hover:w-full transition-[width] duration-300 ease-out" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Secondary Links */}
        <div>
          <ul className="space-y-3">
            {[
              { label: "Careers", href: "/mining/careers" },
              { label: "News", href: "/mining/news" },
              { label: "Team", href: "/mining/team" },
              { label: "Contact Us", href: "/mining/contact" },
            ].map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="relative group w-fit inline-block hover:text-white transition-colors duration-200 pb-0.5">
                  {label}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-white group-hover:w-full transition-[width] duration-300 ease-out" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="font-semibold mb-3 text-white">GET IN TOUCH</h3>
          <form className="flex flex-col space-y-3">
            <input type="text" placeholder="Enter name" className="px-4 py-2 text-black bg-white" />
            <input type="email" placeholder="Enter email address" className="px-4 py-2 text-black bg-white" />
            <textarea placeholder="Message" rows={4} className="px-4 py-2 text-black bg-white" />
            <button type="submit" className="bg-white hover:bg-gray-100 text-gray-900 py-2 font-semibold text-sm transition-colors">SEND</button>
          </form>
        </div>
      </div>

      <div className="mt-40 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} PRIXAIR GROUP. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
