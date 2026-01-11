export type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
  stock?: number;
  description?: string;
};

export const products: Product[] = [
  { id: "1", name: "Fresh Milk 1L", price: 4.5, image: "/img/foodimg/milk.jpg", stock: 24, description: "Full cream fresh milk." },
  { id: "2", name: "Brown Bread", price: 2.0, image: "/img/foodimg/bread.jpg", stock: 40, description: "Whole wheat bread - bakery." },
  { id: "3", name: "Eggs (12)", price: 6.0, image: "/img/foodimg/eggs.jpg", stock: 60, description: "Free range eggs." },
  { id: "4", name: "Aspirin 100mg (20)", price: 3.5, image: "/img/foodimg/aspirin.jpg", stock: 120, description: "Pharmacy OTC." },
  { id: "5", name: "Tomatoes (1kg)", price: 3.2, image: "/img/foodimg/tomatoes.jpg", stock: 30, description: "Fresh farm tomatoes." },
  { id: "6", name: "Olive Oil 500ml", price: 12.0, image: "/img/foodimg/olive_oil.jpg", stock: 15, description: "Premium olive oil." }
];
