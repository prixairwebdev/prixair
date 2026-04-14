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
    name: "Olusola K.",
    text: "The smoothest Iyan I've had in Abuja. It really feels like home!",
    rating: 5,
  },
  {
    name: "Chidi E.",
    text: "Their Egusi soup is packed with flavor. The portion sizes are very generous.",
    rating: 5,
  },
  {
    name: "Amina U.",
    text: "Iyan Village is my go-to for authentic traditional meals. Highly recommended!",
    rating: 5,
  },
];

const IyanVillageLanding = () => {
  const router = useRouter();
  const [products, setProducts] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIyanData() {
      try {
        const iyanProducts = await getProductsByStore('iyanvillage');

        const mappedProducts: MenuItem[] = iyanProducts.map((p: Product) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          description: p.description,
          image: typeof p.image === 'string' ? p.image : (p.image?.url || "/iyanvillage/iyan8.jpeg"),
          store: 'iyanvillage'
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error("Failed to fetch Iyan Village products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchIyanData();
  }, []);

  const bestSellers = products.slice(0, 4);
  const dailySpecials = products.slice(4, 8);

  return (
    <div className="overflow-hidden">
      <BrandHero 
        title={
          <>Iyan Village: <br /><span className="text-[#FE0000]">Traditional</span> Taste.</>
        }
        subtitle="Authentic pounded yam and rich indigenous soups. A taste of home in every bite."
        tagline="Authentic Nigerian Cuisine"
        bgImage="/logos/iyanvillage.png"
        primaryColor="#FE0000"
        secondaryColor="#F3A35C"
        store="iyanvillage"
        onOrderClick={() => router.push('/iyanvillage/products')}
      />

      <BrandInfo 
        title="The Heart of Tradition"
        description="At Iyan Village, we preserve the rich heritage of Nigerian cuisine. Our pounded yam is made the traditional way—smooth, stretchy, and served fresh. We take pride in our diverse selection of soups, each prepared with authentic spices and the finest ingredients."
        image="/bukabg.png"
        imageAlt="Traditional Nigerian Meal"
        buttonText="Our Heritage"
      />

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FE0000]"></div>
        </div>
      ) : (
        <BrandMenu 
          bestSellers={bestSellers}
          dailySpecials={dailySpecials}
          accentColor="#FE0000"
          store="iyanvillage"
          onViewAllClick={() => router.push('/iyanvillage/products')}
        />
      )}

      <BrandTestimonials 
        reviews={reviews}
        accentColor="#F3A35C"
      />

      <BrandLocation 
        brandName="Iyan Village"
        accentColor="#F3A35C"
      />

      <BrandHowToOrder 
        primaryColor="#FE0000"
        store="iyanvillage"
      />

      <FloatingCart 
        storeSlug="iyanvillage"
        accentColor="#FE0000"
      />
    </div>
  );
};

export default IyanVillageLanding;
