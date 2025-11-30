import Image from "next/image";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="relative h-[70vh] flex items-center justify-center text-center text-white">
      {/* Background Image */}
      <Image
        src="/images/cta-bg.png"
        alt="Farmer smiling"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40 bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6">
        <h2 className="text-4xl font-bold mb-4">
          From Farm to Table — Naturally.
        </h2>
        <p className="text-lg mb-8">
          Ready to enjoy real, farm-fresh goodness? Whether you’re a home cook, business, or bulk buyer — our farm is your trusted source for natural produce.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
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
  );
};

export default CTASection;
