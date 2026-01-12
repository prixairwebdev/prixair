export interface Media {
  id: string;
  alt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
}

export interface Category {
  id: string;
  name: string;
  slug?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string | Media;
  category: string | Category;
  stock?: number;
  rating?: number;
  reviewCount?: number;
  store: 'supermarket' | 'bakery' | 'pharmacy';
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
  stock?: number;
  store?: 'supermarket' | 'bakery' | 'pharmacy';
}

export interface Address {
  id: string;
  userId: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  type: 'shipping' | 'billing' | 'both';
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: 'paypal' | 'card';
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  product: Product;
  addedAt: string;
}
