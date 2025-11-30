"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

const statesAndLgas: Record<string, string[]> = {
  Lagos: ["Ikeja", "Lekki", "Surulere", "Yaba", "Ajah"],
  Abuja: ["Gwarinpa", "Maitama", "Wuse", "Garki"],
  Rivers: ["Port Harcourt", "Obio-Akpor", "Eleme", "Okrika"],
  Kaduna: ["Kaduna North", "Kaduna South", "Zaria", "Sabon Gari"],
  Kano: ["Nassarawa", "Fagge", "Gwale", "Dala"],
};

export default function RestaurantLocator() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedLga, setSelectedLga] = useState("");

  const handleSubmit = () => {
    if (!selectedState || !selectedLga) return;

    const query = `Prixair Buka, ${selectedLga}, ${selectedState}, Nigeria`;
    const encodedQuery = encodeURIComponent(query);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedQuery}`, "_blank");
  };

  return (
    <section className="py-12 px-4 bg-white text-center">
      <h2 className="text-xl sm:text-2xl font-semibold mb-2">
        Discover Our Restaurants Across Nigeria
      </h2>
      <p className="text-sm sm:text-lg sm:w-[50%] mx-auto text-gray-500 mb-4">
        Locate the nearest Prixair Buka with ease. We&rsquo;re just a few clicks away—serving you quality, nationwide.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 max-w-2xl mx-auto bg-white shadow-md p-4 rounded-md">
        {/* State Select */}
        <div className="relative w-full sm:w-60">
          <select
            className="w-full appearance-none border px-4 py-2 rounded bg-white text-gray-700 focus:outline-none"
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedLga("");
            }}
          >
            <option value="">State</option>
            {Object.keys(statesAndLgas).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-2.5 text-gray-500 pointer-events-none" size={18} />
        </div>

        {/* LGA Select */}
        <div className="relative w-full sm:w-60">
          <select
            className="w-full appearance-none border px-4 py-2 rounded bg-white text-gray-700 focus:outline-none"
            value={selectedLga}
            onChange={(e) => setSelectedLga(e.target.value)}
            disabled={!selectedState}
          >
            <option value="">LGA</option>
            {selectedState &&
              statesAndLgas[selectedState].map((lga) => (
                <option key={lga} value={lga}>
                  {lga}
                </option>
              ))}
          </select>
          <ChevronDown className="absolute right-3 top-2.5 text-gray-500 pointer-events-none" size={18} />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white p-3 rounded-md flex justify-center items-center"
        >
          <Search size={20} />
        </button>
      </div>
    </section>
  );
}