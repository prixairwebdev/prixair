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

    console.log('Seeding Noodlelicious data...')

    const payload = await getPayload({ config: configPromise })

    // 1. Create/Get Noodlelicious Store
    console.log('Ensuring Noodlelicious store exists...')
    let storeDoc;
    const existingStore = await payload.find({
        collection: 'stores' as any,
        where: { slug: { equals: 'noodlelicious' } },
    })

    if (existingStore.docs.length > 0) {
        storeDoc = existingStore.docs[0]
        console.log('Found existing Noodlelicious store.')
    } else {
        storeDoc = await payload.create({
            collection: 'stores' as any,
            data: {
                name: 'Noodlelicious',
                slug: 'noodlelicious',
                description: 'The ultimate noodle experience.',
                isActive: true,
            },
        })
        console.log('Created Noodlelicious store.')
    }

    // 2. Create/Get Noodlelicious Category
    console.log('Ensuring Noodlelicious category exists...')
    let categoryDoc;
    const existingCategory = await payload.find({
        collection: 'categories',
        where: { name: { equals: 'Noodles' } },
    })

    if (existingCategory.docs.length > 0) {
        categoryDoc = existingCategory.docs[0]
        console.log('Found existing Noodles category.')
    } else {
        categoryDoc = await payload.create({
            collection: 'categories',
            data: { name: 'Noodles' },
        })
        console.log('Created Noodles category.')
    }

    // 3. Upload Images
    console.log('Uploading images...')
    const artifactsDir = '/Users/laju/.gemini/antigravity/brain/3de77544-d669-4ac8-ada7-b67c8e8ea184'
    const imageFiles = [
        { name: 'singapore_noodles_1768998282642.png', alt: 'Singapore Noodles' },
        { name: 'beef_ramen_1768998316215.png', alt: 'Spicy Beef Ramen' },
        { name: 'chicken_stir_fry_noodles_1768998361410.png', alt: 'Chicken Stir-Fry' },
        { name: 'prawn_hakka_noodles_food_1768998424579.png', alt: 'Prawn Hakka Noodles' },
    ]

    const mediaDocs: Record<string, any> = {}

    for (const img of imageFiles) {
        const filePath = path.join(artifactsDir, img.name)
        const imageBuffer = fs.readFileSync(filePath)

        const mediaDoc = await payload.create({
            collection: 'media',
            data: {
                alt: img.alt,
            },
            file: {
                data: imageBuffer,
                name: img.name,
                mimetype: 'image/png',
                size: imageBuffer.length,
            }
        })
        mediaDocs[img.alt] = mediaDoc
        console.log(`Uploaded image: ${img.alt}`)
    }

    // 4. Create Products
    console.log('Creating Noodlelicious products...')
    const products = [
        {
            name: "Singapore Noodles",
            price: 4800,
            description: "Thin rice noodles stir-fried with curry powder, vegetables, and shrimp.",
            imageAlt: "Singapore Noodles"
        },
        {
            name: "Spicy Beef Ramen",
            price: 5500,
            description: "Rich beef broth with tender slices of beef, noodles, and a soft-boiled egg.",
            imageAlt: "Spicy Beef Ramen"
        },
        {
            name: "Chicken Stir-Fry",
            price: 4200,
            description: "Wok-tossed noodles with succulent chicken and a medley of fresh vegetables.",
            imageAlt: "Chicken Stir-Fry"
        },
        {
            name: "Prawn Hakka Noodles",
            price: 5800,
            description: "Classic Indo-Chinese style noodles with juicy prawns and bell peppers.",
            imageAlt: "Prawn Hakka Noodles"
        },
    ]

    for (const p of products) {
        // Check if product exists
        const existing = await payload.find({
            collection: 'products',
            where: {
                and: [
                    { name: { equals: p.name } },
                    { store: { equals: storeDoc.id } }
                ]
            },
        })

        if (existing.docs.length === 0) {
            await payload.create({
                collection: 'products',
                data: {
                    name: p.name,
                    price: p.price,
                    description: p.description,
                    category: categoryDoc.id,
                    image: mediaDocs[p.imageAlt].id,
                    store: storeDoc.id,
                    stock: 50,
                    rating: 5,
                    reviewCount: 15,
                }
            })
            console.log(`Created product: ${p.name}`)
        } else {
            console.log(`Product already exists: ${p.name}`)
        }
    }

    console.log('Seeding completed successfully!')
    process.exit(0)
}

seed().catch(err => {
    console.error('Seed failed:', err)
    process.exit(1)
})
