import { getProductById, getStoreBySlug } from '@/app/actions/products';
import { notFound } from 'next/navigation';
import StoreProductDetail from './StoreProductDetail';

export const dynamic = 'force-dynamic';

const STORE_ACCENT_COLORS: Record<string, string> = {
    buka: '#FE0000',
    gavi: '#373435',
    iyanvillage: '#c8a45a',
    noodlelicious: '#e65c00',
    seaside: '#0077CC',
    toastpan: '#f59e0b',
    pharmacy: '#8AD52E',
};

interface PageProps {
    params: Promise<{ storeSlug: string; id: string }>;
}

export default async function StoreProductDetailPage({ params }: PageProps) {
    const { storeSlug, id } = await params;

    const [store, product] = await Promise.all([
        getStoreBySlug(storeSlug),
        getProductById(id, storeSlug),
    ]);

    if (!store || !product) {
        return notFound();
    }

    const accentColor = STORE_ACCENT_COLORS[storeSlug] ?? '#f97316';

    return <StoreProductDetail product={product} storeSlug={storeSlug} storeName={store.name as string} accentColor={accentColor} />;
}
