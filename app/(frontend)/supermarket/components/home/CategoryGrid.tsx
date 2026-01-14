"use client";

export function CategoryGrid() {
  const cats = [
    "Fruits & Vegetables",
    "Meat & Poultry",
    "Household",
    "Dairy & Eggs",
    "Beverages",
    "Snacks",
    "Canned Food",
    "Sea Food",
  ];

  return (
    <section className="text-black">
      <h3 className="font-semibold mb-3">Categories</h3>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4 text-black">
        {cats.map((c) => (
          <div
            key={c}
            className="bg-white rounded-xl shadow-sm p-4 text-center text-xs text-black"
          >
            <div className="h-10 w-10 bg-orange-100 mx-auto rounded-full mb-2 text-black" />
            {c}
          </div>
        ))}
      </div>
    </section>
  );
}