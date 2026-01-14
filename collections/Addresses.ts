import type { CollectionConfig } from 'payload'

export const Addresses: CollectionConfig = {
    slug: 'addresses',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        read: ({ req: { user } }) => {
            if (user) {
                return {
                    user: {
                        equals: user.id,
                    },
                }
            }
            return false
        },
        create: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => {
            if (user) {
                return {
                    user: {
                        equals: user.id,
                    },
                }
            }
            return false
        },
        delete: ({ req: { user } }) => {
            if (user) {
                return {
                    user: {
                        equals: user.id,
                    },
                }
            }
            return false
        },
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Full Name',
        },
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            hasMany: false,
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
            name: 'country',
            type: 'text',
            required: true,
        },
        {
            name: 'zipCode',
            type: 'text',
        },
        {
            name: 'isDefault',
            type: 'checkbox',
            defaultValue: false,
            label: 'Set as Default Address',
        },
    ],
}
