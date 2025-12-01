"use client"
import Image from "next/image";
import { FC } from "react";
import { motion } from "framer-motion";

// Animation Variants
const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const FacilitySection: FC = () => {
  return (
    <div className="w-full">
      {/* Top Black Intro Section */}
      <section className="bg-black text-white py-10 px-6 text-center sm:px-24">
        <div className="max-w-5xl mx-auto space-y-4">
          {[
            `At Prixair Waters, we believe everyone deserves access to clean,
            refreshing, and safe drinking water. Since our founding, we’ve
            remained committed to producing high-quality bottled water using
            advanced purification methods and sustainable practices.`,
            `Our journey began with a simple mission: to deliver pure hydration
            to homes, offices, and communities across [your region or Nigeria].
            Today, we’re proud to be trusted by thousands of customers who rely
            on our products daily.`,
            `We uphold the highest standards of safety, hygiene, and quality.
            From sourcing to packaging, every drop of water goes through a
            rigorous purification process—ensuring every bottle meets certified
            health standards.`,
            `Whether for daily consumption, corporate supply, or large events,
            we’re here to keep you refreshed.`,
          ].map((text, i) => (
            <motion.p
              key={i}
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {text}
            </motion.p>
          ))}
        </div>
      </section>

      {/* Facility Section */}
      <section className="bg-white py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-4">Our Facility</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              At the heart of our operations lies a state-of-the-art bottling
              facility engineered for purity and efficiency. Equipped with
              advanced purification technology—including reverse osmosis, UV
              sterilization, and micron filtration—our system ensures that every
              bottle of water meets the highest standards of hygiene and safety.
              An in-house laboratory conducts rigorous testing to guarantee
              consistency and quality, while our fully automated, touch-free
              bottling line enhances speed and cleanliness.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed mt-4">
              We follow strict hygiene protocols aligned with global sanitation
              standards, and our eco-friendly practices include water-efficient
              systems and recyclable packaging. With reliable on-site power
              backup, our facility operates without interruptions, ensuring our
              customers always get the freshest, cleanest water possible.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative w-full h-72 md:h-[350px]"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src="/images/facility.png"
              alt="Facility"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FacilitySection;
