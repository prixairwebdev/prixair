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

    console.log('Seeding Gavi bakery data...')

    const payload = await getPayload({ config: configPromise })

    // 1. Create/Get Gavi Store
    console.log('Ensuring Gavi store exists...')
    let storeDoc;
    const existingStore = await payload.find({
        collection: 'stores' as any,
        where: { slug: { equals: 'gavi' } },
    })

    if (existingStore.docs.length > 0) {
        storeDoc = existingStore.docs[0]
        console.log('Found existing Gavi store.')
    } else {
        storeDoc = await payload.create({
            collection: 'stores' as any,
            data: {
                name: 'Gavi',
                slug: 'gavi',
                description: 'Baked with Heart - Fresh bakery delights daily.',
                isActive: true,
            },
        })
        console.log('Created Gavi store.')
    }

    // 2. Create/Get Bakery Category
    console.log('Ensuring Bakery category exists...')
    let categoryDoc;
    const existingCategory = await payload.find({
        collection: 'categories' as any,
        where: { name: { equals: 'Bakery' } },
    })

    if (existingCategory.docs.length > 0) {
        categoryDoc = existingCategory.docs[0]
        console.log('Found existing Bakery category.')
    } else {
        categoryDoc = await payload.create({
            collection: 'categories' as any,
            data: { name: 'Bakery' },
        })
        console.log('Created Bakery category.')
    }

    // 3. Upload Images
    console.log('Uploading images...')
    const imagesSourceDir = path.resolve(__dirname, '../public/foodimg')

    // Map images from existing foodimg directories
    const imageFiles = [
        { name: 'bestsellers/sourdough.png', alt: 'Sourdough Bread' },
        { name: 'bestsellers/cupcakes.png', alt: 'Red Velvet Cupcakes' },
        { name: 'bestsellers/croissant.png', alt: 'Butter Croissants' },
        { name: 'bestsellers/cookies.png', alt: 'Choco-Chip Cookies' },
        { name: 'dailyspecials/agege.png', alt: 'Agege Bread' },
        { name: 'dailyspecials/meatpie.png', alt: 'Meat Pie' },
        { name: 'dailyspecials/sandwich.png', alt: 'Bread Sandwich' },
        { name: 'dailyspecials/chocolatecake.png', alt: 'Chocolate Cake Slice' },
    ]

    const mediaDocs: Record<string, any> = {}

    for (const img of imageFiles) {
        const filePath = path.join(imagesSourceDir, img.name)
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
        const mimeType = img.name.endsWith('.png') ? 'image/png' : 'image/jpeg'

        const mediaDoc = await payload.create({
            collection: 'media',
            data: {
                alt: img.alt,
            },
            file: {
                data: imageBuffer,
                name: path.basename(img.name),
                mimetype: mimeType,
                size: imageBuffer.length,
            }
        })
        mediaDocs[img.alt] = mediaDoc
        console.log(`Uploaded image: ${img.alt}`)
    }

    // 4. Create Products
    console.log('Creating Gavi bakery products...')
    const products = [
        {
            name: "Sourdough Bread",
            price: 1500,
            description: "Artisan sourdough with a perfect crust and soft interior. Baked fresh daily.",
            imageAlt: "Sourdough Bread"
        },
        {
            name: "Red Velvet Cupcakes",
            price: 2000,
            description: "Rich red velvet cupcakes topped with cream cheese frosting. Sold in packs of 6.",
            imageAlt: "Red Velvet Cupcakes"
        },
        {
            name: "Butter Croissants",
            price: 1200,
            description: "Flaky, buttery French croissants that melt in your mouth.",
            imageAlt: "Butter Croissants"
        },
        {
            name: "Choco-Chip Cookies",
            price: 1500,
            description: "Classic chocolate chip cookies - crispy on the outside, chewy inside.",
            imageAlt: "Choco-Chip Cookies"
        },
        {
            name: "Agege Bread",
            price: 2000,
            description: "Soft, fluffy Agege bread that reminds you of home.",
            imageAlt: "Agege Bread"
        },
        {
            name: "Meat Pie",
            price: 1000,
            description: "Savory meat pies with perfectly seasoned beef filling. Sold in packs of 6.",
            imageAlt: "Meat Pie"
        },
        {
            name: "Bread Sandwich",
            price: 800,
            description: "Freshly made sandwiches with quality ingredients.",
            imageAlt: "Bread Sandwich"
        },
        {
            name: "Chocolate Cake Slice",
            price: 4000,
            description: "Decadent chocolate cake with rich ganache. Perfect for any celebration.",
            imageAlt: "Chocolate Cake Slice"
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

    console.log('Gavi seeding completed successfully!')
    process.exit(0)
}

seed().catch(err => {
    console.error('Seed failed:', err)
    process.exit(1)
})
