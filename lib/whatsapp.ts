const RESTAURANT_WHATSAPP_NUMBERS: Record<string, string | undefined> = {
    buka: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_BUKA,
    gavi: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_GAVI,
    iyanvillage: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_IYANVILLAGE,
    noodlelicious: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_NOODLELICIOUS,
    seaside: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_SEASIDE,
    toastpan: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_TOASTPAN,
};

const DEFAULT_RESTAURANT_WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_RESTAURANTS;

export function getRestaurantWhatsAppNumber(storeSlug: string) {
    return RESTAURANT_WHATSAPP_NUMBERS[storeSlug] || DEFAULT_RESTAURANT_WHATSAPP_NUMBER || '';
}

export function sanitizeWhatsAppNumber(phoneNumber: string) {
    return phoneNumber.replace(/[^\d]/g, '');
}

