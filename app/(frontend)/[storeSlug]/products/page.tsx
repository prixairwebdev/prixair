import { searchProducts, getStoreBySlug, getProductsAndCategories } from '@/app/actions/products';
import StoreProductsList from '@/components/StoreProductsList';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ storeSlug: string }>;
}

export default async function StoreProductsPage({ params }: PageProps) {
  const { storeSlug } = await params;
  
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
        <div className="text-xl font-semibold text-gray-600 animate-pulse">Loading {store.name} Products...</div>
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
    </Suspense>
  );
}
