'use client';

import { motion, useAnimation, easeIn, easeOut } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface NewsItem {
  title: string;
  description: string;
  image: string;
  date: string;
  link: string;
  content?: string;
}

const newsList: NewsItem[] = [
  {
    title: 'New Lithium Discovery in Eastern Belt',
    description:
      'Our geologists confirmed a significant lithium reserve in the Eastern Belt zone during Q2 exploration.',
    image: '/newss.png',
    date: 'July 17, 2025',
    link: '',
    content: `
**Prixair Resources**, a fast-growing Nigerian mining company, has announced the discovery of a significant lithium deposit in the Eastern Belt Zone during its second-quarter 2025 exploration campaign. This breakthrough marks a pivotal milestone in the company’s mission to unlock Nigeria’s vast mineral wealth and contribute meaningfully to the global shift toward sustainable energy.

**Exploration Success and Geological Confirmation**  
According to internal reports from Prixair’s geology and field operations unit, the discovery stems from months of intensive surveying, geochemical analysis, and exploratory drilling in the targeted Eastern Belt area. The reserve has been classified as high-grade, showing exceptional extraction potential based on preliminary sampling and core testing. Speaking about the discovery, **Chief Geologist Dr. Idris Adebayo** stated,

> “Our field data points to a lithium concentration well above global economic thresholds. The geology of the Eastern Belt aligns with pegmatite-hosted lithium systems, and we’re confident that this reserve could become one of the most strategic lithium sources in West Africa.”
    `,
  },
  // Other example items
  {
    title: 'Prixair Logistics Acquires 10 New Delivery Trucks',
    description: 'Major investment in logistics capacity and national distribution efficiency.',
    image: '/newss.png',
    date: 'July 2025',
    link: '',
    content: `Prixair Logistics has expanded its fleet with 10 new delivery trucks...`, // etc
  },
  {
    title: 'Prixair Farms Wins Agricultural Excellence Award',
    description: 'Recognized for sustainable and high-yield farming innovations across Nigeria.',
    image: '/newss.png',
    date: 'July 2025',
    link: '',
    content: `Prixair Farms receives top honors for sustainable agriculture...`,
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.4,
      ease: easeIn,
    },
  },
};

export default function NewsRoomSection() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [hovered, setHovered] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('exit');
    }
  }, [controls, inView]);

  if (selectedNews) {
    return (
      <section className="bg-white py-16 px-6 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{selectedNews.title}</h2>
            <button
              onClick={() => setSelectedNews(null)}
              className="text-sm text-blue-600 underline"
            >
              ← Back to News
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-4">{selectedNews.date}</p>
          <div className="relative w-full h-64 mb-6">
            <Image
              src={selectedNews.image}
              alt={selectedNews.title}
              fill
              className="object-cover rounded"
            />
          </div>
          <div className="prose max-w-none text-gray-800 whitespace-pre-wrap">
            {selectedNews.content}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white px-4 sm:px-6 lg:px-8 xl:px-24">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              when: 'beforeChildren',
            },
          },
          exit: {
            opacity: 0,
            transition: {
              staggerChildren: 0.05,
              when: 'afterChildren',
            },
          },
        }}
        className="max-w-7xl mx-auto"
      >
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 uppercase tracking-tight"
          variants={fadeInUp}
        >
          News Room
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Main News Card */}
          <motion.div
            variants={fadeInUp}
            className="w-full lg:w-[58%]"
            onClick={() => setSelectedNews(newsList[0])}
          >
            <div
              className="relative group block cursor-pointer"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <div className="relative w-full aspect-video lg:h-[350px] overflow-hidden shadow-lg">
                <Image
                  src={newsList[0].image}
                  alt={newsList[0].title}
                  fill
                  className={`object-cover transition-transform duration-500 ${hovered ? 'scale-105' : ''}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white p-4 sm:p-6 flex flex-col justify-end">
                  <span className="bg-orange-500 text-xs sm:text-sm px-2 py-1 mb-2 w-fit uppercase tracking-wider">
                    Featured
                  </span>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold line-clamp-2">
                    {newsList[0].title}
                  </h3>
                  <p className="text-xs sm:text-sm mt-1 line-clamp-2">
                    {newsList[0].description}
                  </p>
                  <span className="text-xs mt-2 opacity-90">{newsList[0].date}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Side News Cards */}
          <motion.div className="w-full lg:w-[40%] flex flex-col gap-3 sm:gap-4">
            {newsList.slice(1).map((news, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                onClick={() => setSelectedNews(news)}
                className="cursor-pointer"
              >
                <div className="flex gap-3 sm:gap-4 items-center hover:bg-gray-50 p-2 sm:p-3 rounded-lg transition-colors duration-200">
                  <div className="w-24 sm:w-28 h-20 sm:h-24 relative flex-shrink-0 overflow-hidden">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col min-w-0">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2">
                      {news.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mt-1">
                      {news.description}
                    </p>
                    <span className="text-xs text-gray-500 mt-1 sm:mt-2">
                      {news.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
