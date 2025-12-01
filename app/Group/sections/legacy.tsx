"use client";
import { motion, Variants, Transition } from "framer-motion";
import Image from "next/image";

const Mission = () => {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const transition: Transition = {
    duration: 0.6,
    ease: "easeOut" // Using a named easing function
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition 
    },
  };

  const legacyItem: Variants = {
    hidden: { opacity: 0, x: 50 },
    show: { 
      opacity: 1, 
      x: 0, 
      transition 
    },
  };

  return (
    <section 
      id="philosophy"
      className="py-12 md:py-16 lg:py-20 bg-white"
      aria-labelledby="philosophy-heading"
    >
      <div className="relative max-w-7xl mx-auto flex items-end px-4 sm:px-4 w-full md:w-[90%] lg:w-[80%]">
        {/* Background Image - Hidden on small screens, shown on medium and up */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.4 }}
          className="hidden md:block w-full h-[300px] sm:h-[600px] relative z-0 overflow-hidden rounded-lg shadow-md"
        >
          <Image
            src="/bgreplace.png"
            alt="Prixair Group's philosophy in action - showcasing our commitment to excellence"
            fill
            className="object-cover w-full h-full"
            priority={false}
          />
        </motion.div>

        {/* Background Image for mobile - acts as background */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.4 }}
          className="md:hidden w-full h-full absolute inset-0 z-0 overflow-hidden"
        >
          <Image
            src="/prixairsupermarket.jpg"
            alt="Prixair Group's philosophy in action - showcasing our commitment to excellence"
            fill
            className="object-cover w-full h-full"
            priority={false}
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        {/* Text Content - Different positioning for mobile vs desktop */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          variants={container}
          className="text-gray-500 md:absolute md:bottom-8 md:py-6 md:left-1/4 md:transform lg:-left-20 bg-white p-6 sm:p-6 md:p-8 lg:p-10 shadow-xl w-full mx-auto md:mx-0 md:w-[680px] md:h-[550px] z-10 relative md:mt-0 mt-8"
        >
          <motion.h1
            className="text-black text-xl sm:text-2xl md:text-3xl font-bold"
            variants={legacyItem}
          >
            A LEGACY OF INNOVATION AND EXCELLENCE ACROSS NIGERIA SINCE 2009
          </motion.h1>
          <motion.p variants={item} className="mt-4">
            Prixair Group is a dynamic and diversified Nigerian conglomerate
            established in 2009 by visionary entrepreneur, Ademola Banjo. With
            its corporate headquarters in Abuja, Prixair has grown steadily to
            become a respected player across a wide range of industries.
          </motion.p>
          <motion.p variants={item} className="mt-4">
            Our core areas of operation include Oil & Gas, Solid Minerals
            Mining, Transportation & Logistics, Real Estate, Agriculture,
            Hospitality, Supermarket, Media, and Food.
          </motion.p>
          <motion.p variants={item} className="mt-4">
            Driven by innovation, operational excellence, and a commitment to
            quality service delivery, Prixair Group continues to expand its
            footprint across Nigeria, delivering value to clients, partners,
            and communities alike. We are guided by a clear vision—to lead in
            every sector we operate—while maintaining integrity,
            professionalism, and sustainable growth at the heart of our
            business operations.
          </motion.p>
        </motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: false, amount: 0.2 }}
        className="mt-6 md:mt-6 flex justify-center sm:justify-end sm:mr-10"
      >
        <button 
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          aria-label="Learn more about Prixair's philosophy"
        >
          Learn More
        </button>
      </motion.div>
    </section>
  );
}

export default Mission;