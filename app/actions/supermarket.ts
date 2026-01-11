'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

// Temporary types until generation runs
export interface Category {
    id: string
    name: string
    slug?: string
}

export interface Product {
    id: string
    name: string
    description?: string
    price: number
    stock?: number
    image: any // Media
    category: Category | string
    store: 'supermarket' | 'pharmacy' | 'bakery'
    rating?: number
    reviewCount?: number
}

export interface FlashSale {
    id: string
    title: string
    endTime: string
    products: Product[] | string[]
    isActive?: boolean
}

export async function getSupermarketProducts(limit = 8): Promise<Product[]> {
    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: 'products',
        where: {
            store: {
                equals: 'supermarket',
            },
        },
        limit,
        depth: 1,
    })

    return result.docs as unknown as Product[]
}

export async function getCategories(): Promise<Category[]> {
    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: 'categories',
        limit: 100,
        pagination: false,
        sort: 'name',
    })

    return result.docs as unknown as Category[]
}

export async function getFlashSale(): Promise<FlashSale | null> {
    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: 'flash-sales',
        where: {
            isActive: {
                equals: true,
            },
            endTime: {
                greater_than: new Date().toISOString(),
            },
        },
        limit: 1,
        depth: 2, // Need products and their images
    })

    if (result.docs.length > 0) {
        return result.docs[0] as unknown as FlashSale
    }

    return null
}
