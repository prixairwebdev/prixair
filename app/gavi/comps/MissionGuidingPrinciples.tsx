// components/MissionGuidingPrinciples.tsx
import React from 'react';

const MissionGuidingPrinciples: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Mission and Vision Section */}
      <section className="bg-gray-700 text-white py-16 px-4 lg:px-24 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed mb-8">
            To bring joy to every home and table through freshly baked
            Nigerian-inspired treats, crafted with care, quality ingredients, and
            heartfelt service.
          </p>

          <h2 className="text-4xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg leading-relaxed">
            To become Nigeria&apos;s leading neighborhood bakery, celebrated for
            our exceptional taste, consistency, and connection to tradition —
            one bite at a time.
          </p>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          {/* Image of croissants - Replace with your actual image component or img tag */}
          <img
            src="/images/croissants.jpg" // Update with your image path
            alt="Delicious croissants"
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
      </section>

      {/* Guiding Principles Section */}
      <section className="py-16 px-4 lg:px-24 text-center">
        <h2 className="text-3xl font-bold mb-4">Our Guiding Principles</h2>
        <p className="text-lg text-gray-700 mb-12">
          Baked with purpose, guided by tradition, and delivered with heart.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Quality First */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="text-5xl mb-4">🥐</div> {/* Icon */}
            <h3 className="text-xl font-semibold mb-2">Quality First</h3>
            <p className="text-gray-600">
              Only the best ingredients, baked with care.
            </p>
          </div>

          {/* Customer-Centered Service */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="text-5xl mb-4">❤️</div> {/* Icon */}
            <h3 className="text-xl font-semibold mb-2">Customer-Centered Service</h3>
            <p className="text-gray-600">
              Every customer is family — always welcomed with warmth.
            </p>
          </div>

          {/* Proudly Nigerian */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="text-5xl mb-4">🇳🇬</div> {/* Icon */}
            <h3 className="text-xl font-semibold mb-2">Proudly Nigerian</h3>
            <p className="text-gray-600">
              Inspired by tradition. Baked for today.
            </p>
          </div>

          {/* Consistency & Innovation */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="text-5xl mb-4">💡</div> {/* Icon */}
            <h3 className="text-xl font-semibold mb-2">Consistency & Innovation</h3>
            <p className="text-gray-600">
              Reliable quality with a taste of something new.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MissionGuidingPrinciples;
