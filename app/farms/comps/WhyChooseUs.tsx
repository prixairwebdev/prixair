import { ShieldCheck, Leaf, MapPin, Clock } from "lucide-react";

const features = [
  {
    icon: <Leaf className="text-green-600 w-10 h-10 mb-3" />,
    title: "100% Natural Farming",
    desc: "We grow our produce without synthetic fertilizers, pesticides, or growth hormones. Our soil is nurtured with compost and organic matter, ensuring that every harvest is as pure as nature intended.",
  },
  {
    icon: <MapPin className="text-green-600 w-10 h-10 mb-3" />,
    title: "Locally Grown",
    desc: "We are proud to be deeply connected to our local community. Our products are grown and raised right here, supporting the local economy while ensuring freshness from farm to table.",
  },
  {
    icon: <ShieldCheck className="text-green-600 w-10 h-10 mb-3" />,
    title: "Ethical Practices",
    desc: "We prioritize hygiene and humane animal treatment. Our animals are raised in low-stress environments with access to clean water, shelter, and open space.",
  },
  {
    icon: <Clock className="text-green-600 w-10 h-10 mb-3" />,
    title: "Always Fresh",
    desc: "We don’t believe in stockpiling. Your food is harvested fresh, often within 24–48 hours of delivery, ensuring maximum flavor, nutrition, and shelf life.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-50 py-20 text-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-2xl font-bold mb-2">Why Choose Us</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          We don’t just grow food — we grow trust. From sustainable farming practices to ethical animal care, our farm stands out for its commitment to quality, integrity, and community.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col items-center text-center">
                {item.icon}
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
