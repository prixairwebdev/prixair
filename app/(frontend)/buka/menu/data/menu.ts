// data/menu.ts
export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "top-sellers" | "rice" | "soups" | "grilled" | "drinks";
};

export const menuItems: MenuItem[] = [
  // Top Sellers
  {
    id: 1,
    name: "Jollof Rice & Chicken",
    description: "Smoky jollof with spicy grilled chicken and fried plantain",
    price: 2500,
    image: "/images/jollof-chicken.png",
    category: "top-sellers",
  },
  {
    id: 2,
    name: "Pounded Yam & Egusi",
    description: "Soft pounded yam served with thick melon seed soup",
    price: 3000,
    image: "/images/pounded-yam-egusi.png",
    category: "top-sellers",
  },
  {
    id: 3,
    name: "Fried Rice & Turkey",
    description: "Golden fried rice with peppered turkey and salad",
    price: 2800,
    image: "/images/fried-rice-turkey.png",
    category: "top-sellers",
  },
  {
    id: 4,
    name: "Rice & Ofada Sauce",
    description: "Local white rice with spicy ofada sauce and egg",
    price: 2200,
    image: "/images/ofada.png",
    category: "top-sellers",
  },

  // Rice Dishes
  {
    id: 5,
    name: "Coconut Rice",
    description: "Rich coconut flavored rice served with chicken",
    price: 2700,
    image: "/images/jollof-chicken.png",
    category: "rice",
  },
  {
    id: 6,
    name: "White Rice & Stew",
    description: "Steamed white rice served with peppered tomato stew",
    price: 2000,
    image: "/images/white-rice-stew.png",
    category: "rice",
  },
  {
    id: 7,
    name: "Fried Rice & Turkey",
    description: "Golden fried rice with peppered turkey and salad",
    price: 2800,
    image: "/images/fried-rice-turkey.png",
    category: "rice",
  },
  {
    id: 8,
    name: "Rice & Ofada Sauce",
    description: "Local white rice with spicy ofada sauce and egg",
    price: 2200,
    image: "/images/ofada.png",
    category: "rice",
  },

  // Soups & Swallow
  {
    id: 9,
       name: "Okro Soup with Eba",
    description: "Delicious okro soup served with eba",
    price: 2800,
    image: "/images/okro-eba.png",
    category: "soups",
  
  },
  {
    id: 10,
    name: "Ogbono Soup with Eba",
    description: "Draw soup made from ogbono seeds served with eba",
    price: 2900,
    image: "/images/ogbono-eba.png",
    category: "soups",
  },
  {
    id: 11,
    name: "Egusi Soup with Pounded Yam",
    description: "Melon seed soup with soft pounded yam",
    price: 3200,
    image: "/images/egusi-pounded-yam.png",
    category: "soups",
  },
  {
    id: 12,
    name: "Afang Soup with Semovita",
    description: "Vegetable afang soup served with smooth semovita",
    price: 3000,
    image: "/images/afang-semovita.png",
    category: "soups",
  },
//   {
//     id: 13,
//    name: "Amala & Ewedu",
//     description: "Yam flour served with ewedu soup and gbegiri",
//     price: 2800,
//     image: "/images/amala-ewedu.png",
//     category: "soups",
//   },

  // Grilled Foods
  {
    id: 14,
    name: "Grilled Catfish",
    description: "Peppered grilled catfish with sauce",
    price: 3500,
    image: "/images/grilled-catfish.png",
    category: "grilled",
  },
  {
    id: 15,
    name: "Grilled Suya Chicken Thighs",
    description: "Tender chicken thighs spiced with suya pepper mix",
    price: 3200,
    image: "/images/suya-chicken.png",
    category: "grilled",
  },
//   {
//     id: 16,
//     name: "Peppered Grilled Fish",
//     description: "Charcoal grilled fish in hot pepper sauce",
//     price: 3500,
//     image: "/images/peppered-grilled-fish.png",
//     category: "grilled",
//   },
  {
    id: 17,
    name: "Grilled Turkey Wings",
    description: "Juicy turkey wings roasted and peppered",
    price: 3000,
    image: "/images/grilled-turkey.png",
    category: "grilled",
  },
  {
    id: 18,
    name: "Charcoal Grilled Goat Meat",
    description: "Smoky goat meat roasted over charcoal fire",
    price: 3800,
    image: "/images/grilled-goat.png",
    category: "grilled",
  },

  // Drinks
  {
    id: 19,
    name: "Chapman",
    description: "Classic Nigerian fruity cocktail",
    price: 1500,
    image: "/images/chapman.png",
    category: "drinks",
  },
  {
    id: 20,
    name: "Zobo Drink (Hibiscus Punch)",
    description: "Refreshing hibiscus flower punch with spices",
    price: 1000,
    image: "/images/zobo.png",
    category: "drinks",
  },
  {
    id: 21,
    name: "Tiger & Coconut Milk Drink",
    description: "Sweet blend of tiger nuts and coconut milk",
    price: 1800,
    image: "/images/tiger-coconut.png",
    category: "drinks",
  },
  {
    id: 22,
    name: "Bottled Water & Soft Drinks",
    description: "Chilled bottled water and assorted soft drinks",
    price: 500,
    image: "/images/water-softdrinks.png",
    category: "drinks",
  },
];
