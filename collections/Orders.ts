import type { CollectionConfig } from 'payload';

export const Orders: CollectionConfig = {
    slug: 'orders',
    access: {
        read: () => true, // Secure this in production
        create: () => true,
        update: () => true,
    },
    admin: {
        useAsTitle: 'id',
        defaultColumns: ['id', 'store', 'status', 'total', 'createdAt'],
    },
    fields: [
        {
            name: 'store',
            type: 'relationship',
            relationTo: 'stores',
            required: true,
            index: true,
        },
        {
            name: 'items',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'product_id',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'price',
                    type: 'number',
                    required: true,
                },
                {
                    name: 'quantity',
                    type: 'number',
                    required: true,
                },
                {
                    name: 'image',
                    type: 'text',
                },
            ],
        },
        {
            name: 'total',
            type: 'number',
            required: true,
        },
        {
            name: 'status',
            type: 'select',
            options: [
                { label: 'Pending', value: 'pending' },
                { label: 'Processing', value: 'processing' },
                { label: 'Shipped', value: 'shipped' },
                { label: 'Delivered', value: 'delivered' },
                { label: 'Cancelled', value: 'cancelled' },
            ],
            defaultValue: 'pending',
            required: true,
        },
        {
            name: 'paymentMethod',
            type: 'select',
            options: [
                { label: 'PayPal', value: 'paypal' },
                { label: 'Card', value: 'card' },
                { label: 'Paystack', value: 'paystack' },
                { label: 'WhatsApp', value: 'whatsapp' },
            ],
            required: true,
        },
        {
            name: 'paymentReference',
            type: 'text',
        },
        {
            name: 'shippingAddress',
            type: 'group',
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'phone',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'street',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'city',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'state',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'zipCode',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'country',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
        },
        {
            name: 'subtotal', // Total of items before discount
            type: 'number',
        },
        {
            name: 'discountTotal',
            type: 'number',
            defaultValue: 0,
        },
        {
            name: 'couponCode',
            type: 'text',
        },
        {
            name: 'promotion',
            type: 'relationship',
            relationTo: 'promotions',
        },
        {
            name: 'shipdayId',
            type: 'text',
            admin: {
                position: 'sidebar',
                readOnly: true,
            },
        },
        {
            name: 'shipdayStatus',
            type: 'text',
            admin: {
                position: 'sidebar',
                readOnly: true,
            },
        },
    ],
};
