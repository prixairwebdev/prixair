"use client";

import { FaCalendarAlt, FaUserFriends, FaBed, FaMapMarkerAlt, FaHotel } from "react-icons/fa";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HotelData } from "@/app/actions/hotel";

export default function FindRoomBar({ hotels = [] }: { hotels?: HotelData[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize state from URL params if they exist
  const [hotelSlug, setHotelSlug] = useState(searchParams.get("hotel") || "");
  const [guests, setGuests] = useState(searchParams.get("guests") || "");
  const [roomType, setRoomType] = useState(searchParams.get("type") || "");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (hotelSlug) params.set("hotel", hotelSlug);
    if (guests) params.set("guests", guests);
    if (roomType && roomType !== "Select") params.set("type", roomType.toLowerCase());

    router.push(`/hotel/rooms?${params.toString()}`);
  };

  return (
    <section className="bg-white shadow-md py-4 px-6 md:px-10 rounded-md w-full max-w-6xl mx-auto -mt-10 relative z-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 items-center">
        {/* Hotel Filter */}
        <div className="flex flex-col">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
            <FaHotel className="text-gray-500" />
            Hotel
          </label>
          <select 
            value={hotelSlug}
            onChange={(e) => setHotelSlug(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 focus:outline-none"
          >
            <option value="">All Hotels</option>
            {hotels.map((h) => (
              <option key={h.id} value={h.slug}>
                {h.name}
              </option>
            ))}
          </select>
        </div>

        {/* Check-in Date - Simplified for now */}
        <div className="flex flex-col">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
            <FaCalendarAlt className="text-gray-500" />
            Check-in Date
          </label>
          <input 
            type="date"
            className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 focus:outline-none"
          />
        </div>

        {/* Check-out Date */}
        <div className="flex flex-col">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
            <FaCalendarAlt className="text-gray-500" />
            Check-out Date
          </label>
          <input 
            type="date"
            className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 focus:outline-none"
          />
        </div>

        {/* Number of Guests */}
        <div className="flex flex-col">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
            <FaUserFriends className="text-gray-500" />
            No of Guests
          </label>
          <select 
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 focus:outline-none"
          >
            <option value="">Select</option>
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4+ Guests</option>
          </select>
        </div>

        {/* Room Type */}
        <div className="flex flex-col">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
            <FaBed className="text-gray-500" />
            Room Type
          </label>
          <select 
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 focus:outline-none"
          >
            <option value="">Select</option>
            <option value="standard">Standard</option>
            <option value="executive">Executive</option>
            <option value="deluxe">Deluxe</option>
            <option value="suite">Suite</option>
            <option value="business">Business</option>
            <option value="presidential">Presidential</option>
          </select>
        </div>

        {/* Button */}
        <div className="flex justify-center md:justify-end items-end">
          <button 
            onClick={handleSearch}
            className="bg-[#FB6404] hover:bg-[#E55A00] text-white font-semibold text-sm px-6 py-3 rounded transition-colors w-full md:w-auto"
          >
            Find a Room
          </button>
        </div>
      </div>
    </section>
  );
}
