"use client";

import Subsidiares from "../components/subsidiaries/subsidiaries";

export default function SubsidiariesSection() {
  return (
    <section
      className="py-12 relative sm:py-16 lg:py-20 bg-white text-center text-black px-4 sm:px-6 lg:px-8 xl:px-28"
      aria-labelledby="subsidiaries-heading"
    >
      <div className="w-full">
        <h2
          id="subsidiaries-heading"
          className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 uppercase tracking-tight"
        >
          Our Subsidiaries
        </h2>
        <p className="max-w-3xl mx-auto text-gray-600 text-sm sm:text-base mb-8 sm:mb-12 px-2 sm:px-0">
          Prixair Group operates through a portfolio of dynamic subsidiaries,
          each driving excellence in its sector—from real estate to hospitality,
          creative media, catering, and water production.
        </p>

        <Subsidiares />

        <a
          href="/subsidiaries"
          className="mt-8 sm:mt-10 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 text-sm sm:text-base transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          aria-label="View all Prixair Group subsidiaries"
        >
          SEE ALL
        </a>
      </div>
    </section>
  );
}
