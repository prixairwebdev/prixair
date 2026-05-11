"use client";

import Link from "next/link";

const categories = [
  { name: "Doors", href: "/properties/shop?category=doors" },
  { name: "Smart Locks", href: "/properties/shop?category=locks" },
  { name: "Wall Panels", href: "/properties/shop?category=panels" },
  { name: "Living Room", href: "/properties/shop?category=living" },
  { name: "Wallpapers", href: "/properties/shop?category=wallpapers" },
  { name: "Tiles", href: "/properties/shop?category=tiles" },
];

export default function CategoryBar() {
  return (
    <div className="w-full bg-gray-900 text-white border-b border-white/10">
      <ul className="max-w-7xl mx-auto px-6 md:px-14 flex items-center gap-8 h-10 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <li key={cat.name} className="flex-shrink-0">
            <Link
              href={cat.href}
              className="text-xs font-medium text-white/60 hover:text-white transition-colors tracking-wide whitespace-nowrap"
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
