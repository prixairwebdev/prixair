"use client";

import { useEffect, useState } from "react";
import { HeroBanner } from "./components/home/HeroBanner";
import { FlashSales } from "./components/home/FlashSales";
import { CategoryGrid } from "./components/home/CategoryGrid";
import { HeroSection } from "./components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { dummyProducts } from "./data/dummy-data";
import { getSupermarketProducts, getFlashSale } from "@/app/actions/supermarket";
import { Product, FlashSale } from "@/app/actions/supermarket";

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
        setFeaturedProducts(products as unknown as Product[]);
        setFlashSale(sale);
      } catch (error) {
        console.error("Error fetching supermarket data:", error);
        const dummyFeatured = dummyProducts.filter(p => p.store === 'supermarket').slice(0, 8) as unknown as Product[];
        setFeaturedProducts(dummyFeatured);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero with search */}
      <HeroBanner />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 space-y-14">
        {/* Category pills */}
        <CategoryGrid />

        {/* Flash sales */}
        <FlashSales data={flashSale} />

        {/* Featured products */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-orange-500 mb-1">Hand-picked</p>
              <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            </div>
            <a
              href="/supermarket/products"
              className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors underline underline-offset-4"
            >
              View all →
            </a>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-gray-100">
                  <div className="h-48 bg-gray-100 animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-gray-100 rounded animate-pulse w-1/3" />
                    <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
                    <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
                    <div className="h-10 bg-gray-100 rounded-xl animate-pulse mt-3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {(featuredProducts.length > 0
                ? featuredProducts
                : dummyProducts.filter(p => p.store === 'supermarket').slice(0, 8) as unknown as Product[]
              ).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>

      <HeroSection />
    </main>
  );
}
