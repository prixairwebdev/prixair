'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers } from 'next/headers'
import { Address } from '../(frontend)/types/types'

// Helper to get authorized user
async function getUser() {
    const payload = await getPayload({ config })
    const result = await payload.auth({ headers: await headers() })
    return result.user
}

export async function getAddresses() {
    const user = await getUser()
    if (!user) return []

    const payload = await getPayload({ config })
    const { docs } = await payload.find({
        collection: 'addresses',
        where: {
            user: {
                equals: user.id,
            },
        },
    })

    // Normalize payload docs to match our Address type
    // Note: Payload ID is number or string depending on DB, our type expects string usually
    return docs.map(doc => ({
        id: doc.id.toString(),
        userId: typeof doc.user === 'object' ? doc.user.id : doc.user,
        name: doc.name,
        phone: doc.phone,
        street: doc.street,
        city: doc.city,
        state: doc.state,
        zipCode: doc.zipCode || undefined,
        country: doc.country,
        isDefault: doc.isDefault || false,
    })) as Address[]
}

export async function createAddress(data: Omit<Address, 'id' | 'userId'>) {
    const user = await getUser()
    if (!user) return { success: false, error: 'Unauthorized' }

    const payload = await getPayload({ config })

    // If new address is default, unset other defaults
    if (data.isDefault) {
        await payload.update({
            collection: 'addresses',
            where: {
                user: { equals: user.id },
            },
            data: {
                isDefault: false,
            },
        })
    }

    try {
        const result = await payload.create({
            collection: 'addresses',
            data: {
                ...data,
                user: user.id,
            },
        })

        return { success: true, address: result }
    } catch (error) {
        console.error('Error creating address:', error)
        return { success: false, error: 'Failed to create address' }
    }
}

export async function updateAddress(id: string, data: Partial<Omit<Address, 'id' | 'userId'>>) {
    const user = await getUser()
    if (!user) return { success: false, error: 'Unauthorized' }

    const payload = await getPayload({ config })

    // If setting as default, unset others first
    if (data.isDefault) {
        await payload.update({
            collection: 'addresses',
            where: {
                user: { equals: user.id },
                id: { not_equals: id },
            },
            data: {
                isDefault: false,
            },
        })
    }

    try {
        const result = await payload.update({
            collection: 'addresses',
            id,
            data,
        })

        return { success: true, address: result }
    } catch (error) {
        console.error('Error updating address:', error)
        return { success: false, error: 'Failed to update address' }
    }
}

export async function deleteAddress(id: string) {
    const user = await getUser()
    if (!user) return { success: false, error: 'Unauthorized' }

    const payload = await getPayload({ config })

    try {
        await payload.delete({
            collection: 'addresses',
            id,
        })
        return { success: true }
    } catch (error) {
        console.error('Error deleting address:', error)
        return { success: false, error: 'Failed to delete address' }
    }
}
