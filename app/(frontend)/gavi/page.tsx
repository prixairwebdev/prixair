'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProductsAndCategories } from "@/app/actions/products";
import { MenuItem } from "../components/brand/BrandMenu";
import BrandHero from "../components/brand/BrandHero";
import BrandInfo from "../components/brand/BrandInfo";
import BrandMenu from "../components/brand/BrandMenu";
import BrandLocation from "../components/brand/BrandLocation";
import BrandTestimonials from "../components/brand/BrandTestimonials";
import BrandHowToOrder from "../components/brand/BrandHowToOrder";

const reviews = [
  {
    name: "Emeka T",
    text: "Every Friday, I rush for their meat pie. No one does it like GAVI! Crusty outside, juicy inside!",
    rating: 5,
  },
  {
    name: "Rita O",
    text: "I ordered cupcakes for a birthday and they stole the show. People were asking for more!",
    rating: 5,
  },
  {
    name: "Tunde B",
    text: "Their Agege bread reminds me of home — soft, fresh, and perfectly baked!",
    rating: 5,
  },
];

const Landing = () => {
  const router = useRouter();
  const [bestSellers, setBestSellers] = useState<MenuItem[]>([]);
  const [dailySpecials, setDailySpecials] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { products } = await getProductsAndCategories('gavi');

        const mappedProducts: MenuItem[] = products.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          description: p.description,
          image: (typeof p.image === 'object' ? p.image?.url : p.image) || '/gavibg.png',
          store: 'gavi'
        }));

        // Split products for display
        setBestSellers(mappedProducts.slice(0, 4));
        setDailySpecials(mappedProducts.slice(4, 8));
      } catch (error) {
        console.error("Error fetching GAVI products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfbf9]">
        <div className="w-12 h-12 border-4 border-[#373435] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <BrandHero
        title={<>Baked Fresh. <br />Loved Daily.</>}
        subtitle="From flaky meat pies to melt-in-your-mouth cakes, GAVI brings oven-fresh goodness right to your doorstep."
        bgImage="/gavibg.png"
        primaryColor="#373435"
        secondaryColor="#F3A35C"
        tagline="Baked with Heart"
        onMenuClick={() => router.push('/gavi/products')}
        onOrderClick={() => router.push('/gavi/products')}
        store="gavi"
      />

      <BrandInfo
        title="Baked With Heart"
        description="At GAVI, we believe baking is an art of love. Every loaf, pastry, and cake is made fresh daily with premium ingredients and a passion for perfection. Whether it's a family gathering or a sweet solo treat, we've got something for everyone."
        image="/bwh.png"
        imageAlt="Dough being kneaded"
      />

      <BrandMenu
        bestSellers={bestSellers}
        dailySpecials={dailySpecials}
        accentColor="#373435"
        onViewAllClick={() => router.push('/gavi/products')}
      />

      <BrandTestimonials
        reviews={reviews}
        accentColor="#F3A35C"
      />

      <BrandLocation
        brandName="GAVI"
        accentColor="#F3A35C"
      />

      <BrandHowToOrder
        primaryColor="#373435"
        store="gavi"
      />
    </div>
  );
};

export default Landing;
