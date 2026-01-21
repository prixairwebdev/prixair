"use client";

import Image from "next/image";

import Link from "next/link";

export function HeroBanner() {
  return (
    <Link href="/supermarket/products" className="block bg-orange-500 rounded-xl overflow-hidden hover:opacity-95 transition-opacity">
      <Image
        src="/supermarketbanner.png"
        alt="Mega Sale"
        width={1200}
        height={400}
        className="w-full h-auto"
      />
    </Link>
  );
}