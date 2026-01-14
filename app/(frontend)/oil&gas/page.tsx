import React from "react";
import Navbar from "./Navbar";
import Ceo from "./comps/ceo";
import Features from "./comps/featuredprojects";
import { WhyChooseUs } from "./comps/WhyChooseUs";
import CoreServices from "./comps/CoreServices";
import { CtaSection } from "./comps/CtaSection";
import { Testimonials } from "./comps/Testimonials";
import Footer from "./Footer"

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
          Powering Progress Through Reliable Energy Solutions
        </h1>
        <p className="text-white mt-4 max-w-2xl text-lg">
          Delivering premium petroleum products and services that keep industries,
          businesses, and communities moving.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex gap-4">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3  font-semibold shadow-md">
            Explore Our Services
          </button>
          <button className="bg-white hover:bg-gray-100 text-black px-6 py-3  font-semibold shadow-md">
            Partner With Us
          </button>
        </div>
      </div>
      <Ceo />
      
      <CoreServices />
      <WhyChooseUs />
      <Features />
      <Testimonials />
      <CtaSection />
      <Footer />
    </div>
  );
}
