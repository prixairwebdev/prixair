'use client';
import BrandHero from "../components/brand/BrandHero";
import BrandInfo from "../components/brand/BrandInfo";
import BrandMenu from "../components/brand/BrandMenu";
import BrandLocation from "../components/brand/BrandLocation";
import BrandTestimonials from "../components/brand/BrandTestimonials";
import BrandHowToOrder from "../components/brand/BrandHowToOrder";

const bestSellers = [
  { name: "Sourdough Bread", price: "₦1,500", image: "/foodimg/bestsellers/sourdough.png" },
  { name: "Red Velvet Cupcakes", price: "₦2,000 (6-pack)", image: "/foodimg/bestsellers/cupcakes.png" },
  { name: "Butter Croissants", price: "₦1,200", image: "/foodimg/bestsellers/croissant.png" },
  { name: "Choco-Chip Cookies", price: "₦1,500", image: "/foodimg/bestsellers/cookies.png" },
];

const dailySpecials = [
  { name: "Agege Bread", price: "₦2,000", image: "/foodimg/dailyspecials/agege.png" },
  { name: "Meat Pie", price: "₦1,000 (6-pack)", image: "/foodimg/dailyspecials/meatpie.png" },
  { name: "Bread Sandwich", price: "₦800", image: "/foodimg/dailyspecials/sandwich.png" },
  { name: "Chocolate cake slice", price: "₦4,000", image: "/foodimg/dailyspecials/chocolatecake.png" },
];

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
  return (
    <div className="overflow-hidden">
      <BrandHero 
        title={<>Baked Fresh. <br />Loved Daily.</>}
        subtitle="From flaky meat pies to melt-in-your-mouth cakes, GAVI brings oven-fresh goodness right to your doorstep."
        bgImage="/gavibg.png"
        primaryColor="#373435"
        secondaryColor="#F3A35C"
        tagline="Baked with Heart"
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
      />
    </div>
  );
};

export default Landing;
