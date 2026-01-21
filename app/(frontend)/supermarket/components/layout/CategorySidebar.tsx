"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getCategories, Category } from "@/app/actions/supermarket";

export function CategorySidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'All';

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
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
  ];

  if (loading) {
    return (
      <aside className="w-full md:w-64 bg-white rounded-xl shadow-sm p-4 h-fit">
        <div className="space-y-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-5 bg-gray-100 rounded w-3/4 animate-pulse" />
          ))}
        </div>
      </aside>
    )
  }

  const sortedCategories = categories.length > 0 
    ? categories.map(c => c.name) 
    : fallbackCategories;

  return (
    <aside className="w-full md:w-64 bg-white rounded-xl shadow-sm p-4 h-fit">
      <div className="flex md:hidden items-center justify-between mb-2">
        <h3 className="font-bold text-black uppercase text-xs">Categories</h3>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-orange-500 text-xs font-medium"
        >
          {isOpen ? 'Close' : 'View All'}
        </button>
      </div>

      <ul className={`space-y-3 text-sm md:block ${isOpen ? 'block' : 'hidden'}`}>
        <li className={`transition-colors ${currentCategory === 'All' ? 'text-orange-600 font-bold' : 'text-gray-600 hover:text-orange-500'}`}>
          <Link href="/supermarket/products">
            All Categories
          </Link>
        </li>
        {sortedCategories.map((cat) => (
          <li key={cat} className={`transition-colors ${currentCategory === cat ? 'text-orange-600 font-bold' : 'text-gray-600 hover:text-orange-500'}`}>
            <Link href={`/supermarket/products?category=${encodeURIComponent(cat)}`}>
              {cat}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}