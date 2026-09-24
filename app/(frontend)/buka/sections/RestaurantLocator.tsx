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
    <section className="px-5 md:px-10 pb-20 md:pb-28 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto rounded-[2rem] bg-[#faf7f2] px-6 py-12 sm:px-12 sm:py-16 text-center">
        <p className="text-sm font-semibold text-[#FE0000] mb-2">Locate us</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Find a Prixair Buka near you</h2>
        <p className="mt-3 text-gray-500 max-w-xl mx-auto">
          Choose your state and area and we&rsquo;ll show you the closest Buka on the map.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-stretch gap-3 max-w-2xl mx-auto bg-white p-2 rounded-2xl sm:rounded-full shadow-[0_10px_30px_-15px_rgba(0,0,0,0.25)]">
          <div className="relative flex-1">
            <select
              aria-label="State"
              className="w-full h-12 appearance-none pl-5 pr-10 rounded-full bg-transparent text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#FE0000]/30"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedLga("");
              }}
            >
              <option value="">Select state</option>
              {Object.keys(statesAndLgas).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          </div>

          <div className="hidden sm:block w-px bg-gray-200 my-2" />

          <div className="relative flex-1">
            <select
              aria-label="Area"
              className="w-full h-12 appearance-none pl-5 pr-10 rounded-full bg-transparent text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#FE0000]/30 disabled:text-gray-400"
              value={selectedLga}
              onChange={(e) => setSelectedLga(e.target.value)}
              disabled={!selectedState}
            >
              <option value="">Select area</option>
              {selectedState &&
                statesAndLgas[selectedState].map((lga) => (
                  <option key={lga} value={lga}>
                    {lga}
                  </option>
                ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedState || !selectedLga}
            className="h-12 px-6 rounded-full bg-[#FE0000] hover:bg-[#D90000] disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Search size={18} />
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
