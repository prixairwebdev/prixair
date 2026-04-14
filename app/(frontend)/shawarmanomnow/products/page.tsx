import { searchProducts, getStoreBySlug, getProductsAndCategories } from '@/app/actions/products';
import StoreProductsList from '@/components/StoreProductsList';
import { Suspense } from 'react';
import Link from 'next/link';
import FloatingCheckout from '@/app/(frontend)/components/brand/FloatingCheckout';

export const dynamic = 'force-dynamic';

export default async function ShawarmaNomnowProductsPage() {
    const storeSlug = 'shawarmanomnow';
    const accentColor = '#F5A623';
    const storeName = 'Shawarma Now Now';

    const [store, initialData, categoriesData] = await Promise.all([
        getStoreBySlug(storeSlug),
        searchProducts(storeSlug, { page: 1, limit: 12 }),
        getProductsAndCategories(storeSlug),
    ]);

    if (!store) {
        return (
            <div className="min-h-screen bg-[#fcfbf9] flex flex-col items-center justify-center gap-6 px-4 text-center">
                <div className="text-6xl">🌯</div>
                <h1 className="text-3xl font-bold text-gray-900">{storeName}</h1>
                <p className="text-gray-500 max-w-sm">Our menu is being prepared. Check back shortly!</p>
                <Link
                    href="/shawarmanomnow"
                    className="px-8 py-3 rounded-full font-bold text-white"
                    style={{ backgroundColor: accentColor }}
                >
                    Back to Home
                </Link>
            </div>
        );
    }

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
                storeName={store.name}
            />
            <FloatingCheckout storeSlug={storeSlug} accentColor={accentColor} />
        </Suspense>
    );
}
