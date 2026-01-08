"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const OurPeopleSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false, // This ensures animations retrigger when scrolling back up
    threshold: 0.1,
  });

  return (
    <section className="px-4 py-16 bg-white">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        {/* Image Placeholder - Animated */}
        <motion.div
          variants={itemVariants}
          className="w-full h-80 bg-gray-100 border-2 border-blue-400 relative overflow-hidden"
        >
          <Image
            src="/restaurantplaceholder.jpg"
            alt="Our restaurant team"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>

        {/* Text Content - Animated */}
        <motion.div variants={itemVariants}>
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl font-semibold text-red-600 mb-4"
          >
            Our People
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-700 mb-6">
            We are more than just a restaurant. We are a family of chefs,
            servers, farmers, delivery riders, and food lovers bound by a common
            goal: to bring the warmth of Nigerian food into the hands and hearts
            of every customer we serve.
          </motion.p>
          <motion.p variants={itemVariants} className="text-gray-700 mb-6">
            Our journey started with a simple belief — that food is not just
            fuel, it&apos;s a connection to home, to culture, and to each other. From
            the grandmother in Ibadan whose egusi recipe has fed generations, to
            the young graduate in Abuja who finds comfort in a plate of smoky
            jollof rice, our food celebrates the richness and resilience of
            Nigerian life.
          </motion.p>
          <motion.p variants={itemVariants} className="text-gray-700">
            We honor our customers, our community, and our culinary roots. We
            are proud to serve students, workers, mamas and papas, and everyone
            in between — because this buka was built for the people, by the
            people. At [Your Buka Name], every bite is made with pride, every
            plate with purpose. <br />
            Welcome to the family.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default OurPeopleSection;