import Image from "next/image";
import Link from "next/link";

const products = [
  {
    title: "Crops",
    desc: "We grow fresh, organic crops using sustainable farming methods. From staple grains to leafy greens, each harvest is nutrient-rich and carefully cultivated.",
    image: "/images/crops.png",
    link: "/contact",
  },
  {
    title: "Livestock",
    desc: "Our livestock are raised in clean, natural environments with ethical care practices. Healthy, well-fed animals mean quality products for our customers.",
    image: "/images/livestock.png",
    link: "/contact",
  },
  {
    title: "Processed Products",
    desc: "We process select farm products with hygiene and quality control in mind — ready for homes, vendors, and wholesalers.",
    image: "/images/processed-products.png",
    link: "/contact",
  },
];

const ProductsSection = () => {
  return (
    <section className="py-20 bg-white text-black">
      <div className="max-w-7xl mx-auto text-center px-6 lg:px-12">
        <h2 className="text-2xl font-bold mb-2 text-black">Our Products</h2>
        <p className="text-gray-600 mb-12">
          Explore the variety of farm-fresh goods we grow, raise, and process with care.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={300}
                className="object-cover w-full h-56"
              />
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                </div>
                <Link
                  href={item.link}
                  className="text-green-700 font-semibold hover:underline mt-auto"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
