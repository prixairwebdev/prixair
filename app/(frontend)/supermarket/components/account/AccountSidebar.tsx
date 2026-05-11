"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/contexts/AuthContext";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Heart,
  MapPin,
  User,
  Star,
  LogOut,
  ShoppingBag,
} from "lucide-react";

const NAV = [
  { href: "/supermarket/account", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/supermarket/account/orders", label: "Orders", icon: Package },
  { href: "/supermarket/account/wishlist", label: "Wishlist", icon: Heart },
  { href: "/supermarket/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/supermarket/account/profile", label: "Profile", icon: User },
  { href: "/supermarket/account/reviews", label: "Reviews", icon: Star },
];

export function AccountSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <>
      {/* ── Mobile: horizontal scrollable tab strip ── */}
      <nav className="lg:hidden w-full overflow-x-auto scrollbar-none -mx-4 px-4">
        <div className="flex items-center gap-1 pb-1 min-w-max">
          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const active = isActive(href, exact);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  active
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-orange-200 hover:text-orange-500"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            );
          })}
          <button
            onClick={() => { logout(); router.push("/supermarket"); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap text-red-500 border border-red-100 hover:bg-red-50 transition-colors flex-shrink-0"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </nav>

      {/* ── Desktop: vertical sidebar ── */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        {/* Profile card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const active = isActive(href, exact);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors border-b border-gray-50 last:border-0 ${
                  active
                    ? "bg-orange-50 text-orange-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-orange-500" : "text-gray-400"}`} />
                {label}
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500" />}
              </Link>
            );
          })}

          <div className="border-t border-gray-100">
            <Link
              href="/supermarket"
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors border-b border-gray-50"
            >
              <ShoppingBag className="w-4 h-4 text-gray-400" />
              Continue Shopping
            </Link>
            <button
              onClick={() => { logout(); router.push("/supermarket"); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}
