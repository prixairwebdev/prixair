'use client';
import { useEffect, useState } from "react";
import BrandHero from "../components/brand/BrandHero";
import BrandInfo from "../components/brand/BrandInfo";
import BrandMenu, { MenuItem } from "../components/brand/BrandMenu";
import BrandLocation from "../components/brand/BrandLocation";
import BrandTestimonials from "../components/brand/BrandTestimonials";
import BrandHowToOrder from "../components/brand/BrandHowToOrder";
import { getProductsByStore } from "@/app/actions/products";
import { useRouter } from "next/navigation";

const reviews = [
  {
    name: "Kelvin R.",
    text: "Best noodles I've ever had! The Singapore Noodles are absolutely delicious.",
    rating: 5,
  },
  {
    name: "Moji S.",
    text: "Fast service and great portions. The Spicy Beef Ramen is my personal favorite.",
    rating: 5,
  },
  {
    name: "Victor B.",
    text: "I love the variety on the menu. Everything tastes fresh and authentic!",
    rating: 5,
  },
];

const NoodleliciousLanding = () => {
  const router = useRouter();
  const [products, setProducts] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNoodleData() {
      try {
        const noodleProducts = await getProductsByStore('noodlelicious');

        const mappedProducts: MenuItem[] = noodleProducts.map((p: any) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          description: p.description,
          image: typeof p.image === 'string' ? p.image : (p.image?.url || "/noodlelicious/noodle1.jpeg"),
          store: 'noodlelicious'
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error("Failed to fetch Noodlelicious products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNoodleData();
  }, []);

  // Split products for display (mock logic if needed, or just slice)
  const bestSellers = products.slice(0, 4);
  const dailySpecials = products.slice(4, 8);

  return (
    <div className="overflow-hidden">
      <BrandHero
        title={
          <>Noodlelicious: <br /><span className="text-[#F3A35C]">Slurp</span> the Goodness.</>
        }
        subtitle="The ultimate noodle experience. Stir-fried, saucy, and absolutely delicious."
        tagline="Noodle Excellence"
        bgImage="/logos/noodlel.png"
        primaryColor="#F3A35C"
        secondaryColor="#373435"
        onOrderClick={() => router.push('/noodlelicious/menu')}
      />

      <BrandInfo
        title="Noodle Artistry"
        description="At Noodlelicious, we're obsessed with the perfect strand. From traditional hand-pulled styles to modern stir-fry favorites, our noodles are prepared fresh with vibrant ingredients and bold sauces. Experience the joy of a perfectly balanced bowl, made just the way you like it."
        image="/noodlelicious/noodle4.jpeg"
        imageAlt="Gourmet Noodle Bowl"
        buttonText="Our Craft"
      />

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F3A35C]"></div>
        </div>
      ) : (
        <BrandMenu
          bestSellers={bestSellers}
          dailySpecials={dailySpecials}
          accentColor="#F3A35C"
          onViewAllClick={() => router.push('/noodlelicious/menu')}
        />
      )}

      <BrandHowToOrder
        primaryColor="#F3A35C"
      />

      <BrandTestimonials
        reviews={reviews}
        accentColor="#F3A35C"
      />

      <BrandLocation
        brandName="Noodlelicious"
        accentColor="#F3A35C"
      />
    </div>
  );
};

export default NoodleliciousLanding;
