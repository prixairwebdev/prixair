'use client';
import BrandHero from "../components/brand/BrandHero";
import BrandInfo from "../components/brand/BrandInfo";
import BrandMenu from "../components/brand/BrandMenu";
import BrandLocation from "../components/brand/BrandLocation";
import BrandTestimonials from "../components/brand/BrandTestimonials";
import BrandHowToOrder from "../components/brand/BrandHowToOrder";

const bestSellers = [
  { 
    name: "Classic Pounded Yam", 
    price: "₦5,000", 
    image: "/iyanvillage/iyan8.jpeg", // Placeholder for Iyan
    description: "Smooth, fluffy pounded yam served with your choice of rich indigenous soup."
  },
  { 
    name: "Egusi Soup Special", 
    price: "₦4,500", 
    image: "/iyanvillage/iyan7.jpeg", // Placeholder
    description: "Rich melon seed soup with melon, spinach, and assorted meats."
  },
  { 
    name: "Fisherman Soup", 
    price: "₦6,500", 
    image: "/iyanvillage/iyan6.jpeg", // Placeholder
    description: "A coastal delight featuring fresh fish, prawns, and traditional spices."
  },
  { 
    name: "Village Platter", 
    price: "₦8,500", 
    image: "/iyanvillage/iyan5.jpeg", // Placeholder
    description: "A hearty combination of Iyan, two soups, and extra protein."
  },
];

const dailySpecials = [
  { 
    name: "Banga Soup", 
    price: "₦5,200", 
    image: "/iyanvillage/iyan6.jpeg", // Placeholder
    description: "Palm nut soup slow-cooked to perfection with native spices."
  },
  { 
    name: "Afang Soup", 
    price: "₦4,800", 
    image: "/iyanvillage/iyan3.jpeg", // Placeholder
    description: "A nutritious blend of Afang leaves and waterleaf with rich protein."
  },
  { 
    name: "Efo Riro", 
    price: "₦4,500", 
    image: "/iyanvillage/iyan2.jpeg", // Placeholder
    description: "Classic Yoruba spinach stew with palm oil and locust beans."
  },
  { 
    name: "White Soup (Afia Efere)", 
    price: "₦5,500", 
    image: "/iyanvillage/iyan15.jpeg", // Placeholder
    description: "Spicy and aromatic soup thickened with pounded yam."
  },
];

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
      />

      <BrandInfo 
        title="The Heart of Tradition"
        description="At Iyan Village, we preserve the rich heritage of Nigerian cuisine. Our pounded yam is made the traditional way—smooth, stretchy, and served fresh. We take pride in our diverse selection of soups, each prepared with authentic spices and the finest ingredients."
        image="/bukabg.png"
        imageAlt="Traditional Nigerian Meal"
        buttonText="Our Heritage"
      />

      <BrandMenu 
        bestSellers={bestSellers}
        dailySpecials={dailySpecials}
        accentColor="#FE0000"
      />

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
    </div>
  );
};

export default IyanVillageLanding;
