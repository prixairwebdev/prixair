import { searchProducts, getStoreBySlug, getProductsAndCategories } from '@/app/actions/products';
import StoreProductsList from '@/components/StoreProductsList';
import { Suspense } from 'react';
import FloatingCheckout from '@/app/(frontend)/components/brand/FloatingCheckout';

export const dynamic = 'force-dynamic';

export default async function PartyJollofProductsPage() {
    const storeSlug = 'party-jollof';
    const accentColor = '#FF4500';

    const [store, initialData, categoriesData] = await Promise.all([
        getStoreBySlug(storeSlug),
        searchProducts(storeSlug, { page: 1, limit: 12 }),
        getProductsAndCategories(storeSlug),
    ]);

    const storeName = store?.name || 'Party Jollof';

    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl font-semibold animate-pulse" style={{ color: accentColor }}>Loading {storeName} Products...</div>
            </div>
        }>
            <StoreProductsList
                initialProducts={initialData.products}
                initialTotal={initialData.total}
                initialTotalPages={initialData.totalPages}
                categories={categoriesData.categories}
                storeSlug={storeSlug}
                storeName={storeName}
                accentColor={accentColor}
            />
            <FloatingCheckout storeSlug={storeSlug} accentColor={accentColor} />
        </Suspense>
    );
}
