"use client";

import { useEffect, useState } from "react";
import { getCategories, Category } from "@/app/actions/supermarket";

export function CategorySidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
        // Fallback or empty state
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const fallbackCategories = [
    "Fruits and Vegetables",
    "Dairy and Eggs",
    "Beverages",
    "Snacks",
    "Meat and Poultry",
    "Bakery",
    "Sea Food",
    "Canned Food",
    "Household Essentials",
    "Other Categories",
  ];

  if (loading) {
    return (
      <aside className="w-64 bg-white rounded-xl shadow-sm p-4 h-fit">
        <div className="space-y-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-5 bg-gray-100 rounded w-3/4 animate-pulse" />
          ))}
        </div>
      </aside>
    )
  }

  const displayOthers = categories.length === 0;

  return (
    <aside className="w-64 bg-white rounded-xl shadow-sm p-4 h-fit">
      <ul className="space-y-3 text-sm">
        {displayOthers ? fallbackCategories.map((cat) => (
          <li key={cat} className="hover:text-orange-500 cursor-pointer">
            {cat}
          </li>
        )) : categories.map((cat) => (
          <li key={cat.id} className="hover:text-orange-500 cursor-pointer">
            {cat.name}
          </li>
        ))}

        {displayOthers && <li className="text-xs text-gray-400 mt-2 italic">Using default categories</li>}
      </ul>
    </aside>
  );
}