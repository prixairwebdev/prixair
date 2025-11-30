// components/WaterProducts.tsx
import Image from "next/image";
import { FC } from "react";
import { motion, Variants } from "framer-motion";

const products = [
  {
    name: "50cl Bottle (Classic)",
    description:
      "Perfect for on-the-go hydration. Slim, recyclable, and always cool.",
    img: "/images/50cl-bottle.png",
  },
  {
    name: "75cl Sports Bottle",
    description: "Sturdy bottle, fits cup holders",
    img: "/images/75cl-bottle.png",
  },
  {
    name: "1.5L Family Bottle",
    description: "Great for shared use, picnics, or travel",
    img: "/images/1.5l-bottle.png",
  },
  {
    name: "19L Refill Bottle (Dispenser)",
    description: "Bulk water for homes, offices, events",
    img: "/images/19l-bottle.png",
  },
];

const features = [
  { icon: "💧", text: "100% Natural Spring Source" },
  { icon: "🔬", text: "Microfiltered & UV Purified" },
  { icon: "♻️", text: "Sustainable & Recyclable Packaging" },
  { icon: "✅", text: "NAFDAC Certified" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
  exit: { opacity: 0 },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 16 },
  },
  exit: { opacity: 0, y: 20 },
};

const WaterProducts: FC = () => {
  return (
    <div className="w-full">
      {/* Banner */}
      <div className="relative w-full h-[300px] md:h-[320px]">
        <Image
          src="/waterbg.png"
          alt="Water source"
          fill
          className="object-cover z-0 rounded-none"
          priority
        />

        {/* Info Card */}
        <div className="relative md:absolute md:-bottom-20 w-full flex justify-center px-4">
          <motion.div
            className="bg-white rounded-lg shadow-lg max-w-5xl w-full p-6 md:p-10 text-center mt-6 md:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={containerVariants}
          >
            {/* Title */}
            <motion.h2
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl font-semibold mb-4"
            >
              Bottled at the Source, Delivered with Care
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Our water is sourced from deep underground springs, naturally
              filtered through layers of rock and bottled at the source to
              retain its freshness. At Prixair, we believe hydration should be
              clean, sustainable, and accessible.
            </motion.p>

            {/* Features */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 md:gap-10 mb-8"
              variants={containerVariants}
            >
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center w-28 sm:w-32 text-center"
                  variants={itemVariants}
                >
                  <span className="text-2xl md:text-3xl">{feature.icon}</span>
                  <p className="mt-2 text-xs sm:text-sm">{feature.text}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Button */}
            <motion.button
              variants={itemVariants}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded transition"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Product List */}
      <section className="mt-40 md:mt-28 py-8 px-4 md:px-12">
        <motion.div
          className="mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h3
            variants={itemVariants}
            className="text-lg md:text-xl font-semibold mb-1"
          >
            Our Water Products
          </motion.h3>
          <motion.p variants={itemVariants} className="text-gray-600">
            Choose the right size for your lifestyle.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-sm p-4 flex flex-col items-center text-center rounded-lg"
              variants={itemVariants}
            >
              <div className="w-28 sm:w-32 h-36 sm:h-40 relative mb-4">
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>

              <h4 className="font-semibold text-sm sm:text-base">
                {product.name}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 mb-4">
                {product.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-100 text-xs sm:text-sm">
                  Request a Quote
                </button>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs sm:text-sm">
                  Buy Now
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default WaterProducts;
