// components/HeroSection.tsx
"use client";

import Image from "next/image";
import Nav from "../components/nav";

import PremiumProducts from "../comps/products";

import Footer from "../components/footer";
export default function HeroSection() {
  return (
    <>
    <Nav/>
   
    <section className="relative w-full h-[500px] md:h-[600px]">
      {/* Background Image */}
      <Image
        src="/homesbg.png"
        alt="Hero Image"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30  bg-opacity-40"></div>

      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Elevate Your Space with Premium Tiles, <br /> Doors & Fittings
        </h1>

        <p className="text-gray-200 mb-6 max-w-xl">
          Top-quality building materials designed to last and impress.
        </p>

       
      </div>
    </section>
    
    <PremiumProducts/>

    <Footer/>
    </>
  );
}
