"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/components/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Address } from "@/types/store";
import { getAddresses, createAddress, updateAddress, deleteAddress } from "@/app/actions/addresses";
import { AccountSidebar } from "../../components/account/AccountSidebar";
import { MapPin, Plus, Star, Trash2, X, Home, Building2 } from "lucide-react";

const TYPE_ICON: Record<string, React.ReactNode> = {
  shipping: <Home className="w-3.5 h-3.5" />,
  billing: <Building2 className="w-3.5 h-3.5" />,
  both: <Home className="w-3.5 h-3.5" />,
};

const TYPE_LABEL: Record<string, string> = {
  shipping: "Shipping",
  billing: "Billing",
  both: "Shipping & Billing",
};

const EMPTY_FORM = {
  name: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  country: "Nigeria",
  type: "both" as "shipping" | "billing" | "both",
};

export default function AddressesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const loadAddresses = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await getAddresses();
      setAddresses(data);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) { router.push("/supermarket/account/login"); return; }
    setFormData((prev) => ({ ...prev, name: user.name, phone: user.phone || "" }));
    loadAddresses();
  }, [user, router, loadAddresses]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    try {
      const result = await createAddress({ ...formData, isDefault: addresses.length === 0 });
      if (result.success) {
        await loadAddresses();
        setShowForm(false);
        setFormData({ ...EMPTY_FORM, name: user.name, phone: user.phone || "" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleSetDefault = async (id: string) => {
    await updateAddress(id, { isDefault: true });
    await loadAddresses();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this address?")) return;
    const result = await deleteAddress(id);
    if (result.success) setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <p className="text-xs text-gray-400 mb-1">
            <Link href="/supermarket/account" className="hover:text-orange-500">Account</Link> / Addresses
          </p>
          <h1 className="text-xl font-bold text-gray-900">My Addresses</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        <AccountSidebar />

        <main className="flex-1 min-w-0 space-y-4">
          {/* Add button */}
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full flex items-center justify-center gap-2 bg-white border-2 border-dashed border-gray-200 hover:border-orange-300 text-gray-500 hover:text-orange-500 rounded-xl py-4 text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add new address
            </button>
          )}

          {/* Add form */}
          {showForm && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                <h2 className="font-semibold text-gray-900">New Address</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Street Address</label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    placeholder="123 Main Street, Apartment 4B"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Zip Code</label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Address Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as "shipping" | "billing" | "both" })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="both">Shipping &amp; Billing</option>
                    <option value="shipping">Shipping Only</option>
                    <option value="billing">Billing Only</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                  >
                    {submitting ? "Saving…" : "Save Address"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Address list */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : addresses.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-14 text-center">
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-sm text-gray-500">No addresses saved yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`bg-white rounded-xl border shadow-sm p-4 relative ${address.isDefault ? "border-orange-200" : "border-gray-100"}`}
                >
                  {address.isDefault && (
                    <span className="absolute top-3 right-3 text-xs bg-orange-100 text-orange-600 font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" /> Default
                    </span>
                  )}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0 pr-12">
                      <p className="font-medium text-gray-900 text-sm">{address.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{address.phone}</p>
                      <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                        {address.street}<br />
                        {address.city}, {address.state} {address.zipCode}<br />
                        {address.country}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-2 text-xs text-gray-400">
                        {TYPE_ICON[address.type]}
                        {TYPE_LABEL[address.type]}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-50 flex gap-2">
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        className="text-xs text-orange-500 hover:text-orange-600 font-medium"
                      >
                        Set as default
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="ml-auto text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
