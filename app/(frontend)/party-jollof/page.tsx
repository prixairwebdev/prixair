'use client';
import { useEffect, useState } from "react";
import BrandHero from "../components/brand/BrandHero";
import BrandInfo from "../components/brand/BrandInfo";
import BrandMenu, { MenuItem } from "../components/brand/BrandMenu";
import BrandLocation from "../components/brand/BrandLocation";
import BrandTestimonials from "../components/brand/BrandTestimonials";
import BrandHowToOrder from "../components/brand/BrandHowToOrder";
import FloatingCart from "../components/brand/FloatingCart";
import { getProductsByStore } from "@/app/actions/products";
import { Product } from "@/app/actions/supermarket";
import { useRouter } from "next/navigation";

const reviews = [
  {
    name: "Chinedu E.",
    text: "The smokiness of the Jollof is just perfect! It tastes exactly like Jollof from an Owambe.",
    rating: 5,
  },
  {
    name: "Amina B.",
    text: "The peppered chicken is to die for. Spicy, juicy, and very well seasoned.",
    rating: 5,
  },
  {
    name: "Femi A.",
    text: "Party Jollof never disappoints. The portions are generous and the taste is consistent.",
    rating: 5,
  },
];

const PartyJollofLanding = () => {
  const router = useRouter();
  const [products, setProducts] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPartyJollofData() {
      try {
        const pjProducts = await getProductsByStore('party-jollof');

        const mappedProducts: MenuItem[] = pjProducts.map((p: Product) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          description: p.description,
          image: typeof p.image === 'string' ? p.image : (p.image?.url || "/partyjollof/pj3.jpeg"),
          store: 'party-jollof'
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error("Failed to fetch Party Jollof products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPartyJollofData();
  }, []);

  const bestSellers = products.slice(0, 4);
  const dailySpecials = products.slice(4, 8);

  return (
    <div className="overflow-hidden">
      <BrandHero
        title={
          <>Experience the <span className="text-[#FF4500]">Authentic</span> <br /> <span className="text-[#FFA500]">Party Flavor</span>.</>
        }
        subtitle="That unmistakable smoky taste that brings every celebration to life. Authentic, spicy, and always fresh."
        tagline="The King of Jollof"
        bgImage="/partyjollof/pjhm.jpeg"
        primaryColor="#FF4500"
        secondaryColor="#FFA500"
        store="party-jollof"
        onOrderClick={() => router.push('/party-jollof/products')}
      />

      <BrandInfo
        title="Our Secret? The Smoke."
        description="At Party Jollof, we don't cut corners. We believe the best Jollof rice is cooked with patience and that special touch of smoke. Using traditional recipes and the finest local spices, we deliver a meal that isn't just food—it's an experience. Come for the rice, stay for the vibe."
        image="/partyjollof/pjhm.jpeg"
        imageAlt="Authentic Party Jollof Rice"
        buttonText="Our Process"
      />

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4500]"></div>
        </div>
      ) : (
        <BrandMenu
          bestSellers={bestSellers}
          dailySpecials={dailySpecials}
          accentColor="#FF4500"
          store="party-jollof"
          onViewAllClick={() => router.push('/party-jollof/products')}
        />
      )}

      <BrandTestimonials
        reviews={reviews}
        accentColor="#FFA500"
      />

      <BrandLocation
        brandName="Party Jollof"
        accentColor="#FF4500"
      />

      <BrandHowToOrder
        primaryColor="#FF4500"
        store="party-jollof"
      />

      <FloatingCart 
        storeSlug="party-jollof"
        accentColor="#FF4500"
      />
    </div>
  );
};

export default PartyJollofLanding;
