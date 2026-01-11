import { Product, User, Order, Review, Address } from '../types/types';

export const dummyUsers: User[] = [
  {
    id: 'user-1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    phone: '+234 70 588 68549',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'user-2',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    phone: '+234 80 123 45678',
    createdAt: '2024-02-20T14:30:00Z',
  },
];

export const dummyProducts: Product[] = [
  // Supermarket - Dairy & Eggs
  { id: 'sm-1', name: 'Fresh Milk 1L', description: 'Full cream fresh milk from local farms', price: 4.5, image: '/img/foodimg/milk.jpg', category: 'Dairy & Eggs', stock: 24, rating: 4.5, reviewCount: 12, store: 'supermarket' },
  { id: 'sm-2', name: 'Eggs (12)', description: 'Free range eggs, farm fresh', price: 6.0, image: '/img/foodimg/eggs.jpg', category: 'Dairy & Eggs', stock: 60, rating: 4.8, reviewCount: 25, store: 'supermarket' },
  { id: 'sm-3', name: 'Butter 250g', description: 'Premium salted butter', price: 8.5, image: '/img/foodimg/butter.jpg', category: 'Dairy & Eggs', stock: 30, rating: 4.6, reviewCount: 8, store: 'supermarket' },
  { id: 'sm-4', name: 'Yogurt 500ml', description: 'Natural yogurt, no added sugar', price: 5.2, image: '/img/foodimg/yogurt.jpg', category: 'Dairy & Eggs', stock: 40, rating: 4.4, reviewCount: 15, store: 'supermarket' },
  
  // Supermarket - Bakery
  { id: 'sm-5', name: 'Brown Bread', description: 'Whole wheat bread, freshly baked', price: 2.0, image: '/img/foodimg/bread.jpg', category: 'Bakery', stock: 40, rating: 4.7, reviewCount: 30, store: 'supermarket' },
  { id: 'sm-6', name: 'White Bread', description: 'Soft white bread, perfect for sandwiches', price: 1.8, image: '/img/foodimg/white-bread.jpg', category: 'Bakery', stock: 50, rating: 4.5, reviewCount: 22, store: 'supermarket' },
  { id: 'sm-7', name: 'Croissants (6)', description: 'Buttery French croissants', price: 7.5, image: '/img/foodimg/croissants.jpg', category: 'Bakery', stock: 20, rating: 4.9, reviewCount: 18, store: 'supermarket' },
  
  // Supermarket - Fruits & Vegetables
  { id: 'sm-8', name: 'Tomatoes (1kg)', description: 'Fresh farm tomatoes', price: 3.2, image: '/img/foodimg/tomatoes.jpg', category: 'Fruits & Vegetables', stock: 30, rating: 4.3, reviewCount: 10, store: 'supermarket' },
  { id: 'sm-9', name: 'Bananas (1kg)', description: 'Ripe yellow bananas', price: 2.5, image: '/img/foodimg/bananas.jpg', category: 'Fruits & Vegetables', stock: 50, rating: 4.6, reviewCount: 20, store: 'supermarket' },
  { id: 'sm-10', name: 'Apples (1kg)', description: 'Crisp red apples', price: 5.0, image: '/img/foodimg/apples.jpg', category: 'Fruits & Vegetables', stock: 35, rating: 4.7, reviewCount: 14, store: 'supermarket' },
  { id: 'sm-11', name: 'Onions (1kg)', description: 'Fresh red onions', price: 2.8, image: '/img/foodimg/onions.jpg', category: 'Fruits & Vegetables', stock: 45, rating: 4.2, reviewCount: 8, store: 'supermarket' },
  { id: 'sm-12', name: 'Carrots (1kg)', description: 'Organic carrots', price: 3.5, image: '/img/foodimg/carrots.jpg', category: 'Fruits & Vegetables', stock: 40, rating: 4.5, reviewCount: 12, store: 'supermarket' },
  
  // Supermarket - Meat & Poultry
  { id: 'sm-13', name: 'Chicken Breast (1kg)', description: 'Fresh boneless chicken breast', price: 12.0, image: '/img/foodimg/chicken.jpg', category: 'Meat & Poultry', stock: 25, rating: 4.8, reviewCount: 35, store: 'supermarket' },
  { id: 'sm-14', name: 'Beef Steak (500g)', description: 'Premium beef steak', price: 18.5, image: '/img/foodimg/beef.jpg', category: 'Meat & Poultry', stock: 15, rating: 4.9, reviewCount: 28, store: 'supermarket' },
  { id: 'sm-15', name: 'Pork Chops (1kg)', description: 'Fresh pork chops', price: 14.0, image: '/img/foodimg/pork.jpg', category: 'Meat & Poultry', stock: 20, rating: 4.6, reviewCount: 16, store: 'supermarket' },
  
  // Supermarket - Beverages
  { id: 'sm-16', name: 'Chivita Fruit Juice 1L', description: 'Mixed fruit juice', price: 4.8, image: '/img/foodimg/juice.jpg', category: 'Beverages', stock: 50, rating: 4.7, reviewCount: 40, store: 'supermarket' },
  { id: 'sm-17', name: 'Coca Cola 2L', description: 'Classic Coca Cola', price: 3.5, image: '/img/foodimg/coke.jpg', category: 'Beverages', stock: 60, rating: 4.8, reviewCount: 55, store: 'supermarket' },
  { id: 'sm-18', name: 'Bottled Water 1.5L', description: 'Pure drinking water', price: 1.5, image: '/img/foodimg/water.jpg', category: 'Beverages', stock: 100, rating: 4.5, reviewCount: 30, store: 'supermarket' },
  
  // Supermarket - Pantry
  { id: 'sm-19', name: 'Rice (5kg)', description: 'Premium long grain rice', price: 15.0, image: '/img/foodimg/rice.jpg', category: 'Pantry', stock: 40, rating: 4.6, reviewCount: 45, store: 'supermarket' },
  { id: 'sm-20', name: 'Pasta (500g)', description: 'Italian spaghetti', price: 3.8, image: '/img/foodimg/pasta.jpg', category: 'Pantry', stock: 55, rating: 4.5, reviewCount: 22, store: 'supermarket' },
  { id: 'sm-21', name: 'Olive Oil 500ml', description: 'Premium extra virgin olive oil', price: 12.0, image: '/img/foodimg/olive_oil.jpg', category: 'Pantry', stock: 15, rating: 4.9, reviewCount: 38, store: 'supermarket' },
  { id: 'sm-22', name: 'Sugar (1kg)', description: 'White granulated sugar', price: 2.5, image: '/img/foodimg/sugar.jpg', category: 'Pantry', stock: 70, rating: 4.3, reviewCount: 18, store: 'supermarket' },
  
  // Pharmacy
  { id: 'ph-1', name: 'Aspirin 100mg (20)', description: 'Pain relief tablets', price: 3.5, image: '/img/foodimg/aspirin.jpg', category: 'Medicine', stock: 120, rating: 4.7, reviewCount: 25, store: 'pharmacy' },
  { id: 'ph-2', name: 'Paracetamol 500mg (24)', description: 'Fever and pain relief', price: 4.0, image: '/img/foodimg/paracetamol.jpg', category: 'Medicine', stock: 150, rating: 4.8, reviewCount: 40, store: 'pharmacy' },
  { id: 'ph-3', name: 'Vitamin C Tablets', description: 'Immune support supplement', price: 8.5, image: '/img/foodimg/vitamin-c.jpg', category: 'Supplements', stock: 80, rating: 4.6, reviewCount: 30, store: 'pharmacy' },
  
  // Bakery
  { id: 'bk-1', name: 'Chocolate Cake', description: 'Rich chocolate layer cake', price: 25.0, image: '/img/foodimg/chocolate-cake.jpg', category: 'Cakes', stock: 10, rating: 4.9, reviewCount: 50, store: 'bakery' },
  { id: 'bk-2', name: 'Donuts (6)', description: 'Assorted glazed donuts', price: 8.0, image: '/img/foodimg/donuts.jpg', category: 'Pastries', stock: 30, rating: 4.7, reviewCount: 35, store: 'bakery' },
  { id: 'bk-3', name: 'Baguette', description: 'Fresh French baguette', price: 3.5, image: '/img/foodimg/baguette.jpg', category: 'Bread', stock: 25, rating: 4.8, reviewCount: 28, store: 'bakery' },
];

export const dummyAddresses: Address[] = [
  {
    id: 'addr-1',
    userId: 'user-1',
    name: 'John Doe',
    phone: '+234 70 588 68549',
    street: '123 Main Street, Apartment 4B',
    city: 'Lagos',
    state: 'Lagos State',
    zipCode: '100001',
    country: 'Nigeria',
    isDefault: true,
    type: 'both',
  },
  {
    id: 'addr-2',
    userId: 'user-1',
    name: 'John Doe (Office)',
    phone: '+234 70 588 68549',
    street: '456 Business Avenue, Floor 3',
    city: 'Lagos',
    state: 'Lagos State',
    zipCode: '100002',
    country: 'Nigeria',
    isDefault: false,
    type: 'shipping',
  },
];

export const dummyReviews: Review[] = [
  {
    id: 'rev-1',
    productId: 'sm-1',
    userId: 'user-1',
    userName: 'John Doe',
    rating: 5,
    comment: 'Excellent quality milk! Fresh and tasty.',
    createdAt: '2024-03-10T08:30:00Z',
    helpful: 8,
  },
  {
    id: 'rev-2',
    productId: 'sm-1',
    userId: 'user-2',
    userName: 'Jane Smith',
    rating: 4,
    comment: 'Good milk, but could be colder when delivered.',
    createdAt: '2024-03-12T14:20:00Z',
    helpful: 3,
  },
  {
    id: 'rev-3',
    productId: 'sm-13',
    userId: 'user-1',
    userName: 'John Doe',
    rating: 5,
    comment: 'Best chicken breast I\'ve bought! Very fresh and tender.',
    createdAt: '2024-03-15T10:00:00Z',
    helpful: 12,
  },
];

export const dummyOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    userId: 'user-1',
    items: [
      { productId: 'sm-1', name: 'Fresh Milk 1L', price: 4.5, quantity: 2, image: '/img/foodimg/milk.jpg' },
      { productId: 'sm-5', name: 'Brown Bread', price: 2.0, quantity: 3, image: '/img/foodimg/bread.jpg' },
      { productId: 'sm-13', name: 'Chicken Breast (1kg)', price: 12.0, quantity: 1, image: '/img/foodimg/chicken.jpg' },
    ],
    total: 27.0,
    status: 'delivered',
    shippingAddress: dummyAddresses[0],
    paymentMethod: 'paypal',
    trackingNumber: 'TRK123456789',
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-05T16:30:00Z',
  },
  {
    id: 'ORD-2024-002',
    userId: 'user-1',
    items: [
      { productId: 'sm-8', name: 'Tomatoes (1kg)', price: 3.2, quantity: 2, image: '/img/foodimg/tomatoes.jpg' },
      { productId: 'sm-19', name: 'Rice (5kg)', price: 15.0, quantity: 1, image: '/img/foodimg/rice.jpg' },
    ],
    total: 21.4,
    status: 'shipped',
    shippingAddress: dummyAddresses[0],
    paymentMethod: 'card',
    trackingNumber: 'TRK987654321',
    createdAt: '2024-03-10T14:20:00Z',
    updatedAt: '2024-03-12T09:15:00Z',
  },
  {
    id: 'ORD-2024-003',
    userId: 'user-1',
    items: [
      { productId: 'bk-1', name: 'Chocolate Cake', price: 25.0, quantity: 1, image: '/img/foodimg/chocolate-cake.jpg' },
    ],
    total: 25.0,
    status: 'processing',
    shippingAddress: dummyAddresses[1],
    paymentMethod: 'paypal',
    createdAt: '2024-03-18T11:00:00Z',
    updatedAt: '2024-03-18T11:00:00Z',
  },
];
