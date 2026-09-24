"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Minus, Plus, Search, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/CartContext";

export type BukaMenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock?: number;
  categoryId: string;
};

export type BukaMenuCategory = { id: string; name: string };

const STORE = "buka";
const ALL = "all";

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function BukaMenu({ items, categories }: { items: BukaMenuItem[]; categories: BukaMenuCategory[] }) {
  const [active, setActive] = useState<string>(ALL);
  const [query, setQuery] = useState("");
  const { getCartCount, getCartTotal } = useCart();
  const cartCount = getCartCount(STORE);

  // <body> has overflow-x hidden, which breaks position: sticky — pin the filter bar manually
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setPinned(!entry.isIntersecting && entry.boundingClientRect.top < 0), {
      rootMargin: "-100px 0px 0px 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const selectCategory = (id: string) => {
    setActive(id);
    if (pinned) sentinelRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const visibleSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = (i: BukaMenuItem) =>
      !q || i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q);

    return categories
      .filter((c) => active === ALL || c.id === active)
      .map((c) => ({ ...c, items: items.filter((i) => i.categoryId === c.id && matches(i)) }))
      .filter((s) => s.items.length > 0);
  }, [items, categories, active, query]);

  return (
    <div className="bg-[#faf7f2] min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden bg-[#140b08] text-white">
        <Image
          src="/bgbuka.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-10 pt-36 pb-14 md:pt-40 md:pb-20">
          <p className="mb-3 text-base md:text-lg font-semibold text-[#FF4D4D]">Prixair Buka</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">Our Menu</h1>
          <p className="mt-4 max-w-xl text-white/75 text-base md:text-lg leading-relaxed">
            Authentic Nigerian home cooking, prepared fresh every day. Add dishes to your order and check out when
            you&apos;re ready.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div ref={sentinelRef} className="scroll-mt-[100px]" />
      {pinned && <div className="h-[117px] md:h-[65px]" />}
      <div
        className={`${pinned ? "fixed top-[100px] inset-x-0 shadow-[0_8px_20px_-12px_rgba(0,0,0,0.2)]" : "relative"} z-30 bg-[#faf7f2]/95 backdrop-blur-md border-b border-black/5`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-3 flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-5 px-5 md:mx-0 md:px-0 flex-1">
            <CategoryChip label="All" active={active === ALL} onClick={() => selectCategory(ALL)} />
            {categories.map((c) => (
              <CategoryChip key={c.id} label={c.name} active={active === c.id} onClick={() => selectCategory(c.id)} />
            ))}
          </div>
          <label className="relative md:w-64 flex-shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes"
              className="w-full h-10 pl-10 pr-4 rounded-full bg-white border border-black/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#FE0000]/30"
            />
          </label>
        </div>
      </div>

      {/* Sections */}
      <main className="max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-14 space-y-14">
        {items.length === 0 ? (
          <EmptyState text="The menu is being updated. Please check back shortly." />
        ) : visibleSections.length === 0 ? (
          <EmptyState text={`No dishes match “${query}”.`} />
        ) : (
          visibleSections.map((section) => (
            <section key={section.id}>
              <div className="flex items-baseline justify-between mb-5">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">{section.name}</h2>
                <span className="text-sm text-gray-400">
                  {section.items.length} {section.items.length === 1 ? "dish" : "dishes"}
                </span>
              </div>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                variants={gridVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
              >
                {section.items.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </motion.div>
            </section>
          ))
        )}
      </main>

      {/* Checkout bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-5 inset-x-0 z-40 px-5 flex justify-center pointer-events-none">
          <Link
            href="/buka/cart"
            className="pointer-events-auto flex items-center gap-4 bg-[#FE0000] hover:bg-[#D90000] text-white pl-5 pr-6 py-3.5 rounded-full shadow-[0_15px_40px_-10px_rgba(254,0,0,0.6)] transition-colors"
          >
            <span className="flex items-center gap-2 font-bold text-sm">
              <ShoppingBag className="w-5 h-5" />
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </span>
            <span className="w-px h-5 bg-white/30" />
            <span className="font-bold text-sm">View order · ₦{getCartTotal(STORE).toLocaleString()}</span>
          </Link>
        </div>
      )}
    </div>
  );
}

function CategoryChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 h-10 px-5 rounded-full text-sm font-semibold transition-colors ${
        active ? "bg-[#FE0000] text-white" : "bg-white text-gray-700 border border-black/10 hover:border-black/20"
      }`}
    >
      {label}
    </button>
  );
}

function EmptyState({ text }: { text: string }) {
  return <p className="py-24 text-center text-gray-500">{text}</p>;
}

function MenuCard({ item }: { item: BukaMenuItem }) {
  const { addItem, updateQty, getCartItems } = useCart();
  const qty = getCartItems(STORE).find((i) => i.id === item.id)?.qty ?? 0;
  const outOfStock = item.stock === 0;
  const atLimit = item.stock !== undefined && qty >= item.stock;

  const add = () =>
    addItem({ id: item.id, name: item.name, price: item.price, qty: 1, image: item.image, stock: item.stock, store: STORE });

  return (
    <motion.div
      variants={cardVariants}
      className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-black/5 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)] transition-shadow duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className={`object-cover transition-transform duration-700 group-hover:scale-105 ${outOfStock ? "grayscale" : ""}`}
        />
        {outOfStock && (
          <span className="absolute top-3 left-3 bg-black/70 text-white text-xs font-bold px-3 py-1 rounded-full">
            Sold out
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-base leading-snug text-gray-900">{item.name}</h3>
        {item.description && (
          <p className="mt-1.5 text-sm text-gray-500 leading-relaxed line-clamp-2">{item.description}</p>
        )}

        <div className="mt-auto pt-5 flex items-center justify-between gap-3">
          <span className="text-lg font-extrabold text-gray-900">₦{item.price.toLocaleString()}</span>

          {qty > 0 ? (
            <div className="flex items-center gap-1 rounded-full bg-[#FE0000]/10 p-1">
              <button
                onClick={() => updateQty(item.id, STORE, qty - 1)}
                aria-label={`Remove one ${item.name}`}
                className="w-8 h-8 rounded-full bg-white text-gray-800 flex items-center justify-center shadow-sm active:scale-90 transition-transform"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 text-center text-sm font-bold text-gray-900">{qty}</span>
              <button
                onClick={() => updateQty(item.id, STORE, qty + 1)}
                disabled={atLimit}
                aria-label={`Add one more ${item.name}`}
                className="w-8 h-8 rounded-full bg-[#FE0000] text-white flex items-center justify-center shadow-sm active:scale-90 transition-transform disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={add}
              disabled={outOfStock}
              className="inline-flex items-center gap-1.5 h-10 pl-4 pr-5 rounded-full bg-[#FE0000] hover:bg-[#D90000] text-white text-sm font-bold transition-colors active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
