import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white w-full py-16 px-6 md:px-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="max-w-sm">
          <div className="relative h-10 mb-5" style={{ width: "140px" }}>
            <Image src="/homeslogo.png" alt="Prixair Properties" fill className="object-contain brightness-0 invert" />
          </div>
          <p className="text-sm leading-relaxed text-white/50">
            Specialists in premium building construction finishing and interior furnishing materials.
          </p>

          <div className="mt-6 flex items-center gap-4">
            {["X", "FB", "IG", "YT"].map((s) => (
              <span
                key={s}
                className="w-8 h-8 border border-white/20 flex items-center justify-center text-[10px] text-white/50 hover:border-white/60 hover:text-white transition-colors cursor-pointer"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">Categories</h3>
          <ul className="space-y-3 text-sm text-white/60">
            {[
              { name: "Doors", href: "/properties/shop?category=doors" },
              { name: "Tiles", href: "/properties/shop?category=tiles" },
              { name: "Wall Panels", href: "/properties/shop?category=panels" },
              { name: "Wallpapers", href: "/properties/shop?category=wallpapers" },
              { name: "Living Room", href: "/properties/shop?category=living" },
              { name: "Smart Locks", href: "/properties/shop?category=locks" },
            ].map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">Company</h3>
          <ul className="space-y-3 text-sm text-white/60">
            {[
              { name: "About Us", href: "/properties/about" },
              { name: "Blog", href: "/properties/blog" },
              { name: "Careers", href: "/properties/careers" },
              { name: "Terms & Conditions", href: "/properties/terms" },
              { name: "Contact Us", href: "/properties/contact" },
            ].map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">Newsletter</h3>
          <p className="text-sm text-white/50 mb-4">Get updates on new products and promotions.</p>
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
            />
            <button
              type="submit"
              className="w-full py-3 bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/30">© {new Date().getFullYear()} Prixair Properties Nigeria Limited. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/properties/terms" className="text-xs text-white/30 hover:text-white/60 transition-colors">Terms</Link>
          <Link href="/properties/contact" className="text-xs text-white/30 hover:text-white/60 transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
