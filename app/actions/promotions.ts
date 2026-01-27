'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export type CartItemForPromo = {
    id: string; // Product ID or Cart Item ID? Usually product ID is needed. 
    // In CartContext, item.id might be product ID. Let's assume passed items have product ID.
    price: number;
    qty: number;
}

export type PromoValidationResult = {
    isValid: boolean;
    discount?: number;
    message?: string;
    promo?: any; // The promo object
}

export async function validatePromotion(
    code: string,
    storeSlug: string,
    items: CartItemForPromo[]
): Promise<PromoValidationResult> {
    const payload = await getPayload({ config })

    try {
        // 1. Find the promotion
        const promoQuery = await payload.find({
            collection: 'promotions' as any,
            where: {
                code: {
                    equals: code,
                },
                isActive: {
                    equals: true,
                },
            },
            limit: 1,
            depth: 1, // To populate relationships if needed (but might be heavy)
        })

        if (promoQuery.docs.length === 0) {
            return { isValid: false, message: 'Invalid or inactive promotion code.' }
        }

        const promo = promoQuery.docs[0]
        const now = new Date()

        // 2. Check dates
        if (promo.startDate && new Date(promo.startDate) > now) {
            return { isValid: false, message: 'Promotion has not started yet.' }
        }
        if (promo.endDate && new Date(promo.endDate) < now) {
            return { isValid: false, message: 'Promotion has expired.' }
        }

        // 3. Find the current store context
        const storeQuery = await payload.find({
            collection: 'stores' as any,
            where: { slug: { equals: storeSlug } },
            limit: 1
        })

        if (!storeQuery.docs.length) {
            return { isValid: false, message: 'Invalid store context.' }
        }
        const currentStore = storeQuery.docs[0]

        // 4. Check targets
        let eligibleAmount = 0;
        let eligibleItemsCount = 0;

        const cartTotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);

        // Scope Logic
        if (promo.targetType === 'global') {
            eligibleAmount = cartTotal;
            eligibleItemsCount = items.length; // Approximate
        }
        else if (promo.targetType === 'store') {
            // Check if current store is in targetStores
            const targetStoreIds = (promo.targetStores as any[])?.map(s => typeof s === 'object' ? s.id : s) || [];
            if (targetStoreIds.includes(currentStore.id)) {
                eligibleAmount = cartTotal;
                eligibleItemsCount = items.length;
            } else {
                return { isValid: false, message: 'This code is not valid for this store.' }
            }
        }
        else if (promo.targetType === 'product' || promo.targetType === 'category') {
            // Need to verify items
            // Identify IDs of items in cart
            const itemIds = items.map(i => i.id);
            if (itemIds.length === 0) return { isValid: false, message: 'Cart is empty.' }

            // Fetch product details for all items in cart to check category/id
            const productsQuery = await payload.find({
                collection: 'products' as any,
                where: {
                    id: { in: itemIds }
                },
                limit: 100
            })
            const productDocs = productsQuery.docs;

            for (const item of items) {
                const product = productDocs.find(p => p.id === item.id);
                if (!product) continue;

                let isMatch = false;
                if (promo.targetType === 'product') {
                    const targetProductIds = (promo.targetProducts as any[])?.map(p => typeof p === 'object' ? p.id : p) || [];
                    if (targetProductIds.includes(product.id)) isMatch = true;
                }
                else if (promo.targetType === 'category') {
                    const targetCategoryIds = (promo.targetCategories as any[])?.map(c => typeof c === 'object' ? c.id : c) || [];
                    const prodCatId = typeof product.category === 'object' ? product.category?.id : product.category;
                    if (targetCategoryIds.includes(prodCatId)) isMatch = true;
                }

                if (isMatch) {
                    eligibleAmount += item.price * item.qty;
                    eligibleItemsCount++;
                }
            }

            if (eligibleAmount === 0) {
                return { isValid: false, message: 'No eligible items found in cart.' }
            }
        }

        // 5. Min Order Value Check
        if (promo.minOrderValue && eligibleAmount < promo.minOrderValue) {
            return { isValid: false, message: `Minimum order value of ₦${promo.minOrderValue} not met.` }
        }

        // 6. Calculate Discount
        let discount = 0;
        if (promo.type === 'percentage') {
            discount = (eligibleAmount * (promo.value / 100));
        } else {
            // Fixed amount
            // If fixed amount > eligibleAmount, cap it? Usually yes.
            discount = Math.min(promo.value, eligibleAmount);
        }

        return {
            isValid: true,
            discount: discount,
            message: 'Promotion applied successfully!',
            promo: {
                id: promo.id,
                code: promo.code,
                type: promo.type,
                value: promo.value
            }
        }

    } catch (error) {
        console.error('Error validating promotion:', error)
        return { isValid: false, message: 'System error validating promotion.' }
    }
}
