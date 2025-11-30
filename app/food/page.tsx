"use client"
import FoodCard from "../components/FoodCard";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";

const foods = [
  {
    name: "Prixair Buka",
    imageUrl: "/logos/buka.png",
    href: "/buka",
  },
  {
    name: "Toast Pan",
    imageUrl: "/logos/toastpan.png",
    href: "/toastpan",
  },
  {
    name: "Gavi Confectionery",
    imageUrl: "/logos/gavi.png",
    href: "/gavi",
  },
  {
    name: "Seaside Restaurant",
    imageUrl: "/logos/seaside.png",
    href: "#",
  },
  {
    name: "Noodlel!cious",
    imageUrl: "/logos/noodlel.png",
    href: "#",
  },
  {
    name: "Prixair Waters",
    imageUrl: "/logos/prixairwaters.png",
    href: "/water",
  },
  {
    name: "Iyan Village",
    imageUrl: "/logos/iyanvillage.png",
    href: "#",
  },
];

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PrixairFoodsPage() {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Black top bar */}
      <div className="w-full h-[80px] bg-black" />
      <div className="mb-8 flex items-center text-xl font-semibold text-gray-800 mt-10">
        <Link href="/" className="flex items-center space-x-2 hover:underline">
          <FiArrowLeft className="mr-2" />
          <span>PRIXAIR FOODS</span>
        </Link>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-100px" }} // Triggers when 100px from viewport edge
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {foods.map((food, index) => (
          <motion.div key={index} variants={item}>
            <FoodCard
              name={food.name}
              imageUrl={food.imageUrl}
              href={food.href}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}