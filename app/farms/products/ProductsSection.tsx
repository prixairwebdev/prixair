"use client";
import Image from "next/image";
import { FaDrumstickBite, FaSeedling, FaBreadSlice } from "react-icons/fa";
import { GiMilkCarton, GiCorn } from "react-icons/gi";
import Link from "next/link";

interface Product {
  name: string;
  description: string;
  image: string;
  link: string;
}

const ProductsSection = () => {
  const categories = [
    { icon: <FaSeedling className="text-green-500 text-4xl" />, name: "Fruits and Vegetables" },
    { icon: <FaDrumstickBite className="text-red-500 text-4xl" />, name: "Meat and Poultry" },
    { icon: <GiMilkCarton className="text-yellow-500 text-4xl" />, name: "Dairy and Eggs" },
    { icon: <FaBreadSlice className="text-orange-400 text-4xl" />, name: "Processed foods" },
    { icon: <GiCorn className="text-green-600 text-4xl" />, name: "Grains" },
  ];

  const products: Product[] = [
    {
      name: "Organic Broccoli",
      description: "Tender, crisp florets rich in vitamins and fiber — harvested fresh daily.",
      image: "/broccoli.png",
      link: "#",
    },
    {
      name: "Sweet Pineapple",
      description: "Naturally ripened pineapples with intense sweetness and aroma.",
      image: "/pineapple.png",
      link: "#",
    },
    {
      name: "Dried Pepper",
      description: "Aromatic, sun-dried pepper — hot, flavorful, and natural.",
      image: "/pepper.png",
      link: "#",
    },
    {
      name: "Fresh Farm Eggs",
      description: "Collected daily — rich yolks and full of natural nutrients.",
      image: "/eggs.png",
      link: "#",
    },
  ];

  return (
    <section className="py-16 bg-white">
      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-6xl mx-auto px-6 mb-12">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-gray-50 rounded-lg shadow-sm p-6 hover:shadow-md transition"
          >
            {cat.icon}
            <p className="mt-2 text-sm font-medium text-gray-700 text-center">
              {cat.name}
            </p>
          </div>
        ))}
      </div>

      {/* Product Section Header */}
      <div className="flex justify-between items-center max-w-6xl mx-auto px-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Our Products</h2>
        <Link href="#" className="text-sm font-medium text-green-700 hover:underline">
          See all →
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
            <div className="relative w-full h-48">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 flex flex-col justify-between h-[180px]">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
              </div>
              <Link
                href={product.link}
                className="text-green-700 font-medium hover:underline self-start"
              >
                Order Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
