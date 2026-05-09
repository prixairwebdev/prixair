// components/HeroSection.tsx
"use client";

import Image from "next/image";
import Nav from "../components/nav";
import PrixairHomesText from "../comps/prixairhomestext";
import PremiumProducts from "../comps/products";
import Testimonials from "../comps/Testimonials";
import WhatWeOffer from "./whatweoffer";
import Footer from "../components/footer";
import WhoWeAre from "./whoarewe";
import WhyChooseUs from "./whychooseus";
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
          Building homes and lifestyles with quality  <br /> houses, furniture, doors, and tiles.
        </h1>

        <p className="text-gray-200 mb-6 max-w-xl">
          Top-quality building materials designed to last and impress.
        </p>

        <button className="bg-orange-500 px-6 py-2 text-white hover:bg-orange-600 transition">
          Explore Products
        </button>
      </div>
    </section>
    <WhoWeAre/>
    <WhatWeOffer/>
    <WhyChooseUs/>
    <PremiumProducts/>
    <Testimonials/>
    
<PrixairHomesText/>
    <Footer/>
    </>
  );
}
