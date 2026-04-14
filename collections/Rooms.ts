import type { CollectionConfig } from 'payload';

export const Rooms: CollectionConfig = {
    slug: 'rooms',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'hotel',
            type: 'relationship',
            relationTo: 'hotels',
            required: true,
            index: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'roomType',
            type: 'select',
            required: true,
            options: [
                { label: 'Standard', value: 'standard' },
                { label: 'Executive', value: 'executive' },
                { label: 'Deluxe', value: 'deluxe' },
                { label: 'Suite', value: 'suite' },
                { label: 'Business', value: 'business' },
                { label: 'Presidential', value: 'presidential' },
            ],
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'pricePerNight',
            type: 'number',
            required: true,
            min: 0,
        },
        {
            name: 'description',
            type: 'textarea',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'gallery',
            type: 'array',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
        },
        {
            name: 'maxGuests',
            type: 'number',
            defaultValue: 2,
            min: 1,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'bedType',
            type: 'select',
            options: [
                { label: 'Single', value: 'single' },
                { label: 'Double', value: 'double' },
                { label: 'Queen', value: 'queen' },
                { label: 'King', value: 'king' },
                { label: 'Twin', value: 'twin' },
            ],
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'size',
            type: 'text',
            admin: {
                description: 'e.g. 32 sqm',
            },
        },
        {
            name: 'amenities',
            type: 'array',
            fields: [
                {
                    name: 'amenity',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'rating',
            type: 'number',
            min: 0,
            max: 5,
            defaultValue: 5,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'isAvailable',
            type: 'checkbox',
            defaultValue: true,
            admin: {
                position: 'sidebar',
            },
        },
    ],
};
