'use client';
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/components/CartContext";
import { useRouter } from "next/navigation";

export interface MenuItem {
  id: string;
  name: string;
  price: string | number;
  image: string;
  description?: string;
  store?: 'supermarket' | 'bakery' | 'pharmacy' | 'noodlelicious' | 'toastpan' | 'gavi' | 'seaside';
}

interface BrandMenuProps {
  bestSellers: MenuItem[];
  dailySpecials: MenuItem[];
  accentColor?: string;
  onViewAllClick?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const BrandMenu: React.FC<BrandMenuProps> = ({
  bestSellers,
  dailySpecials,
  accentColor = "#B5D04E",
  onViewAllClick
}) => {
  const router = useRouter();
  return (
    <section className="bg-[#fcfbf9] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Best Sellers Section */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Our Best-Sellers</h2>
            <p className="text-gray-600">Most loved dishes by our community</p>
          </div>
          {onViewAllClick && (
            <button
              className="bg-white text-gray-900 border-2 border-gray-200 px-6 py-2 rounded-full font-bold hover:bg-gray-50 transition-all"
              onClick={onViewAllClick}
            >
              Full Menu
            </button>
          )}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {bestSellers.map((item, index) => (
            <MenuItemCard key={item.id || index} item={item} accentColor={accentColor} />
          ))}
        </motion.div>

        {/* Daily Specials Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Daily Specials</h2>
          <p className="text-gray-600">Freshly prepared today just for you</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {dailySpecials.map((item, index) => (
            <MenuItemCard key={item.id || index} item={item} accentColor={accentColor} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const MenuItemCard = ({ item, accentColor }: { item: MenuItem; accentColor: string }) => {
  const { addItem, updateQty, getCartItems } = useCart();
  const store = item.store || 'noodlelicious';
  const cartItems = getCartItems(store);
  const cartItem = cartItems.find((i) => i.id === item.id);
  const qtyInCart = cartItem ? cartItem.qty : 0;

  const handleAdd = () => {
    let numericPrice = 0;
    if (typeof item.price === 'string') {
      numericPrice = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
    } else {
      numericPrice = item.price;
    }

    addItem({
      id: item.id,
      name: item.name,
      price: numericPrice,
      qty: 1,
      image: item.image,
      store: store
    });
  };

  return (
    <motion.div
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-gray-100"
      variants={itemVariants}
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-gray-900">
          {typeof item.price === 'number' ? `₦${item.price.toLocaleString()}` : item.price}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
        {item.description && <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>}
        {qtyInCart > 0 ? (
          <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-1 border border-gray-100">
            <button
              onClick={() => updateQty(item.id, store, qtyInCart - 1)}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-sm text-xl font-bold text-gray-900 hover:bg-gray-100 transition-all active:scale-90"
            >
              -
            </button>
            <span className="text-lg font-bold text-gray-900">{qtyInCart}</span>
            <button
              onClick={() => updateQty(item.id, store, qtyInCart + 1)}
              className="w-12 h-12 flex items-center justify-center rounded-xl text-white shadow-sm text-xl font-bold transition-all hover:opacity-90 active:scale-90"
              style={{ backgroundColor: accentColor }}
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            className="w-full text-white py-3 rounded-2xl font-bold transition-all transform active:scale-95"
            style={{ backgroundColor: accentColor }}
          >
            Add to Order
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default BrandMenu;
