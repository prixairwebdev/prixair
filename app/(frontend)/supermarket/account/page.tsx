"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/components/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useOrders } from "@/components/contexts/OrderContext";
import { AccountSidebar } from "../components/account/AccountSidebar";
import { Package, Heart, MapPin, ChevronRight, Clock } from "lucide-react";

const STATUS_STYLES: Record<string, string> = {
  delivered: "bg-green-100 text-green-700",
  shipped: "bg-blue-100 text-blue-700",
  processing: "bg-amber-100 text-amber-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AccountPage() {
  const { user } = useAuth();
  const { orders } = useOrders();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/supermarket/account/login");
  }, [user, router]);

  if (!user) return null;

  const userOrders = orders.filter((o) => o.userId === user.id);
  const recentOrders = userOrders.slice(0, 3);

  const stats = [
    { label: "Total Orders", value: userOrders.length, icon: Package, color: "bg-blue-50 text-blue-600" },
    { label: "Delivered", value: userOrders.filter((o) => o.status === "delivered").length, icon: Package, color: "bg-green-50 text-green-600" },
    { label: "Saved Items", value: 0, icon: Heart, color: "bg-pink-50 text-pink-600" },
    { label: "Addresses", value: 0, icon: MapPin, color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <h1 className="text-xl font-bold text-gray-900">My Account</h1>
          <p className="text-sm text-gray-500 mt-0.5">Welcome back, {user.name.split(" ")[0]}!</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        <AccountSidebar />

        <main className="flex-1 min-w-0 space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center mb-3`}>
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Recent orders */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <h2 className="font-semibold text-gray-900">Recent Orders</h2>
              <Link href="/supermarket/account/orders" className="text-xs text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1">
                View all <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentOrders.length === 0 ? (
              <div className="py-12 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 mb-4">No orders yet</p>
                <Link href="/supermarket" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <div key={order.id} className="px-5 py-4 flex items-center gap-4">
                    <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Order #{order.id}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        {" · "}{order.items.length} item{order.items.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[order.status] || "bg-gray-100 text-gray-600"}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">₦{order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/supermarket/account/addresses" className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:border-orange-200 hover:shadow-md transition-all group">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                <MapPin className="w-5 h-5 text-purple-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">Manage Addresses</p>
                <p className="text-xs text-gray-500">Add or edit delivery locations</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
            </Link>
            <Link href="/supermarket/account/wishlist" className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:border-orange-200 hover:shadow-md transition-all group">
              <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center group-hover:bg-pink-100 transition-colors">
                <Heart className="w-5 h-5 text-pink-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">Wishlist</p>
                <p className="text-xs text-gray-500">Items you&apos;ve saved for later</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
