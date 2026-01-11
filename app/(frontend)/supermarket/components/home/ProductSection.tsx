"use client";

import Link from "next/link";

interface ProductSectionProps {
  title: string;
}

export function ProductSection({ title }: ProductSectionProps) {
  const items = new Array(5).fill(null);

  return (
    <section>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">{title}</h3>
        <Link href="#" className="text-sm text-orange-500">
          See all
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {items.map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-4">
            <div className="h-32 bg-gray-100 rounded mb-3" />
            <h4 className="text-sm">Product Name</h4>
            <p className="font-bold">₦9,999</p>
          </div>
        ))}
      </div>
    </section>
  );
}