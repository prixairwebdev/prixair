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

    console.log('Seeding Shawarma Now Now data...')

    const payload = await getPayload({ config: configPromise })

    // 1. Create/Get Shawarma Now Now Store
    console.log('Ensuring Shawarma Now Now store exists...')
    let storeDoc;
    const existingStore = await payload.find({
        collection: 'stores',
        where: { slug: { equals: 'shawarmanomnow' } },
    })

    if (existingStore.docs.length > 0) {
        storeDoc = existingStore.docs[0]
        console.log('Found existing Shawarma Now Now store.')
    } else {
        storeDoc = await payload.create({
            collection: 'stores',
            data: {
                name: 'Shawarma Now Now',
                slug: 'shawarmanomnow',
                description: 'Juicy, flame-grilled shawarma wraps made fresh to order. Your favourite street flavour, elevated.',
                isActive: true,
            },
        })
        console.log('Created Shawarma Now Now store.')
    }

    // 2. Define Product Data
    const productsData = [
        {
            name: "Classic Chicken Shawarma",
            categoryName: "Chicken",
            price: 3500,
            description: "Tender flame-grilled chicken with our signature garlic sauce, fresh veggies, and soft Arabic bread.",
            imagePath: "logos/shawarmanomnow.jpg",
            alt: "Classic Chicken Shawarma"
        },
        {
            name: "Beef Shawarma",
            categoryName: "Beef",
            price: 4000,
            description: "Seasoned, slow-roasted beef strips layered with pickles, tomatoes, and our special house sauce.",
            imagePath: "logos/shawarmanomnow.jpg",
            alt: "Beef Shawarma"
        },
        {
            name: "Mixed Shawarma",
            categoryName: "Combos",
            price: 4500,
            description: "The best of both worlds — grilled chicken and beef combined in one glorious wrap.",
            imagePath: "logos/shawarmanomnow.jpg",
            alt: "Mixed Shawarma"
        },
        {
            name: "Shawarma Platter",
            categoryName: "Combos",
            price: 7500,
            description: "A generous shawarma platter served with fries, coleslaw, and a chilled drink. Perfect for sharing.",
            imagePath: "logos/shawarmanomnow.jpg",
            alt: "Shawarma Platter"
        },
        {
            name: "Spicy Chicken Shawarma",
            categoryName: "Chicken",
            price: 3800,
            description: "For the heat lovers — spiced grilled chicken loaded with jalapeños and our fiery red sauce.",
            imagePath: "logos/shawarmanomnow.jpg",
            alt: "Spicy Chicken Shawarma"
        },
        {
            name: "Shawarma & Chips",
            categoryName: "Combos",
            price: 5000,
            description: "Your choice of shawarma paired with a generous portion of crispy seasoned fries.",
            imagePath: "logos/shawarmanomnow.jpg",
            alt: "Shawarma and Chips"
        },
        {
            name: "Mini Shawarma (x3)",
            categoryName: "Snacks",
            price: 3000,
            description: "Three bite-sized shawarma rolls — perfect as a snack or starter.",
            imagePath: "logos/shawarmanomnow.jpg",
            alt: "Mini Shawarma"
        },
        {
            name: "Shawarma Rice Bowl",
            categoryName: "Bowls",
            price: 4200,
            description: "Grilled shawarma meat served over seasoned rice with salad and tahini drizzle.",
            imagePath: "logos/shawarmanomnow.jpg",
            alt: "Shawarma Rice Bowl"
        },
    ]

    // 3. Process each product
    const imagesSourceDir = path.resolve(__dirname, '../public')

    for (const p of productsData) {
        // Ensure Category Exists
        let categoryDoc;
        const existingCategory = await payload.find({
            collection: 'categories',
            where: {
                and: [
                    { name: { equals: p.categoryName } },
                    { store: { equals: storeDoc.id } }
                ]
            },
        })

        if (existingCategory.docs.length > 0) {
            categoryDoc = existingCategory.docs[0]
        } else {
            categoryDoc = await payload.create({
                collection: 'categories',
                data: {
                    name: p.categoryName,
                    store: storeDoc.id
                },
            })
            console.log(`Created category: ${p.categoryName}`)
        }

        // Handle Image
        let mediaId = null;
        if (p.imagePath) {
            const filePath = path.join(imagesSourceDir, p.imagePath)
            if (fs.existsSync(filePath)) {
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
                    image: mediaId,
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

    console.log('Shawarma Now Now seeding completed successfully!')
    process.exit(0)
}

seed().catch(err => {
    console.error('Seed failed:', err)
    process.exit(1)
})
