"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Business = {
  name: string;
  href: string;
  imageUrl: string;
};

const businesses: Business[] = [
  {
    name: "Prixair Oil & Gas ",
    imageUrl: "/subsidiaries/oilandgas.png",
    href: "http://oilandgas.prixair.net",
  },
  {
    name: "Prixair Mining",
    imageUrl: "/subsidiaries/mining.png",
    href: "https://resources.prixair.net/",
  },
  {
    name: "Prixair Resturants",
    imageUrl: "/subsidiaries/food.jpg",
    href: "/food",
  },
  {
    name: "Prixair Farms",
    imageUrl: "/subsidiaries/farm.png",
    href: "http://farms.prixair.net",
  },
  {
    name: "Prixair Hotels",
    imageUrl: "/subsidiaries/hotel.png",
    href: "http://hotel.prixair.net",
  },
  {
    name: "Prixair Supermarket",
    imageUrl: "/supermarket.jpg",
    href: "http://supermarket.prixair.net",
  },
  {
    name: "Prixair Pharmacy",
    imageUrl: "/subsidiaries/pharmacy.jpg",
    href: "http://pharmacy.prixair.net",
  },
  {
    name: "Prixair Water",
    imageUrl: "/subsidiaries/water.png",
    href: "http://water.prixair.net",
  },
  {
    name: "Prixair Properties",
    imageUrl: "/subsidiaries/properties.png",
    href: "http://properties.prixair.net",
  },
  {
    name: "Prixair Transport & Logistics",
    imageUrl: "/subsidiaries/logistics.jpg",
    href: "http://logistics.prixair.net",
  },
  {
    name: "Prixair Media",
    imageUrl: "/subsidiaries/media.jpg",
    href: "/subsidiaries/#subsidiaries",
  },
  {
    name: "Prixair Home",
    imageUrl: "/subsidiaries/prixairhome.jpg",
    href: "/subsidiaries/#subsidiaries",
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
  return (
    <section className="p-8 bg-white" id="subsidiaries">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
      >
        {businesses.map((business) => (
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
      </motion.div>
    </section>
  );
}