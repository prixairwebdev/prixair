"use client";
import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const pressReleases = [
  {
    date: "August 12, 2025",
    title: "Prixair Media Launches New Interactive Event Platform",
    excerpt:
      "Our latest platform brings immersive experiences to both in-person and virtual attendees with cutting-edge technology.",
    link: "#",
  },
  {
    date: "August 12, 2025",
    title: "Prixair Supermarket Opens New Branch in Garki, Abuja",
    excerpt:
      "We are thrilled to announce the grand opening of Prixair Supermarket in Garki, Abuja — offering customers premium products, exceptional service, and a modern shopping experience.",
    link: "#",
  },
  {
    date: "June 15, 2025",
    title: "Prixair Media Wins Award for Best Event Lighting Design",
    excerpt:
      "We are honored to be recognized for our innovative approach to stage and lighting design.",
    link: "#",
  },
];

export default function PressReleaseSection({ id }: { id?: string }) {
  return (
    <section id={id} className="w-full bg-[#181818] text-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
            Press Releases
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-2xl mx-auto"
            variants={item}
          >
            Stay informed with our latest announcements, achievements, and company updates.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {pressReleases.map((press, idx) => (
            <motion.div
              key={idx}
              className="bg-[#202020] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              variants={item}
            >
              <p className="text-sm text-gray-400 mb-2">{press.date}</p>
              <h3 className="text-xl font-semibold mb-3">{press.title}</h3>
              <p className="text-gray-300 mb-4">{press.excerpt}</p>
              <a
                href={press.link}
                className="text-[#FB6404] font-medium hover:underline"
              >
                Read More →
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
