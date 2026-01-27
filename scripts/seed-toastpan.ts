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

    console.log('Seeding Toast Pan data...')

    const payload = await getPayload({ config: configPromise })

    // 1. Create/Get Toast Pan Store
    console.log('Ensuring Toast Pan store exists...')
    let storeDoc;
    const existingStore = await payload.find({
        collection: 'stores' as any,
        where: { slug: { equals: 'toastpan' } },
    })

    if (existingStore.docs.length > 0) {
        storeDoc = existingStore.docs[0]
        console.log('Found existing Toast Pan store.')
    } else {
        storeDoc = await payload.create({
            collection: 'stores' as any,
            data: {
                name: 'Toast Pan',
                slug: 'toastpan',
                description: 'The Ultimate Toast Experience.',
                isActive: true,
            },
        })
        console.log('Created Toast Pan store.')
    }

    // 2. Create/Get Toast Category
    console.log('Ensuring Toast category exists...')
    let categoryDoc;
    const existingCategory = await payload.find({
        collection: 'categories' as any,
        where: { name: { equals: 'Toast' } },
    })

    if (existingCategory.docs.length > 0) {
        categoryDoc = existingCategory.docs[0]
        console.log('Found existing Toast category.')
    } else {
        categoryDoc = await payload.create({
            collection: 'categories' as any,
            data: { name: 'Toast' },
        })
        console.log('Created Toast category.')
    }

    // 3. Upload Images
    console.log('Uploading images...')
    const imagesSourceDir = path.resolve(__dirname, '../public/toastpanimg')
    const imageFiles = [
        { name: 'toastpan2.jpeg', alt: 'Cinnamon French Toast' },
        { name: 'toastpan3.jpeg', alt: 'Spicy Tuna Melt' },
        { name: 'toastpan4.jpeg', alt: 'Honey Walnut Toast' },
        { name: 'toastpan5.jpeg', alt: 'Smoked Salmon Toast' },
        { name: 'toastpan6.jpeg', alt: 'Berry Mascarpone' },
        { name: 'toastpan7.jpeg', alt: 'Classic Avocado Toast' },
        { name: 'toastpan8.jpeg', alt: 'Nutella Banana' },
        { name: 'toastpan9.jpeg', alt: 'Garlic Mushroom' },
    ]

    const mediaDocs: Record<string, any> = {}

    for (const img of imageFiles) {
        const filePath = path.join(imagesSourceDir, img.name)
        if (!fs.existsSync(filePath)) {
            console.warn(`Image file not found: ${filePath}`)
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
                mimetype: 'image/jpeg',
                size: imageBuffer.length,
            }
        })
        mediaDocs[img.alt] = mediaDoc
        console.log(`Uploaded image: ${img.alt}`)
    }

    // 4. Create Products
    console.log('Creating Toast Pan products...')
    const products = [
        {
            name: "Classic Avocado Toast",
            price: 4500,
            description: "Smashed avocado, cherry tomatoes, and poached egg on sourdough.",
            imageAlt: "Classic Avocado Toast"
        },
        {
            name: "Cinnamon French Toast",
            price: 3800,
            description: "Brioche soaked in vanilla custard, served with maple syrup and berries.",
            imageAlt: "Cinnamon French Toast"
        },
        {
            name: "Spicy Tuna Melt",
            price: 4200,
            description: "Zesty tuna salad with melted cheddar on toasted rustic bread.",
            imageAlt: "Spicy Tuna Melt"
        },
        {
            name: "Honey Walnut Toast",
            price: 3500,
            description: "Creamy whipped ricotta, walnuts, and a drizzle of local honey.",
            imageAlt: "Honey Walnut Toast"
        },
        {
            name: "Smoked Salmon Toast",
            price: 5500,
            description: "Premium smoked salmon, cream cheese, capers, and red onions.",
            imageAlt: "Smoked Salmon Toast"
        },
        {
            name: "Berry Mascarpone",
            price: 4000,
            description: "Sweet mascarpone spread with seasonal berries and mint.",
            imageAlt: "Berry Mascarpone"
        },
        {
            name: "Garlic Mushroom",
            price: 4200,
            description: "Sautéed wild mushrooms with garlic butter and thyme.",
            imageAlt: "Garlic Mushroom"
        },
        {
            name: "Nutella Banana",
            price: 3500,
            description: "Thick cut toast with Nutella, bananas, and toasted hazelnuts.",
            imageAlt: "Nutella Banana"
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
            if (!mediaDoc) {
                console.warn(`Media not found for product: ${p.name}`);
                continue;
            }

            await payload.create({
                collection: 'products',
                data: {
                    name: p.name,
                    price: p.price,
                    description: p.description,
                    category: categoryDoc.id,
                    image: mediaDoc.id,
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
