import Image from 'next/image';
import React from "react";
import FindGaviSection from "../comps/FindGaviSection";
import MenuSection from '../comps/MenuSection';
import MenuGallerySection from '../comps/MenuGallerySection';

const categories = [
  {
    name: 'Pastries',
    icon: '/icons/pastries.png', // Update path to your icon
    alt: 'Pastries Icon',
  },
  {
    name: 'Bread',
    icon: '/icons/bread.png', // Update path to your icon
    alt: 'Bread Icon',
  },
  {
    name: 'Cakes',
    icon: '/icons/cake.png', // Update path to your icon
    alt: 'Cakes Icon',
  },
  {
    name: 'Cookies & Treats',
    icon: '/icons/cookies.png', // Update path to your icon
    alt: 'Cookies & Treats Icon',
  },
];

function page() {
  return (
    <>
     <section
  className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center text-center px-6 py-20
    bg-[url('/gavism.png')] md:bg-[url('/gavibg.png')]"
>
        <div className="relative z-10 text-black max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Full Menu{" "}
          </h1>
          <p className="text-gray-700 text-sm mb-8">
            Browse our handcrafted treats — baked fresh daily, just for you.{" "}
          </p>
          <div className="flex font-bold justify-center gap-4">
            <button className="bg-[#373435] text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
              Order Now
            </button>
          </div>
        </div>
      </section>
        <section className="bg-[#FAF9F6] py-10">
    <div className="max-w-[900px] mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-8 text-gray-700">Our Categories</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="bg-[#FCFCFC] border border-gray-100 rounded-lg shadow-sm w-48 h-52 flex flex-col items-center justify-center transition hover:shadow-lg"
          >
            <div className="mb-4">
              <Image src={cat.icon} alt={cat.alt} width={72} height={72} />
            </div>
            <span className="text-base font-medium text-gray-900">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
  <MenuSection />
  <MenuGallerySection />
      <FindGaviSection />
    </>
  );
}

export default page;
