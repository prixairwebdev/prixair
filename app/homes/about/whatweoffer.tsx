import Image from "next/image";
export default function WhatWeOffer() {
const items = [
{ title: "Doors", img: "/offer/doors.png" },
{ title: "Smart Doors", img: "/offer/smartdoors.png" },
{ title: "Wall Panels", img: "/offer/panels.png" },
{ title: "Living Room Sofas", img: "/offer/sofas.png" },
{ title: "Living Room Sets", img: "/offer/sets.png" },
{ title: "Wallpaper", img: "/offer/wallpaper.png" },
];


return (
<section className="w-full px-6 md:px-20 py-16 text-black bg-white">
<div className="text-center mb-6">
<h3 className="text-lg font-semibold">What We Offer</h3>
<p className="text-xs text-gray-700 mt-1 max-w-md mx-auto">
Discover high-quality tiles, doors, and fittings designed for beauty and durability.
</p>
</div>


<div className="grid grid-cols-2 md:grid-cols-6 gap-4">
{items.map((item, index) => (
<div key={index} className="cursor-pointer text-center">
<div className="relative w-full h-28 rounded overflow-hidden">
<Image src={item.img} alt={item.title} fill className="object-cover" />
</div>
<p className="text-xs mt-2 font-medium">{item.title}</p>
</div>
))}
</div>
</section>
);
}