"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Amaka D.",
    message:
      "The quality of the tiles exceeded our expectations. The design team even helped us match the floor to the doors — fantastic service!",
    product: "Carrara Glossy Tile & Walnut Steel Door",
  },
  {
    name: "Chidi O.",
    message:
      "Beautiful products and very competitive pricing. Our new home looks stunning — we couldn't be happier with the finishing.",
    product: "Rustic Oak Tile & Interior Hinged Door",
  },
  {
    name: "Fatima B.",
    message:
      "Professional team, fast delivery, and top-notch materials. Prixair Properties is the real deal for interior finishing.",
    product: "Dark Slate Outdoor Tile",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50 px-6 md:px-14">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Customer Reviews</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="mt-3 text-gray-500 max-w-lg">
            From residential makeovers to large-scale commercial projects — hear how our products transformed their spaces.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 border-t-2 border-gray-200 hover:border-gray-900 transition-all duration-300"
            >
              <p className="text-3xl text-gray-200 font-serif mb-4">"</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{t.message}</p>
              <p className="text-xs text-gray-400 mb-4">
                Product: <span className="font-medium text-gray-600">{t.product}</span>
              </p>
              <p className="text-gray-900 font-semibold text-sm">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
