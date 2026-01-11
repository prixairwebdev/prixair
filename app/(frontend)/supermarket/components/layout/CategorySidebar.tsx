"use client";

export function CategorySidebar() {
  const categories = [
    "Fruits and Vegetables",
    "Dairy and Eggs",
    "Beverages",
    "Snacks",
    "Meat and Poultry",
    "Bakery",
    "Sea Food",
    "Canned Food",
    "Household Essentials",
    "Other Categories",
  ];

  return (
    <aside className="w-64 bg-white rounded-xl shadow-sm p-4">
      <ul className="space-y-3 text-sm">
        {categories.map((cat) => (
          <li key={cat} className="hover:text-orange-500 cursor-pointer">
            {cat}
          </li>
        ))}
      </ul>
    </aside>
  );
}