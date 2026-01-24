import { getProductsAndCategories } from "@/app/actions/products";
import NoodleliciousMenu from "./NoodleliciousMenu";
import { Suspense } from "react";
import { WishlistProvider } from "@/components/contexts/WishlistContext";

export const dynamic = "force-dynamic";

export default async function NoodleliciousMenuPage() {
    const { products, categories } = await getProductsAndCategories("noodlelicious");

    return (
        <div className="min-h-screen bg-white">
            <Suspense fallback={
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F3A35C]"></div>
                </div>
            }>
                <WishlistProvider>
                    <NoodleliciousMenu initialProducts={products} initialCategories={categories} />
                </WishlistProvider>
            </Suspense>
        </div>
    );
}
