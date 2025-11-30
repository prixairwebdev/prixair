const testimonials = [
  {
    name: "Jordan A.",
    text: "The vegetables I get from this farm are unbelievably fresh. It’s like harvesting straight from my backyard. You can taste the difference!",
    rating: 5,
  },
  {
    name: "Sarah K.",
    text: "I love what I feed my kids. The fish and poultry are top-notch, and knowing they’re ethically raised is a big win for me.",
    rating: 5,
  },
  {
    name: "Michael R.",
    text: "Our dishes have never tasted better. Customer service is amazing and delivery times are fast!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-100 py-20 text-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-2xl font-bold mb-2">What Our Customers Say</h2>
        <p className="text-gray-600 mb-10">Real Stories, Real Satisfaction</p>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <h4 className="font-semibold text-gray-900 mb-3">{item.name}</h4>
              <p className="text-gray-600 text-sm mb-4">{item.text}</p>
              <div className="flex justify-center text-yellow-400">
                {"★".repeat(item.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
