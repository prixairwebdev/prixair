"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Wifi, UtensilsCrossed, Car, Dumbbell, UserCheck, Sparkles, BedDouble } from "lucide-react";
import { HotelData, HotelRoom } from "@/app/actions/hotel";
import Link from "next/link";

interface HotelShowcaseProps {
  hotel: HotelData | null;
  featuredRooms: HotelRoom[];
}

function buildWhatsAppMessage(room: HotelRoom): string {
  return [
    `Hello, I'd like to book a room at ${room.hotel.name}.`,
    "",
    `Room: ${room.name}`,
    `Type: ${room.roomType.charAt(0).toUpperCase() + room.roomType.slice(1)}`,
    `Price: ₦${room.pricePerNight.toLocaleString()} / night`,
    `Location: ${room.hotel.location}`,
    "",
    "Please let me know availability and next steps.",
  ].join("\n");
}

const defaultAmenities = [
  { amenity: "Spa & Wellness" },
  { amenity: "Fitness Centre" },
  { amenity: "Free Parking" },
  { amenity: "Concierge" },
  { amenity: "Restaurant" },
  { amenity: "Free Wi-Fi" },
];

const amenityIconMap: Record<string, React.ReactNode> = {
  spa: <Sparkles className="w-6 h-6" strokeWidth={1.5} />,
  wellness: <Sparkles className="w-6 h-6" strokeWidth={1.5} />,
  gym: <Dumbbell className="w-6 h-6" strokeWidth={1.5} />,
  fitness: <Dumbbell className="w-6 h-6" strokeWidth={1.5} />,
  parking: <Car className="w-6 h-6" strokeWidth={1.5} />,
  concierge: <UserCheck className="w-6 h-6" strokeWidth={1.5} />,
  meal: <UtensilsCrossed className="w-6 h-6" strokeWidth={1.5} />,
  restaurant: <UtensilsCrossed className="w-6 h-6" strokeWidth={1.5} />,
  wifi: <Wifi className="w-6 h-6" strokeWidth={1.5} />,
  wi: <Wifi className="w-6 h-6" strokeWidth={1.5} />,
};

function getAmenityIcon(name: string) {
  const lower = name.toLowerCase();
  const key = Object.keys(amenityIconMap).find((k) => lower.includes(k));
  return key ? amenityIconMap[key] : <BedDouble className="w-6 h-6" strokeWidth={1.5} />;
}

export default function HotelShowcase({ hotel, featuredRooms }: HotelShowcaseProps) {
  const amenities = (hotel?.amenities && hotel.amenities.length > 0 ? hotel.amenities : defaultAmenities).slice(0, 6);

  return (
    <div className="bg-white text-gray-800">
      {/* Rooms & Suites */}
      <section className="py-24 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Accommodations</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">Rooms & Suites</h2>
            <p className="mt-3 text-gray-500 max-w-lg">
              Curated comfort for every traveller — from elegant standard rooms to indulgent luxury suites.
            </p>
          </motion.div>

          {featuredRooms.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {featuredRooms.map((room, i) => {
                const whatsappNumber = room.hotel.whatsappNumber?.replace(/[^\d]/g, "") || "";
                const message = buildWhatsAppMessage(room);
                const whatsappUrl = whatsappNumber
                  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
                  : "#";

                return (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ delay: i * 0.12, duration: 0.6 }}
                    whileHover={{ y: -6 }}
                    className="border-t-2 border-gray-200 hover:border-gray-900 transition-all duration-300 group flex flex-col"
                  >
                    <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
                      {room.image?.url ? (
                        <Image
                          src={room.image.url}
                          alt={room.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BedDouble className="text-gray-300 w-12 h-12" strokeWidth={1} />
                        </div>
                      )}
                    </div>

                    <div className="pt-5 pb-6 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-base font-bold text-gray-900">{room.name}</h3>
                        <span className="text-xs text-gray-400 whitespace-nowrap mt-0.5">
                          {room.rating.toFixed(1)} / 5
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-1 capitalize">{room.roomType} room</p>
                      <p className="text-sm font-semibold text-gray-900 mb-6">
                        ₦{room.pricePerNight.toLocaleString()}<span className="text-gray-400 font-normal"> / night</span>
                      </p>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-auto px-5 py-3 text-sm font-semibold transition-colors w-fit ${
                          whatsappNumber
                            ? "bg-gray-900 text-white hover:bg-gray-700"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none"
                        }`}
                      >
                        Inquire
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center border-t border-gray-100">
              <p className="text-gray-400 text-sm">No rooms currently available. Please check back soon.</p>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12"
          >
            <Link
              href="/hotel/rooms"
              className="inline-block px-6 py-3 border border-gray-900 text-gray-900 text-sm font-semibold hover:bg-gray-900 hover:text-white transition-colors"
            >
              View All Rooms
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-24 bg-gray-50 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">On-Site</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">Amenities & Services</h2>
            <p className="mt-3 text-gray-500 max-w-lg">
              Full-service facilities designed for relaxation, business, and every moment in between.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {amenities.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-gray-100 hover:border-gray-300 transition-all duration-300 p-6 flex flex-col items-center gap-3 text-center group"
              >
                <div className="text-gray-400 group-hover:text-gray-900 transition-colors duration-300">
                  {getAmenityIcon(item.amenity)}
                </div>
                <p className="text-xs font-medium text-gray-600 leading-snug">{item.amenity}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Legacy */}
      <section className="py-24 px-6 md:px-14">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Our Story</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {hotel?.name || "A Legacy of Warmth & Welcome"}
            </h2>
            <p className="mt-5 text-gray-500 leading-relaxed">
              {hotel?.description ||
                "Nestled in the heart of the city, Prixair Hotel was founded with one mission: to make every stay feel unforgettable. Whether you're here for business or leisure, our team is dedicated to delivering exceptional comfort, service, and local charm."}
            </p>

            <div className="mt-10 flex gap-12">
              {[
                { value: hotel?.starRating?.toString() || "4.8", label: "Guest Rating" },
                { value: "10+", label: "Years Experience" },
                { value: "24/7", label: "Guest Support" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-1 tracking-wide">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-72 md:h-96 overflow-hidden"
          >
            {hotel?.image?.url ? (
              <Image
                src={hotel.image.url}
                alt={hotel.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <BedDouble className="w-16 h-16 text-gray-300" strokeWidth={1} />
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
