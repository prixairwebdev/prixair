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

    console.log('Seeding Buka store data...')

    const payload = await getPayload({ config: configPromise })

    // 1. Create/Get Buka Store
    console.log('Ensuring Buka store exists...')
    let storeDoc;
    const existingStore = await payload.find({
        collection: 'stores' as any,
        where: { slug: { equals: 'buka' } },
    })

    if (existingStore.docs.length > 0) {
        storeDoc = existingStore.docs[0]
        console.log('Found existing Buka store.')
    } else {
        storeDoc = await payload.create({
            collection: 'stores' as any,
            data: {
                name: 'Buka',
                slug: 'buka',
                description: 'Authentic Nigerian dishes made fresh, served fast.',
                isActive: true,
            },
        })
        console.log('Created Buka store.')
    }

    // 2. Create Categories
    console.log('Creating Buka categories...')
    const categories = [
        { name: "Rice Dishes", imagePath: '../public/categories/rice.png' },
        { name: "Soups & Swallows", imagePath: '../public/categories/soup.png' },
        { name: "Grilled Foods", imagePath: '../public/categories/grilled.png' },
        { name: "Drinks & Extras", imagePath: '../public/categories/drinks.png' },
    ];

    const categoryDocs: Record<string, any> = {};

    for (const cat of categories) {
        const existingCategory = await payload.find({
            collection: 'categories' as any,
            where: { 
                and: [
                    { name: { equals: cat.name } },
                    { store: { equals: storeDoc.id } }
                ]
            },
        })

        if (existingCategory.docs.length > 0) {
            categoryDocs[cat.name] = existingCategory.docs[0];
            console.log(`Found existing category: ${cat.name}`);
        } else {
            const doc = await payload.create({
                collection: 'categories' as any,
                data: { 
                    name: cat.name,
                    store: storeDoc.id 
                },
            })
            categoryDocs[cat.name] = doc;
            console.log(`Created category: ${cat.name}`);
        }
    }

    // 3. Upload Images
    console.log('Uploading images...')
    const dishImages = [
        { name: 'jollof.png', alt: 'Jollof Rice & Chicken', path: '../public/dishes/jollof.png' },
        { name: 'py.png', alt: 'Pounded Yam & Egusi', path: '../public/dishes/py.png' },
        { name: 'friedrice.png', alt: 'Fried Rice & Turkey', path: '../public/dishes/friedrice.png' },
        { name: 'ofada.png', alt: 'Rice & Ofada Sauce', path: '../public/dishes/ofada.png' },
    ]

    const mediaDocs: Record<string, any> = {}

    for (const img of dishImages) {
        const filePath = path.resolve(__dirname, img.path)
        if (!fs.existsSync(filePath)) {
            console.warn(`Image file not found: ${filePath}`)
            continue
        }

        // Check if media already exists
        const existingMedia = await payload.find({
            collection: 'media',
            where: {
                alt: { equals: img.alt }
            }
        })

        if (existingMedia.docs.length > 0) {
            mediaDocs[img.alt] = existingMedia.docs[0]
            console.log(`Using existing image: ${img.alt}`)
            continue
        }

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
    console.log('Creating Buka products...')
    const products = [
        {
            name: "Jollof Rice & Chicken",
            price: 2500,
            description: "Smoky jollof with spicy grilled chicken and fried plantain",
            imageAlt: "Jollof Rice & Chicken",
            category: "Rice Dishes"
        },
        {
            name: "Pounded Yam & Egusi",
            price: 3000,
            description: "Soft pounded yam served with thick melon seed soup",
            imageAlt: "Pounded Yam & Egusi",
            category: "Soups & Swallows"
        },
        {
            name: "Fried Rice & Turkey",
            price: 2800,
            description: "Golden fried rice with peppered turkey and salad",
            imageAlt: "Fried Rice & Turkey",
            category: "Rice Dishes"
        },
        {
            name: "Rice & Ofada Sauce",
            price: 2200,
            description: "Local white rice with spicy ofada sauce and egg",
            imageAlt: "Rice & Ofada Sauce",
            category: "Rice Dishes"
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
            const mediaDoc = mediaDocs[p.imageAlt];
            const catDoc = categoryDocs[p.category];

            if (!mediaDoc) {
                console.warn(`Media not found for product: ${p.name}`);
                continue;
            }
            if (!catDoc) {
                console.warn(`Category not found for product: ${p.name}`);
                continue;
            }

            await payload.create({
                collection: 'products',
                data: {
                    name: p.name,
                    price: p.price,
                    description: p.description,
                    category: catDoc.id,
                    image: mediaDoc.id,
                    store: storeDoc.id,
                    stock: 100,
                    rating: 5,
                    reviewCount: 20,
                }
            })
            console.log(`Created product: ${p.name}`)
        } else {
            console.log(`Product already exists: ${p.name}`)
        }
    }

    console.log('Buka seeding completed successfully!')
    process.exit(0)
}

seed().catch(err => {
    console.error('Seed failed:', err)
    process.exit(1)
})
