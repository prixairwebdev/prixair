"use client";

import { FlashSale, Product } from "@/app/actions/supermarket";
import Image from "next/image";

function formatTime(targetDate: string) {
  const diff = new Date(targetDate).getTime() - new Date().getTime();
  if (diff <= 0) return "00h : 00m : 00s";

  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${hours.toString().padStart(2, '0')}h : ${minutes.toString().padStart(2, '0')}m : ${seconds.toString().padStart(2, '0')}s`;
}

export function FlashSales({ data }: { data: FlashSale | null }) {
  if (!data || !data.isActive) {
    return null; // Or return a placeholder / hide section
  }

  // Handle products which can be strings (IDs) or Product objects depending on depth
  // We filter to ensure we only have Product objects for rendering
  const products = data.products.filter((p): p is Product => typeof p !== 'string');

  return (
    <section>
      <div className="bg-red-600 text-white px-4 py-2 flex justify-between items-center rounded-t-xl">
        <span className="font-bold">{data.title}</span>
        <span className="font-mono">{formatTime(data.endTime)}</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {products.map((p) => {
          const imageUrl = typeof p.image === 'string' 
            ? p.image 
            : (p.image?.url || '/placeholder.png');

          return (
            <div key={p.id} className="bg-white rounded-xl shadow-sm p-4">
              <div className="h-32 bg-gray-100 rounded mb-3 overflow-hidden relative">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <h4 className="text-sm font-medium line-clamp-2">{p.name}</h4>
              <p className="text-orange-500 font-bold">₦{p.price?.toLocaleString()}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}