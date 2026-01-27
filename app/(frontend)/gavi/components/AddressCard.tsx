import React from 'react';
import { Address } from '@/types/store';

interface AddressCardProps {
    address: Address;
    onEdit?: () => void;
    onDelete?: () => void;
    onSetDefault?: () => void;
}

export default function AddressCard({ address, onEdit, onDelete, onSetDefault }: AddressCardProps) {
    return (
        <div className={`bg-white border-2 rounded-lg p-4 ${address.isDefault ? 'border-[#F3A35C]' : 'border-gray-200'}`}>
            {address.isDefault && (
                <div className="inline-block bg-[#F3A35C] text-white text-xs px-2 py-1 rounded mb-2">
                    Default Address
                </div>
            )}

            <h3 className="text-[#373435] font-semibold mb-1">{address.name}</h3>
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
                        className="text-sm text-[#F3A35C] hover:text-[#d48c4d] font-medium"
                    >
                        Set as Default
                    </button>
                )}
                {onEdit && (
                    <button
                        onClick={onEdit}
                        className="text-sm text-[#373435] hover:text-black font-medium"
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
