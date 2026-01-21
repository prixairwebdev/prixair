
import { getSupermarketProducts, getCategories } from '@/app/actions/supermarket';
import ProductsList from './ProductsList';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getSupermarketProducts(100), // Fetch up to 100 products for now
    getCategories()
  ]);

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600 animate-pulse">Loading Products...</div>
      </div>
    }>
      <ProductsList products={products} categories={categories} />
    </Suspense>
  );
}
