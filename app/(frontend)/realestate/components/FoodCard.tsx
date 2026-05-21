// components/FoodCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

type FoodCardProps = {
  name: string;
  imageUrl: string;
  href: string;
};

export default function FoodCard({ name, imageUrl, href }: FoodCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
      <div className="w-28 h-28 flex items-center justify-center mb-4">
        <Image
          src={imageUrl}
          alt={name}
          width={112}
          height={112}
          className="object-contain w-full h-full"
        />
      </div>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-block px-4 py-2 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition w-full text-center"
      >
        Visit Website
      </Link>
    </div>
  );
}
