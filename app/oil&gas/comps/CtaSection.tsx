import Image from "next/image";

export function CtaSection() {
  return (
    <section className="relative h-full w-full mt-10 overflow-hidden">
      <Image
        src="/ctaoil&gas.png"
        alt="Energy infrastructure"
        fill
        className="object-cover"
        priority // Ensures above-the-fold images load quickly
        sizes="100vw" // Optimizes image loading for different viewport sizes
        quality={85} // Good balance between quality and performance
      />

      {/* Enhanced overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl lg:text-5xl text-white font-bold mb-4 md:mb-6">
            Let's Build the Future of Energy Together.
          </h2>

          <p className="text-gray-100 max-w-lg mx-auto text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
            Reach out to discuss bulk supply, logistics, or partnership opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <button className="px-8 py-3 bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-300 text-base font-medium shadow-lg hover:shadow-xl">
              Explore services
            </button>

            <button className="px-8 py-3 bg-white text-gray-900  shadow-lg hover:bg-gray-50 transition-colors duration-300 text-base font-medium border border-gray-200">
              Contact us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}