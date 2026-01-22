import { getProductsAndCategories } from "@/app/actions/products";
import ProductsList from "./ProductsList";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export default async function ToastpanProductsPage() {
    const { products, categories } = await getProductsAndCategories('toastpan');

    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#fcfbf9] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#B5D04E] border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <ProductsList products={products} categories={categories} />
        </Suspense>
    );
}
