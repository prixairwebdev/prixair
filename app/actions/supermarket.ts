'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export interface Media {
    id: string
    alt: string
    url?: string | null
    filename?: string | null
    mimeType?: string | null
    filesize?: number | null
    width?: number | null
    height?: number | null
}

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
    image: string | Media
    category: Category | string
    store: string
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        collection: 'products' as any,
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        collection: 'categories' as any,
        limit: 100,
        pagination: false,
        sort: 'name',
    })

    return result.docs as unknown as Category[]
}

export async function getFlashSale(): Promise<FlashSale | null> {
    const payload = await getPayload({ config })

    const result = await payload.find({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        collection: 'flash-sales' as any,
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

export async function getProduct(id: string): Promise<Product | null> {
    const payload = await getPayload({ config })

    try {
        const result = await payload.findByID({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        collection: 'products' as any,
            id,
            depth: 2,
        })

        return result as unknown as Product
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error)
        return null
    }
}

export async function getRelatedProducts(categoryId: string, currentId: string, limit = 4): Promise<Product[]> {
    const payload = await getPayload({ config })

    const result = await payload.find({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        collection: 'products' as any,
        where: {
            and: [
                {
                    category: {
                        equals: categoryId,
                    },
                },
                {
                    id: {
                        not_equals: currentId,
                    },
                },
            ],
        },
        limit,
        depth: 1,
    })

    return result.docs as unknown as Product[]
}
