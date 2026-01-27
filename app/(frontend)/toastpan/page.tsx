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
    name: "Sarah L.",
    text: "The Avocado Toast here is life-changing! The sourdough is perfectly crunchy.",
    rating: 5,
  },
  {
    name: "David O.",
    text: "Mornings start here. The French Toast is the best in Abuja, hands down.",
    rating: 5,
  },
  {
    name: "Joy A.",
    text: "Love the variety of toppings. There's always something new and delicious to try!",
    rating: 5,
  },
];

const ToastPanLanding = () => {
  const router = useRouter();
  const [bestSellers, setBestSellers] = useState<MenuItem[]>([]);
  const [dailySpecials, setDailySpecials] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { products } = await getProductsAndCategories('toastpan');

        const mappedProducts: MenuItem[] = products.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          description: p.description,
          image: (typeof p.image === 'object' ? p.image?.url : p.image) || '/restaurantplaceholder.jpg',
          store: 'toastpan'
        }));

        // Split products for display
        setBestSellers(mappedProducts.slice(0, 4));
        setDailySpecials(mappedProducts.slice(4, 8));
      } catch (error) {
        console.error("Error fetching Toast Pan products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfbf9]">
        <div className="w-12 h-12 border-4 border-[#B5D04E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <BrandHero
        title={
          <>Savor the <span className="text-[#B5D04E]">Crunch</span>, <br /> Feel the <span className="text-[#F3A35C]">Heart</span>.</>
        }
        subtitle="Golden, crispy, and filled with love. Discover the craft behind the perfect toast with Toast Pan."
        tagline="The Ultimate Toast Experience"
        bgImage="/toastpanimg/toastpan.jpeg"
        primaryColor="#B5D04E"
        secondaryColor="#F3A35C"
        onMenuClick={() => router.push('/toastpan/products')}
        onOrderClick={() => router.push('/toastpan/products')}
        store="toastpan"
      />

      <BrandInfo
        title="Toasted to Perfection"
        description="At Toast Pan, we believe the best things in life are simple. We take artisan bread, fresh local ingredients, and plenty of passion to create the most satisfying toasted meals you've ever tasted. From savory melts to sweet breakfast delights, every slice is a masterpiece."
        image="/toastpanimg/toastpan3.jpeg"
        imageAlt="Gourmet Toast"
        buttonText="Our Story"
      />

      <BrandMenu
        bestSellers={bestSellers}
        dailySpecials={dailySpecials}
        accentColor="#B5D04E"
        onViewAllClick={() => router.push('/toastpan/products')}
      />

      <BrandTestimonials
        reviews={reviews}
        accentColor="#F3A35C"
      />

      <BrandLocation
        brandName="Toast Pan"
        accentColor="#F3A35C"
      />

      <BrandHowToOrder
        primaryColor="#B5D04E"
        store="toastpan"
      />
    </div>
  );
};

export default ToastPanLanding;
