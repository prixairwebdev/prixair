'use client';

import { useEffect, useState } from "react";
import BrandHero from "../components/brand/BrandHero";
import BrandInfo from "../components/brand/BrandInfo";
import BrandMenu, { MenuItem } from "../components/brand/BrandMenu";
import BrandLocation from "../components/brand/BrandLocation";
import BrandTestimonials from "../components/brand/BrandTestimonials";
import BrandHowToOrder from "../components/brand/BrandHowToOrder";
import { getProductsAndCategories } from "@/app/actions/products";

const reviews = [
  {
    name: "Linda M.",
    text: "The freshest seafood in town! The Grilled Lobster Tail was incredible.",
    rating: 5,
  },
  {
    name: "Tunde W.",
    text: "Beautiful atmosphere and even better food. The Seafood Paella is a must-try.",
    rating: 5,
  },
  {
    name: "Ebere C.",
    text: "Love the ocean vibes. The Spiced Prawns were perfectly cooked and very tasty.",
    rating: 5,
  },
];

const SeasideLanding = () => {
  const [bestSellers, setBestSellers] = useState<MenuItem[]>([]);
  const [dailySpecials, setDailySpecials] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { products } = await getProductsAndCategories('seaside');
        
        const mappedProducts: MenuItem[] = products.map((p: any) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          description: p.description,
          image: typeof p.image === 'object' ? p.image.url : p.image,
          store: 'seaside'
        }));

        setBestSellers(mappedProducts.slice(0, 4));
        setDailySpecials(mappedProducts.slice(4, 8));
      } catch (error) {
        console.error("Error fetching Seaside products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#0077CC] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <BrandHero 
        title={
          <>Seaside Restaurant: <br /><span className="text-[#0077CC]">Ocean&apos;s</span> Best.</>
        }
        subtitle="Fresh seafood and breathtaking views. Experience the best of the ocean at Seaside."
        tagline="Premium Seafood Experience"
        bgImage="/logos/seaside.png"
        primaryColor="#0077CC"
        secondaryColor="#F3A35C"
        store="seaside"
      />

      <BrandInfo 
        title="Fresh from the Waves"
        description="At Seaside, we bring the ocean to your plate. We source the finest, freshest seafood daily to ensure every meal is a celebration of the sea. Whether you're craving a light bite or a grand seafood feast, our chefs craft dishes that highlight the natural flavors of the deep blue."
        image="/restaurantplaceholder.jpg"
        imageAlt="Gourmet Seafood Dish"
        buttonText="Our Process"
      />

      <BrandMenu 
        bestSellers={bestSellers}
        dailySpecials={dailySpecials}
        accentColor="#0077CC"
      />

      <BrandTestimonials 
        reviews={reviews}
        accentColor="#F3A35C"
      />

      <BrandLocation 
        brandName="Seaside"
        accentColor="#F3A35C"
      />

      <BrandHowToOrder 
        primaryColor="#0077CC"
        store="seaside"
      />
    </div>
  );
};

export default SeasideLanding;
