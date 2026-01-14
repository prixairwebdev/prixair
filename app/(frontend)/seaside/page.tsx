'use client';
import BrandHero from "../components/brand/BrandHero";
import BrandInfo from "../components/brand/BrandInfo";
import BrandMenu from "../components/brand/BrandMenu";
import BrandLocation from "../components/brand/BrandLocation";
import BrandTestimonials from "../components/brand/BrandTestimonials";
import BrandHowToOrder from "../components/brand/BrandHowToOrder";

const bestSellers = [
  { 
    name: "Grilled Lobster Tail", 
    price: "₦15,000", 
    image: "/foodimg/bestsellers/sourdough.png", // Placeholder
    description: "Succulent lobster tail grilled with garlic butter and lemon herbs."
  },
  { 
    name: "Seafood Paella", 
    price: "₦9,500", 
    image: "/foodimg/bestsellers/croissant.png", // Placeholder
    description: "Authentic saffron rice with shrimp, mussels, calamari, and fish."
  },
  { 
    name: "Crispy Calamari", 
    price: "₦4,500", 
    image: "/foodimg/dailyspecials/meatpie.png", // Placeholder
    description: "Tender calamari rings lightly battered and served with spicy aioli."
  },
  { 
    name: "Pan-Seared Salmon", 
    price: "₦8,500", 
    image: "/foodimg/dailyspecials/sandwich.png", // Placeholder
    description: "Fresh salmon fillet seared to perfection with seasonal vegetables."
  },
];

const dailySpecials = [
  { 
    name: "Spiced Prawns", 
    price: "₦7,000", 
    image: "/foodimg/bestsellers/cookies.png", // Placeholder
    description: "Jumbo prawns marinated in a spicy blend of coastal herbs."
  },
  { 
    name: "Fish & Chips", 
    price: "₦5,500", 
    image: "/foodimg/dailyspecials/agege.png", // Placeholder
    description: "Crispy beer-battered white fish served with chunky fries."
  },
  { 
    name: "Seafood Pasta", 
    price: "₦6,000", 
    image: "/foodimg/bestsellers/cupcakes.png", // Placeholder
    description: "Fresh pasta tossed with a medley of seafood in a creamy white wine sauce."
  },
  { 
    name: "Grilled Croaker", 
    price: "₦7,500", 
    image: "/foodimg/dailyspecials/chocolatecake.png", // Placeholder
    description: "Whole croaker fish seasoned with local spices and flame-grilled."
  },
];

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
      />
    </div>
  );
};

export default SeasideLanding;
