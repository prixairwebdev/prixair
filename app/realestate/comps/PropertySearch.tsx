"use client";

export default function PropertySearch() {
  return (
    <div className="absolute z-20 left-1/2 -bottom-18 transform -translate-x-1/2 bg-white shadow-xl rounded-lg px-6 py-8 w-[80%] sm:w-[50%]  flex flex-col md:flex-row items-center gap-4 md:gap-2 justify-between">
      <div className="flex flex-col md:flex-row w-full gap-4 md:gap-2">
        <select className="border rounded-md px-4 py-2 w-full md:w-1/3 text-gray-700">
          <option>Location</option>
          <option>Abuja</option>
          <option>Lagos</option>
          <option>Port Harcourt</option>
        </select>

        <select className="border rounded-md px-4 py-2 w-full md:w-1/3 text-gray-700">
          <option>Property Type</option>
          <option>Apartment</option>
          <option>Villa</option>
          <option>Office</option>
        </select>

        <select className="border rounded-md px-4 py-2 w-full md:w-1/3 text-gray-700">
          <option>Price Range</option>
          <option>$500 - $1000</option>
          <option>$1000 - $5000</option>
        </select>
      </div>
      <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-md w-full md:w-auto">
        Search Now
      </button>
    </div>
  );
}
