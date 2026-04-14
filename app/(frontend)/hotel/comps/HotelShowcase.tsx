"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaStar, FaWifi, FaUtensils, FaCar, FaDumbbell, FaUserTie, FaSpa, FaBed, FaWhatsapp } from "react-icons/fa";
import { HotelData, HotelRoom } from "@/app/actions/hotel";
import Link from "next/link";

interface HotelShowcaseProps {
  hotel: HotelData | null;
  featuredRooms: HotelRoom[];
}

function buildWhatsAppMessage(room: HotelRoom): string {
  return [
    `Hello, I'd like to book a room at ${room.hotel.name}.`,
    '',
    `Room: ${room.name}`,
    `Type: ${room.roomType.charAt(0).toUpperCase() + room.roomType.slice(1)}`,
    `Price: ₦${room.pricePerNight.toLocaleString()} / night`,
    `Location: ${room.hotel.location}`,
    '',
    'Please let me know availability and next steps.',
  ].join('\n');
}

export default function HotelShowcase({ hotel, featuredRooms }: HotelShowcaseProps) {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-20 space-y-24 bg-white text-gray-800">
      
      {/* ====== ROOMS & SUITES ====== */}
      <div className="text-center">
        <motion.h2
          className="text-2xl md:text-3xl font-serif font-semibold mb-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Explore Our Rooms & Suites
        </motion.h2>
        <p className="text-gray-600 mb-10">
          Curated comfort for every type of traveler — from elegant standard rooms to indulgent luxury suites.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredRooms.length > 0 ? (
            featuredRooms.map((room, i) => {
              const whatsappNumber = room.hotel.whatsappNumber?.replace(/[^\d]/g, '') || '';
              const message = buildWhatsAppMessage(room);
              const whatsappUrl = whatsappNumber
                ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
                : '#';

              return (
                <motion.div
                  key={room.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                >
                  <div className="relative h-56 w-full bg-gray-100">
                    {room.image?.url ? (
                      <Image
                        src={room.image.url}
                        alt={room.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaBed className="text-gray-300 text-5xl" />
                      </div>
                    )}
                  </div>
                  <div className="p-5 text-left flex flex-col flex-1">
                    <h3 className="text-lg font-semibold">{room.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">From ₦{room.pricePerNight.toLocaleString()}/night</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center text-orange-500">
                        <FaStar className="mr-1" /> {room.rating.toFixed(1)}
                      </div>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors ${
                          whatsappNumber
                            ? 'bg-[#FB6404] hover:bg-[#E55A00] text-white'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
                        }`}
                      >
                        <FaWhatsapp />
                        Book Now
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-3 py-10 text-center">
              <p className="text-gray-500 italic">No rooms currently available. Please check back later or view all rooms.</p>
            </div>
          )}
        </div>

        <Link href="/hotel/rooms" className="inline-block mt-10 bg-[#FB6404] hover:bg-[#E55A00] text-white px-6 py-2 rounded-md">
          See More
        </Link>
      </div>

      {/* ====== AMENITIES ====== */}
      <div className="text-center bg-gray-50 py-16 rounded-lg">
        <motion.h2
          className="text-2xl md:text-3xl font-serif font-semibold mb-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hotel Amenities & Guest Services
        </motion.h2>
        <p className="text-gray-600 mb-10">
          Enjoy full-service facilities tailored for business, leisure, and relaxation.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 justify-center max-w-5xl mx-auto px-4">
          {(hotel?.amenities && hotel.amenities.length > 0 ? hotel.amenities : [
            { amenity: "Spa & Wellness" },
            { amenity: "Gym" },
            { amenity: "Free Parking" },
            { amenity: "Concierge Services" },
            { amenity: "Complimentary Meals" },
            { amenity: "Free WIFI" },
          ]).slice(0, 6).map((amenityObj, i) => {
            const iconMap: Record<string, JSX.Element> = {
              "spa": <FaSpa size={30} />,
              "gym": <FaDumbbell size={30} />,
              "fitness": <FaDumbbell size={30} />,
              "parking": <FaCar size={30} />,
              "concierge": <FaUserTie size={30} />,
              "meal": <FaUtensils size={30} />,
              "restaurant": <FaUtensils size={30} />,
              "wifi": <FaWifi size={30} />,
              "pool": <FaBed size={30} />, // Fallback icon
            };
            
            const lowerAmenity = amenityObj.amenity.toLowerCase();
            const iconKey = Object.keys(iconMap).find(key => lowerAmenity.includes(key)) || "pool";
            const icon = iconMap[iconKey];

            return (
              <motion.div
                key={i}
                className="flex flex-col items-center justify-center bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="text-[#FB6404] mb-2">{icon}</div>
                <p className="text-sm font-medium text-center">{amenityObj.amenity}</p>
              </motion.div>
            );
          })}
        </div>

        <button className="mt-10 bg-[#FB6404] hover:bg-[#E55A00] text-white px-6 py-2 rounded-md">
          Browse Amenities
        </button>
      </div>

      {/* ====== LEGACY & ABOUT ====== */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-[#FB6404] font-semibold mb-3 font-serif">
            {hotel?.name || 'A Legacy of Warmth & Welcome'}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            {hotel?.description || "Nestled in the heart of the city, Prixair Hotel was founded with one mission: to make every stay feel unforgettable. Whether you’re here for business or leisure, our team is dedicated to delivering exceptional comfort, service, and local charm."}
          </p>

          <div className="flex gap-10 text-sm">
            <div>
              <h4 className="text-xl font-bold text-gray-900">{hotel?.starRating || '4.8'}</h4>
              <p className="text-gray-500">Rating</p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900">10+ years</h4>
              <p className="text-gray-500">Experience</p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900">24/7</h4>
              <p className="text-gray-500">Support</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative w-full h-64 md:h-80 bg-gray-200 flex items-center justify-center text-gray-500 text-sm rounded-lg overflow-hidden shadow-md"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {hotel?.image?.url ? (
            <Image src={hotel.image.url} alt={hotel.name} fill className="object-cover" />
          ) : (
            "Hotel image"
          )}
        </motion.div>
      </div>
    </section>
  );
}
