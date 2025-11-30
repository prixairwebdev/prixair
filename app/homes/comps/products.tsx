import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { useState } from "react";

interface Product {
  name: string;
  price: string;
  img: string;
  description?: string; // Added description field
}

interface ProductsData {
  doors: Product[];
  tiles: Product[];
}

interface CategorySectionProps {
  title: string;
  items: Product[];
}

interface ProductCardProps {
  item: Product;
  onProductClick: (product: Product) => void;
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const products: ProductsData = {
  doors: [
    {
      name: "Oakwood American Steel Door",
      price: "₦1,574,235.00",
      img: "/homes/oakwood.png",
      description: "Premium oakwood American steel door with enhanced security features and elegant finish. Perfect for modern homes seeking both style and safety."
    },
    {
      name: "Quality Interior Hinged Door",
      price: "₦210,000.00",
      img: "/homes/qshinged.png",
      description: "High-quality interior hinged door designed for smooth operation and durability. Features a sleek design that complements any interior decor."
    },
    {
      name: "Walnut American Steel Door",
      price: "₦1,574,235.00",
      img: "/homes/wallnut.png",
      description: "Luxurious walnut finish American steel door offering superior protection and aesthetic appeal. Built to last with weather-resistant properties."
    },
  ],
  tiles: [
    {
      name: "Carrara Glossy Marble Tile",
      price: "₦13,235.00",
      img: "/homes/carrara.png",
      description: "Elegant Carrara glossy marble tiles that bring luxury to any space. Easy to clean and maintain with high resistance to stains and moisture."
    },
    {
      name: "Rustic Oak Wood-Look Tile",
      price: "₦12,000.00",
      img: "/homes/rusticoak.png",
      description: "Rustic oak wood-look tiles that combine the warmth of wood with the durability of ceramic. Perfect for creating a cozy yet practical living space."
    },
    {
      name: "Dark Slate Outdoor Tile",
      price: "₦15,235.00",
      img: "/homes/darkstate.png",
      description: "Durable dark slate outdoor tiles designed to withstand harsh weather conditions. Non-slip surface makes them ideal for patios and pool areas."
    },
  ],
};

export default function PremiumProducts() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section className="w-full py-16 px-6 md:px-20 bg-white text-black">
      <div className="text-center mb-10">
        <h2 className="text-xl font-semibold text-black">Explore Our Premium Products</h2>
        <p className="text-gray-800 mt-2 text-sm max-w-lg mx-auto">
          Discover high-quality tiles, doors, and fittings designed for beauty and durability.
        </p>
      </div>

      {/* Doors Section */}
      <CategorySection 
        title="Doors" 
        items={products.doors} 
        onProductClick={handleProductClick}
      />

      {/* Tiles Section */}
      <CategorySection 
        title="Tiles" 
        items={products.tiles} 
        onProductClick={handleProductClick}
      />

      <div className="flex justify-center mt-10">
        <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm">
          Load More
        </button>
      </div>

      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}

function CategorySection({ title, items, onProductClick }: CategorySectionProps & { onProductClick: (product: Product) => void }) {
  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-black">{title}</h3>
        <button className="text-sm text-gray-800 underline">See all</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <ProductCard 
            key={index} 
            item={item} 
            onProductClick={onProductClick}
          />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ item, onProductClick }: ProductCardProps) {
  return (
    <div 
      className="border rounded-md overflow-hidden bg-white shadow-sm text-black cursor-pointer hover:shadow-md transition-shadow duration-300"
      onClick={() => onProductClick(item)}
    >
      <div className="w-full h-56 relative">
        <Image 
          src={item.img} 
          alt={item.name} 
          fill 
          className="object-cover" 
        />
      </div>

      <div className="p-3">
        <h4 className="font-medium text-sm mb-1 text-black">{item.name}</h4>

        <div className="flex items-center text-orange-500 text-xs mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>

        <p className="font-semibold text-sm mb-3 text-black">{item.price}</p>

        <button 
          className="px-4 py-1 border border-gray-300 text-xs rounded hover:bg-gray-100 text-black"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the card click
            // Add to cart logic here
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative h-64 md:h-80">
          <Image 
            src={product.img} 
            alt={product.name} 
            fill
            className="object-cover rounded-t-lg"
          />
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 bg-white rounded-full p-1 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-black mb-2">{product.name}</h3>
          
          <div className="flex items-center text-orange-500 text-sm mb-4">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
            <span className="text-gray-600 ml-2">(4.8)</span>
          </div>

          <p className="text-2xl font-bold text-black mb-4">{product.price}</p>

          <div className="mb-6">
            <h4 className="font-medium text-black mb-2">Description</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded transition-colors">
              Add to Cart
            </button>
            <button className="flex-1 px-4 py-3 border border-gray-300 hover:bg-gray-50 text-black text-sm font-medium rounded transition-colors">
              Buy Now
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-black mb-2">Features</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Premium quality materials</li>
              <li>• Easy installation</li>
              <li>• 2-year warranty</li>
              <li>• Free delivery within Lagos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}