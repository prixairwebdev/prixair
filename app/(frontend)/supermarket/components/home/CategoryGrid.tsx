"use client";

import Link from "next/link";

export function CategoryGrid() {
  const categories = [
    {
      name: "Fruits & Vegetables",
      icon: "🍎", // Could use "🌽" or "🥦" - Google doesn't have a perfect single icon
      googleIcon: "🌿", // or use emoji with fallback
    },
    {
      name: "Meat & Poultry",
      icon: "🥩",
      googleIcon: "🍗",
    },
    {
      name: "Household",
      icon: "🏠",
      googleIcon: "🧴",
    },
    {
      name: "Dairy & Eggs",
      icon: "🥛",
      googleIcon: "🥚",
    },
    {
      name: "Beverages",
      icon: "🧃",
      googleIcon: "🥤",
    },
    {
      name: "Snacks",
      icon: "🍪",
      googleIcon: "🍿",
    },
    {
      name: "Canned Food",
      icon: "🥫",
      googleIcon: "🫙",
    },
    {
      name: "Sea Food",
      icon: "🦐",
      googleIcon: "🐟",
    },
  ];

  return (
    <section className="text-black">
      <h3 className="font-semibold mb-3">Categories</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
        {categories.map((category) => (
          <Link 
            key={category.name}
            href={`/supermarket/products?category=${encodeURIComponent(category.name)}`}
            className="bg-white rounded-xl shadow-sm p-4 text-center text-xs text-black hover:shadow-md transition-shadow cursor-pointer block"
          >
            <div className="h-10 w-10 bg-orange-100 mx-auto rounded-full mb-2 flex items-center justify-center text-lg">
              {category.icon}
            </div>
            <span className="line-clamp-1">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}