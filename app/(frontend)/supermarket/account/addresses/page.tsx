"use client";

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { dummyAddresses } from '../../data/dummy-data';
import AddressCard from '../../components/AddressCard';
import { Address } from '../../types/types';

export default function AddressesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>(
    dummyAddresses.filter(addr => addr.userId === user?.id)
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nigeria',
    type: 'both' as 'shipping' | 'billing' | 'both',
  });

  if (!user) {
    router.push('/supermarket/account/login');
    return null;
  }

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress: Address = {
      id: `addr-${Date.now()}`,
      userId: user.id,
      ...formData,
      isDefault: addresses.length === 0,
    };
    setAddresses([...addresses, newAddress]);
    setShowAddForm(false);
    setFormData({
      name: user.name,
      phone: user.phone || '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Nigeria',
      type: 'both',
    });
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/supermarket/account" className="text-orange-600 hover:text-orange-700">
            ← Back to Account
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">My Addresses</h1>
              <p className="text-gray-600">Manage your delivery addresses</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              + Add Address
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-bold text-black mb-4">Add New Address</h2>
            <form onSubmit={handleAddAddress} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-black font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-black font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-black font-medium mb-2">Street Address</label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                  placeholder="123 Main Street, Apartment 4B"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-black font-medium mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-black font-medium mb-2">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-black font-medium mb-2">Zip Code</label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-black font-medium mb-2">Address Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                >
                  <option value="both">Shipping & Billing</option>
                  <option value="shipping">Shipping Only</option>
                  <option value="billing">Billing Only</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
                >
                  Save Address
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-200 text-black px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {addresses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">📍</div>
            <h2 className="text-2xl font-bold text-black mb-2">No Addresses Saved</h2>
            <p className="text-gray-600 mb-6">Add an address for faster checkout</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map(address => (
              <AddressCard
                key={address.id}
                address={address}
                onSetDefault={() => handleSetDefault(address.id)}
                onDelete={() => handleDelete(address.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
