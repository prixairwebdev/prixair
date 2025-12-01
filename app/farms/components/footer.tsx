import Link from "next/link";
import { Facebook, Instagram, Youtube, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 px-6 lg:px-12">
        {/* Logo & About */}
        <div>
          <img src="/farmlogo.png" alt="PrixairFarm Logo" className="h-10 mb-4" />
          <p className="text-sm mb-6">
            Nurturing the land, feeding the future. Farm-fresh produce, poultry, and more — grown with care right here in Prixair Farms.
          </p>
          <div className="flex space-x-4">
            <Link href="#"><Twitter className="w-5 h-5 hover:text-green-500" /></Link>
            <Link href="#"><Facebook className="w-5 h-5 hover:text-green-500" /></Link>
            <Link href="#"><Instagram className="w-5 h-5 hover:text-green-500" /></Link>
            <Link href="#"><Youtube className="w-5 h-5 hover:text-green-500" /></Link>
            <Link href="#"><Linkedin className="w-5 h-5 hover:text-green-500" /></Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">QUICK LINK</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-green-500">Home</Link></li>
            <li><Link href="/our-farm" className="hover:text-green-500">Our Farm</Link></li>
            <li><Link href="/products" className="hover:text-green-500">Products</Link></li>
            <li><Link href="/gallery" className="hover:text-green-500">Gallery</Link></li>
            <li><Link href="/contact" className="hover:text-green-500">Contact Us</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4">NEWSLETTER</h3>
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Enter name"
              className="w-full bg-gray-800 text-white p-3 rounded-md outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full bg-gray-800 text-white p-3 rounded-md outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition"
            >
              SEND
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
