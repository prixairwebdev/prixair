import { FaStar } from "react-icons/fa6";

interface Testimonial {
  name: string;
  message: string;
  product: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Jordan A.",
    message:
      "The quality of the tiles exceeded our expectations. The design team even helped us match the floor to the doors — fantastic service!",
    product: "Carrara Glossy Tile & Walnut Wooden Doors",
  },
  {
    name: "Jordan A.",
    message:
      "The quality of the tiles exceeded our expectations. The design team even helped us match the floor to the doors — fantastic service!",
    product: "Carrara Glossy Tile & Walnut Wooden Doors",
  },
  {
    name: "Jordan A.",
    message:
      "The quality of the tiles exceeded our expectations. The design team even helped us match the floor to the doors — fantastic service!",
    product: "Carrara Glossy Tile & Walnut Wooden Doors",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-20 text-black">
      <div className="text-center mb-12">
        <h2 className="text-xl font-semibold">What Our Customers Say</h2>
        <p className="text-gray-700 text-sm max-w-2xl mx-auto mt-2">
          From residential makeovers to large-scale commercial projects, hear
          how Prixair Homes products have transformed our clients’ spaces.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="border rounded-md bg-white shadow-sm p-5 text-black"
          >
            <h4 className="font-semibold text-sm mb-3">{t.name}</h4>

            <p className="text-sm text-gray-800 leading-relaxed mb-4">
              “{t.message}”
            </p>

            <p className="text-xs text-gray-800 mb-4">
              -Product Bought:{" "}
              <span className="font-medium">{t.product}</span>
            </p>

            <div className="flex text-orange-500 text-xs">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded">
          See All Reviews
        </button>
      </div>
    </section>
  );
}
