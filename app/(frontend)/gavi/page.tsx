'use client';
import { motion, Variants } from "framer-motion";
import Backedwithheart from "./comps/Backedwithheart";
import FindGaviSection from "./comps/FindGaviSection";
import MenuSection from "./comps/MenuSection";
import MissionGuidingPrinciples from "./comps/MissionGuidingPrinciples";
import TestimonialsAndHowToOrder from "./comps/TestimonialsAndHowToOrder";

// Animation variants (TypeScript-compliant)
const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1] as [number, number, number, number], // Explicitly type as cubic bezier
    },
  },
};

const Landing = () => {
  return (
    <>
    <section
  className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center text-center px-6 py-20
    bg-[url('/gavism.png')] md:bg-[url('/gavibg.png')]"
>
        <motion.div
          className="relative z-10 text-black max-w-2xl"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            variants={item}
          >
            Baked Fresh. Loved Daily.
          </motion.h1>
          <motion.p
            className="text-gray-700 text-sm mb-8"
            variants={item}
          >
            From flaky meat pies to melt-in-your-mouth cakes, GAVI brings oven-fresh goodness right to your doorstep.
          </motion.p>
          <motion.div
            className="flex font-bold justify-center gap-4"
            variants={item}
          >
            <motion.button
              className="bg-[#373435] text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
              variants={item}
            >
              Order Now
            </motion.button>
            <motion.button
              className="border border-gray-700 text-black px-6 py-2 rounded-full bg-white hover:bg-white hover:text-black transition"
              variants={item}
            >
              View menu
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
      <Backedwithheart />
      <MenuSection />
      <TestimonialsAndHowToOrder />
      <FindGaviSection />
      {/* <MissionGuidingPrinciples /> */}
    </>
  );
};

export default Landing;