"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Facebook, Linkedin, Twitter, MapPin, Phone, Send, ShoppingBag } from "lucide-react";

const CATEGORIES = [
  { label: "Fruits & Vegetables", slug: "Fruits%20%26%20Vegetables" },
  { label: "Beverages", slug: "Beverages" },
  { label: "Meat & Poultry", slug: "Meat%20%26%20Poultry" },
  { label: "Dairy & Eggs", slug: "Dairy%20%26%20Eggs" },
  { label: "Bakery", slug: "Bakery" },
  { label: "Pantry", slug: "Pantry" },
  { label: "Snacks", slug: "Snacks" },
];

const LINKS = [
  { label: "About Prixair Mall", href: "/supermarket" },
  { label: "Help & FAQs", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Track Your Order", href: "/supermarket/account/orders" },
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSent(true); setEmail(""); }
  };

  return (
    <footer className="bg-gray-900 text-gray-400">
      {/* Orange accent bar */}
      <div className="h-1 bg-gradient-to-r from-orange-500 to-amber-400" />

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-4 lg:col-span-1">
            <div className="relative w-36 h-10">
              <Image src="/prixairmall.png" alt="Prixair Mall" fill className="object-contain brightness-0 invert opacity-90" />
            </div>
            <p className="text-sm leading-relaxed">
              Your one-stop supermarket for fresh groceries, everyday essentials, and more — delivered fast across Nigeria.
            </p>
            <div className="space-y-2 text-sm">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                Plot 688, Markus Kangye Blvd, Off Oladipo Diya Way, Gaduwa, Abuja.
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                08181888892
              </p>
            </div>
            <div className="flex gap-3 pt-1">
              {[
                { icon: Twitter, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map(({ icon: Icon, href }) => (
                <Link key={href + Icon.name} href={href} className="w-8 h-8 bg-gray-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4 text-gray-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm hover:text-orange-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Shop By Category</h4>
            <ul className="space-y-2.5">
              {CATEGORIES.map(({ label, slug }) => (
                <li key={label}>
                  <Link href={`/supermarket/products?category=${slug}`} className="text-sm hover:text-orange-400 transition-colors flex items-center gap-1.5">
                    <ShoppingBag className="w-3 h-3 text-gray-600" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm mb-4">Get exclusive deals and fresh arrivals delivered to your inbox.</p>
            {sent ? (
              <div className="bg-green-900/40 border border-green-700/50 text-green-400 px-4 py-3 rounded-lg text-sm">
                Thanks for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© 2026 Prixair Group. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-gray-300 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
