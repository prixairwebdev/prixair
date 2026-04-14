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

    console.log('Seeding Hotel and Room data...')

    const payload = await getPayload({ config: configPromise })

    // 1. Upload Hotel Main Image
    console.log('Uploading hotel images...')
    const hotelImageFile = 'subsidiaries/hotel.png'
    const hotelImagePath = path.resolve(__dirname, '../public', hotelImageFile)
    let hotelMediaDoc;

    if (fs.existsSync(hotelImagePath)) {
        const imageBuffer = fs.readFileSync(hotelImagePath)
        hotelMediaDoc = await payload.create({
            collection: 'media',
            data: {
                alt: 'Prixair Hotel Main',
            },
            file: {
                data: imageBuffer,
                name: 'hotel-main.png',
                mimetype: 'image/png',
                size: imageBuffer.length,
            }
        })
        console.log('Uploaded hotel main image.')
    }

    // 2. Create Hotel
    console.log('Ensuring Prixair Hotel exists...')
    let hotelDoc;
    const existingHotel = await payload.find({
        collection: 'hotels',
        where: { slug: { equals: 'prixair-hotel-abuja' } },
    })

    if (existingHotel.docs.length > 0) {
        hotelDoc = existingHotel.docs[0]
        console.log('Found existing Hotel.')
    } else {
        hotelDoc = await payload.create({
            collection: 'hotels',
            data: {
                name: 'Prixair Hotel Abuja',
                slug: 'prixair-hotel-abuja',
                location: 'Wuse II, Abuja',
                address: 'No 15, Gana Street',
                city: 'Abuja',
                state: 'FCT',
                description: 'Experience luxury and comfort in the heart of Abuja. Our hotel offers world-class amenities and exceptional service for both business and leisure travelers.',
                image: hotelMediaDoc?.id,
                whatsappNumber: '2348012345678',
                email: 'hotel@prixair.com',
                phone: '+234 801 234 5678',
                starRating: '4',
                isActive: true,
                amenities: [
                    { amenity: 'Free Wi-Fi' },
                    { amenity: 'Swimming Pool' },
                    { amenity: 'Fitness Center' },
                    { amenity: 'Restaurant & Bar' },
                    { amenity: '24/7 Room Service' },
                    { amenity: 'Conference Rooms' },
                ]
            },
        })
        console.log('Created Prixair Hotel.')
    }

    // 3. Upload Room Images
    console.log('Uploading room images...')
    const roomImages = ['room1.png', 'room2.png', 'room3.png', 'room4.png', 'room5.png', 'room6.png']
    const roomMediaDocs = []

    for (const imgName of roomImages) {
        const imgPath = path.resolve(__dirname, '../public', imgName)
        if (fs.existsSync(imgPath)) {
            const imageBuffer = fs.readFileSync(imgPath)
            const mediaDoc = await payload.create({
                collection: 'media',
                data: {
                    alt: `Room Image ${imgName}`,
                },
                file: {
                    data: imageBuffer,
                    name: imgName,
                    mimetype: 'image/png',
                    size: imageBuffer.length,
                }
            })
            roomMediaDocs.push(mediaDoc)
            console.log(`Uploaded room image: ${imgName}`)
        }
    }

    // 4. Create Rooms
    console.log('Creating Rooms...')
    const roomsData = [
        {
            name: 'Standard Single Room',
            roomType: 'standard',
            pricePerNight: 35000,
            description: 'A cozy and comfortable room perfect for solo travelers. Features a single bed and modern amenities.',
            maxGuests: 1,
            bedType: 'single',
            size: '25 sqm',
            imageIdx: 0,
        },
        {
            name: 'Executive Double Room',
            roomType: 'executive',
            pricePerNight: 55000,
            description: 'Spacious room with a queen-sized bed, ideal for couples or business travelers seeking extra comfort.',
            maxGuests: 2,
            bedType: 'queen',
            size: '35 sqm',
            imageIdx: 1,
        },
        {
            name: 'Deluxe Suite',
            roomType: 'deluxe',
            pricePerNight: 85000,
            description: 'Luxury at its best. Our deluxe suite features a separate living area, king-sized bed, and premium amenities.',
            maxGuests: 2,
            bedType: 'king',
            size: '50 sqm',
            imageIdx: 2,
        },
        {
            name: 'Business Suite',
            roomType: 'business',
            pricePerNight: 75000,
            description: 'Designed for the modern professional, this suite includes a dedicated workspace and high-speed connectivity.',
            maxGuests: 2,
            bedType: 'king',
            size: '45 sqm',
            imageIdx: 3,
        },
        {
            name: 'Presidential Suite',
            roomType: 'presidential',
            pricePerNight: 150000,
            description: 'The pinnacle of luxury. Our presidential suite offers unparalleled space, luxury, and panoramic city views.',
            maxGuests: 4,
            bedType: 'king',
            size: '120 sqm',
            imageIdx: 4,
        },
        {
            name: 'Family Suite',
            roomType: 'suite',
            pricePerNight: 95000,
            description: 'Perfect for families, featuring two bedrooms and a shared living space for a home-away-from-home experience.',
            maxGuests: 4,
            bedType: 'twin',
            size: '70 sqm',
            imageIdx: 5,
        },
    ]

    for (const r of roomsData) {
        const existing = await payload.find({
            collection: 'rooms',
            where: {
                and: [
                    { name: { equals: r.name } },
                    { hotel: { equals: hotelDoc.id } }
                ]
            },
        })

        if (existing.docs.length === 0) {
            const mediaDoc = roomMediaDocs[r.imageIdx] || roomMediaDocs[0]
            
            await payload.create({
                collection: 'rooms',
                data: {
                    name: r.name,
                    hotel: hotelDoc.id,
                    roomType: r.roomType,
                    pricePerNight: r.pricePerNight,
                    description: r.description,
                    image: mediaDoc?.id,
                    maxGuests: r.maxGuests,
                    bedType: r.bedType,
                    size: r.size,
                    rating: 5,
                    isAvailable: true,
                    amenities: [
                        { amenity: 'Air Conditioning' },
                        { amenity: 'Smart TV' },
                        { amenity: 'Mini Bar' },
                        { amenity: 'Safe Box' },
                    ]
                }
            })
            console.log(`Created room: ${r.name}`)
        } else {
            console.log(`Room already exists: ${r.name}`)
        }
    }

    console.log('Seeding completed successfully!')
    process.exit(0)
}

seed().catch(err => {
    console.error('Seed failed:', err)
    process.exit(1)
})
