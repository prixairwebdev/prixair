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
    const { default: configPromise } = await import('../payload.config.ts')

    console.log('Seeding Party Jollof data...')

    const payload = await getPayload({ config: configPromise })

    // 1. Create/Get Party Jollof Store
    console.log('Ensuring Party Jollof store exists...')
    let storeDoc: any
    const existingStore = await payload.find({
        collection: 'stores' as any,
        where: { slug: { equals: 'party-jollof' } },
        limit: 1,
    })

    if (existingStore.docs.length > 0) {
        storeDoc = existingStore.docs[0]
        console.log('Found existing Party Jollof store.')
    } else {
        storeDoc = await payload.create({
            collection: 'stores' as any,
            data: {
                name: 'Party Jollof',
                slug: 'party-jollof',
                description: 'Authentic party jollof rice and celebratory Nigerian flavors.',
                isActive: true,
            },
        })
        console.log('Created Party Jollof store.')
    }

    // 2. Create/Get Categories
    const categories = [
        'Party Rice',
        'Spicy Chicken',
        'Sides',
        'Beverages',
    ]

    console.log('Ensuring Party Jollof categories exist...')
    const categoryDocs: Record<string, any> = {}

    for (const name of categories) {
        const existingCategory = await payload.find({
            collection: 'categories' as any,
            where: {
                and: [
                    { name: { equals: name } },
                    { store: { equals: storeDoc.id } },
                ],
            },
            limit: 1,
        })

        if (existingCategory.docs.length > 0) {
            categoryDocs[name] = existingCategory.docs[0]
            console.log(`Found existing category: ${name}`)
        } else {
            const categoryDoc = await payload.create({
                collection: 'categories' as any,
                data: {
                    name,
                    store: storeDoc.id,
                },
            })
            categoryDocs[name] = categoryDoc
            console.log(`Created category: ${name}`)
        }
    }

    // 3. Upload images
    console.log('Uploading Party Jollof images...')
    const imagesSourceDir = path.resolve(__dirname, '../public/partyjollof')
    const imageFiles = [
        { file: 'pj1.jpeg', alt: 'Party Jollof Classic' },
        { file: 'pj2.jpeg', alt: 'Smoky Jollof Rice' },
        { file: 'pj3.jpeg', alt: 'Peppered Chicken' },
        { file: 'pj4.jpeg', alt: 'Jollof Rice Platter' },
        { file: 'pj5.jpeg', alt: 'Party Jollof Feast' },
        { file: 'pj6.jpeg', alt: 'Jollof with Plantain' },
        { file: 'pj7.jpeg', alt: 'Celebration Jollof' },
    ]

    const mediaDocs: Record<string, any> = {}

    for (const image of imageFiles) {
        const filePath = path.join(imagesSourceDir, image.file)
        if (!fs.existsSync(filePath)) {
            console.warn(`Image file not found: ${filePath}`)
            continue
        }

        const imageBuffer = fs.readFileSync(filePath)
        const mediaDoc = await payload.create({
            collection: 'media' as any,
            data: {
                alt: image.alt,
            },
            file: {
                data: imageBuffer,
                name: image.file,
                mimetype: 'image/jpeg',
                size: imageBuffer.length,
            },
        })

        mediaDocs[image.alt] = mediaDoc
        console.log(`Uploaded image: ${image.alt}`)
    }

    // 4. Create Products
    console.log('Creating Party Jollof products...')
    const products = [
        {
            name: 'Party Jollof Classic',
            price: 8200,
            description: 'Smoky jollof rice served with tender grilled chicken and fried plantain.',
            category: 'Party Rice',
            imageAlt: 'Party Jollof Classic',
        },
        {
            name: 'Peppered Chicken Jollof',
            price: 9200,
            description: 'Spicy peppered chicken on a bed of rich jollof rice with fresh herbs.',
            category: 'Spicy Chicken',
            imageAlt: 'Peppered Chicken',
        },
        {
            name: 'Jollof Rice Platter',
            price: 7800,
            description: 'Generous serving of party jollof rice with coleslaw and fried plantain.',
            category: 'Party Rice',
            imageAlt: 'Jollof Rice Platter',
        },
        {
            name: 'Smoky Jollof Feast',
            price: 10200,
            description: 'A celebration plate of jollof rice, chicken, beef, and plantain.',
            category: 'Party Rice',
            imageAlt: 'Party Jollof Feast',
        },
        {
            name: 'Jollof & Plantain Combo',
            price: 7600,
            description: 'Classic jollof rice paired with sweet fried plantain and a side salad.',
            category: 'Sides',
            imageAlt: 'Jollof with Plantain',
        },
        {
            name: 'Celebration Jollof Bowl',
            price: 8800,
            description: 'Rich and aromatic party jollof rice topped with spicy beef and garden greens.',
            category: 'Party Rice',
            imageAlt: 'Celebration Jollof',
        },
    ]

    for (const product of products) {
        const existingProduct = await payload.find({
            collection: 'products' as any,
            where: {
                and: [
                    { name: { equals: product.name } },
                    { store: { equals: storeDoc.id } },
                ],
            },
            limit: 1,
        })

        if (existingProduct.docs.length > 0) {
            console.log(`Product already exists: ${product.name}`)
            continue
        }

        const categoryDoc = categoryDocs[product.category]
        const mediaDoc = mediaDocs[product.imageAlt]

        if (!categoryDoc) {
            console.warn(`Skipping product because category not found: ${product.name}`)
            continue
        }

        if (!mediaDoc) {
            console.warn(`Skipping product because image not found: ${product.name}`)
            continue
        }

        await payload.create({
            collection: 'products' as any,
            data: {
                name: product.name,
                description: product.description,
                price: product.price,
                stock: 100,
                rating: 4.8,
                reviewCount: 12,
                category: categoryDoc.id,
                image: mediaDoc.id,
                store: storeDoc.id,
            },
        })
        console.log(`Created product: ${product.name}`)
    }

    console.log('Party Jollof seed completed successfully!')
    process.exit(0)
}

seed().catch(err => {
    console.error('Party Jollof seed failed:', err)
    process.exit(1)
})
