'use client';
import BrandHero from "../components/brand/BrandHero";
import BrandInfo from "../components/brand/BrandInfo";
import BrandMenu from "../components/brand/BrandMenu";
import BrandLocation from "../components/brand/BrandLocation";
import BrandTestimonials from "../components/brand/BrandTestimonials";
import BrandHowToOrder from "../components/brand/BrandHowToOrder";

const bestSellers = [
  { 
    name: "Singapore Noodles", 
    price: "₦4,800", 
    image: "/foodimg/dailyspecials/sandwich.png", // Placeholder
    description: "Thin rice noodles stir-fried with curry powder, vegetables, and shrimp."
  },
  { 
    name: "Spicy Beef Ramen", 
    price: "₦5,500", 
    image: "/foodimg/dailyspecials/chocolatecake.png", // Placeholder
    description: "Rich beef broth with tender slices of beef, noodles, and a soft-boiled egg."
  },
  { 
    name: "Chicken Stir-Fry", 
    price: "₦4,200", 
    image: "/foodimg/bestsellers/croissant.png", // Placeholder
    description: "Wok-tossed noodles with succulent chicken and a medley of fresh vegetables."
  },
  { 
    name: "Prawn Hakka Noodles", 
    price: "₦5,800", 
    image: "/foodimg/dailyspecials/meatpie.png", // Placeholder
    description: "Classic Indo-Chinese style noodles with juicy prawns and bell peppers."
  },
];

const dailySpecials = [
  { 
    name: "Teriyaki Tofu Noodles", 
    price: "₦3,800", 
    image: "/foodimg/bestsellers/cookies.png", // Placeholder
    description: "Crispy tofu and noodles tossed in a sweet and savory teriyaki sauce."
  },
  { 
    name: "Seafood Chow Mein", 
    price: "₦6,500", 
    image: "/foodimg/bestsellers/sourdough.png", // Placeholder
    description: "Stir-fried wheat noodles with a variety of fresh seafood and vegetables."
  },
  { 
    name: "Pad Thai Special", 
    price: "₦5,200", 
    image: "/foodimg/dailyspecials/agege.png", // Placeholder
    description: "Classic Thai rice noodles with peanuts, bean sprouts, and your choice of protein."
  },
  { 
    name: "Garlic Butter Noodles", 
    price: "₦3,500", 
    image: "/foodimg/bestsellers/cupcakes.png", // Placeholder
    description: "Simple yet delicious noodles tossed in a rich garlic butter sauce."
  },
];

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
      />

      <BrandInfo 
        title="Noodle Artistry"
        description="At Noodlelicious, we're obsessed with the perfect strand. From traditional hand-pulled styles to modern stir-fry favorites, our noodles are prepared fresh with vibrant ingredients and bold sauces. Experience the joy of a perfectly balanced bowl, made just the way you like it."
        image="/fastfoodicons.png"
        imageAlt="Gourmet Noodle Bowl"
        buttonText="Our Craft"
      />

      <BrandMenu 
        bestSellers={bestSellers}
        dailySpecials={dailySpecials}
        accentColor="#F3A35C"
      />

      <BrandTestimonials 
        reviews={reviews}
        accentColor="#F3A35C"
      />

      <BrandLocation 
        brandName="Noodlelicious"
        accentColor="#F3A35C"
      />

      <BrandHowToOrder 
        primaryColor="#F3A35C"
      />
    </div>
  );
};

export default NoodleliciousLanding;
