"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../../../components/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

export function Navbar() {
  const { items } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const cartCount = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="w-full border-b bg-white">
      <div className="bg-orange-500 text-white text-center text-xs py-1">
        Call +234 70 588 68549 to Order
      </div>

      <div className="flex items-center gap-4 px-6 py-4">
        <Link href="/supermarket">
          <div className="relative">
            <Image
              src="/prixairmall.png"
              alt="Prixair Mall Logo"
              width={130}
              height={40}
              className="h-auto"
              priority
            />
          </div>
        </Link>

        <div className="flex flex-1">
          <input
            className="w-full border border-gray-300 rounded-l-md px-4 py-2 text-black"
            placeholder="Search Products, Brands and Categories"
          />
          <button className="bg-orange-500 text-white px-6 rounded-r-md hover:bg-orange-600 transition-colors">
            Search
          </button>
        </div>

        <nav className="flex gap-6 text-sm items-center">
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
      </div>
    </header>
  );
}
