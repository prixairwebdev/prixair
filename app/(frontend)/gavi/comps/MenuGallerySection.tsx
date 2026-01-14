// components/MenuGallerySection.tsx
import Image from "next/image";
import Link from "next/link";

type MenuItem = {
  name: string;
  price: string;
  image: string;
  buttonLabel?: string;
};

type Category = {
  title: string;
  items: MenuItem[];
  viewAllHref?: string;
};

const categories: Category[] = [
  {
    title: "Pastries",
    viewAllHref: "/menu/pastries",
    items: [
      {
        name: "Butter Croissant",
        price: "₦1,200",
        image: "/menu/pastries/butter-croissant.png",
      },
      {
        name: "Pain au Chocolat",
        price: "₦1,500",
        image: "/menu/pastries/pain-au-chocolat.png",
      },
      {
        name: "Apple Cinnamon Roll",
        price: "₦1,400",
        image: "/menu/pastries/apple-cinnamon-roll.png",
      },
      {
        name: "Vanilla Glazed Danish",
        price: "₦1,300",
        image: "/menu/pastries/vanilla-glazed-danish.png",
      },
    ],
  },
  {
    title: "Bread",
    viewAllHref: "/menu/bread",
    items: [
      {
        name: "Agege Bread",
        price: "₦1,200",
        image: "/menu/bread/agege-bread.png",
      },
      {
        name: "Sourdough Loaf",
        price: "₦1,800",
        image: "/menu/bread/sourdough-loaf.png",
      },
      {
        name: "Multigrain Bread",
        price: "₦2,000",
        image: "/menu/bread/multigrain-bread.png",
      },
      {
        name: "Sweet Bread",
        price: "₦1,200",
        image: "/menu/bread/sweet-bread.png",
      },
    ],
  },
  {
    title: "Cakes",
    viewAllHref: "/menu/cakes",
    items: [
      {
        name: "Red Velvet Cake Slice",
        price: "₦1,500",
        image: "/menu/cake/red-velvet-cake.png",
      },
      {
        name: "Vanilla Pound Cake",
        price: "₦1,300",
        image: "/menu/cake/vanilla-pound-cake.png",
      },
      {
        name: "Chocolate Fudge Cake",
        price: "₦1,600",
        image: "/menu/cake/chocolate-fudge-cake.png",
      },
      {
        name: "Chocolate cake slice",
        price: "₦4,000",
        image: "/menu/cake/chocolate-cake-slice.png",
      },
    ],
  },
  {
    title: "Cookies & Treats",
    viewAllHref: "/menu/cookies",
    items: [
      {
        name: "Choco Chip Cookies",
        price: "₦3,000",
        image: "/menu/cookies/choco-chip-cookies.png",
      },
      {
        name: "Puff puff x5",
        price: "₦800",
        image: "/menu/cookies/puff-puff.png",
      },
      {
        name: "Shortbread Cookies",
        price: "₦1,200",
        image: "/menu/cookies/shortbread-cookies.png",
      },
      {
        name: "Chin Chin Bag",
        price: "₦1,700",
        image: "/menu/cookies/chin-chin-bag.png",
      },
    ],
  },
];

const MenuGallerySection = () => (
  <div className="bg-[#ECEBE6] py-10">
    {categories.map((cat) => (
      <section key={cat.title} className="max-w-screen-xl mx-auto mb-8 px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{cat.title}</h2>
          <Link
            href={cat.viewAllHref ?? "#"}
            className="bg-gray-200 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-300 transition"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {cat.items.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col"
            >
              <div className="relative w-full h-40">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="px-4 py-3 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-gray-900 font-semibold leading-tight mb-1">{item.name}</p>
                  <p className="text-sm font-bold text-gray-800 mb-2">{item.price}</p>
                </div>
                <button className="bg-gray-700 text-white px-4 py-2 rounded-full text-xs font-semibold mt-auto hover:bg-gray-900 transition">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    ))}
  </div>
);

export default MenuGallerySection;
