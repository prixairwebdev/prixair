import type { CollectionConfig } from 'payload';

export const Hotels: CollectionConfig = {
    slug: 'hotels',
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
            name: 'slug',
            type: 'text',
            unique: true,
            admin: {
                position: 'sidebar',
            },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        if (!value && data?.name) {
                            return data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                        }
                        return value;
                    },
                ],
            },
        },
        {
            name: 'location',
            type: 'text',
            required: true,
        },
        {
            name: 'address',
            type: 'text',
        },
        {
            name: 'city',
            type: 'text',
        },
        {
            name: 'state',
            type: 'text',
        },
        {
            name: 'description',
            type: 'textarea',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
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
            name: 'whatsappNumber',
            type: 'text',
            admin: {
                description: 'WhatsApp number for booking inquiries (e.g. 2348012345678)',
            },
        },
        {
            name: 'email',
            type: 'email',
        },
        {
            name: 'phone',
            type: 'text',
        },
        {
            name: 'starRating',
            type: 'select',
            options: ['1', '2', '3', '4', '5'],
            defaultValue: '3',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'isActive',
            type: 'checkbox',
            defaultValue: true,
            admin: {
                position: 'sidebar',
            },
        },
    ],
};
