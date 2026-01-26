'use client';
import BrandHero from "../components/brand/BrandHero";
import BrandInfo from "../components/brand/BrandInfo";
import BrandMenu from "../components/brand/BrandMenu";
import BrandLocation from "../components/brand/BrandLocation";
import BrandTestimonials from "../components/brand/BrandTestimonials";
import BrandHowToOrder from "../components/brand/BrandHowToOrder";

const bestSellers = [
  { 
    name: "Regular plus", 
    price: "₦7,000", 
    image: "/partyjollof/pj3.jpeg", 
    description: "Smoky, authentic Nigerian Jollof rice served with your choice of protein and sides."
  },
  { 
    name: "Maxi", 
    price: "₦25,000", 
    image: "/partyjollof/pj2.jpeg", 
    description: "Succulent chicken thighs grilled and tossed in our signature spicy pepper sauce."
  },
  { 
    name: "Maxi plus", 
    price: "₦40,000", 
    image: "/partyjollof/pj1.jpeg", 
    description: "Arromatic fried rice with mixed vegetables, liver, and shrimps."
  },
  { 
    name: "Regular", 
    price: "₦3,000", 
    image: "/partyjollof/pj4.jpeg", 
    description: "Perfectly ripe, sweet, and golden-brown dodo."
  },
];

const dailySpecials = [
  { 
    name: "Native Jollof", 
    price: "₦4,000", 
    image: "/partyjollof/pj7.jpeg", 
    description: "Jollof rice topped with grilled croaker fish, prawns, and calamari."
  },
  { 
    name: "Asun jollof", 
    price: "₦5,000", 
    image: "/partyjollof/pj6.jpeg", 
    description: "Chopped goat meat grilled with habanero peppers and onions."
  },
  { 
    name: "Native Rice", 
    price: "₦30,000", 
    image: "/partyjollof/pj5.jpeg", 
    description: "Traditionally cooked rice with palm oil, locust beans, and dried fish."
  },
  { 
    name: "Regular Jollof", 
    price: "₦3,000", 
    image: "/partyjollof/pj4.jpeg", 
    description: "Steamed bean pudding with egg and fish."
  },
];

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
      />

      <BrandInfo 
        title="Our Secret? The Smoke."
        description="At Party Jollof, we don't cut corners. We believe the best Jollof rice is cooked with patience and that special touch of smoke. Using traditional recipes and the finest local spices, we deliver a meal that isn't just food—it's an experience. Come for the rice, stay for the vibe."
        image="/partyjollof/pjhm.jpeg"
        imageAlt="Authentic Party Jollof Rice"
        buttonText="Our Process"
      />

      <BrandMenu 
        bestSellers={bestSellers}
        dailySpecials={dailySpecials}
        accentColor="#FF4500"
      />

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
      />
    </div>
  );
};

export default PartyJollofLanding;
