"use client";

import { useEffect, useState } from "react";
import { CategorySidebar } from "./components/layout/CategorySidebar";
import { HeroBanner } from "./components/home/HeroBanner";
import { FlashSales } from "./components/home/FlashSales";
import { CategoryGrid } from "./components/home/CategoryGrid";
import { HeroSection } from "./components/HeroSection";
import ProductCard from "./components/ProductCard";
import { dummyProducts } from "./data/dummy-data";
import { getSupermarketProducts, getFlashSale, Product, FlashSale } from "@/app/actions/supermarket";

export default function SupermarketPage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [flashSale, setFlashSale] = useState<FlashSale | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [products, sale] = await Promise.all([
          getSupermarketProducts(),
          getFlashSale()
        ]);
        setFeaturedProducts(products);
        setFlashSale(sale);
      } catch (error) {
        console.error("Error fetching supermarket data:", error);
        // Fallback to dummy data if fetching fails
        const dummyFeatured = dummyProducts.filter(p => p.store === 'supermarket').slice(0, 8) as unknown as Product[];
        setFeaturedProducts(dummyFeatured);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
        <CategorySidebar />

        <div className="space-y-8">
          <HeroBanner />

          <FlashSales data={flashSale} />

          <CategoryGrid />

          {/* Featured Products */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-black">Featured Products</h2>
              <a href="/supermarket/products" className="text-orange-600 hover:text-orange-700 font-medium">
                View All →
              </a>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white h-64 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.length > 0 ? (
                  featuredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  // Fallback if API returns empty array but no error
                  dummyProducts.filter(p => p.store === 'supermarket').slice(0, 8).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <HeroSection />
    </main>
  );
}
