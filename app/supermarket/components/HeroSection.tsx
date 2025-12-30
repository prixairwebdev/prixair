"use client";

import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="bg-orange-500 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT CONTENT */}
        <div className="space-y-6">
          {/* Logo */}
          <Image
            src="/prixairmall.png"
            alt="Prixair Mall Logo"
            width={140}
            height={40}
            priority
          />

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Shop Smarter. Eat Fresher. Live Better.
          </h1>

          {/* Description */}
          <p className="text-orange-100 max-w-md">
            Discover unbeatable deals, fresh produce, and fast delivery — all
            in one place.
          </p>

          {/* CTA */}
          <Link
            href="/shop"
            className="inline-block bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-900 transition"
          >
            Start Shopping
          </Link>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center md:justify-end">
          <div className="bg-orange-200 rounded-[2rem] p-6">
            <Image
              src="/prixairmallimage.png"
              alt="Shopping Illustration"
              width={500}
              height={400}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
