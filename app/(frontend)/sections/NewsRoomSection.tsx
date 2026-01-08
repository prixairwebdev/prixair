"use client";
import { motion, useAnimation, easeIn, easeOut } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
// import Image from "next/image";
import Link from "next/link";

interface NewsItem {
  title: string;
  description: string;
  image: string;
  date: string;
  link: string;
}

const newsList: NewsItem[] = [
  // {
  //   title: "Prixair Hotels Launches New Luxury Suite In Abuja",
  //   description: "Prixair expands its footprint in premium hospitality with the unveiling of a state-of-the-art luxury suite tailored for business travelers and dignitaries.",
  //   image: "/subsidiaries/mining.png",
  //   date: "01/07/2025",
  //   link: "https://prixair.com/news/hotel-launch",
  // },
      {
    title: "NIGER STATE GOVERNMENT PARTNERS WITH PRIX AIR MINING COMPANY",
    description:
      "The Commissioner of Mineral Resources, Alhaji Garba Sabo Yahaya made this disclosure when he received a delegation of investors from the Prix Air Mining Company Limited.",
    image: "https://platinumnews.com.ng/wp-content/uploads/2023/12/IMG-20231207-WA0157-750x375.jpg",
    date: "12/07/2023",
    link: "https://platinumnews.com.ng/2023/12/07/niger-state-government-partners-with-prix-air-mining-company/",
  },
  {
    title: "Prixair Logistics Acquires 10 New Delivery Trucks",
    description: "The new fleet marks a major investment in operational capacity, improving speed and nationwide coverage.",
    image: "https://images.unsplash.com/photo-1590504805643-bb1f94cde7fd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "July 2025",
    link: "https://prixair.com/news/logistics",
  },
  {
    title: "Prixair Farms Wins Agricultural Excellence Award",
    description: "Prixair Farms has been recognized for sustainable and high-yield farming innovations across Nigeria.",
    image: "https://images.unsplash.com/photo-1677335594135-9a38aa4ded23?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "July 2025",
    link: "https://prixair.com/news/farm-award",
  },
  {
    title: "Prixair Water Launches New Ultra-Pure Bottling Line",
    description: "The new bottling line increases daily production by 40%, ensuring safer, fresher bottled water.",
    image: "https://images.unsplash.com/photo-1616118132534-381148898bb4?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "July 2025",
    link: "https://prixair.com/news/bottling",
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
            <Link 
              href={mainNews.link} 
              target="_blank"
              rel="noopener noreferrer"
              className="relative group block"
              aria-label={`Read more about: ${mainNews.title}`}
            >
              <div 
                className="relative w-full aspect-video sm:aspect-[16/9] md:aspect-[16/10] lg:h-[350px] overflow-hidden shadow-lg"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onFocus={() => setHovered(true)}
                onBlur={() => setHovered(false)}
              >
                <img
                  src={mainNews.image}
                  alt={`Featured news: ${mainNews.title}`}
                  className={`object-cover transition-transform duration-500 ${hovered ? "scale-105" : ""}`}
                  sizes="(max-width: 1024px) 100vw, 60vw"
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
            </Link>
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
              >
                <Link 
                  href={news.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read more about: ${news.title}`}
                >
                  <div className="flex gap-3 sm:gap-4 items-center cursor-pointer hover:bg-gray-50 p-2 sm:p-3 rounded-lg transition-colors duration-200">
                    <div className="w-24 sm:w-28 h-20 sm:h-24 relative flex-shrink-0 overflow-hidden">
                      <img
                        src={news.image}
                        alt={`News thumbnail: ${news.title}`}
                      
                        className="object-cover"
                        sizes="(max-width: 640px) 100px, 120px"
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
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}