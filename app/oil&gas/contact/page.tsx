import React from "react";
import Navbar from "../Navbar";
import { CtaSection } from "../comps/CtaSection";
import Footer from "../Footer";
import ContactSection from "./ContactSection";

export default function LandingPage() {
  return (
    <div className="w-full h-screen relative">
      <Navbar />

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/oil&gasbg.png')", // replace with your image path
        }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6">
        <h1 className="text-white text-4xl md:text-6xl font-bold max-w-4xl">
          Fueling Industries. Powering Progress.
        </h1>
        <p className="text-white mt-4 max-w-2xl text-lg">
          At Prixair Oil & Gas, we provide reliable energy solutions that keep businesses and communities moving forward.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex gap-4">
          {/* Add your CTA buttons here */}
        </div>
      </div>
      <ContactSection />    
      <CtaSection />
      <Footer />
    </div>
  );
}