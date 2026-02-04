"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import BrandOverviewSection from "./brandoverview";
import BukaValuesSection from "./BukaValuesSection";
export default function LocateUsPage() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  const scrollIndicator: Variants = {
    animate: {
      y: [0, 15, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: ["easeInOut"], // ✅ FIXED
      },
    },
  };

  return (
    <div className="overflow-hidden">
        <>
          <section
            className="relative h-screen w-full overflow-hidden"
            aria-label="Prixair Group Hero Section"
          >
            <motion.div
              className="absolute inset-0 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Image
                src="/bukabg.png"
                alt="Prixair Group corporate background"
                fill
                priority
                quality={100}
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
            </motion.div>

            <div className="relative z-10 h-full flex items-center justify-center sm:justify-start px-4 sm:px-6 lg:px-8">
              <div className="container mx-auto">
                <motion.div
                  className="max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto text-center"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  <motion.h1
                    className="text-4xl sm:text-6xl font-bold leading-tight tracking-tight text-white"
                    variants={item}
                  >
                    Prixair Buka{" "}
                  </motion.h1>

                  <motion.p
                    className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl"
                    variants={item}
                  >
                    At Prixair Buka, we’re not just serving meals — we’re
                    serving moments of comfort, tradition, and unforgettable
                    taste, crafted with care to bring families and communities
                    together.
                  </motion.p>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
              variants={scrollIndicator}
              animate="animate"
            >
              <Image
                src="/arrowdown.png"
                alt="Scroll down indicator"
                width={30}
                height={40}
                className="w-6 h-10"
                priority
              />
            </motion.div>
          </section>
          <BrandOverviewSection />
          <BukaValuesSection />
        </>
    </div>
  );
}
