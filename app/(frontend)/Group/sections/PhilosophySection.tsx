"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PhilosophySection() {
  return (
    <section 
    id="philosophy"
      className="py-12 md:py-16 lg:py-20 bg-white"
      aria-labelledby="philosophy-heading"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full md:w-[90%] lg:w-[80%]">
        {/* Background Image */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.4 }}
          className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] relative z-0 overflow-hidden rounded-lg shadow-md"
        >
          <Image
            src="/bgphilosophy.png"
            alt="Prixair Group's philosophy in action - showcasing our commitment to excellence"
            fill
            className="object-cover w-full h-full"
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        </motion.div>

        {/* Text Content - Positioned Over Image */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-gray-500 absolute -bottom-8 py-6 left-1/2 transform -translate-x-1/2 md:left-4 md:translate-x-0 lg:-left-20 bg-white p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl w-full px-8 sm:max-w-md md:max-w-lg lg:w-[500px] z-10"
        >
          <h3 className="text-xs sm:text-sm md:text-md text-black font-bold uppercase mb-1 tracking-wider">
            Our Philosophy
          </h3>
          <h2 
            id="philosophy-heading"
            className="text-xs sm:text-xl md:text-2xl mb-3 md:mb-4"
          >
            Excellence in Every Experience
          </h2>
          <div className="space-y-3 md:space-y-4">
            <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
              At Prixair, excellence is not just a goal—it is our standard. We are committed to
              delivering exceptional quality, innovation, and customer satisfaction in every service we
              provide. Our philosophy is built on the principles of precision, reliability, and
              continuous improvement, ensuring that we set the benchmark in every industry we operate in.
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
              From concept to execution, we prioritize attention to detail, efficiency, and a
              customer-centric approach, creating experiences that leave lasting impressions.
              At Prixair, we don&apos;t just meet expectations—we exceed them.
            </p>
          </div>
          <div className="mt-4 md:mt-6 flex justify-center sm:justify-start">
            <button 
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
              aria-label="Learn more about Prixair's philosophy"
            >
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}