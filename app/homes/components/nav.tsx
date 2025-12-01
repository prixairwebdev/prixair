// components/NavBar.tsx
"use client";

import Image from "next/image";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav className="w-full bg-white shadow px-6 md:px-16 py-4 flex items-center justify-between text-black">
      {/* Logo */}
      <Image
        src="/homeslogo.png"
        alt="Prixair Home Logo"
        width={150}
        height={80}
        priority
      />

      {/* Search Box */}
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-1/3">
        <input
          type="text"
          placeholder="Search products..."
          className="px-3 py-2 w-full outline-none"
        />
        <button className="bg-black text-white px-3 py-2">
          <FaSearch />
        </button>
      </div>

      {/* Menu Links */}
      <ul className="hidden md:flex items-center gap-6 text-sm font-semibold">
        <li className="text-orange-500"><a href="/">HOME</a></li>
        <li><a href="/homes/shop">SHOP</a></li>
        <li><a href="/homes/blog">BLOG</a></li>
        <li><a href="/homes/contact">CONTACT US</a></li>
        <li><a href="/homes/about">ABOUT US</a></li>
      </ul>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        <button className="border px-4 py-1 rounded-md text-sm">Sign In</button>
        <FaShoppingCart className="text-xl cursor-pointer" />
      </div>
    </nav>
  );
}
