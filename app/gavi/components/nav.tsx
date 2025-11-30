'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, FC, ReactNode } from 'react';
import { FiShoppingCart, FiSearch, FiMenu, FiX } from 'react-icons/fi';

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
            <FiShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              1
            </span>
          </div>
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
