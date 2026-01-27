import React from 'react';
import { Address } from '@/types/store';

interface BrandAddressCardProps {
    address: Address;
    primaryColor?: string;
    secondaryColor?: string;
    onEdit?: () => void;
    onDelete?: () => void;
    onSetDefault?: () => void;
}

export default function BrandAddressCard({
    address,
    primaryColor = '#000000',
    secondaryColor = '#F3A35C',
    onEdit,
    onDelete,
    onSetDefault
}: BrandAddressCardProps) {
    return (
        <div
            className="bg-white border-2 rounded-lg p-4 transition-all"
            style={{ borderColor: address.isDefault ? secondaryColor : '#e5e7eb' }}
        >
            {address.isDefault && (
                <div
                    className="inline-block text-white text-xs px-2 py-1 rounded mb-2"
                    style={{ backgroundColor: secondaryColor }}
                >
                    Default Address
                </div>
            )}

            <h3 className="font-semibold mb-1" style={{ color: '#373435' }}>{address.name}</h3>
            <p className="text-gray-700 text-sm mb-1">{address.phone}</p>
            <p className="text-gray-700 text-sm mb-1">{address.street}</p>
            <p className="text-gray-700 text-sm mb-1">
                {address.city}, {address.state} {address.zipCode}
            </p>
            <p className="text-gray-700 text-sm mb-3">{address.country}</p>

            <div className="flex gap-2">
                {!address.isDefault && onSetDefault && (
                    <button
                        onClick={onSetDefault}
                        className="text-sm font-medium hover:opacity-80 transition-opacity"
                        style={{ color: secondaryColor }}
                    >
                        Set as Default
                    </button>
                )}
                {onEdit && (
                    <button
                        onClick={onEdit}
                        className="text-sm font-medium hover:opacity-80 transition-opacity"
                        style={{ color: '#373435' }}
                    >
                        Edit
                    </button>
                )}
                {onDelete && !address.isDefault && (
                    <button
                        onClick={onDelete}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
}
