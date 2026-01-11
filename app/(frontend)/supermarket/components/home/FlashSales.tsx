"use client";

export function FlashSales() {
  const products = [
    { name: "Chivita Fruit Juice", price: "₦7,000" },
    { name: "Peak Full Cream Milk", price: "₦1,800" },
    { name: "Indomie Super Pack", price: "₦15,999" },
    { name: "Sunlight Detergent", price: "₦1,800" },
  ];

  return (
    <section>
      <div className="bg-red-600 text-white px-4 py-2 flex justify-between">
        <span>Flash Sales</span>
        <span>Time Left: 02h : 56m : 45s</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {products.map((p) => (
          <div key={p.name} className="bg-white rounded-xl shadow-sm p-4">
            <div className="h-32 bg-gray-100 rounded mb-3" />
            <h4 className="text-sm font-medium">{p.name}</h4>
            <p className="text-orange-500 font-bold">{p.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}