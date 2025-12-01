import Link from "next/link";
import { FaXTwitter, FaFacebookF, FaInstagram, FaYoutube, FaPinterestP, FaLinkedinIn } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-black text-white w-full py-16 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Left Section */}
        <div className="max-w-sm">
          <img src="/redonelogo.png" alt="Prixair Group" className="h-10 mb-4" />
          <p className="text-sm leading-relaxed text-gray-300">
            We are a trading company that specializes in the retailing of one-of-a-kind building
            construction finishing and interior furnishing materials.
          </p>

          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-3">SOCIALS</h3>
            <div className="flex items-center gap-4 text-xl">
              <FaXTwitter />
              <FaFacebookF />
              <FaInstagram />
              <FaYoutube />
              <FaPinterestP />
              <FaLinkedinIn />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-4 text-sm">CATEGORIES</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Bedroom</li>
            <li>Dining Set</li>
            <li>Doors</li>
            <li>Furnitures</li>
            <li>Wallpapers</li>
            <li>Sanitary wares</li>
            <li>Living room sofa set</li>
          </ul>
        </div>

        {/* Prixair Homes */}
        <div>
          <h3 className="font-semibold mb-4 text-sm">PRIXAIR HOMES</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>About Us</li>
            <li>Careers</li>
            <li>Terms and conditions</li>
            <li>My account</li>
            <li>Contact us</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-4 text-sm">NEWSLETTER</h3>
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Enter name"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-sm focus:outline-none"
            />
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 transition text-white py-2 rounded text-sm"
            >
              SEND
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
