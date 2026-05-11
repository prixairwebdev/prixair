'use client';
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useCart } from "@/components/CartContext";

export interface MenuItem {
  id: string;
  name: string;
  price: string | number;
  image: string;
  description?: string;
  store?: 'supermarket' | 'bakery' | 'pharmacy' | 'noodlelicious' | 'toastpan' | 'gavi' | 'seaside' | 'iyanvillage' | 'shawarmanownow' | 'party-jollof';
}

interface BrandMenuProps {
  bestSellers: MenuItem[];
  dailySpecials: MenuItem[];
  accentColor?: string;
  onViewAllClick?: () => void;
  store?: 'supermarket' | 'bakery' | 'pharmacy' | 'noodlelicious' | 'toastpan' | 'gavi' | 'seaside' | 'iyanvillage' | 'shawarmanownow' | 'party-jollof';
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const BrandMenu: React.FC<BrandMenuProps> = ({
  bestSellers,
  dailySpecials,
  accentColor = "#B5D04E",
  onViewAllClick,
  store
}) => {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Best Sellers */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: accentColor }}>
              Fan Favourites
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Best-Sellers</h2>
          </div>
          {onViewAllClick && (
            <button
              onClick={onViewAllClick}
              className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors underline underline-offset-4"
            >
              View full menu
            </button>
          )}
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {bestSellers.map((item, index) => (
            <MenuItemCard key={item.id || index} item={item} accentColor={accentColor} storeSlug={store} />
          ))}
        </motion.div>

        {/* Daily Specials */}
        {dailySpecials.length > 0 && (
          <>
            <div className="mb-10">
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: accentColor }}>
                Today only
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Daily Specials</h2>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {dailySpecials.map((item, index) => (
                <MenuItemCard key={item.id || index} item={item} accentColor={accentColor} storeSlug={store} />
              ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

const MenuItemCard = ({ item, accentColor, storeSlug }: { item: MenuItem; accentColor: string; storeSlug?: string }) => {
  const { addItem, updateQty, getCartItems } = useCart();
  const store = item.store || storeSlug || 'noodlelicious';
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
    addItem({ id: item.id, name: item.name, price: numericPrice, qty: 1, image: item.image, store });
  };

  const formattedPrice = typeof item.price === 'number'
    ? `₦${item.price.toLocaleString()}`
    : item.price;

  return (
    <motion.div
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
      variants={itemVariants}
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-50">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm font-bold text-gray-900 leading-snug">{item.name}</h3>
          <span className="text-sm font-bold flex-shrink-0" style={{ color: accentColor }}>
            {formattedPrice}
          </span>
        </div>

        {item.description && (
          <p className="text-gray-400 text-xs mb-4 line-clamp-2 leading-relaxed">{item.description}</p>
        )}

        {qtyInCart > 0 ? (
          <div className="flex items-center justify-between rounded-xl p-1" style={{ backgroundColor: `${accentColor}15` }}>
            <button
              onClick={() => updateQty(item.id, store, qtyInCart - 1)}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-white shadow-sm text-gray-700 hover:bg-gray-50 transition-all active:scale-90"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-sm font-bold text-gray-900">{qtyInCart}</span>
            <button
              onClick={() => updateQty(item.id, store, qtyInCart + 1)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-white shadow-sm transition-all hover:opacity-90 active:scale-90"
              style={{ backgroundColor: accentColor }}
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            className="w-full flex items-center justify-center gap-1.5 text-white py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 hover:opacity-90"
            style={{ backgroundColor: accentColor }}
          >
            <Plus className="w-3.5 h-3.5" />
            Add to order
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default BrandMenu;
