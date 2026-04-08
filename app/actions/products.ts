'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Product, Category } from './supermarket'

export async function getProductsByStore(storeSlug: string, limit = 100): Promise<Product[]> {
    const payload = await getPayload({ config })

    try {
        // First find the store by slug
        const storeResult = await payload.find({
            collection: 'stores',
            where: {
                slug: {
                    equals: storeSlug,
                },
            },
            limit: 1,
        })

        if (storeResult.docs.length === 0) {
            console.warn(`Store with slug ${storeSlug} not found`)
            return []
        }

        const storeId = storeResult.docs[0].id

        // Then find products for that store
        const result = await payload.find({
            collection: 'products',
            where: {
                store: {
                    equals: storeId,
                },
            },
            limit,
            depth: 1,
        })

        return result.docs.map(doc => {
            const product = doc as unknown as Product
            return {
                ...product,
                store: typeof product.store === 'string' ? product.store : (product.store?.slug || storeSlug)
            }
        }) as unknown as Product[]
    } catch (error) {
        console.error(`Error fetching products for store ${storeSlug}:`, error)
        return []
    }
}

export async function getProductsAndCategories(storeSlug: string) {
    const payload = await getPayload({ config })

    try {
        // First find the store by slug
        const storeResult = await payload.find({
            collection: 'stores',
            where: {
                slug: {
                    equals: storeSlug,
                },
            },
            limit: 1,
        })

        if (storeResult.docs.length === 0) {
            console.warn(`Store with slug ${storeSlug} not found`)
            return { products: [], categories: [] }
        }

        const storeId = storeResult.docs[0].id

        // Then find products and categories
        const [productsResult, categoriesResult] = await Promise.all([
            payload.find({
                collection: 'products',
                where: {
                    store: {
                        equals: storeId,
                    },
                },
                limit: 1000,
                depth: 1,
            }),
            payload.find({
                collection: 'categories',
                where: {
                    store: {
                        equals: storeId,
                    },
                },
                limit: 100,
                sort: 'name',
            })
        ])

        const normalizedProducts = productsResult.docs.map(doc => {
            const product = doc as unknown as Product
            return {
                ...product,
                store: typeof product.store === 'string' ? product.store : (product.store?.slug || storeSlug)
            }
        }) as unknown as Product[]

        return {
            products: normalizedProducts,
            categories: categoriesResult.docs as unknown as Category[]
        }
    } catch (error) {
        console.error(`Error fetching products and categories for store ${storeSlug}:`, error)
        return { products: [], categories: [] }
    }
}

export async function getProductById(id: string, storeSlug?: string): Promise<Product | null> {
    const payload = await getPayload({ config })

    try {
        const whereClause: Record<string, unknown> = { id: { equals: id } }

        if (storeSlug) {
            const storeResult = await payload.find({
                collection: 'stores',
                where: { slug: { equals: storeSlug } },
                limit: 1,
            })
            if (storeResult.docs.length > 0) {
                whereClause.store = { equals: storeResult.docs[0].id }
            }
        }

        const result = await payload.find({
            collection: 'products',
            where: whereClause,
            limit: 1,
            depth: 2,
        })

        if (result.docs.length === 0) return null

        const product = result.docs[0] as unknown as Product
        return {
            ...product,
            store: typeof product.store === 'string' ? product.store : (product.store?.slug || storeSlug || '')
        } as unknown as Product
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error)
        return null
    }
}

export async function getStoreBySlug(slug: string) {
    const payload = await getPayload({ config })

    try {
        const result = await payload.find({
            collection: 'stores',
            where: {
                slug: {
                    equals: slug,
                },
            },
            limit: 1,
        })

        if (result.docs.length === 0) return null
        return result.docs[0]
    } catch (error) {
        console.error(`Error fetching store by slug ${slug}:`, error)
        return null
    }
}
