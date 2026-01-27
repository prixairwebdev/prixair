import type { CollectionConfig } from 'payload';

export const Promotions: CollectionConfig = {
    slug: 'promotions',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'code',
            type: 'text',
            unique: true,
            index: true,
            admin: {
                description: 'The coupon code users enter. Leave empty for automatic promotions (not yet supported).',
            },
        },
        {
            name: 'type',
            type: 'select',
            options: [
                { label: 'Percentage (%)', value: 'percentage' },
                { label: 'Fixed Amount', value: 'fixed' },
            ],
            required: true,
        },
        {
            name: 'value',
            type: 'number',
            required: true,
            min: 0,
        },
        {
            name: 'startDate',
            type: 'date',
        },
        {
            name: 'endDate',
            type: 'date',
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'usageLimit',
                    type: 'number',
                    admin: {
                        description: 'Total number of times this promo can be used',
                    },
                },
                {
                    name: 'perUserLimit',
                    type: 'number',
                    admin: {
                        description: 'Limit per user (if logged in)',
                    },
                },
            ],
        },
        {
            name: 'minOrderValue',
            type: 'number',
            defaultValue: 0,
        },
        {
            name: 'targetType',
            type: 'select',
            options: [
                { label: 'Entire Order (Global)', value: 'global' },
                { label: 'Specific Store(s)', value: 'store' },
                { label: 'Specific Category(ies)', value: 'category' },
                { label: 'Specific Product(s)', value: 'product' },
            ],
            defaultValue: 'global',
            required: true,
        },
        {
            name: 'targetStores',
            type: 'relationship',
            relationTo: 'stores',
            hasMany: true,
            admin: {
                condition: (data) => data.targetType === 'store',
            },
        },
        {
            name: 'targetCategories',
            type: 'relationship',
            relationTo: 'categories',
            hasMany: true,
            admin: {
                condition: (data) => data.targetType === 'category',
            },
        },
        {
            name: 'targetProducts',
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
            admin: {
                condition: (data) => data.targetType === 'product',
            },
        },
        {
            name: 'isActive',
            type: 'checkbox',
            defaultValue: true,
        },
    ],
};
