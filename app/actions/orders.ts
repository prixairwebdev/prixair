'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { revalidatePath } from 'next/cache'

// Define Order type based on our collection
export type OrderData = {
    userId: string
    items: {
        product_id: string
        name: string
        price: number
        quantity: number
        image?: string
    }[]
    total: number
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
    shippingAddress: {
        name: string
        phone: string
        street: string
        city: string
        state: string
        zipCode: string
        country: string
    }
    paymentMethod: 'paypal' | 'card' | 'paystack'
    paymentReference?: string
}

export async function createOrder(data: OrderData) {
    const payload = await getPayload({ config })

    try {
        console.log('Creating order with data:', JSON.stringify(data, null, 2))
        
        if (!data.items || data.items.length === 0) {
            throw new Error('No items in order')
        }
        
        const validatedItems = data.items.filter((item, index) => {
            const productId = String(item.product_id || '').trim();
            if (!productId) {
                console.warn(`Skipping item ${index}: product_id is missing or empty`, item)
                return false
            }
            if (!item.name) {
                console.warn(`Skipping item ${index}: name is missing`, item)
                return false
            }
            if (item.price === undefined || item.price === null) {
                console.warn(`Skipping item ${index}: price is missing`, item)
                return false
            }
            if (item.quantity === undefined || item.quantity === null) {
                console.warn(`Skipping item ${index}: quantity is missing`, item)
                return false
            }
            return true
        }).map(item => {
            let imageUrl = '';
            if (typeof item.image === 'string') {
                imageUrl = item.image;
            } else if (item.image && typeof item.image === 'object' && 'url' in item.image) {
                imageUrl = item.image.url;
            }
            return {
                ...item,
                product_id: String(item.product_id),
                image: imageUrl,
            };
        })

        if (validatedItems.length === 0) {
            throw new Error('No valid items in order after validation')
        }

        if (validatedItems.length < data.items.length) {
            console.warn(`Filtered out ${data.items.length - validatedItems.length} invalid items`)
        }
        
        const order = await payload.create({
            collection: 'orders',
            data: {
                user: data.userId,
                items: validatedItems,
                total: data.total,
                status: data.status,
                shippingAddress: data.shippingAddress,
                paymentMethod: data.paymentMethod,
                paymentReference: data.paymentReference,
            },
        })

        revalidatePath('/supermarket/account/orders')
        return { success: true, order }
    } catch (error) {
        console.error('Error creating order:', error)
        const message = error instanceof Error ? error.message : String(error)
        return { success: false, error: message }
    }
}

export async function getOrder(id: string) {
    const payload = await getPayload({ config })

    try {
        const order = await payload.findByID({
            collection: 'orders',
            id,
            depth: 1,
        })

        return order
    } catch (error) {
        console.error(`Error fetching order ${id}:`, error)
        return null
    }
}

export async function getUserOrders(userId: string) {
    const payload = await getPayload({ config })

    try {
        const result = await payload.find({
            collection: 'orders',
            where: {
                user: {
                    equals: userId,
                },
            },
            depth: 1,
            sort: '-createdAt',
        })

        return result.docs
    } catch (error) {
        console.error(`Error fetching orders for user ${userId}:`, error)
        return []
    }
}
