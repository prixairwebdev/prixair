import Image from "next/image";
import Link from "next/link";
import ContactSection from "./ContactSection";



const Hero = () => {
  return (
     <>
    <section className="relative h-screen w-full">
      {/* Background Image */}
      <Image
        src="/productbg.png" // Replace with your tractor image
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
         Let’s Connect With Nature — And With You!
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
         We’re happy to answer your questions, take your orders, or simply chat about farm-fresh goodness.
        </p>
     
      </div>
    </section>
  
  <ContactSection />
   </>
  );
};

export default Hero;
