"use client";

import { FaCalendarAlt, FaUserFriends, FaBed } from "react-icons/fa";

export default function FindRoomBar() {
  return (
    <section className="bg-white shadow-md py-4 px-6 md:px-10 rounded-md w-full max-w-6xl mx-auto -mt-10 relative z-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-center">
        {/* Check-in Date */}
        <div className="flex flex-col">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
            <FaCalendarAlt className="text-gray-500" />
            Check-in Date
          </label>
          <select className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 focus:outline-none">
            <option>Select</option>
            <option>Oct 26, 2025</option>
            <option>Oct 27, 2025</option>
          </select>
        </div>

        {/* Check-out Date */}
        <div className="flex flex-col">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
            <FaCalendarAlt className="text-gray-500" />
            Check-out Date
          </label>
          <select className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 focus:outline-none">
            <option>Select</option>
            <option>Oct 27, 2025</option>
            <option>Oct 28, 2025</option>
          </select>
        </div>

        {/* Number of Guests */}
        <div className="flex flex-col">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
            <FaUserFriends className="text-gray-500" />
            No of Guests
          </label>
          <select className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 focus:outline-none">
            <option>Select</option>
            <option>1 Guest</option>
            <option>2 Guests</option>
            <option>3 Guests</option>
            <option>4+ Guests</option>
          </select>
        </div>

        {/* Room Type */}
        <div className="flex flex-col">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
            <FaBed className="text-gray-500" />
            Room Type
          </label>
          <select className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 focus:outline-none">
            <option>Select</option>
            <option>Standard</option>
            <option>Deluxe</option>
            <option>Suite</option>
          </select>
        </div>

        {/* Button */}
        <div className="flex justify-center md:justify-end items-end">
          <button className="bg-[#FB6404] hover:bg-[#E55A00] text-white font-semibold text-sm px-6 py-3 rounded transition-colors w-full md:w-auto">
            Find a Room
          </button>
        </div>
      </div>
    </section>
  );
}
