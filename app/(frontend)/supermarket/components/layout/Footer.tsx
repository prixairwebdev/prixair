"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Linkedin, X } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-gray-300">
      {/* TOP BORDER */}
      <div className="h-2 bg-orange-500" />

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* BRAND INFO */}
        <div className="space-y-4">
          <Image
            src="/prixairmall.png"
            alt="Prixair Mall"
            width={140}
            height={40}
          />
          <p className="text-sm">
            Building excellence across Nigeria since 2011.
          </p>

          <div className="text-sm space-y-2">
            <p>📍 Plot 688, Markus Kangye Blvd, Off Oladipo Diya Way, Gaduwa, Abuja.</p>
            <p>📞 08181888892</p>
          </div>

          {/* SOCIALS */}
          <div>
            <p className="font-semibold mb-2">SOCIALS</p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-white">
                <X size={18} />
              </Link>
              <Link href="#" className="hover:text-white">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="hover:text-white">
                <Linkedin size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="font-semibold text-white mb-4">QUICK LINKS</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">About Us</Link></li>
            <li><Link href="#">Need help?</Link></li>
            <li><Link href="#">Contact Us</Link></li>
            <li><Link href="#">Chat with Us</Link></li>
            <li><Link href="#">Accepted Payments</Link></li>
            <li><Link href="#">Privacy / Terms</Link></li>
          </ul>
        </div>

        {/* CATEGORIES */}
        <div>
          <h4 className="font-semibold text-white mb-4">CATEGORIES</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/supermarket/products?category=Fruits%20and%20Vegetables">Fruits and Vegetables</Link></li>
            <li><Link href="/supermarket/products?category=Beverages">Beverages</Link></li>
            <li><Link href="/supermarket/products?category=Meat%20and%20Poultry">Meat and Poultry</Link></li>
            <li><Link href="/supermarket/products?category=Snacks">Snacks</Link></li>
            <li><Link href="/supermarket/products?category=Dairy%20and%20Eggs">Dairy and Eggs</Link></li>
            <li><Link href="/supermarket/products?category=Canned%20Food">Canned Food</Link></li>
            <li><Link href="/supermarket/products?category=Household%20materials">Household materials</Link></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h4 className="font-semibold text-white mb-4">NEWS LETTER</h4>
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Enter name"
              className="w-full px-3 py-2 text-sm rounded bg-white text-black"
            />
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full px-3 py-2 text-sm rounded bg-white text-black"
            />
            <textarea
              placeholder="Message"
              rows={3}
              className="w-full px-3 py-2 text-sm rounded bg-white text-black"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 text-sm rounded hover:bg-orange-600 transition"
            >
              SEND
            </button>
          </form>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-700 py-4 text-center text-xs">
        © 2025 PRIXAIR GROUP. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
