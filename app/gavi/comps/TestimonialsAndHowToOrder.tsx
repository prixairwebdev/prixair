"use client";
import React, { useState, useEffect } from "react";

interface Review {
  name: string;
  text: string;
  rating: number;
}

const reviews: Review[] = [
  {
    name: "Emeka T",
    text: "Every Friday, I rush for their meat pie. No one does it like GAVI! Crusty outside, juicy inside!",
    rating: 5,
  },
  {
    name: "Rita O",
    text: "I ordered cupcakes for a birthday and they stole the show. People were asking for more!",
    rating: 5,
  },
  {
    name: "Tunde B",
    text: "Their Agege bread reminds me of home — soft, fresh, and perfectly baked!",
    rating: 5,
  },
];

const TestimonialsAndHowToOrder: React.FC = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#f4f3f1] py-12 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* === Testimonials Section === */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">
            Sweet Words from Our People
          </h2>
          <p className="text-gray-600 mb-8">Real Stories, Real Satisfaction</p>

          <div className="relative w-full flex items-center justify-center overflow-hidden">
            {/* Slide container */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)`, width: `${reviews.length * 100}%` }}
            >
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-6 flex justify-center"
                >
                  <div className="bg-gray-800 text-white p-6 max-w-md mx-auto shadow-md">
                    <p className="text-sm mb-3">{review.text}</p>
                    <p className="font-medium mb-2">{review.name}</p>
                    <div className="text-yellow-400">
                      {"★".repeat(review.rating)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Review control buttons */}
          <div className="mt-8">
            <button className="bg-gray-800 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition">
              See all reviews
            </button>
          </div>
        </div>

        {/* === How to Order Section === */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">
            How to Order
          </h2>
          <p className="text-gray-600 mb-10">Baked Goodness in 3 Easy Steps</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {/* Step 1 */}
            <div className="bg-white shadow-md p-6">
              <img
                src="/notebook.png"
                alt="Browse menu"
                className="w-16 mx-auto mb-4"
              />
              <h3 className="font-semibold text-gray-800 mb-2">
                Browse the Menu
              </h3>
              <p className="text-gray-600 text-sm">
                Explore our delicious range of breads, pastries, cakes, and
                traditional Nigerian treats.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white shadow-md p-6">
              <img
                src="/cart.png"
                alt="Add to Cart"
                className="w-16 mx-auto mb-4"
              />
              <h3 className="font-semibold text-gray-800 mb-2">
                Add to Cart & Pay
              </h3>
              <p className="text-gray-600 text-sm">
                Choose your favorites, add them to cart, and select pickup or
                delivery.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white shadow-md p-6">
              <img
                src="/vehicle.png"
                alt="Delivery"
                className="w-16 mx-auto mb-4"
              />
              <h3 className="font-semibold text-gray-800 mb-2">Get It Fresh!</h3>
              <p className="text-gray-600 text-sm">
                Pick up from our store or enjoy fast delivery. Always warm,
                always on time.
              </p>
            </div>
          </div>

          <button className="bg-gray-800 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition">
            Order now
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsAndHowToOrder;
