
import { getSupermarketProducts, getCategories } from '@/app/actions/supermarket';
import ProductsList from './ProductsList';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getSupermarketProducts(100), // Fetch up to 100 products for now
    getCategories()
  ]);

  return <ProductsList products={products} categories={categories} />;
}
