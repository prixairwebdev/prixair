import Image from "next/image";

export default function HeroFindHome() {
  return (
    <section className="relative w-full h-[65vh] flex items-center justify-center text-center">
      {/* Background Image */}
      <Image
        src="/herofindhomes.png" // replace with your actual image path
        alt="Modern house background"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl px-4">
        <h1 className="text-3xl md:text-5xl font-semibold text-white mb-4">
          Ready to Find Your Next Home?
        </h1>
        <p className="text-gray-200 text-base md:text-lg mb-8">
          Discover properties that match your lifestyle. Whether you’re buying,
          renting, or investing — we’re here to guide you every step of the way.
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded transition font-medium">
          Start Your Search
        </button>
      </div>
    </section>
  );
}
