
import { getProduct, getRelatedProducts } from '@/app/actions/supermarket';
import ProductDetails from './ProductDetails';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black mb-4">Product Not Found</h1>
          <p className="mb-4 text-gray-600">The product you are looking for does not exist or has been removed.</p>
          <Link href="/supermarket" className="text-orange-600 hover:text-orange-700 font-medium">
            ← Back to Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Fetch related products
  const categoryId = typeof product.category === 'string'
    ? product.category
    : (product.category as any)?.id; // Assuming Category object has an id

  let relatedProducts: any[] = [];
  if (categoryId) {
    relatedProducts = await getRelatedProducts(categoryId, product.id);
  }

  return <ProductDetails product={product} relatedProducts={relatedProducts} />;
}
