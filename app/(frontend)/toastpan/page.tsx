'use client';
import BrandHero from "../components/brand/BrandHero";
import BrandInfo from "../components/brand/BrandInfo";
import BrandMenu from "../components/brand/BrandMenu";
import BrandLocation from "../components/brand/BrandLocation";
import BrandTestimonials from "../components/brand/BrandTestimonials";
import BrandHowToOrder from "../components/brand/BrandHowToOrder";

const bestSellers = [
  { 
    name: "Classic Avocado Toast", 
    price: "₦4,500", 
    image: "/toastpanimg/toastpan7.jpeg",
    description: "Smashed avocado, cherry tomatoes, and poached egg on sourdough."
  },
  { 
    name: "Cinnamon French Toast", 
    price: "₦3,800", 
    image: "/toastpanimg/toastpan2.jpeg",
    description: "Brioche soaked in vanilla custard, served with maple syrup and berries."
  },
  { 
    name: "Spicy Tuna Melt", 
    price: "₦4,200", 
    image: "/toastpanimg/toastpan3.jpeg",
    description: "Zesty tuna salad with melted cheddar on toasted rustic bread."
  },
  { 
    name: "Honey Walnut Toast", 
    price: "₦3,500", 
    image: "/toastpanimg/toastpan4.jpeg",
    description: "Creamy whipped ricotta, walnuts, and a drizzle of local honey."
  },
];

const dailySpecials = [
  { 
    name: "Smoked Salmon Toast", 
    price: "₦5,500", 
    image: "/toastpanimg/toastpan5.jpeg",
    description: "Premium smoked salmon, cream cheese, capers, and red onions."
  },
  { 
    name: "Berry Mascarpone", 
    price: "₦4,000", 
    image: "/toastpanimg/toastpan6.jpeg",
    description: "Sweet mascarpone spread with seasonal berries and mint."
  },
  { 
    name: "Garlic Mushroom", 
    price: "₦4,200", 
    image: "/toastpanimg/toastpan7.jpeg",
    description: "Sautéed wild mushrooms with garlic butter and thyme."
  },
  { 
    name: "Nutella Banana", 
    price: "₦3,500", 
    image: "/toastpanimg/toastpan8.jpeg",
    description: "Thick cut toast with Nutella, bananas, and toasted hazelnuts."
  },
];

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
  return (
    <div className="overflow-hidden">
      <BrandHero 
        title={
          <>Savor the <span className="text-[#B5D04E]">Crunch</span>, <br /> Feel the <span className="text-[#F3A35C]">Heart</span>.</>
        }
        subtitle="Golden, crispy, and filled with love. Discover the craft behind the perfect toast with Toast Pan."
        tagline="The Ultimate Toast Experience"
        bgImage="/toastpanimg/toastpan12.jpeg"
        primaryColor="#B5D04E"
        secondaryColor="#F3A35C"
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
      />
    </div>
  );
};

export default ToastPanLanding;
