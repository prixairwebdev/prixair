import { getProductsAndCategories, getStoreBySlug } from '@/app/actions/products';
import StoreProductsList from '@/components/StoreProductsList';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import FloatingCheckout from '@/app/(frontend)/components/brand/FloatingCheckout';

export const dynamic = 'force-dynamic';

export default async function BukaProductsPage() {
    const storeSlug = 'buka';
    const accentColor = '#FE0000';

    const [store, data] = await Promise.all([
        getStoreBySlug(storeSlug),
        getProductsAndCategories(storeSlug)
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
                products={data.products}
                categories={data.categories}
                storeSlug={storeSlug}
                storeName={store.name}
            />
            <FloatingCheckout storeSlug={storeSlug} accentColor={accentColor} />
        </Suspense>
    );
}
