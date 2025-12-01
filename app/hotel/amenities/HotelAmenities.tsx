"use client";

import { motion } from "framer-motion";
import {
  FaBed,
  FaSnowflake,
  FaBath,
  FaTv,
  FaChargingStation,
  FaBroom,
  FaUtensils,
  FaCoffee,
  FaGlassMartiniAlt,
  FaConciergeBell,
  FaLeaf,
  FaWineBottle,
  FaSwimmingPool,
  FaDumbbell,
  FaSpa,
  FaSun,
  FaOm,
  FaTableTennis,
  FaClock,
  FaParking,
  FaWifi,
  FaTshirt,
  FaShuttleVan,
  FaHeadset,
} from "react-icons/fa";

export default function HotelAmenities() {
  const sections = [
    {
      title: "Room Comfort",
      items: [
        { icon: <FaBed size={24} />, title: "Luxury Bedding", text: "Sleep soundly on ultra-soft beds" },
        { icon: <FaSnowflake size={24} />, title: "Climate Control", text: "Room temperature adjustable" },
        { icon: <FaBath size={24} />, title: "Modern Bathrooms", text: "Clean, stylish with premium amenities" },
        { icon: <FaTv size={24} />, title: "Smart Entertainment", text: "Enjoy Netflix, YouTube & more" },
        { icon: <FaChargingStation size={24} />, title: "Charging Ports", text: "Easily charge all your devices" },
        { icon: <FaBroom size={24} />, title: "Daily Housekeeping", text: "A tidy room, every single day" },
      ],
    },
    {
      title: "Dining & Refreshments",
      items: [
        { icon: <FaUtensils size={24} />, title: "Restaurant On-site", text: "Local & international cuisine" },
        { icon: <FaCoffee size={24} />, title: "Complimentary Breakfast", text: "Start your day right" },
        { icon: <FaGlassMartiniAlt size={24} />, title: "Rooftop Bar & Lounge", text: "Chill with a view" },
        { icon: <FaConciergeBell size={24} />, title: "24/7 Room Service", text: "Meals whenever you want" },
        { icon: <FaLeaf size={24} />, title: "Diet Options", text: "Vegetarian, Vegan, Halal & more" },
        { icon: <FaWineBottle size={24} />, title: "Mini Fridge", text: "Keep your drinks cool anytime" },
      ],
    },
    {
      title: "Wellness & Leisure",
      items: [
        { icon: <FaSwimmingPool size={24} />, title: "Swimming Pool", text: "Dive into refreshing leisure" },
        { icon: <FaDumbbell size={24} />, title: "Fitness Centre", text: "Stay fit on your own schedule" },
        { icon: <FaSpa size={24} />, title: "Spa & Massage", text: "Rejuvenate your body and mind" },
        { icon: <FaSun size={24} />, title: "Terrace Lounge", text: "Perfect for sunrise or sunset vibes" },
        { icon: <FaOm size={24} />, title: "Yoga Area", text: "Calm space for stretching & breathing" },
        { icon: <FaTableTennis size={24} />, title: "Indoor Games", text: "Fun for friends and family" },
      ],
    },
    {
      title: "Guest Services & Connectivity",
      items: [
        { icon: <FaClock size={24} />, title: "24/7 Front Desk", text: "Always available, always helpful" },
        { icon: <FaParking size={24} />, title: "Free Parking", text: "Safe, secure and free for all guests" },
        { icon: <FaWifi size={24} />, title: "Free Wi-Fi", text: "High-speed internet everywhere" },
        { icon: <FaTshirt size={24} />, title: "Laundry Services", text: "Stay fresh throughout your trip" },
        { icon: <FaShuttleVan size={24} />, title: "Shuttle Available", text: "Easy transport within town" },
        { icon: <FaHeadset size={24} />, title: "Concierge Support", text: "From bookings to local tips" },
      ],
    },
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-16 text-gray-800">
      {sections.map((section, i) => (
        <motion.div
          key={i}
          className="mb-16 last:mb-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        >
          <h2 className="text-center text-2xl md:text-3xl font-serif font-semibold mb-10">
            {section.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {section.items.map((item, j) => (
              <motion.div
                key={j}
                className="border rounded-lg text-center p-6 hover:shadow-md transition flex flex-col items-center justify-center space-y-2"
                whileHover={{ scale: 1.03 }}
              >
                <div className="text-[#5A2E0C]">{item.icon}</div>
                <h3 className="font-medium text-gray-900 text-sm md:text-base">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </section>
  );
}
