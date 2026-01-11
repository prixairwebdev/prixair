"use client";

import Image from "next/image";

export function HeroBanner() {
  return (
    <div className="bg-orange-500 rounded-xl overflow-hidden">
      <Image
        src="/supermarketbanner.png"
        alt="Mega Sale"
        width={1200}
        height={400}
        className="w-full h-auto"
      />
    </div>
  );
}