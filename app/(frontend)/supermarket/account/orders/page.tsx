"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/components/contexts/AuthContext";
import { useOrders } from "@/components/contexts/OrderContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AccountSidebar } from "../../components/account/AccountSidebar";
import { Package, ChevronDown, ChevronUp, Truck, CheckCircle, Clock, XCircle, RotateCcw } from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  delivered: { label: "Delivered", color: "bg-green-100 text-green-700", icon: <CheckCircle className="w-4 h-4" /> },
  shipped: { label: "Shipped", color: "bg-blue-100 text-blue-700", icon: <Truck className="w-4 h-4" /> },
  processing: { label: "Processing", color: "bg-amber-100 text-amber-700", icon: <Clock className="w-4 h-4" /> },
  pending: { label: "Pending", color: "bg-gray-100 text-gray-600", icon: <Clock className="w-4 h-4" /> },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-600", icon: <XCircle className="w-4 h-4" /> },
};

export default function OrdersPage() {
  const { user } = useAuth();
  const { orders } = useOrders();
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!user) router.push("/supermarket/account/login");
  }, [user, router]);

  if (!user) return null;

  const userOrders = orders.filter((o) => o.userId === user.id);

  const toggle = (id: string) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <p className="text-xs text-gray-400 mb-1">
            <Link href="/supermarket/account" className="hover:text-orange-500">Account</Link> / Orders
          </p>
          <h1 className="text-xl font-bold text-gray-900">My Orders</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        <AccountSidebar />

        <main className="flex-1 min-w-0">
          {userOrders.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-16 text-center">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-gray-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h2>
              <p className="text-sm text-gray-500 mb-6">Your order history will appear here</p>
              <Link
                href="/supermarket"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {userOrders.map((order) => {
                const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
                const isOpen = expanded === order.id;

                return (
                  <div key={order.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    {/* Order header */}
                    <button
                      onClick={() => toggle(order.id)}
                      className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="w-4 h-4 text-orange-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">Order #{order.id}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                          {" · "}{order.items.length} item{order.items.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className={`hidden sm:flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${status.color}`}>
                          {status.icon}
                          {status.label}
                        </span>
                        <span className="font-semibold text-gray-900 text-sm">₦{order.total.toFixed(2)}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </div>
                    </button>

                    {/* Expanded details */}
                    {isOpen && (
                      <div className="border-t border-gray-100 px-5 py-4 space-y-4">
                        {/* Mobile status */}
                        <span className={`sm:hidden inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${status.color}`}>
                          {status.icon}
                          {status.label}
                        </span>

                        {/* Items */}
                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div className="w-14 h-14 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden relative">
                                {item.image ? (
                                  <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <Package className="w-5 h-5" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                              </div>
                              <p className="text-sm font-semibold text-gray-900 flex-shrink-0">
                                ₦{(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Order meta */}
                        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-50 text-sm">
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Payment</p>
                            <p className="text-gray-900 font-medium capitalize">{order.paymentMethod || "—"}</p>
                          </div>
                          {order.trackingNumber && (
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Tracking</p>
                              <p className="text-gray-900 font-mono text-xs">{order.trackingNumber}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Ship to</p>
                            <p className="text-gray-900">
                              {order.shippingAddress.street}, {order.shippingAddress.city}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Total</p>
                            <p className="text-orange-600 font-bold">₦{order.total.toFixed(2)}</p>
                          </div>
                        </div>

                        {/* Actions */}
                        {order.status === "delivered" && (
                          <div className="pt-3 border-t border-gray-50 flex gap-2">
                            <button className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors font-medium">
                              <RotateCcw className="w-3.5 h-3.5" />
                              Reorder
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
