'use server'

import { getPayload } from 'payload'
import type { Where } from 'payload'
import config from '@payload-config'

export interface HotelRoom {
    id: string;
    name: string;
    roomType: string;
    pricePerNight: number;
    description?: string;
    image?: { url: string; alt?: string } | null;
    maxGuests: number;
    bedType?: string;
    size?: string;
    amenities?: { amenity: string }[];
    rating: number;
    isAvailable: boolean;
    hotel: {
        id: string;
        name: string;
        slug: string;
        location: string;
        whatsappNumber?: string;
    };
}

export interface HotelData {
    id: string;
    name: string;
    slug: string;
    location: string;
    address?: string;
    city?: string;
    state?: string;
    description?: string;
    image?: { url: string; alt?: string } | null;
    whatsappNumber?: string;
    phone?: string;
    email?: string;
    starRating?: string;
    amenities?: { amenity: string }[];
    isActive: boolean;
}

export async function getHotels(): Promise<HotelData[]> {
    const payload = await getPayload({ config })

    try {
        const result = await payload.find({
            collection: 'hotels',
            where: {
                isActive: { equals: true },
            },
            depth: 1,
        })

        return result.docs.map((doc) => ({
            id: String(doc.id),
            name: doc.name,
            slug: doc.slug || '',
            location: doc.location,
            address: doc.address || undefined,
            city: doc.city || undefined,
            state: doc.state || undefined,
            description: doc.description || undefined,
            image: doc.image && typeof doc.image === 'object' ? { url: (doc.image as { url: string }).url, alt: doc.name } : null,
            whatsappNumber: doc.whatsappNumber || undefined,
            phone: doc.phone || undefined,
            email: doc.email || undefined,
            starRating: doc.starRating || undefined,
            amenities: doc.amenities as { amenity: string }[] || [],
            isActive: Boolean(doc.isActive),
        }))
    } catch (error) {
        console.error('Error fetching hotels:', error)
        return []
    }
}

export async function getHotelBySlug(slug: string): Promise<HotelData | null> {
    const payload = await getPayload({ config })

    try {
        const result = await payload.find({
            collection: 'hotels',
            where: {
                slug: { equals: slug },
            },
            limit: 1,
            depth: 1,
        })

        if (result.docs.length === 0) return null

        const doc = result.docs[0]
        return {
            id: String(doc.id),
            name: doc.name,
            slug: doc.slug || '',
            location: doc.location,
            address: doc.address || undefined,
            city: doc.city || undefined,
            state: doc.state || undefined,
            description: doc.description || undefined,
            image: doc.image && typeof doc.image === 'object' ? { url: (doc.image as { url: string }).url, alt: doc.name } : null,
            whatsappNumber: doc.whatsappNumber || undefined,
            phone: doc.phone || undefined,
            email: doc.email || undefined,
            starRating: doc.starRating || undefined,
            amenities: doc.amenities as { amenity: string }[] || [],
            isActive: Boolean(doc.isActive),
        }
    } catch (error) {
        console.error('Error fetching hotel:', error)
        return null
    }
}

export async function getFirstHotel(): Promise<HotelData | null> {
    const payload = await getPayload({ config })

    try {
        const result = await payload.find({
            collection: 'hotels',
            where: {
                isActive: { equals: true },
            },
            limit: 1,
            depth: 1,
        })

        if (result.docs.length === 0) return null

        const doc = result.docs[0]
        return {
            id: String(doc.id),
            name: doc.name,
            slug: doc.slug || '',
            location: doc.location,
            address: doc.address || undefined,
            city: doc.city || undefined,
            state: doc.state || undefined,
            description: doc.description || undefined,
            image: doc.image && typeof doc.image === 'object' ? { url: (doc.image as { url: string }).url, alt: doc.name } : null,
            whatsappNumber: doc.whatsappNumber || undefined,
            phone: doc.phone || undefined,
            email: doc.email || undefined,
            starRating: doc.starRating || undefined,
            amenities: doc.amenities as { amenity: string }[] || [],
            isActive: Boolean(doc.isActive),
        }
    } catch (error) {
        console.error('Error fetching first hotel:', error)
        return null
    }
}

export async function getRooms(
    hotelSlug?: string, 
    roomType?: string, 
    limit: number = 50,
    location?: string,
    guests?: number
): Promise<HotelRoom[]> {
    const payload = await getPayload({ config })

    try {
        const where: Where = {
            isAvailable: { equals: true },
        }

        if (hotelSlug) {
            const hotelResult = await payload.find({
                collection: 'hotels',
                where: { slug: { equals: hotelSlug } },
                limit: 1,
            })
            if (hotelResult.docs.length > 0) {
                where['hotel'] = { equals: hotelResult.docs[0].id }
            }
        }

        if (location) {
            // Find hotels in this location first
            const hotelsInLocation = await payload.find({
                collection: 'hotels',
                where: {
                    or: [
                        { location: { contains: location } },
                        { city: { contains: location } },
                        { state: { contains: location } },
                    ]
                },
                limit: 100,
            })
            
            if (hotelsInLocation.docs.length > 0) {
                where['hotel'] = {
                    in: hotelsInLocation.docs.map(h => h.id)
                }
            } else {
                // If no hotels found in that location, return empty
                return []
            }
        }

        if (roomType && roomType !== 'all' && roomType !== 'Select') {
            where['roomType'] = { equals: roomType.toLowerCase() }
        }

        if (guests && guests > 0) {
            where['maxGuests'] = { greater_than_equal: guests }
        }

        const result = await payload.find({
            collection: 'rooms',
            where,
            depth: 2,
            limit,
        })

        return result.docs.map((doc) => {
            const hotel = typeof doc.hotel === 'object' && doc.hotel !== null ? doc.hotel as unknown as Record<string, unknown> : null
            return {
                id: String(doc.id),
                name: doc.name,
                roomType: doc.roomType || 'standard',
                pricePerNight: doc.pricePerNight,
                description: doc.description || undefined,
                image: doc.image && typeof doc.image === 'object' ? { url: (doc.image as { url: string }).url, alt: doc.name } : null,
                maxGuests: doc.maxGuests || 2,
                bedType: doc.bedType || undefined,
                size: doc.size || undefined,
                amenities: doc.amenities as { amenity: string }[] || [],
                rating: doc.rating || 5,
                isAvailable: Boolean(doc.isAvailable),
                hotel: hotel ? {
                    id: String(hotel.id),
                    name: String(hotel.name || ''),
                    slug: String(hotel.slug || ''),
                    location: String(hotel.location || ''),
                    whatsappNumber: hotel.whatsappNumber ? String(hotel.whatsappNumber) : undefined,
                } : {
                    id: String(typeof doc.hotel === 'string' ? doc.hotel : ''),
                    name: '',
                    slug: '',
                    location: '',
                },
            }
        })
    } catch (error) {
        console.error('Error fetching rooms:', error)
        return []
    }
}
