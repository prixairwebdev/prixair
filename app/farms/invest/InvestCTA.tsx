"use client";
import Image from "next/image";
import Link from "next/link";

const InvestCTA = () => {
  return (
    <section className="relative h-[70vh] flex items-center justify-center text-center text-white">
      {/* Background Image */}
      <Image
        src="/investbg.png"
        alt="Growing wealth background"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-3xl px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Ready to Grow Your Wealth?
        </h2>
        <p className="mb-8 text-lg">
          Join thousands of smart investors who are already earning steady
          returns. Start today — your future self will thank you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#"
            className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition"
          >
            Start Investing
          </Link>
          <Link
            href="#"
            className="bg-white text-green-700 px-6 py-3 rounded-md font-medium hover:bg-green-100 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InvestCTA;
