'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { revalidatePath } from 'next/cache'

// Define Order type based on our collection
export type OrderData = {
    userId: string
    items: {
        productId: string
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
        const order = await payload.create({
            collection: 'orders',
            data: {
                user: data.userId,
                items: data.items,
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
        return { success: false, error: 'Failed to create order' }
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
