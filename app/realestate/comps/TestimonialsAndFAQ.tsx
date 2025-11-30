import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

interface FAQ {
  question: string;
  answer: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Jordan A.",
    text: "I found my dream home within 3 days of browsing. The process was so smooth and professional. I'd definitely recommend them!",
    rating: 5,
  },
  {
    name: "Jordan A.",
    text: "As a first-time buyer, I was nervous, but the team guided me through everything. Now I own a beautiful home!",
    rating: 5,
  },
  {
    name: "Jordan A.",
    text: "Listed my property and got real offers in just a week. It’s been an excellent experience!",
    rating: 5,
  },
];

const faqs: FAQ[] = [
  {
    question: "How do I schedule a property visit?",
    answer:
      "You can schedule a visit by contacting the agent directly or clicking the 'Schedule Visit' button on the property page.",
  },
  {
    question: "Are all properties verified?",
    answer:
      "Yes, every property listed goes through a verification process to ensure accuracy and trust.",
  },
  {
    question: "Can I list my property for sale or rent?",
    answer:
      "Absolutely! You can create an account and list your property with photos, details, and pricing.",
  },
  {
    question: "What if I can’t find what I’m looking for?",
    answer:
      "Our support team can help! Reach out via chat or email, and we’ll connect you to an agent who can assist.",
  },
];

export default function TestimonialsAndFAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <section className="w-full px-4 py-16 md:px-12 lg:px-24 bg-white">
      {/* Testimonials Section */}
      <div className="text-center mb-12 text-black">
        <h2 className="text-2xl font-semibold mb-2">What Our Clients Say</h2>
        <p className="text-gray-500">
          Real stories from real people who found their perfect home with us.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="border rounded-lg p-6 shadow-sm hover:shadow-md transition"
          >
            <h4 className="font-semibold mb-2">{t.name}</h4>
            <p className="text-gray-600 mb-3 text-sm">{t.text}</p>
            <div className="flex space-x-1">
              {Array.from({ length: t.rating }).map((_, i) => (
                <span key={i} className="text-yellow-500 text-lg">★</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mb-16">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded transition">
          More reviews
        </button>
      </div>

      {/* FAQ Section */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h3 className="text-xl font-semibold mb-2">
            Got Questions? We’ve Got Answers.
          </h3>
          <p className="text-gray-500 mb-6">
            Find quick answers to common questions about buying, selling, or
            renting properties.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded transition">
            See more
          </button>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border rounded-sm border-gray-300"
            >
              <button
                className="w-full flex justify-between items-center px-4 py-3 text-left"
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              >
                <span className="font-medium text-gray-800">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    openFAQ === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFAQ === i && (
                <div className="px-4 pb-3 text-sm text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
