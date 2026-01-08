"use client";
import { FaStar } from "react-icons/fa";

interface Testimonial {
  name: string;
  title?: string;
  text: string;
}

const InvestorsTestimonials = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Michael O., Business Owner",
      text: "Transparent and reliable. I’ve been investing here for over a year, and the returns have been consistent. I love how I can track everything in real time.",
    },
    {
      name: "Jordan A.",
      text: "Our dishes have never tasted better. Quality has changed — it’s the farm-fresh eggs and organic produce that make a difference.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          What Our Investors Say
        </h2>
        <p className="text-gray-600 mb-10">
          Real Stories, Real Satisfaction
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition text-left"
            >
              <h4 className="font-semibold text-gray-900 mb-1">{t.name}</h4>
              <p className="text-gray-700 italic mb-4">{t.text}</p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestorsTestimonials;
