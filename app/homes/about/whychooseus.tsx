export default function WhyChooseUs() {
const features = [
{
title: "Quality Assurance",
desc: "Every product we offer is carefully selected and tested for durability, safety, and performance.",
icon: "🛡️",
},
{
title: "Modern & Stylish Designs",
desc: "Our products combine elegance with functionality, giving your home a contemporary look.",
icon: "✨",
},
{
title: "Fast & Reliable Delivery",
desc: "Our logistics team ensures your orders arrive quickly, safely, and stress-free.",
icon: "📦",
},
{
title: "Customer-First Service",
desc: "We build relationships, not transactions. Our dedicated team ensures satisfaction every step of the way.",
icon: "🤝",
},
];


return (
<section className="w-full px-6 md:px-20 py-16 bg-white text-black">
<div className="text-center mb-10">
<h3 className="text-lg font-semibold">Why Choose Us</h3>
<p className="text-xs text-gray-700 mt-1 max-w-lg mx-auto">
We’re not just selling furnitures — we’re delivering purity, care, and consistency.
</p>
</div>


<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
{features.map((item, index) => (
<div key={index} className="border p-5 rounded shadow-sm bg-white">
<div className="text-3xl mb-3">{item.icon}</div>
<h4 className="text-sm font-semibold mb-1">{item.title}</h4>
<p className="text-xs text-gray-700">{item.desc}</p>
</div>
))}
</div>
</section>
);
}