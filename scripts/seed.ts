import { loadEnvConfig } from '@next/env'
import { getPayload } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

loadEnvConfig(path.resolve(__dirname, '../'))

const seed = async () => {
    const { default: configPromise } = await import('../payload.config')

    console.log('Seeding Payload...')

    const payload = await getPayload({ config: configPromise })

    // 1. Create Categories
    console.log('Creating Categories...')
    const categories = ['Fruits & Vegetables', 'Dairy & Eggs', 'Bakery', 'Beverages', 'Snacks']
    const categoryDocs = []

    for (const name of categories) {
        const existing = await payload.find({
            collection: 'categories',
            where: { name: { equals: name } },
        })

        if (existing.docs.length > 0) {
            categoryDocs.push(existing.docs[0])
        } else {
            const doc = await payload.create({
                collection: 'categories',
                data: { name },
            })
            categoryDocs.push(doc)
        }
    }

    // 2. Upload Media (Placeholder)
    // We'll Create a dummy buffer for an image
    console.log('Creating Media...')
    // minimal 1x1 png
    const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
    const imageBuffer = Buffer.from(base64Image, 'base64')

    const mediaDoc = await payload.create({
        collection: 'media',
        data: {
            alt: 'Placeholder Image',
        },
        file: {
            data: imageBuffer,
            name: 'placeholder.png',
            mimetype: 'image/png',
            size: imageBuffer.length,
        }
    })

    // 3. Create Products
    console.log('Creating Products...')
    const products: Array<{ name: string; price: number; category: string; store: 'supermarket' | 'bakery' | 'pharmacy' }> = [
        { name: 'Apple', price: 1.20, category: 'Fruits & Vegetables', store: 'supermarket' },
        { name: 'Banana', price: 0.80, category: 'Fruits & Vegetables', store: 'supermarket' },
        { name: 'Milk', price: 2.50, category: 'Dairy & Eggs', store: 'supermarket' },
        { name: 'Whole Wheat Bread', price: 3.00, category: 'Bakery', store: 'supermarket' },
        { name: 'Cola', price: 1.50, category: 'Beverages', store: 'supermarket' },
        { name: 'Chips', price: 2.00, category: 'Snacks', store: 'supermarket' },
    ]

    const productDocs = []

    for (const p of products) {
        const catDoc = categoryDocs.find(c => c.name === p.category)
        if (!catDoc) continue

        // Check if product exists
        const existing = await payload.find({
            collection: 'products',
            where: { name: { equals: p.name } },
        })

        if (existing.docs.length === 0) {
            const prod = await payload.create({
                collection: 'products',
                data: {
                    name: p.name,
                    price: p.price,
                    category: catDoc.id,
                    image: mediaDoc.id,
                    store: p.store,
                    description: `Fresh ${p.name}`,
                    stock: 100,
                    rating: 4.5,
                    reviewCount: 10,
                }
            })
            productDocs.push(prod)
        } else {
            productDocs.push(existing.docs[0])
        }
    }

    // 4. Create Flash Sale
    console.log('Creating Flash Sale...')
    const flashSaleTitle = 'Weekend Super Sale'
    const existingFlashSale = await payload.find({
        collection: 'flash-sales',
        where: { title: { equals: flashSaleTitle } },
    })

    if (existingFlashSale.docs.length === 0 && productDocs.length > 0) {
        await payload.create({
            collection: 'flash-sales',
            data: {
                title: flashSaleTitle,
                endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
                products: productDocs.slice(0, 3).map(p => p.id),
                isActive: true,
            }
        })
    }

    console.log('Seed completed!')
    process.exit(0)
}

seed()
