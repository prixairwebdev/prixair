"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/contexts/WishlistContext";
import { useAuth } from "@/components/contexts/AuthContext";
import { useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { getCartCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const cartCount = getCartCount('supermarket');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/supermarket/products?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="bg-orange-500 text-white text-center text-xs py-1 px-4">
        Call +234 70 588 68549 to Order
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 px-4 md:px-6 py-4">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/supermarket">
            <div className="relative">
              <Image
                src="/prixairmall.png"
                alt="Prixair Mall Logo"
                width={130}
                height={40}
                className="h-auto w-[100px] md:w-[130px]"
                priority
              />
            </div>
          </Link>

          {/* Mobile: Wishlist + Cart + Burger */}
          <div className="flex md:hidden gap-3 items-center">
            <Link href="/supermarket/account/wishlist" className="text-black relative">
              ❤️
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <Link href="/supermarket/cart" className="text-black relative">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="text-2xl leading-none"
            >
              {showUserMenu ? '✕' : '☰'}
            </button>
          </div>
        </div>

        <div className="flex w-full flex-1">
          <input
            className="w-full border border-gray-300 rounded-l-md px-4 py-2 text-black text-sm md:text-base focus:outline-none focus:ring-1 focus:ring-orange-500"
            placeholder="Search Products, Brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSearch}
            className="bg-orange-500 text-white px-4 md:px-6 rounded-r-md hover:bg-orange-600 transition-colors text-sm md:text-base font-medium"
          >
            Search
          </button>
        </div>

        <nav className="hidden md:flex gap-6 text-sm items-center">
          <div className="relative">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="text-black hover:text-orange-600 font-medium transition-colors"
                >
                  👤 {user.name}
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <Link
                      href="/supermarket/account"
                      className="block px-4 py-2 text-black hover:bg-gray-100 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Account
                    </Link>
                    <Link
                      href="/supermarket/account/orders"
                      className="block px-4 py-2 text-black hover:bg-gray-100 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Orders
                    </Link>
                    <Link
                      href="/supermarket/account/wishlist"
                      className="block px-4 py-2 text-black hover:bg-gray-100 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Wishlist
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/supermarket/account/login" className="text-black hover:text-orange-600 font-medium transition-colors">
                Login / Register
              </Link>
            )}
          </div>

          <Link href="/supermarket/account/wishlist" className="text-black hover:text-orange-600 relative transition-colors">
            ❤️ Wishlist
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link href="/supermarket/cart" className="text-black hover:text-orange-600 relative transition-colors font-medium">
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Dropdown Menu */}
        {showUserMenu && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b shadow-lg z-40 py-4 px-6 flex flex-col gap-4">
            {user ? (
              <>
                <div className="font-bold border-b pb-2 text-black">👤 {user.name}</div>
                <Link href="/supermarket/account" className="text-black py-1" onClick={() => setShowUserMenu(false)}>My Account</Link>
                <Link href="/supermarket/account/orders" className="text-black py-1" onClick={() => setShowUserMenu(false)}>My Orders</Link>
                <Link href="/supermarket/account/wishlist" className="text-black py-1" onClick={() => setShowUserMenu(false)}>Wishlist</Link>
                <button
                  onClick={() => { logout(); setShowUserMenu(false); }}
                  className="text-red-600 text-left py-1 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/supermarket/account/login" className="text-black font-medium" onClick={() => setShowUserMenu(false)}>
                Login / Register
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
