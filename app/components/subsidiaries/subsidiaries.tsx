"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

type Business = {
  name: string;
  href: string;
  imageUrl: string;
};

const businesses: Business[] = [
  {
    name: "Prixair Oil & Gas ",
    imageUrl: "/subsidiaries/oilandgas.png",
    href: "/oil&gas",
  },
  {
    name: "Prixair Mining",
    imageUrl: "/subsidiaries/mining.png",
    href: "/mining",
  },
  {
    name: "Prixair Resturants",
    imageUrl: "/subsidiaries/food.jpg",
    href: "/food",
  },
  {
    name: "Prixair Farms",
    imageUrl: "/subsidiaries/farm.png",
    href: "/farms",
  },
  {
    name: "Prixair Hotels",
    imageUrl: "/subsidiaries/hotel.png",
    href: "/hotel",
  },
  {
    name: "Prixair Supermarket",
    imageUrl: "/supermarket.jpg",
    href: "http://supermarket.prixair.net",
  },
  {
    name: "Prixair Pharmacy",
    imageUrl: "/subsidiaries/pharmacy.jpg",
    href: "/pharmacy",
  },
  {
    name: "Prixair Water",
    imageUrl: "/subsidiaries/water.png",
    href: "/water",
  },
  {
    name: "Prixair Properties",
    imageUrl: "/subsidiaries/properties.png",
    href: "/homes",
  },
  {
    name: "Prixair Transport & Logistics",
    imageUrl: "/subsidiaries/logistics.jpg",
    href: "/logistics",
  },
  {
    name: "Prixair Media",
    imageUrl: "/subsidiaries/media.jpg",
    href: "/media",
  },
  {
    name: "Prixair Home",
    imageUrl: "/subsidiaries/prixairhome.jpg",
    href: "/homes",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function BusinessGrid() {
  const [showAll, setShowAll] = useState(false);
  const initialBusinesses = businesses.slice(0, 9);
  const remainingBusinesses = businesses.slice(9);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <section className="p-8 bg-white" id="subsidiaries">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
      >
        {initialBusinesses.map((business) => (
          <motion.div key={business.name} variants={item}>
            <Link href={business.href}>
              <div className="relative group h-64 rounded overflow-hidden shadow-lg cursor-pointer">
                <Image
                  src={business.imageUrl}
                  alt={business.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300" />
                <div className="absolute bottom-4 left-4 text-white z-10">
                  <h3 className="text-lg font-semibold">{business.name}</h3>
                  <p className="text-sm mt-1 flex items-center gap-1">
                    See More <span>→</span>
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

        {showAll &&
          remainingBusinesses.map((business) => (
            <motion.div
              key={business.name}
              variants={item}
              initial="hidden"
              animate="visible"
            >
              <Link href={business.href}>
                <div className="relative group h-64 rounded overflow-hidden shadow-lg cursor-pointer">
                  <Image
                    src={business.imageUrl}
                    alt={business.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300" />
                  <div className="absolute bottom-4 left-4 text-white z-10">
                    <h3 className="text-lg font-semibold">{business.name}</h3>
                    <p className="text-sm mt-1 flex items-center gap-1">
                      See More <span>→</span>
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
      </motion.div>

      {businesses.length > 9 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={toggleShowAll}
            className="px-6 py-3 self-end text-4xl text-orange-400 rounded-lg  transition-colors duration-300"
          >
            {showAll ? (
              <span className="material-symbols-outlined">
                keyboard_arrow_up
              </span>
            ) : (
              <span className="material-symbols-outlined">
                keyboard_arrow_down
              </span>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
