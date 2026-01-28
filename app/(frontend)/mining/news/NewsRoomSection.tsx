'use client';

import { motion, useAnimation, easeIn, easeOut } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { NewsItem } from '@/types/news';
import NewsModal from '@/components/NewsModal';

const newsList: NewsItem[] = [

    {
     title: 'PRIXAIR RESOURCES LIMITED AND CHUANGXING CAPITAL CO. Ltd signs MOU on partnership for Gold mining',
    description:
      'PRIXAIR RESOURCES LIMITED is pleased to announce the signing of a Memorandum of Understanding (MoU) with Chuangxing Capital Co. Ltd for a strategic partnership in gold mining operations. The MoU outlines a framework for cooperation covering investment, technical support, and operational development in identified gold mining projects. This partnership reflects both companies’ shared vision to promote responsible mining, economic growth, and sustainable resource development.  ',
    image: '/pxm/pxm1.jpeg',
    date: 'January 26, 2026',
    link: '/news',
    content: `PRIXAIR RESOURCES LIMITED is pleased to announce the signing of a Memorandum of Understanding (MoU) with Chuangxing Capital Co. Ltd for a strategic partnership in gold mining operations. 

The MoU outlines a framework for cooperation covering investment, technical support, and operational development in identified gold mining projects. This partnership reflects both companies’ shared vision to promote responsible mining, economic growth, and sustainable resource development.`,
    additionalImages: [
      '/pxm/pxm2.jpeg',
      '/pxm/pxm3.jpeg',
     
    ]
  },
  
    {
    title: 'New Lithium Discovery in Eastern Belt',
    description:
      'Our geologists confirmed a significant lithium reserve in the Eastern Belt zone during Q2 exploration.',
    image: '/newss.png',
    date: 'July 17, 2025',
    content: `
**Prixair Resources**, a fast-growing Nigerian mining company, has announced the discovery of a significant lithium deposit in the Eastern Belt Zone during its second-quarter 2025 exploration campaign. This breakthrough marks a pivotal milestone in the company’s mission to unlock Nigeria’s vast mineral wealth and contribute meaningfully to the global shift toward sustainable energy.

**Exploration Success and Geological Confirmation**  
According to internal reports from Prixair’s geology and field operations unit, the discovery stems from months of intensive surveying, geochemical analysis, and exploratory drilling in the targeted Eastern Belt area. The reserve has been classified as high-grade, showing exceptional extraction potential based on preliminary sampling and core testing. Speaking about the discovery, **Chief Geologist Dr. Idris Adebayo** stated,

> “Our field data points to a lithium concentration well above global economic thresholds. The geology of the Eastern Belt aligns with pegmatite-hosted lithium systems, and we’re confident that this reserve could become one of the most strategic lithium sources in West Africa.”
    `,
  },

  {
    title: 'Prixair Farms Wins Agricultural Excellence Award',
    description: 'Recognized for sustainable and high-yield farming innovations across Nigeria.',
    image: '/newss.png',
    date: 'July 2025',
    content: `Prixair Farms receives top honors for sustainable agriculture and high-yield farming innovations across Nigeria. The award recognizes the company's commitment to food security and innovative agricultural practices that benefit local communities and the environment.`,
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
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

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
            onClick={() => handleNewsClick(newsList[0])}
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
                onClick={() => handleNewsClick(news)}
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

      <NewsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        news={selectedNews} 
      />
    </section>
  );
}

