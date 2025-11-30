"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Replace with real images of company & staff
const galleryItems = [
  { src: "/supermarket.jpg", alt: "Staff meeting at the office" },
  { src: "/prixairsupermarket.jpg", alt: "Company group photo" },
  { src: "/prixairhome.jpg", alt: "Front view of the company office" },
//   { src: "/gallery/event-setup.jpg", alt: "Team setting up event equipment" },
//   { src: "/gallery/staff-working.jpg", alt: "Staff working on project" },
//   { src: "/gallery/fun-day.jpg", alt: "Staff team bonding day" },
];

export default function GallerySection({ id }: { id?: string }) {
  return (
    <section id={id} className="w-full bg-[#101010] text-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          className="text-center mb-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            variants={item}
          >
            Our Gallery
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-2xl mx-auto"
            variants={item}
          >
            Moments from our journey — the people, the work, and the culture that drive us forward.
          </motion.p>
        </motion.div>

        {/* Image grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {galleryItems.map((img, idx) => (
            <motion.div
              key={idx}
              className="relative w-full h-64 overflow-hidden rounded-lg"
              variants={item}
              whileHover={{ scale: 1.03 }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={idx < 3} // load first 3 images faster
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
