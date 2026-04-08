import { searchProducts, getStoreBySlug, getProductsAndCategories } from '@/app/actions/products';
import StoreProductsList from '@/components/StoreProductsList';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import FloatingCheckout from '@/app/(frontend)/components/brand/FloatingCheckout';

export const dynamic = 'force-dynamic';

export default async function GaviProductsPage() {
    const storeSlug = 'gavi';
    const accentColor = '#373435';

    const [store, initialData, categoriesData] = await Promise.all([
        getStoreBySlug(storeSlug),
        searchProducts(storeSlug, { page: 1, limit: 12 }),
        getProductsAndCategories(storeSlug),
    ]);

    if (!store) {
        return notFound();
    }

    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl font-semibold animate-pulse" style={{ color: accentColor }}>Loading {store.name} Products...</div>
            </div>
        }>
            <StoreProductsList
                initialProducts={initialData.products}
                initialTotal={initialData.total}
                initialTotalPages={initialData.totalPages}
                categories={categoriesData.categories}
                storeSlug={storeSlug}
                storeName={store.name}
            />
            <FloatingCheckout storeSlug={storeSlug} accentColor={accentColor} />
        </Suspense>
    );
}
