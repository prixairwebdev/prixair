"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const LocationSearch = () => {
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", { state, lga });
    // Replace this with your search or filter logic
  };

  return (
    <div className="flex justify-center items-center py-10 bg-white">
      <div className="flex shadow-md rounded-md overflow-hidden w-full max-w-3xl">
        {/* State Select */}
        <div className="flex flex-col flex-1 border-r border-gray-200 px-4 py-3 bg-white">
          <label className="text-sm font-semibold mb-1">State</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="text-gray-700 text-sm focus:outline-none bg-transparent"
          >
            <option value="">Select</option>
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
            <option value="Kano">Kano</option>
            <option value="Rivers">Rivers</option>
          </select>
        </div>

        {/* LGA Select */}
        <div className="flex flex-col flex-1 border-r border-gray-200 px-4 py-3 bg-white">
          <label className="text-sm font-semibold mb-1">LGA</label>
          <select
            value={lga}
            onChange={(e) => setLga(e.target.value)}
            className="text-gray-700 text-sm focus:outline-none bg-transparent"
          >
            <option value="">Select</option>
            <option value="Maitama">Maitama</option>
            <option value="Wuse">Wuse</option>
            <option value="Garki">Garki</option>
          </select>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center px-6 transition-colors"
        >
          <FiSearch size={20} />
        </button>
      </div>
    </div>
  );
};

export default LocationSearch;
