'use client';
import React from "react";
import { MapPin, Clock, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface BrandLocationProps {
  brandName: string;
  bgImage?: string;
  accentColor?: string;
  location?: string;
  openingHours?: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
}

const BrandLocation: React.FC<BrandLocationProps> = ({
  brandName,
  accentColor = "#F3A35C",
  location: locationProp,
  openingHours = {
    weekday: "8:00am - 8:00pm",
    saturday: "9:00am - 5:00pm",
    sunday: "Closed",
  }
}) => {
  const location = locationProp ?? "Plot 688, Markus Kangye Blvd, Off Oladipo Diya Way, Gaduwa, Abuja";

  const hours = [
    { label: "Mon – Fri", value: openingHours.weekday },
    { label: "Saturday", value: openingHours.saturday },
    { label: "Sunday", value: openingHours.sunday },
  ];

  return (
    <section className="bg-white py-24 px-6 border-t border-gray-100">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: accentColor }}>
            Find Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Visit <span style={{ color: accentColor }}>{brandName}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Address card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#fafaf8] border border-gray-100 rounded-2xl p-8"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
              style={{ backgroundColor: `${accentColor}20` }}
            >
              <MapPin className="w-5 h-5" style={{ color: accentColor }} />
            </div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Address</h3>
            <p className="text-gray-900 font-medium text-base leading-relaxed mb-6">{location}</p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold transition-all hover:opacity-70"
              style={{ color: accentColor }}
            >
              Open in Google Maps
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* Hours card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="bg-[#fafaf8] border border-gray-100 rounded-2xl p-8"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
              style={{ backgroundColor: `${accentColor}20` }}
            >
              <Clock className="w-5 h-5" style={{ color: accentColor }} />
            </div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Opening Hours</h3>
            <div className="space-y-4">
              {hours.map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <span className="text-sm text-gray-500 font-medium">{label}</span>
                  <span className={`text-sm font-bold ${value === 'Closed' ? 'text-gray-300' : 'text-gray-900'}`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BrandLocation;
