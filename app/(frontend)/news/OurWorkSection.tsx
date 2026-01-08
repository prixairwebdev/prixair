'use client';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const works = [
  { title: 'Corporate', image: '/images/corporate.png' },
  { title: 'Concerts', image: '/images/concerts.png' },
  { title: 'Weddings', image: '/images/weddings.png' },
  { title: 'Programs', image: '/images/programs.png' },
];

// Animation variants with proper typing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" // Using a predefined easing function
    }
  }
};

const OurWorkSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-12 bg-white px-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Our Work Speaks for Itself</h3>
        <p className="text-sm text-gray-500 mt-1 max-w-xl">
          Discover how Prixair Media transforms ordinary events into unforgettable experiences.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {works.map((work, idx) => (
          <motion.div 
            key={idx} 
            className="relative h-56 rounded overflow-hidden shadow"
            variants={itemVariants}
          >
            <Image src={work.image} alt={work.title} layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-black/30 bg-opacity-40 flex items-end p-3">
              <p className="text-white font-semibold">{work.title}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default OurWorkSection;