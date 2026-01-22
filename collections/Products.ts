import type { CollectionConfig } from 'payload';

export const Products: CollectionConfig = {
    slug: 'products',
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
            name: 'description',
            type: 'textarea',
        },
        {
            name: 'price',
            type: 'number',
            required: true,
        },
        {
            name: 'stock',
            type: 'number',
            defaultValue: 0,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
            required: true,
        },
        {
            name: 'store',
            type: 'relationship',
            relationTo: 'stores',
            required: true,
            index: true,
        },
        {
            name: 'rating',
            type: 'number',
            min: 0,
            max: 5,
            defaultValue: 0,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'reviewCount',
            type: 'number',
            defaultValue: 0,
            admin: {
                position: 'sidebar',
            },
        },
    ],
};
