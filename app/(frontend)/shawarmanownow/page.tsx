'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BrandHero from "../components/brand/BrandHero";
import BrandInfo from "../components/brand/BrandInfo";
import BrandMenu, { MenuItem } from "../components/brand/BrandMenu";
import BrandLocation from "../components/brand/BrandLocation";
import BrandTestimonials from "../components/brand/BrandTestimonials";
import BrandHowToOrder from "../components/brand/BrandHowToOrder";
import FloatingCart from "../components/brand/FloatingCart";
import { getProductsByStore } from "@/app/actions/products";
import { Product } from "@/app/actions/supermarket";

const reviews = [
  {
    name: "Tunde A.",
    text: "Best shawarma in Abuja! The chicken is perfectly seasoned and the bread is always fresh.",
    rating: 5,
  },
  {
    name: "Ngozi F.",
    text: "Shawarma Now Now lives up to its name — fast, delicious, and always consistent!",
    rating: 5,
  },
  {
    name: "Emeka O.",
    text: "The grilled chicken shawarma is unbeatable. I order from here at least twice a week.",
    rating: 5,
  },
];

const ShawarmaNomnowLanding = () => {
  const router = useRouter();
  const [products, setProducts] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const storeProducts = await getProductsByStore('shawarmanomnow');

        const mappedProducts: MenuItem[] = storeProducts.map((p: Product) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          description: p.description,
          image: typeof p.image === 'string' ? p.image : (p.image?.url || "/logos/shawarmanomnow.jpg"),
          store: 'shawarmanomnow'
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error("Failed to fetch Shawarma Now Now products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const bestSellers = products.slice(0, 4);
  const dailySpecials = products.slice(4, 8);

  return (
    <div className="overflow-hidden">
      <BrandHero
        title={
          <>Shawarma <span className="text-[#E30000]">Now Now</span>:<br />Fresh & <span className="text-[#F5A623]">Fast.</span></>
        }
        subtitle="Juicy, flame-grilled shawarma wraps made fresh to order. Your favourite street flavour, elevated."
        tagline="Abuja's Favourite Shawarma Spot"
        bgImage="/logos/shawarmanomnow.jpg"
        primaryColor="#F5A623"
        secondaryColor="#E30000"
        store="shawarmanomnow"
        onOrderClick={() => router.push('/shawarmanomnow/products')}
        onMenuClick={() => router.push('/shawarmanomnow/products')}
      />

      <BrandInfo
        title="Wrapped in Flavour"
        description="At Shawarma Now Now, every wrap is a work of art. We use only the finest chicken and beef, flame-grilled to perfection and stuffed with fresh veggies, our signature sauces, and warm, fluffy bread. Fast service. Big flavour. Every time."
        image="https://images.unsplash.com/photo-1719282431565-3b30bb7d2658?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        imageAlt="Shawarma Now Now wrap"
        buttonText="Our Story"
      />

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F5A623]"></div>
        </div>
      ) : (
        <BrandMenu
          bestSellers={bestSellers}
          dailySpecials={dailySpecials}
          accentColor="#F5A623"
          store="shawarmanomnow"
        />
      )}

      <BrandTestimonials
        reviews={reviews}
        accentColor="#E30000"
      />

      <BrandLocation
        brandName="Shawarma Now Now"
        accentColor="#F5A623"
        location="No 14 Cotonou Crescent, off Bissau Street, Wuse Zone 6, Abuja"
      />

      <BrandHowToOrder
        primaryColor="#F5A623"
        store="shawarmanomnow"
      />

      <FloatingCart
        storeSlug="shawarmanomnow"
        accentColor="#F5A623"
      />
    </div>
  );
};

export default ShawarmaNomnowLanding;
