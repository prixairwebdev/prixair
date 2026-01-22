'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Product } from './supermarket'

export async function getProductsByStore(storeSlug: string, limit = 100): Promise<Product[]> {
    const payload = await getPayload({ config })

    try {
        // First find the store by slug
        const storeResult = await payload.find({
            collection: 'stores' as any,
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
            collection: 'products' as any,
            where: {
                store: {
                    equals: storeId,
                },
            },
            limit,
            depth: 1,
        })

        return result.docs as unknown as Product[]
    } catch (error) {
        console.error(`Error fetching products for store ${storeSlug}:`, error)
        return []
    }
}

export async function getStoreBySlug(slug: string) {
    const payload = await getPayload({ config })

    try {
        const result = await payload.find({
            collection: 'stores' as any,
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
