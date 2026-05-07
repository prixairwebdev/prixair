"use client";

import Link from "next/link";

const categories = [
  { name: "Fruits & Veg", icon: "🥦", slug: "Fruits and Vegetables" },
  { name: "Meat & Poultry", icon: "🥩", slug: "Meat and Poultry" },
  { name: "Dairy & Eggs", icon: "🥛", slug: "Dairy and Eggs" },
  { name: "Beverages", icon: "🧃", slug: "Beverages" },
  { name: "Snacks", icon: "🍪", slug: "Snacks" },
  { name: "Household", icon: "🧴", slug: "Household Essentials" },
  { name: "Seafood", icon: "🦐", slug: "Sea Food" },
  { name: "Canned Food", icon: "🥫", slug: "Canned Food" },
];

export function CategoryGrid() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Shop by Category</h2>
        <Link
          href="/supermarket/products"
          className="text-xs text-orange-500 font-bold hover:text-orange-600 transition-colors"
        >
          All categories →
        </Link>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/supermarket/products?category=${encodeURIComponent(cat.slug)}`}
            className="group flex flex-col items-center gap-2 p-3 rounded-2xl border border-gray-100 bg-white hover:border-orange-200 hover:bg-orange-50 transition-all text-center"
          >
            <div className="w-11 h-11 rounded-xl bg-orange-50 group-hover:bg-orange-100 flex items-center justify-center text-xl transition-colors">
              {cat.icon}
            </div>
            <span className="text-[11px] font-semibold text-gray-700 group-hover:text-orange-600 transition-colors leading-tight line-clamp-2">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
