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

export interface Store {
    id: string
    name: string
    slug: string
    description?: string
    image?: string | Media
    isActive?: boolean
}

export interface Product {
    id: string
    name: string
    description?: string
    price: number
    stock?: number
    image: string | Media
    category: Category | string
    store: Store | string
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

    // First, get the supermarket store by slug
    const storeResult = await payload.find({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        collection: 'stores' as any,
        where: {
            slug: {
                equals: 'supermarket',
            },
        },
        limit: 1,
    })

    if (storeResult.docs.length === 0) {
        console.warn('Supermarket store not found')
        return []
    }

    const supermarketStoreId = storeResult.docs[0].id

    // Then find products for this store
    const result = await payload.find({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        collection: 'products' as any,
        where: {
            store: {
                equals: supermarketStoreId,
            },
        },
        limit,
        depth: 2, // Populate store relationship
    })

    // Transform products to match frontend expectations
    return result.docs.map(doc => {
        const product = doc as unknown as Product
        return {
            ...product,
            store: typeof product.store === 'string' ? product.store : product.store.slug
        }
    }) as unknown as Product[]
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

    // Get supermarket ID
    const storeResult = await payload.find({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        collection: 'stores' as any,
        where: { slug: { equals: 'supermarket' } },
    })

    if (storeResult.docs.length === 0) return null
    const supermarketStoreId = storeResult.docs[0].id

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
        const sale = result.docs[0] as unknown as FlashSale

        // Filter products to only include those from supermarket
        const validProducts = Array.isArray(sale.products) ? sale.products.filter(p => {
            // Handle if p is string (should not happen with depth 2 unless relation broken)
            if (typeof p === 'string') return false

            // Check store
            // If store is object (populated)
            if (typeof p.store === 'object' && p.store !== null && 'id' in p.store) {
                return p.store.id === supermarketStoreId
            }
            // If store is string (ID)
            if (typeof p.store === 'string') {
                return p.store === supermarketStoreId
            }
            return false
        }) : []

        if (validProducts.length === 0) return null

        // Normalize products (convert store object to slug string for frontend)
        sale.products = validProducts.map(p => {
            const product = p as unknown as Product
            return {
                ...product,
                store: typeof product.store === 'string' ? product.store : product.store.slug
            }
        }) as unknown as Product[]

        return sale
    }

    return null
}

export async function getProduct(id: string): Promise<Product | null> {
    const payload = await getPayload({ config })

    // Get supermarket ID
    const storeResult = await payload.find({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        collection: 'stores' as any,
        where: { slug: { equals: 'supermarket' } },
    })

    if (storeResult.docs.length === 0) return null
    const supermarketStoreId = storeResult.docs[0].id

    try {
        // Use find instead of findByID to enforce store filter
        const result = await payload.find({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            collection: 'products' as any,
            where: {
                and: [
                    { id: { equals: id } },
                    { store: { equals: supermarketStoreId } }
                ]
            },
            limit: 1,
            depth: 2,
        })

        if (result.docs.length === 0) return null

        const product = result.docs[0] as unknown as Product

        // Normalize store to slug for frontend
        return {
            ...product,
            store: typeof product.store === 'string' ? product.store : product.store.slug
        } as unknown as Product

    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error)
        return null
    }
}

export async function getRelatedProducts(categoryId: string, currentId: string, limit = 4): Promise<Product[]> {
    const payload = await getPayload({ config })

    // Get supermarket ID
    const storeResult = await payload.find({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        collection: 'stores' as any,
        where: { slug: { equals: 'supermarket' } },
    })

    if (storeResult.docs.length === 0) return []
    const supermarketStoreId = storeResult.docs[0].id

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
                {
                    store: {
                        equals: supermarketStoreId
                    }
                }
            ],
        },
        limit,
        depth: 2, // Populate store to get slug
    })

    return result.docs.map(doc => {
        const product = doc as unknown as Product
        return {
            ...product,
            store: typeof product.store === 'string' ? product.store : product.store.slug
        }
    }) as unknown as Product[]
}
