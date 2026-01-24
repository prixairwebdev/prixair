import nextEnv from '@next/env'
const { loadEnvConfig } = nextEnv
import { getPayload } from 'payload'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

loadEnvConfig(path.resolve(__dirname, '../'))

const seed = async () => {
    const { default: configPromise } = await import('../payload.config.js')

    console.log('Seeding Supermarket data...')

    const payload = await getPayload({ config: configPromise })

    // 1. Create/Get Supermarket Store
    console.log('Ensuring Supermarket store exists...')
    let storeDoc;
    const existingStore = await payload.find({
        collection: 'stores' as any,
        where: { slug: { equals: 'supermarket' } },
    })

    if (existingStore.docs.length > 0) {
        storeDoc = existingStore.docs[0]
        console.log('Found existing Supermarket store.')
    } else {
        storeDoc = await payload.create({
            collection: 'stores' as any,
            data: {
                name: 'Prixair Supermarket',
                slug: 'supermarket',
                description: 'Your one-stop shop for fresh groceries and daily needs.',
                isActive: true,
            },
        })
        console.log('Created Supermarket store.')
    }

    // 2. Define Product Data with categories
    const productsData = [
        {
            name: "Fresh Pineapple",
            categoryName: "Fruits & Vegetables",
            price: 1200,
            description: "Sweet and juicy fresh pineapple.",
            imagePath: "pineapple.png",
            alt: "Fresh Pineapple"
        },
        {
            name: "Fresh Broccoli",
            categoryName: "Fruits & Vegetables",
            price: 800,
            description: "Farm fresh broccoli heads.",
            imagePath: "broccoli.png",
            alt: "Fresh Broccoli"
        },
        {
            name: "Red Hot Pepper",
            categoryName: "Fruits & Vegetables",
            price: 200,
            description: "Spicy red peppers.",
            imagePath: "pepper.png",
            alt: "Red Pepper"
        },
        {
            name: "Fresh Eggs (Crate)",
            categoryName: "Pantry",
            price: 4500,
            description: "Crate of 30 fresh farm eggs.",
            imagePath: "eggs.png",
            alt: "Fresh Eggs"
        },
        {
            name: "Butter Croissants",
            categoryName: "Bakery",
            price: 3500,
            description: "Flaky and buttery croissants, pack of 4.",
            imagePath: "croissants.png",
            alt: "Butter Croissants"
        },
        {
            name: "Bottled Water (1.5L)",
            categoryName: "Beverages",
            price: 300,
            description: "Pure refreshing bottled water.",
            imagePath: "images/1.5l-bottle.png",
            alt: "Bottled Water 1.5L"
        }
    ]

    // 3. Process each product
    const imagesSourceDir = path.resolve(__dirname, '../public')

    for (const p of productsData) {
        // Ensure Category Exists
        let categoryDoc;
        const existingCategory = await payload.find({
            collection: 'categories' as any,
            where: { name: { equals: p.categoryName } },
        })

        if (existingCategory.docs.length > 0) {
            categoryDoc = existingCategory.docs[0]
        } else {
            categoryDoc = await payload.create({
                collection: 'categories' as any,
                data: { name: p.categoryName },
            })
            console.log(`Created category: ${p.categoryName}`)
        }

        // Handle Image
        let mediaId = null;
        if (p.imagePath) {
            const filePath = path.join(imagesSourceDir, p.imagePath)
            if (fs.existsSync(filePath)) {
                // Check if media with this alt already exists to avoid dupes (optional optimization)
                const existingMedia = await payload.find({
                    collection: 'media',
                    where: { alt: { equals: p.alt } }
                })

                if (existingMedia.docs.length > 0) {
                    mediaId = existingMedia.docs[0].id
                } else {
                    const imageBuffer = fs.readFileSync(filePath)
                    const mediaDoc = await payload.create({
                        collection: 'media',
                        data: {
                            alt: p.alt,
                        },
                        file: {
                            data: imageBuffer,
                            name: path.basename(p.imagePath),
                            mimetype: p.imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg',
                            size: imageBuffer.length,
                        }
                    })
                    mediaId = mediaDoc.id
                    console.log(`Uploaded image: ${p.alt}`)
                }
            } else {
                console.warn(`Image not found: ${filePath}`)
            }
        }

        // Create Product if it doesn't exist
        const existingProduct = await payload.find({
            collection: 'products',
            where: {
                and: [
                    { name: { equals: p.name } },
                    { store: { equals: storeDoc.id } }
                ]
            },
        })

        if (existingProduct.docs.length === 0) {
            await payload.create({
                collection: 'products',
                data: {
                    name: p.name,
                    price: p.price,
                    description: p.description,
                    category: categoryDoc.id,
                    image: mediaId, // If null, might fail if required, but we try.
                    store: storeDoc.id,
                    stock: 50,
                    rating: 5,
                    reviewCount: 3,
                }
            })
            console.log(`Created product: ${p.name}`)
        } else {
            console.log(`Product already exists: ${p.name}`)
        }
    }

    console.log('Supermarket seeding completed successfully!')
    process.exit(0)
}

seed().catch(err => {
    console.error('Seed failed:', err)
    process.exit(1)
})
