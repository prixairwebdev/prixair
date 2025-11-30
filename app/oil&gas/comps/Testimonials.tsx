import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  message: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Jordan A.",
    message:
      "Working with [Your Logistics Brand] has been a game‑changer. Fast, reliable, and their support is top‑notch.",
  },
  {
    name: "Casey M.",
    message:
      "We scaled our business faster because of their good hands. Tracking and delivery are always accurate.",
  },
  {
    name: "Taylor R.",
    message:
      "Smooth deliveries every time. Couldn't ask for a better team to partner with.",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 bg-white text-black">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-semibold">What Our Clients Say</h2>
        <p className="text-gray-600 max-w-xl mx-auto text-sm mt-2">
          We don't just move packages — we move businesses forward. Here's what our clients have to say about working with us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-20">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="border rounded-xl p-6 shadow-sm bg-white hover:shadow-md transition"
          >
            <h4 className="font-semibold mb-2 text-sm">{t.name}</h4>
            <p className="text-gray-600 text-sm mb-4">{t.message}</p>

            <div className="flex text-orange-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-orange-500" />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 text-sm">
          More reviews
        </button>
      </div>
    </section>
  );
}