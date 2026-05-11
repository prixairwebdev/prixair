"use client";

import Link from "next/link";
import {
  Apple,
  Beef,
  Milk,
  Coffee,
  Cookie,
  Sparkles,
  Fish,
  ShoppingBag,
} from "lucide-react";

const categories = [
  { name: "Fruits & Veg", icon: Apple, slug: "Fruits & Vegetables", color: "bg-green-50 text-green-600 group-hover:bg-green-100" },
  { name: "Meat & Poultry", icon: Beef, slug: "Meat & Poultry", color: "bg-red-50 text-red-600 group-hover:bg-red-100" },
  { name: "Dairy & Eggs", icon: Milk, slug: "Dairy & Eggs", color: "bg-blue-50 text-blue-600 group-hover:bg-blue-100" },
  { name: "Beverages", icon: Coffee, slug: "Beverages", color: "bg-amber-50 text-amber-600 group-hover:bg-amber-100" },
  { name: "Snacks", icon: Cookie, slug: "Snacks", color: "bg-orange-50 text-orange-600 group-hover:bg-orange-100" },
  { name: "Household", icon: Sparkles, slug: "Household Essentials", color: "bg-purple-50 text-purple-600 group-hover:bg-purple-100" },
  { name: "Seafood", icon: Fish, slug: "Sea Food", color: "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100" },
  { name: "Pantry", icon: ShoppingBag, slug: "Pantry", color: "bg-yellow-50 text-yellow-600 group-hover:bg-yellow-100" },
];

export function CategoryGrid() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Shop by Category</h2>
        <Link
          href="/supermarket/products"
          className="text-xs text-orange-500 font-semibold hover:text-orange-600 transition-colors"
        >
          All categories →
        </Link>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
        {categories.map(({ name, icon: Icon, slug, color }) => (
          <Link
            key={name}
            href={`/supermarket/products?category=${encodeURIComponent(slug)}`}
            className="group flex flex-col items-center gap-2 p-3 rounded-2xl border border-gray-100 bg-white hover:border-orange-200 hover:shadow-sm transition-all text-center"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-gray-700 group-hover:text-orange-600 transition-colors leading-tight line-clamp-2">
              {name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
