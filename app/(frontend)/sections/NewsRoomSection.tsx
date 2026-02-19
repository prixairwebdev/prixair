"use client";
import { motion, useAnimation, easeIn, easeOut } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import Image from "next/image";
import { NewsItem } from "@/types/news";
import NewsModal from "@/components/NewsModal";

const newsList: NewsItem[] = [
  {
    title: "PRIXAIR RESOURCES LIMITED AND CHUANGXING CAPITAL CO. Ltd signs MOU on partnership for Gold mining",
    description: "PRIXAIR RESOURCES LIMITED is pleased to announce the signing of a Memorandum of Understanding (MoU) with Chuangxing Capital Co. Ltd for a strategic partnership in gold mining operations.",
    image: "/pxm/pxm1.jpeg",
    date: "January 26, 2026",
    content: `PRIXAIR RESOURCES LIMITED is pleased to announce the signing of a Memorandum of Understanding (MoU) with Chuangxing Capital Co. Ltd for a strategic partnership in gold mining operations. 

The MoU outlines a framework for cooperation covering investment, technical support, and operational development in identified gold mining projects. This partnership reflects both companies’ shared vision to promote responsible mining, economic growth, and sustainable resource development.`,
    additionalImages: [
      '/pxm/pxm2.jpeg',
      '/pxm/pxm3.jpeg',
      
    ]
  },
  {
    title: "NIGER STATE GOVERNMENT PARTNERS WITH PRIX AIR MINING COMPANY",
    description: "The Commissioner of Mineral Resources, Alhaji Garba Sabo Yahaya made this disclosure when he received a delegation of investors from the Prix Air Mining Company Limited.",
    image: "https://platinumnews.com.ng/wp-content/uploads/2023/12/IMG-20231207-WA0157-750x375.jpg",
    date: "12/07/2023",
    content: `The Commissioner of Mineral Resources, Alhaji Garba Sabo Yahaya made this disclosure when he received a delegation of investors from the Prix Air Mining Company Limited. 

The partnership aims to boost mining activities in Niger State, creating jobs and driving local economic development through responsible mineral extraction and processing.`
  },
  {
    title: "Prixair Logistics Acquires 10 New Delivery Trucks",
    description: "The new fleet marks a major investment in operational capacity, improving speed and nationwide coverage.",
    image: "https://images.unsplash.com/photo-1590504805643-bb1f94cde7fd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "July 2025",
    content: `Prixair Logistics is proud to announce the acquisition of 10 new delivery trucks. This strategic investment is aimed at significantly increasing our operational capacity, allowing for faster delivery times and broader nationwide coverage. Our commitment to excellence in logistics remains our top priority.`
  },
  {
    title: "Prixair Farms Wins Agricultural Excellence Award",
    description: "Prixair Farms has been recognized for sustainable and high-yield farming innovations across Nigeria.",
    image: "https://images.unsplash.com/photo-1677335594135-9a38aa4ded23?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "July 2025",
    content: `Prixair Farms has been honored with the Agricultural Excellence Award for its outstanding contributions to sustainable and high-yield farming innovations. The award highlights our dedication to modernizing agriculture in Nigeria while maintaining environmental stewardship.`
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut
    }
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.4,
      ease: easeIn
    }
  }
};

export default function NewsRoomSection() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mainNews = newsList[0];
  const sideNews = newsList.slice(1);
  const [hovered, setHovered] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("exit");
    }
  }, [controls, inView]);

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  return (
    <section 
      className="py-12 sm:py-16 lg:py-20 bg-white px-4 sm:px-6 lg:px-8 xl:px-24"
      aria-labelledby="newsroom-heading"
    >
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
              when: "beforeChildren"
            }
          },
          exit: {
            opacity: 0,
            transition: {
              staggerChildren: 0.05,
              staggerDirection: -1,
              when: "afterChildren"
            }
          }
        }}
        className="max-w-7xl mx-auto"
      >
        <motion.h2 
          id="newsroom-heading"
          className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 uppercase tracking-tight"
          variants={fadeInUp}
        >
          News Room
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Main News Card */}
          <motion.div variants={fadeInUp} className="w-full lg:w-[58%]">
            <div 
              onClick={() => handleNewsClick(mainNews)}
              className="relative group block cursor-pointer"
              aria-label={`Read more about: ${mainNews.title}`}
            >
              <div 
                className="relative w-full aspect-video sm:aspect-[16/9] md:aspect-[16/10] lg:h-[350px] overflow-hidden shadow-lg"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onFocus={() => setHovered(true)}
                onBlur={() => setHovered(false)}
              >
                <Image
                  src={mainNews.image}
                  alt={`Featured news: ${mainNews.title}`}
                  className={`object-cover transition-transform duration-500 ${hovered ? "scale-105" : ""}`}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white p-4 sm:p-6 flex flex-col justify-end">
                  <span className="bg-orange-500 text-xs sm:text-sm px-2 py-1 mb-2 w-fit uppercase tracking-wider">
                    Latest
                  </span>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold line-clamp-2">
                    {mainNews.title}
                  </h3>
                  <p className="text-xs sm:text-sm mt-1 line-clamp-2">
                    {mainNews.description}
                  </p>
                  <span className="text-xs mt-2 opacity-90">{mainNews.date}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Side News Cards */}
          <motion.div 
            className="w-full lg:w-[40%] flex flex-col gap-3 sm:gap-4"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              },
              exit: {
                opacity: 0,
                transition: {
                  staggerChildren: 0.05,
                  staggerDirection: -1
                }
              }
            }}
          >
            {sideNews.map((news, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={() => handleNewsClick(news)}
              >
                <div className="flex gap-3 sm:gap-4 items-center cursor-pointer hover:bg-gray-50 p-2 sm:p-3 rounded-lg transition-colors duration-200">
                  <div className="w-24 sm:w-28 h-20 sm:h-24 relative flex-shrink-0 overflow-hidden">
                    <Image
                      src={news.image}
                      alt={`News thumbnail: ${news.title}`}
                    
                      className="object-cover"
                      sizes="(max-width: 640px) 100px, 120px"
                      fill
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
