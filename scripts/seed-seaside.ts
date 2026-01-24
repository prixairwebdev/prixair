import nextEnv from '@next/env'
const { loadEnvConfig } = nextEnv
import { getPayload } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

loadEnvConfig(path.resolve(__dirname, '../'))

const seed = async () => {
    const { default: configPromise } = await import('../payload.config.js')

    console.log('Seeding Seaside data...')

    const payload = await getPayload({ config: configPromise })

    // 1. Create/Get Seaside Store
    console.log('Ensuring Seaside store exists...')
    let storeDoc;
    const existingStore = await payload.find({
        collection: 'stores' as any,
        where: { slug: { equals: 'seaside' } },
    })

    if (existingStore.docs.length > 0) {
        storeDoc = existingStore.docs[0]
        console.log('Found existing Seaside store.')
    } else {
        storeDoc = await payload.create({
            collection: 'stores' as any,
            data: {
                name: 'Seaside',
                slug: 'seaside',
                description: 'Ocean\'s Best Seafood Experience.',
                isActive: true,
            },
        })
        console.log('Created Seaside store.')
    }

    // 2. Create/Get Seafood Category
    console.log('Ensuring Seafood category exists...')
    let categoryDoc;
    const existingCategory = await payload.find({
        collection: 'categories' as any,
        where: { name: { equals: 'Seafood' } },
    })

    if (existingCategory.docs.length > 0) {
        categoryDoc = existingCategory.docs[0]
        console.log('Found existing Seafood category.')
    } else {
        categoryDoc = await payload.create({
            collection: 'categories' as any,
            data: { name: 'Seafood' },
        })
        console.log('Created Seafood category.')
    }

    // 3. Create Placeholder Media
    console.log('Creating placeholder media...')
    const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
    const imageBuffer = Buffer.from(base64Image, 'base64')

    const mediaDoc = await payload.create({
        collection: 'media',
        data: {
            alt: 'Seaside Placeholder',
        },
        file: {
            data: imageBuffer,
            name: 'seaside-placeholder.png',
            mimetype: 'image/png',
            size: imageBuffer.length,
        }
    })

    // 4. Create Products
    console.log('Creating Seaside products...')
    const products = [
        {
            name: "Grilled Lobster Tail",
            price: 15000,
            description: "Succulent lobster tail grilled with garlic butter and lemon herbs.",
        },
        {
            name: "Seafood Paella",
            price: 9500,
            description: "Authentic saffron rice with shrimp, mussels, calamari, and fish.",
        },
        {
            name: "Crispy Calamari",
            price: 4500,
            description: "Tender calamari rings lightly battered and served with spicy aioli.",
        },
        {
            name: "Pan-Seared Salmon",
            price: 8500,
            description: "Fresh salmon fillet seared to perfection with seasonal vegetables.",
        },
        {
            name: "Spiced Prawns",
            price: 7000,
            description: "Jumbo prawns marinated in a spicy blend of coastal herbs.",
        },
        {
            name: "Fish & Chips",
            price: 5500,
            description: "Crispy beer-battered white fish served with chunky fries.",
        },
        {
            name: "Seafood Pasta",
            price: 6000,
            description: "Fresh pasta tossed with a medley of seafood in a creamy white wine sauce.",
        },
        {
            name: "Grilled Croaker",
            price: 7500,
            description: "Whole croaker fish seasoned with local spices and flame-grilled.",
        },
    ]

    for (const p of products) {
        const existingProduct = await payload.find({
            collection: 'products' as any,
            where: {
                and: [
                    { name: { equals: p.name } },
                    { store: { equals: storeDoc.id } }
                ]
            },
        })

        if (existingProduct.docs.length === 0) {
            await payload.create({
                collection: 'products' as any,
                data: {
                    ...p,
                    store: storeDoc.id,
                    category: categoryDoc.id,
                    image: mediaDoc.id,
                    stock: 50,
                    rating: 5,
                    reviewCount: 12,
                }
            })
            console.log(`Created product: ${p.name}`)
        } else {
            console.log(`Product already exists: ${p.name}`)
        }
    }

    console.log('Seaside seeding completed!')
    process.exit(0)
}

seed()
