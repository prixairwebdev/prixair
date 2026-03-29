'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { revalidatePath } from 'next/cache'
import { shipdayService } from '../(frontend)/supermarket/lib/shipday'

// Define Order type based on our collection
export type OrderData = {
    userId?: string
    customerEmail?: string
    items: {
        product_id: string
        name: string
        price: number
        quantity: number
        image?: string | { url: string }
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
    paymentMethod: 'paypal' | 'card' | 'paystack' | 'whatsapp'
    paymentReference?: string
    storeId: string
    subtotal?: number
    discountTotal?: number
    couponCode?: string
    promotionId?: string
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            collection: 'orders' as any,
            data: {
                ...(data.userId ? { user: data.userId } : {}),
                items: validatedItems,
                total: data.total,
                status: data.status,
                shippingAddress: data.shippingAddress,
                paymentMethod: data.paymentMethod,
                paymentReference: data.paymentReference,
                store: data.storeId,
                subtotal: data.subtotal,
                discountTotal: data.discountTotal,
                couponCode: data.couponCode,
                promotion: data.promotionId,
            },
        })

        // Sync with Shipday
        try {
            console.log('Syncing order with Shipday:', order.id);
            const shipdayDelivery = await shipdayService.createDelivery({
                orderNumber: String(order.id),
                customerName: data.shippingAddress.name,
                customerPhone: data.shippingAddress.phone,
                customerEmail: data.customerEmail,
                customerAddress: `${data.shippingAddress.street}, ${data.shippingAddress.city}, ${data.shippingAddress.state}, ${data.shippingAddress.zipCode}, ${data.shippingAddress.country}`,
                orderValue: data.total,
                items: validatedItems.map(item => ({
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
            });

            // Update order with Shipday info
            await payload.update({
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                collection: 'orders' as any,
                id: order.id,
                data: {
                    shipdayId: shipdayDelivery.orderId,
                    shipdayStatus: shipdayDelivery.status,
                },
            });

            console.log('Order successfully synced with Shipday');
        } catch (shipdayError) {
            console.error('Failed to sync with Shipday, but order was created:', shipdayError);
            // We don't throw here to avoid failing the whole order creation
            // but we might want to flag it for manual retry
        }

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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            collection: 'orders' as any,
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            collection: 'orders' as any,
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
