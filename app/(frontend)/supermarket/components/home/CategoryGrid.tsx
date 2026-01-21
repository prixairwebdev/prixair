"use client";

import Link from "next/link";

export function CategoryGrid() {
  const cats = [
    "Fruits & Vegetables",
    "Meat & Poultry",
    "Household",
    "Dairy & Eggs",
    "Beverages",
    "Snacks",
    "Canned Food",
    "Sea Food",
  ];

  return (
    <section className="text-black">
      <h3 className="font-semibold mb-3">Categories</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
        {cats.map((c) => (
          <Link 
            key={c}
            href={`/supermarket/products?category=${encodeURIComponent(c)}`}
            className="bg-white rounded-xl shadow-sm p-4 text-center text-xs text-black hover:shadow-md transition-shadow cursor-pointer block"
          >
            <div className="h-10 w-10 bg-orange-100 mx-auto rounded-full mb-2" />
            <span className="line-clamp-1">{c}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}