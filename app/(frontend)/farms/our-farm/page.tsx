import Image from "next/image";
import Link from "next/link";
import AboutSection from "./AboutSection";
import CoreValuesSection from "./CoreValuesSection";
import FarmInAction from "./FarmInAction";
import CTASection from "./CTASection";


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
          Rooted in Nature. Grown with Purpose.
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
Our farm isn’t just land — it’s a living ecosystem built on passion, sustainability, and community. Discover where your food truly comes from.        </p>
        <div className="flex flex-wrap gap-4">
        
          <Link
            href="/contact"
            className="bg-white text-green-700 px-6 py-3 rounded-md font-medium hover:bg-green-100 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
    <AboutSection />
    <CoreValuesSection />
    <FarmInAction />
    <CTASection />


   </>
  );
};

export default Hero;
