import Image from "next/image";
import Link from "next/link";
import WhatWeDo from "./comps/WhatWeDo";
import ProductsSection from "./comps/ProductsSection";
import FarmInAction from "./comps/FarmInAction";
import WhyChooseUs from "./comps/WhyChooseUs";
import Testimonials from "./comps/Testimonials";
import CTASection from "./comps/CTASection";

const Hero = () => {
  return (
     <>
    <section className="relative h-screen w-full">
      {/* Background Image */}
      <Image
        src="/farmbg.png" // Replace with your tractor image
        alt="Farm background"
        fill
        priority
        className="object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 bg-opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-start justify-center h-full px-6 text-white">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
          Growing Together, <br /> Feeding the Future
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          We produce fresh, organic crops and raise healthy livestock with sustainable methods.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/about"
            className="bg-green-500 px-6 py-3 rounded-md text-white font-medium hover:bg-green-600 transition"
          >
            Learn More
          </Link>
          <Link
            href="/contact"
            className="bg-white text-green-700 px-6 py-3 rounded-md font-medium hover:bg-green-100 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
    <WhatWeDo />
    <ProductsSection />
    <FarmInAction />
    <WhyChooseUs />
    <Testimonials />
    <CTASection />
   </>
  );
};

export default Hero;
