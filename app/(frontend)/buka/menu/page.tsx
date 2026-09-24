import { getProductsAndCategories } from "@/app/actions/products";
import BukaMenu, { BukaMenuItem, BukaMenuCategory } from "./menu";

export const dynamic = "force-dynamic";

export default async function BukaMenuPage() {
  const { products, categories } = await getProductsAndCategories("buka");

  // Group by the category each product points to (populated at depth 1), so dishes
  // whose category isn't linked to the Buka store in the CMS still land in the right section.
  const categoryKey = (name: string) => name.trim().toLowerCase().replace(/s$/, "");
  const categoryNames = new Map<string, string>();
  const items: BukaMenuItem[] = products.map((p) => {
    const category = typeof p.category === "object" && p.category ? p.category : null;
    // Key by name so near-duplicate CMS categories ("Soup", "Soups", "Soups ") merge
    const categoryId = category ? categoryKey(category.name) : "other";
    const name = category?.name.trim() ?? "";
    // Prefer the plural spelling for the section title
    if (category && (categoryNames.get(categoryId)?.length ?? 0) < name.length) categoryNames.set(categoryId, name);
    return {
      id: String(p.id),
      name: p.name.trim(),
      description: p.description ?? "",
      price: Number(p.price) || 0,
      image: (typeof p.image === "object" ? p.image?.url : p.image) || "/restaurantplaceholder.jpg",
      stock: typeof p.stock === "number" ? p.stock : undefined,
      categoryId,
    };
  });

  // Follow the store's category order from the CMS, then any others alphabetically
  const order = new Map<string, number>();
  categories.forEach((c, i) => {
    const key = categoryKey(c.name);
    if (!order.has(key)) order.set(key, i);
  });
  const menuCategories: BukaMenuCategory[] = [...categoryNames.entries()]
    .map(([id, name]) => ({ id, name }))
    .sort((a, b) => (order.get(a.id) ?? 999) - (order.get(b.id) ?? 999) || a.name.localeCompare(b.name));

  if (items.some((i) => i.categoryId === "other")) {
    menuCategories.push({ id: "other", name: "More" });
  }

  return <BukaMenu items={items} categories={menuCategories} />;
}
