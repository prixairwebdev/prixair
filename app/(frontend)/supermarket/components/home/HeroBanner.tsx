"use client";

import { useRouter } from "next/navigation";

const QUICK_CATEGORIES = [
  "Rice & Pasta",
  "Beverages",
  "Snacks",
  "Dairy & Eggs",
  "Meat & Poultry",
  "Fruits & Vegetables",
];

export function HeroBanner() {
  const router = useRouter();

  return (
    <div className="relative bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full pointer-events-none" />
      <div className="absolute -bottom-16 -left-10 w-60 h-60 bg-white/10 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 py-14 md:py-20 text-center">
        <p className="text-orange-100 text-xs font-bold tracking-[0.25em] uppercase mb-3">
          Prixair Supermarket
        </p>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-3 tracking-tight">
          Fresh Groceries,
          <br className="hidden md:block" /> Fast Delivery.
        </h1>
        <p className="text-orange-100 mb-8 text-sm md:text-base max-w-md mx-auto">
          Shop from thousands of products — delivered straight to your door.
        </p>

        {/* Quick category pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {QUICK_CATEGORIES.map((term) => (
            <button
              key={term}
              onClick={() =>
                router.push(
                  `/supermarket/products?category=${encodeURIComponent(term)}`
                )
              }
              className="text-xs text-white/90 hover:text-white bg-white/15 hover:bg-white/25 px-4 py-2 rounded-full transition-all font-medium border border-white/20 hover:border-white/40"
            >
              {term}
            </button>
          ))}
          <button
            onClick={() => router.push("/supermarket/products")}
            className="text-xs text-orange-500 hover:text-orange-600 bg-white hover:bg-orange-50 px-4 py-2 rounded-full transition-all font-semibold"
          >
            All Products →
          </button>
        </div>
      </div>
    </div>
  );
}
