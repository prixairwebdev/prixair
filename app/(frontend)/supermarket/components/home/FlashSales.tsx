"use client";

import { FlashSale, Product } from "@/app/actions/supermarket";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

function useCountdown(targetDate: string) {
  const calc = () => {
    const diff = new Date(targetDate).getTime() - Date.now();
    if (diff <= 0) return { h: "00", m: "00", s: "00" };
    return {
      h: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
      m: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0"),
      s: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
    };
  };

  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);

  return time;
}

function TimeUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 rounded-xl w-12 h-12 flex items-center justify-center">
        <span className="text-white font-black text-xl tabular-nums">{value}</span>
      </div>
      <span className="text-white/50 text-[9px] uppercase tracking-widest mt-1 font-bold">{label}</span>
    </div>
  );
}

export function FlashSales({ data }: { data: FlashSale | null }) {
  const time = useCountdown(data?.endTime ?? "");

  if (!data || !data.isActive) return null;

  const products = data.products.filter((p): p is Product => typeof p !== "string");

  return (
    <section className="bg-gray-900 rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 pt-6 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <div>
            <h2 className="text-white font-extrabold text-lg leading-none">{data.title}</h2>
            <p className="text-gray-400 text-xs mt-0.5">Limited time — grab it before it&apos;s gone</p>
          </div>
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-2">
          <TimeUnit value={time.h} label="hrs" />
          <span className="text-white/40 font-black text-lg mb-4">:</span>
          <TimeUnit value={time.m} label="min" />
          <span className="text-white/40 font-black text-lg mb-4">:</span>
          <TimeUnit value={time.s} label="sec" />
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5">
        {products.slice(0, 4).map((p) => {
          const imageUrl = typeof p.image === "string" ? p.image : (p.image?.url || "/placeholder.png");
          return (
            <Link
              key={p.id}
              href={`/supermarket/product/${p.id}`}
              className="bg-gray-900 p-4 hover:bg-gray-800 transition-colors group"
            >
              <div className="relative h-32 rounded-xl overflow-hidden bg-gray-800 mb-3">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute top-2 left-2 bg-orange-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Sale
                </div>
              </div>
              <h4 className="text-white text-xs font-bold line-clamp-2 mb-1">{p.name}</h4>
              <p className="text-orange-400 font-black text-sm">₦{p.price?.toLocaleString()}</p>
            </Link>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="px-6 py-4 border-t border-white/5 flex justify-end">
        <Link
          href="/supermarket/products"
          className="text-xs text-orange-400 hover:text-orange-300 font-bold transition-colors"
        >
          View all deals →
        </Link>
      </div>
    </section>
  );
}
