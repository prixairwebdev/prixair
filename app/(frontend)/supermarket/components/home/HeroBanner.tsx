"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function HeroBanner() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/supermarket/products?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full" />
      <div className="absolute -bottom-16 -left-10 w-60 h-60 bg-white/10 rounded-full" />
      <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/5 rounded-full" />

      <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
        <p className="text-orange-100 text-xs font-bold tracking-[0.2em] uppercase mb-3">
          Prixair Supermarket
        </p>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-3 tracking-tight">
          Fresh Groceries,<br className="hidden md:block" /> Fast Delivery.
        </h1>
        <p className="text-orange-100 mb-8 text-sm md:text-base max-w-md mx-auto">
          Shop from thousands of products — delivered straight to your door.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto">
          <div className="flex items-center bg-white rounded-2xl shadow-xl overflow-hidden pr-1.5 pl-4 gap-2">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for groceries, snacks, drinks…"
              className="flex-1 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors flex-shrink-0"
            >
              Search
            </button>
          </div>
        </form>

        {/* Quick links */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          {["Rice & Pasta", "Beverages", "Snacks", "Dairy & Eggs", "Meat & Poultry"].map((term) => (
            <button
              key={term}
              onClick={() => router.push(`/supermarket/products?category=${encodeURIComponent(term)}`)}
              className="text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-all font-medium"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
