import { getProductsAndCategories, getStoreBySlug } from '@/app/actions/products';
import StoreProductsList from '@/components/StoreProductsList';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const storeSlug = 'supermarket';
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
        <div className="text-xl font-semibold text-gray-600 animate-pulse">Loading Products...</div>
      </div>
    }>
      <StoreProductsList 
        products={data.products} 
        categories={data.categories} 
        storeSlug={storeSlug}
        storeName={store.name}
      />
    </Suspense>
  );
}
