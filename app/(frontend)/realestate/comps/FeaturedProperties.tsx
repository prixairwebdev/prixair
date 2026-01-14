"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaTimes } from "react-icons/fa";
import { useState } from "react";

type Property = {
  id: number;
  title: string;
  location: string;
  image: string;
  beds: number;
  baths: number;
  sqft: number;
  price: string;
  description?: string;
  yearBuilt?: number;
  parking?: number;
};

type Category = {
  name: string;
  image: string;
};

const properties: Property[] = [
  {
    id: 1,
    title: "Lekki Phase 1, Lagos",
    location: "Lekki Phase 1, Lagos",
    image: "/featuredimg/property1.png",
    beds: 4,
    baths: 3,
    sqft: 2800,
    price: "₦85,000,000",
    description: "A luxurious modern apartment in the heart of Lekki Phase 1 with stunning views and premium amenities.",
    yearBuilt: 2022,
    parking: 2
  },
  {
    id: 2,
    title: "Gwarinpa, Abuja",
    location: "Gwarinpa, Abuja",
    image: "/featuredimg/property2.png",
    beds: 2,
    baths: 2,
    sqft: 1400,
    price: "₦42,500,000",
    description: "Cozy and comfortable apartment in the peaceful neighborhood of Gwarinpa, perfect for small families.",
    yearBuilt: 2020,
    parking: 1
  },
  {
    id: 3,
    title: "Banana Island, Ikoyi, Lagos",
    location: "Banana Island, Ikoyi, Lagos",
    image: "/featuredimg/property3.png",
    beds: 6,
    baths: 6,
    sqft: 5200,
    price: "₦350,000,000",
    description: "An exclusive luxury villa on Banana Island featuring state-of-the-art facilities and premium finishes.",
    yearBuilt: 2023,
    parking: 4
  },
];

const categories: Category[] = [
  { name: "Apartments", image: "/featuredimg/apartments.png" },
  { name: "Houses", image: "/featuredimg/houses.png" },
  { name: "Lands", image: "/featuredimg/lands.png" },
  { name: "Commercial", image: "/featuredimg/commercial.png" },
  { name: "Luxury", image: "/featuredimg/luxury.png" },
  { name: "Estates", image: "/featuredimg/estates.png" },
];

export default function FeaturedProperties() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  // Close modal when clicking outside content
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <section className="w-full bg-white py-16 px-6 md:px-16 lg:px-24">
      {/* Featured Properties */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Featured Properties
        </h2>
        <p className="text-gray-500 mt-2">
          Explore popular homes and apartments handpicked for you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <motion.div
            key={property.id}
            whileHover={{ scale: 1.02 }}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white"
          >
            <Image
              src={property.image}
              alt={property.title}
              width={500}
              height={300}
              className="w-full h-64 object-cover"
            />

            <div className="p-5">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <FaMapMarkerAlt className="text-[#FB6404] mr-2" />
                {property.location}
              </div>
              <h3 className="text-gray-900 font-semibold mb-3">{property.title}</h3>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span className="flex items-center space-x-1">
                  <FaBed /> <span>{property.beds} Beds</span>
                </span>
                <span className="flex items-center space-x-1">
                  <FaBath /> <span>{property.baths} Baths</span>
                </span>
                <span className="flex items-center space-x-1">
                  <FaRulerCombined /> <span>{property.sqft} sqft</span>
                </span>
              </div>

              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => openModal(property)}
                  className="bg-[#FB6404] hover:bg-[#e45c00] text-white text-sm px-4 py-2 rounded-sm transition-colors duration-200"
                >
                  View Details
                </button>
                <span className="font-semibold text-gray-900 text-sm">
                  {property.price}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Property Details Modal */}
      {isModalOpen && selectedProperty && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header with Close Button */}
            <div className="relative">
              <Image
                src={selectedProperty.image}
                alt={selectedProperty.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-80 object-cover rounded-t-lg"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-2 transition-colors duration-200 shadow-lg"
                aria-label="Close modal"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <FaMapMarkerAlt className="text-[#FB6404] mr-2" />
                {selectedProperty.location}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedProperty.title}
              </h2>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {selectedProperty.description}
              </p>

              {/* Property Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaBed className="w-6 h-6 text-[#FB6404] mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{selectedProperty.beds}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaBath className="w-6 h-6 text-[#FB6404] mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{selectedProperty.baths}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaRulerCombined className="w-6 h-6 text-[#FB6404] mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{selectedProperty.sqft} sqft</div>
                  <div className="text-sm text-gray-600">Area</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 text-[#FB6404] mx-auto mb-2 font-bold">P</div>
                  <div className="font-semibold text-gray-900">{selectedProperty.parking}</div>
                  <div className="text-sm text-gray-600">Parking</div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Year Built</span>
                    <span className="font-semibold text-gray-900">{selectedProperty.yearBuilt}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Property Type</span>
                    <span className="font-semibold text-gray-900">Residential</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Status</span>
                    <span className="font-semibold text-green-600">Available</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Furnishing</span>
                    <span className="font-semibold text-gray-900">Fully Furnished</span>
                  </div>
                </div>
              </div>

              {/* Price and Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <div className="text-2xl font-bold text-[#FB6404] mb-4 sm:mb-0">
                  {selectedProperty.price}
                </div>
                <div className="flex space-x-3">
                  <button className="px-6 py-3 border border-[#FB6404] text-[#FB6404] hover:bg-[#FB6404] hover:text-white rounded-sm transition-colors duration-200">
                    Schedule Tour
                  </button>
                  <button className="px-6 py-3 bg-[#FB6404] hover:bg-[#e45c00] text-white rounded-sm transition-colors duration-200">
                    Contact Agent
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Explore by Property Type */}
      <div className="text-center mt-20 mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Explore by Property Type
        </h2>
        <p className="text-gray-500 mt-2">
          Browse by property type to simplify your search.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="relative group cursor-pointer rounded-md overflow-hidden"
          >
            <Image
              src={cat.image}
              alt={cat.name}
              width={200}
              height={150}
              className="w-full h-36 object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 bg-opacity-40 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-300">
              <span className="text-white text-sm font-medium">{cat.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}