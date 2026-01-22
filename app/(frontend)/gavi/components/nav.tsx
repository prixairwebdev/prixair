'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, FC, ReactNode } from 'react';
import { FiShoppingCart, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '@/components/CartContext';
import { useRouter } from 'next/navigation';

// Types for NavLink
type NavLinkProps = {
  href: string;
  children: ReactNode;
};

const NavLink: FC<NavLinkProps> = ({ href, children }) => (
  <Link href={href} className="nav-link">
    {children}
    <span className="underline"></span>
  </Link>
);

const Navbar: FC = () => {
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [showCartModal, setShowCartModal] = useState<boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const { getCartCount } = useCart();
  const router = useRouter();
  const cartCount = getCartCount('gavi');

  const handleCartClick = () => {
    router.push('/supermarket/cart?store=gavi');
  };

  return (
    <>
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-[60]">
        <div className="flex items-center gap-10">
          <Image
            src="/logo.png"
            alt="GAVI Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 text-gray-900 text-md font-bold">
            <button
              onClick={handleCartClick}
              className="relative cursor-pointer hover:text-[#F3A35C] transition-colors"
              aria-label="View Cart"
            >
              <FiShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F3A35C] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          {/* Mobile Cart Icon */}
          <button
            onClick={handleCartClick}
            className="md:hidden relative text-gray-900 hover:text-[#F3A35C] transition-colors mr-4"
            aria-label="View Cart"
          >
            <FiShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#F3A35C] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>
          {/* Hamburger icon for mobile - Now at extreme right */}
          <button
            className="md:hidden block text-gray-900"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle Menu"
          >
            {showMobileMenu ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Sidebar */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setShowMobileMenu(false)}
        >
          <div
            className="absolute top-0 left-0 bg-white w-3/4 h-full shadow-md flex flex-col gap-8 px-8 py-16"
            onClick={e => e.stopPropagation()}
          >
            <NavLink href="/gavi">Home</NavLink>
            <NavLink href="/gavi/menu">Menu</NavLink>
            <NavLink href="/gavi/about">About us</NavLink>
            <NavLink href="/gavi/contact">Contact us</NavLink>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg p-6 w-80 max-w-full relative">
            <button
              className="absolute top-2 right-3 text-lg font-bold"
              onClick={() => setShowSearchModal(false)}
              aria-label="Close"
            >×</button>
            <h2 className="font-bold mb-3">Search</h2>
            <input
              type="text"
              className="border rounded w-full px-3 py-2"
              placeholder="Search the menu..."
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCartModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg p-6 w-80 max-w-full relative">
            <button
              className="absolute top-2 right-3 text-lg font-bold"
              onClick={() => setShowCartModal(false)}
              aria-label="Close"
            >×</button>
            <h2 className="font-bold mb-3">Your Cart</h2>
            <p>Your cart is empty.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
