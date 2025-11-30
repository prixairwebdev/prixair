import React from "react";
import Navbar from "../Navbar";
import { WhyChooseUs } from "../comps/WhyChooseUs";
import { CtaSection } from "../comps/CtaSection";
import { Testimonials } from "../comps/Testimonials";
import Footer from "../Footer"
import AboutSection from "./AboutSection";
export default function LandingPage() {
  return (
    <div className="w-full h-screen relative">
      <Navbar />

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/oil&gasbg.png')", // replace with your image path
        }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6">
        <h1 className="text-white text-4xl md:text-6xl font-bold max-w-4xl">
Fueling Industries. Powering Progress.        </h1>
        <p className="text-white mt-4 max-w-2xl text-lg">
At Prixair Oil & Gas, we provide reliable energy solutions that keep businesses and communities moving forward.        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex gap-4">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3  font-semibold shadow-md">
            Explore Our Services
          </button>
        
        </div>
      </div>
     
      
   <AboutSection />
      <WhyChooseUs />
      <Testimonials />
      <CtaSection />
      <Footer />
    </div>
  );
}
