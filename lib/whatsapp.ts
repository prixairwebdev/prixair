const STORE_WHATSAPP_NUMBERS: Record<string, string | undefined> = {
    buka: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_BUKA,
    gavi: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_GAVI,
    iyanvillage: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_IYANVILLAGE,
    noodlelicious: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_NOODLELICIOUS,
    seaside: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_SEASIDE,
    toastpan: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_TOASTPAN,
    supermarket: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_SUPERMARKET,
    pharmacy: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_PHARMACY,
    hotel: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_HOTEL,
    beautybar: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_BEAUTYBAR,
    partyjollof: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_PARTYJOLLOF,
    shawarmanomnow: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_SHAWARMANOMNOW,
};

export function getRestaurantWhatsAppNumber(storeSlug: string) {
    return STORE_WHATSAPP_NUMBERS[storeSlug] || '';
}

export function sanitizeWhatsAppNumber(phoneNumber: string) {
    return phoneNumber.replace(/[^\d]/g, '');
}

