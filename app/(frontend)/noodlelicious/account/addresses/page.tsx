"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BrandAddressCard from '@/app/(frontend)/components/brand/BrandAddressCard';
import { Address } from '@/types/store';
import { getAddresses, createAddress, updateAddress, deleteAddress } from '@/app/actions/addresses';

// Noodlelicious Colors
const PRIMARY_COLOR = "#F3A35C";
const SECONDARY_COLOR = "#373435";
const STORE_SLUG = "noodlelicious";

export default function AddressesPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Nigeria',
        type: 'both' as 'shipping' | 'billing' | 'both',
    });

    const loadAddresses = useCallback(async () => {
        if (!user) return;
        try {
            setLoading(true);
            const data = await getAddresses();
            setAddresses(data);
        } catch (error) {
            console.error('Failed to load addresses:', error);
            alert('Failed to load addresses');
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (!user) {
            router.push(`/${STORE_SLUG}/account/login`);
            return;
        }
        setFormData(prev => ({
            ...prev,
            name: user.name,
            phone: user.phone || '',
        }));
        loadAddresses();
    }, [user, router, loadAddresses]);

    const handleAddAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setSubmitting(true);
        try {
            const result = await createAddress({
                ...formData,
                isDefault: addresses.length === 0,
            });

            if (result.success) {
                await loadAddresses();
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
            } else {
                alert(result.error || 'Failed to create address');
            }
        } catch (error) {
            console.error('Error creating address:', error);
            alert('An unexpected error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    const handleSetDefault = async (id: string) => {
        try {
            const result = await updateAddress(id, { isDefault: true });
            if (result.success) {
                await loadAddresses();
            } else {
                alert('Failed to set default address');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this address?')) return;
        try {
            const result = await deleteAddress(id);
            if (result.success) {
                setAddresses(addresses.filter(a => a.id !== id));
            } else {
                alert('Failed to delete address');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        }
    };

    if (!user) return null;

    if (loading) {
        return (
            <div className="min-h-screen bg-[#fcfbf9] flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: PRIMARY_COLOR }}></div>
                    <p className="mt-2 text-[#373435]">Loading addresses...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfbf9] py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="mb-6">
                    <Link href={`/${STORE_SLUG}/account`} className="font-medium hover:opacity-80" style={{ color: PRIMARY_COLOR }}>
                        ← Back to Account
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-[#373435] mb-2">My Addresses</h1>
                            <p className="text-gray-600">Manage your delivery addresses</p>
                        </div>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold shadow-md"
                            style={{ backgroundColor: PRIMARY_COLOR }}
                        >
                            + Add Address
                        </button>
                    </div>
                </div>

                {showAddForm && (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h2 className="text-2xl font-bold text-[#373435] mb-4">Add New Address</h2>
                        <form onSubmit={handleAddAddress} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[#373435] font-medium mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-[#373435] focus:outline-none focus:ring-2"
                                        style={{ '--tw-ring-color': PRIMARY_COLOR } as any}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#373435] font-medium mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-[#373435] focus:outline-none focus:ring-2"
                                        style={{ '--tw-ring-color': PRIMARY_COLOR } as any}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[#373435] font-medium mb-2">Street Address</label>
                                <input
                                    type="text"
                                    value={formData.street}
                                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-[#373435] focus:outline-none focus:ring-2"
                                    style={{ '--tw-ring-color': PRIMARY_COLOR } as any}
                                    placeholder="123 Main Street, Apartment 4B"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-[#373435] font-medium mb-2">City</label>
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-[#373435] focus:outline-none focus:ring-2"
                                        style={{ '--tw-ring-color': PRIMARY_COLOR } as any}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#373435] font-medium mb-2">State</label>
                                    <input
                                        type="text"
                                        value={formData.state}
                                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-[#373435] focus:outline-none focus:ring-2"
                                        style={{ '--tw-ring-color': PRIMARY_COLOR } as any}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#373435] font-medium mb-2">Zip Code</label>
                                    <input
                                        type="text"
                                        value={formData.zipCode}
                                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-[#373435] focus:outline-none focus:ring-2"
                                        style={{ '--tw-ring-color': PRIMARY_COLOR } as any}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[#373435] font-medium mb-2">Address Type</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'shipping' | 'billing' | 'both' })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-[#373435] focus:outline-none focus:ring-2"
                                    style={{ '--tw-ring-color': PRIMARY_COLOR } as any}
                                >
                                    <option value="both">Shipping & Billing</option>
                                    <option value="shipping">Shipping Only</option>
                                    <option value="billing">Billing Only</option>
                                </select>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold disabled:opacity-50"
                                    style={{ backgroundColor: PRIMARY_COLOR }}
                                >
                                    {submitting ? 'Saving...' : 'Save Address'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowAddForm(false)}
                                    className="bg-gray-200 text-[#373435] px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: PRIMARY_COLOR }}></div>
                    </div>
                ) : addresses.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center border-2 border-dashed border-gray-200">
                        <div className="text-6xl mb-4">📍</div>
                        <h2 className="text-2xl font-bold text-[#373435] mb-2">No Addresses Saved</h2>
                        <p className="text-gray-600 mb-6">Add an address for faster checkout</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {addresses.map(address => (
                            <BrandAddressCard
                                key={address.id}
                                address={address}
                                primaryColor={PRIMARY_COLOR}
                                secondaryColor={PRIMARY_COLOR} // Use Primary for Noodlelicious
                                onSetDefault={() => handleSetDefault(address.id)}
                                onDelete={() => handleDelete(address.id)}
                                onEdit={() => {
                                    setFormData({
                                        name: address.name,
                                        phone: address.phone,
                                        street: address.street,
                                        city: address.city,
                                        state: address.state,
                                        zipCode: address.zipCode,
                                        country: address.country,
                                        type: address.type,
                                    });
                                    setShowAddForm(true);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
