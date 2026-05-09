"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

interface Product {
  name: string;
  price: string;
  img: string;
  description?: string;
}

interface ProductsData {
  doors: Product[];
  tiles: Product[];
}

const products: ProductsData = {
  doors: [
    {
      name: "Oakwood American Steel Door",
      price: "₦1,574,235.00",
      img: "/properties/oakwood.png",
      description:
        "Premium oakwood American steel door with enhanced security features and elegant finish. Perfect for modern homes seeking both style and safety.",
    },
    {
      name: "Quality Interior Hinged Door",
      price: "₦210,000.00",
      img: "/properties/qshinged.png",
      description:
        "High-quality interior hinged door designed for smooth operation and durability. Features a sleek design that complements any interior decor.",
    },
    {
      name: "Walnut American Steel Door",
      price: "₦1,574,235.00",
      img: "/properties/wallnut.png",
      description:
        "Luxurious walnut finish American steel door offering superior protection and aesthetic appeal. Built to last with weather-resistant properties.",
    },
  ],
  tiles: [
    {
      name: "Carrara Glossy Marble Tile",
      price: "₦13,235.00",
      img: "/properties/carrara.png",
      description:
        "Elegant Carrara glossy marble tiles that bring luxury to any space. Easy to clean and maintain with high resistance to stains and moisture.",
    },
    {
      name: "Rustic Oak Wood-Look Tile",
      price: "₦12,000.00",
      img: "/properties/rusticoak.png",
      description:
        "Rustic oak wood-look tiles combining the warmth of wood with the durability of ceramic. Perfect for creating a cosy yet practical living space.",
    },
    {
      name: "Dark Slate Outdoor Tile",
      price: "₦15,235.00",
      img: "/properties/darkstate.png",
      description:
        "Durable dark slate outdoor tiles designed to withstand harsh weather. Non-slip surface makes them ideal for patios and pool areas.",
    },
  ],
};

export default function PremiumProducts() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section className="py-24 px-6 md:px-14 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Products</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">Explore Our Premium Range</h2>
          <p className="mt-3 text-gray-500 max-w-lg">
            High-quality tiles, doors, and fittings designed for beauty and durability.
          </p>
        </motion.div>

        {/* Doors */}
        <CategorySection title="Doors" items={products.doors} onProductClick={setSelectedProduct} />

        {/* Tiles */}
        <CategorySection title="Tiles" items={products.tiles} onProductClick={setSelectedProduct} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <Link
            href="/properties/shop"
            className="inline-block px-6 py-3 border border-gray-900 text-gray-900 text-sm font-semibold hover:bg-gray-900 hover:text-white transition-colors"
          >
            View All Products
          </Link>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80">
                <Image src={selectedProduct.img} alt={selectedProduct.name} fill className="object-cover" />
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 bg-white p-1.5 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h3>
                <p className="text-2xl font-bold text-gray-900 mb-5">{selectedProduct.price}</p>

                <p className="text-gray-500 text-sm leading-relaxed mb-6">{selectedProduct.description}</p>

                <ul className="text-sm text-gray-500 space-y-1 mb-8">
                  <li>— Premium quality materials</li>
                  <li>— Easy installation</li>
                  <li>— 2-year warranty</li>
                  <li>— Free delivery within Lagos</li>
                </ul>

                <div className="flex gap-3">
                  <button className="flex-1 px-5 py-3 bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors">
                    Add to Cart
                  </button>
                  <button className="flex-1 px-5 py-3 border border-gray-200 text-gray-900 text-sm font-semibold hover:border-gray-900 transition-colors">
                    Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function CategorySection({
  title,
  items,
  onProductClick,
}: {
  title: string;
  items: Product[];
  onProductClick: (p: Product) => void;
}) {
  return (
    <div className="mt-14">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <Link
          href="/properties/shop"
          className="text-sm font-semibold text-gray-900 border-b border-gray-900 pb-0.5 hover:border-gray-400 transition-colors"
        >
          See all →
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -6 }}
            onClick={() => onProductClick(item)}
            className="border-t-2 border-gray-200 hover:border-gray-900 transition-all duration-300 group cursor-pointer"
          >
            <div className="relative h-52 overflow-hidden bg-gray-50">
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="pt-4 pb-6">
              <h4 className="font-bold text-gray-900 text-sm mb-1">{item.name}</h4>
              <p className="text-gray-900 font-semibold text-sm mb-4">{item.price}</p>
              <button
                className="text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                + Add to cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
