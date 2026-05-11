"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Resolve PayloadCMS Media object or plain string to a URL
function resolveImage(image: string | { url?: string | null } | null | undefined): string {
  if (!image) return "";
  if (typeof image === "string") return image;
  return image.url || "";
}

// Thumbnail with fallback to a colored initial badge
function ProductThumb({
  image,
  name,
}: {
  image: string | { url?: string | null } | null | undefined;
  name: string;
}) {
  const [errored, setErrored] = useState(false);
  const colors = [
    "bg-orange-100 text-orange-600",
    "bg-amber-100 text-amber-600",
    "bg-green-100 text-green-600",
    "bg-blue-100 text-blue-600",
    "bg-purple-100 text-purple-600",
    "bg-rose-100 text-rose-600",
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  const src = resolveImage(image);

  if (errored || !src) {
    return (
      <div
        className={`w-10 h-10 flex-shrink-0 flex items-center justify-center font-bold text-sm rounded ${color}`}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }
  return (
    <div className="relative w-10 h-10 flex-shrink-0 bg-gray-100 overflow-hidden rounded">
      <Image
        src={src}
        alt={name}
        fill
        className="object-cover"
        onError={() => setErrored(true)}
        unoptimized
      />
    </div>
  );
}

import {
  Search,
  ShoppingCart,
  Heart,
  User,
  ChevronDown,
  X,
  Menu,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/contexts/WishlistContext";
import { useAuth } from "@/components/contexts/AuthContext";
import { searchProducts } from "@/app/actions/products";
import { Product } from "@/app/actions/supermarket";

const CATEGORIES = [
  "All Products",
  "Dairy & Eggs",
  "Fruits & Vegetables",
  "Meat & Poultry",
  "Bakery",
  "Beverages",
  "Pantry",
  "Snacks",
];

export function Navbar() {
  const { getCartCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user, logout } = useAuth();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cartCount = getCartCount("supermarket");

  // Debounced live search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowResults(false);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const { products } = await searchProducts("supermarket", {
          query: query.trim(),
          limit: 7,
        });
        setResults(products);
        setShowResults(true);
      } catch {
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const menu = document.getElementById("user-menu-wrapper");
      if (menu && !menu.contains(target)) setShowUserMenu(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll on mobile menu
  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMobileMenu]);

  const handleSearch = (q = query) => {
    if (q.trim()) {
      setShowResults(false);
      setQuery(q);
      setShowMobileMenu(false);
      router.push(`/supermarket/products?q=${encodeURIComponent(q.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") {
      setShowResults(false);
      inputRef.current?.blur();
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
    inputRef.current?.focus();
  };

  const goToProduct = (id: string) => {
    setShowResults(false);
    setQuery("");
    router.push(`/supermarket/product/${id}`);
  };

  const SearchBox = ({ className = "" }: { className?: string }) => (
    <div ref={searchRef} className={`relative ${className}`}>
      <div
        className={`flex items-center bg-gray-50 border rounded-lg transition-all duration-200 overflow-hidden ${
          showResults
            ? "border-orange-400 ring-2 ring-orange-100"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <Search className="w-4 h-4 text-gray-400 ml-3 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setShowResults(true)}
          placeholder="Search products…"
          className="flex-1 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 bg-transparent outline-none min-w-0"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="p-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
            aria-label="Clear"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          onClick={() => handleSearch()}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 text-sm font-semibold transition-colors flex-shrink-0 h-full"
        >
          <span className="hidden sm:inline">Search</span>
          <Search className="w-4 h-4 sm:hidden" />
        </button>
      </div>

      {/* Live results dropdown */}
      <AnimatePresence>
        {isSearching && query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-2xl z-50 mt-1 rounded-lg px-4 py-4 space-y-3"
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 animate-pulse flex-shrink-0 rounded" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 bg-gray-100 animate-pulse rounded w-3/4" />
                  <div className="h-2.5 bg-gray-100 animate-pulse rounded w-1/3" />
                </div>
                <div className="h-3 bg-gray-100 animate-pulse rounded w-12" />
              </div>
            ))}
          </motion.div>
        )}

        {!isSearching && showResults && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-2xl z-50 mt-1 rounded-lg overflow-hidden"
          >
            <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
              Products
            </p>
            {results.map((product) => (
              <button
                key={product.id}
                onClick={() => goToProduct(product.id)}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-orange-50 transition-colors text-left group"
              >
                <ProductThumb image={product.image} name={product.name} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {typeof product.category === "string" ? product.category : ""}
                  </p>
                </div>
                <span className="text-sm font-bold text-orange-500 flex-shrink-0">
                  ₦{product.price.toLocaleString()}
                </span>
              </button>
            ))}
            <div className="border-t border-gray-100 px-4 py-3">
              <button
                onClick={() => handleSearch()}
                className="text-sm text-orange-500 font-semibold hover:text-orange-600"
              >
                See all results for &ldquo;{query}&rdquo; →
              </button>
            </div>
          </motion.div>
        )}

        {!isSearching && showResults && query.trim() && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-2xl z-50 mt-1 rounded-lg px-4 py-6 text-center"
          >
            <p className="text-sm text-gray-500">
              No products found for &ldquo;
              <span className="font-medium text-gray-900">{query}</span>&rdquo;
            </p>
            <p className="text-xs text-gray-400 mt-1">Try a different keyword</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <header className="w-full bg-white sticky top-9 z-[60] shadow-sm">
      {/* Announcement bar */}
      <div className="bg-orange-500 text-white text-center text-xs py-1.5 px-4 font-medium">
        <span className="hidden sm:inline">📦 Free delivery on orders over ₦10,000 &nbsp;·&nbsp; </span>
        Call <strong>08181888892</strong>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        {/* ── Row 1: Logo + Actions ── */}
        <div className="flex items-center gap-2 sm:gap-3 py-3">
          {/* Logo */}
          <Link href="/supermarket" className="flex-shrink-0">
            <div className="relative w-[90px] h-[32px] sm:w-[110px] sm:h-[36px] md:w-[120px] md:h-[40px]">
              <Image
                src="/prixairmall.png"
                alt="Prixair Mall"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Search — desktop only in this row */}
          <div className="hidden md:block flex-1">
            <SearchBox />
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-1 flex-shrink-0">
            {/* Account dropdown */}
            <div className="relative" id="user-menu-wrapper">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="hidden lg:block max-w-[80px] truncate">
                  {user ? user.name.split(" ")[0] : "Account"}
                </span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-1 w-52 bg-white border border-gray-200 shadow-xl z-50 rounded-xl overflow-hidden"
                  >
                    {user ? (
                      <>
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                            Signed in as
                          </p>
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {user.name}
                          </p>
                        </div>
                        {[
                          { href: "/supermarket/account", label: "My Account" },
                          { href: "/supermarket/account/orders", label: "My Orders" },
                          { href: "/supermarket/account/wishlist", label: "Wishlist" },
                        ].map(({ href, label }) => (
                          <Link
                            key={href}
                            href={href}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setShowUserMenu(false)}
                          >
                            {label}
                          </Link>
                        ))}
                        <div className="border-t border-gray-100">
                          <button
                            onClick={() => { logout(); setShowUserMenu(false); }}
                            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                          >
                            Sign Out
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/supermarket/account/login"
                          className="block px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/supermarket/account/register"
                          className="block px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50 border-t border-gray-100"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Create Account
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist */}
            <Link
              href="/supermarket/account/wishlist"
              className="relative p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/supermarket/cart"
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold ml-1"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="bg-white text-orange-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile right-side icons */}
          <div className="flex md:hidden items-center gap-0.5 ml-auto flex-shrink-0">
            <Link
              href="/supermarket/account/wishlist"
              className="relative p-2 text-gray-700"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <Link href="/supermarket/cart" className="relative p-2 text-gray-700">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-orange-500 text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 text-gray-700"
              aria-label="Menu"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Row 2: Mobile search bar ── */}
        <div className="md:hidden pb-3">
          <SearchBox />
        </div>

        {/* ── Category strip — desktop only ── */}
        <div className="hidden md:flex items-center gap-5 py-2 border-t border-gray-100 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                router.push(
                  cat === "All Products"
                    ? "/supermarket/products"
                    : `/supermarket/products?category=${encodeURIComponent(cat)}`
                )
              }
              className="whitespace-nowrap text-sm text-gray-500 hover:text-orange-500 font-medium transition-colors py-1 flex-shrink-0"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Mobile slide-down menu ── */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="px-4 py-4">
              {/* Account section */}
              {user ? (
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { href: "/supermarket/account", label: "My Account" },
                      { href: "/supermarket/account/orders", label: "Orders" },
                      { href: "/supermarket/account/wishlist", label: "Wishlist" },
                      { href: "/supermarket/account/profile", label: "Profile" },
                    ].map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        className="text-sm text-gray-700 hover:text-orange-500 bg-gray-50 rounded-lg px-3 py-2 transition-colors font-medium"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                  <button
                    onClick={() => { logout(); setShowMobileMenu(false); }}
                    className="mt-2 text-sm text-red-500 font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 mb-4 pb-4 border-b border-gray-100">
                  <Link
                    href="/supermarket/account/login"
                    className="flex-1 text-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/supermarket/account/register"
                    className="flex-1 text-center border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors hover:bg-gray-50"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Categories */}
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                Categories
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      router.push(
                        cat === "All Products"
                          ? "/supermarket/products"
                          : `/supermarket/products?category=${encodeURIComponent(cat)}`
                      );
                      setShowMobileMenu(false);
                    }}
                    className="text-left text-sm text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg px-3 py-2 transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
