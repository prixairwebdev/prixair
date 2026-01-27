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

    console.log('Seeding Iyan Village data...')

    const payload = await getPayload({ config: configPromise })

    // 1. Create/Get Iyan Village Store
    console.log('Ensuring Iyan Village store exists...')
    let storeDoc;
    const existingStore = await payload.find({
        collection: 'stores',
        where: { slug: { equals: 'iyanvillage' } },
    })

    if (existingStore.docs.length > 0) {
        storeDoc = existingStore.docs[0]
        console.log('Found existing Iyan Village store.')
    } else {
        storeDoc = await payload.create({
            collection: 'stores',
            data: {
                name: 'Iyan Village',
                slug: 'iyanvillage',
                description: 'Authentic pounded yam and rich indigenous soups. A taste of home in every bite.',
                isActive: true,
            },
        })
        console.log('Created Iyan Village store.')
    }

    // 2. Define Product Data
    const productsData = [
        {
            name: "Classic Pounded Yam",
            categoryName: "Swallow",
            price: 5000,
            description: "Smooth, fluffy pounded yam served with your choice of rich indigenous soup.",
            imagePath: "iyanvillage/iyan8.jpeg",
            alt: "Classic Pounded Yam"
        },
        {
            name: "Egusi Soup Special",
            categoryName: "Soups",
            price: 4500,
            description: "Rich melon seed soup with melon, spinach, and assorted meats.",
            imagePath: "iyanvillage/iyan7.jpeg",
            alt: "Egusi Soup Special"
        },
        {
            name: "Fisherman Soup",
            categoryName: "Soups",
            price: 6500,
            description: "A coastal delight featuring fresh fish, prawns, and traditional spices.",
            imagePath: "iyanvillage/iyan6.jpeg",
            alt: "Fisherman Soup"
        },
        {
            name: "Village Platter",
            categoryName: "Combos",
            price: 8500,
            description: "A hearty combination of Iyan, two soups, and extra protein.",
            imagePath: "iyanvillage/iyan5.jpeg",
            alt: "Village Platter"
        },
        {
            name: "Banga Soup",
            categoryName: "Soups",
            price: 5200,
            description: "Palm nut soup slow-cooked to perfection with native spices.",
            imagePath: "iyanvillage/iyan6.jpeg",
            alt: "Banga Soup"
        },
        {
            name: "Afang Soup",
            categoryName: "Soups",
            price: 4800,
            description: "A nutritious blend of Afang leaves and waterleaf with rich protein.",
            imagePath: "iyanvillage/iyan3.jpeg",
            alt: "Afang Soup"
        },
        {
            name: "Efo Riro",
            categoryName: "Soups",
            price: 4500,
            description: "Classic Yoruba spinach stew with palm oil and locust beans.",
            imagePath: "iyanvillage/iyan2.jpeg",
            alt: "Efo Riro"
        },
        {
            name: "White Soup (Afia Efere)",
            categoryName: "Soups",
            price: 5500,
            description: "Spicy and aromatic soup thickened with pounded yam.",
            imagePath: "iyanvillage/iyan15.jpeg",
            alt: "White Soup"
        }
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

    console.log('Iyan Village seeding completed successfully!')
    process.exit(0)
}

seed().catch(err => {
    console.error('Seed failed:', err)
    process.exit(1)
})
