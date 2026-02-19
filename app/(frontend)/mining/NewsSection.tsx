'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import { NewsItem } from '@/types/news';
import NewsModal from '@/components/NewsModal';

// Animation variant for staggered fade + slide-up
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
      delay: custom * 0.2,
    },
  }),
};

const NewsSection = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredNews: NewsItem = {
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
  };

  const otherNews: NewsItem[] = [
    {
      title: 'North Core Ridge Begins Full Production',
      description:
        'After final infrastructure and safety approvals, our flagship copper project has officially entered full-scale production. Expected output: 80,000 tons/year.',
      image: '/images/news2.png',
      date: 'May 2025',
      link: '/news/north-core-production',
      content: `After final infrastructure and safety approvals, our flagship copper project at North Core Ridge has officially entered full-scale production. 

The project is expected to reach an output of 80,000 tons per year, significantly contributing to the region's mineral exports and creating hundreds of technical jobs. Our focus remains on operational excellence and safety.`
    },
    {
      title: 'MineCore Participates in African Mining Week',
      description:
        'Our leadership team presented key sustainability efforts and digital innovations during Africa’s largest mining summit in Cape Town.',
      image: '/images/news3.png',
      date: 'June 2025',
      link: '/news/african-mining-week',
      content: `Our leadership team recently participated in African Mining Week in Cape Town, one of the continent's largest mining summits. 

We presented our latest sustainability initiatives and digital innovations that are transforming our mining operations. The summit provided a platform to share best practices and forge new alliances with industry partners from across Africa.`
    },
  ];

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  return (
    <motion.section
    id='news'
      className="py-10 px-4 sm:px-6 md:px-10 lg:px-16 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      <motion.div variants={fadeUp} custom={0}>
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold">LATEST NEWS</h2>
            <p className="text-sm text-gray-700">
              Stay informed with our latest press releases, industry insights, and media highlights
            </p>
          </div>
          <a
            href="/news"
            className="hidden md:inline-block text-sm font-semibold border-b-2 border-orange-500"
          >
            See All
          </a>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} custom={1}>
        <div 
          onClick={() => handleNewsClick(featuredNews)}
          className="relative w-full aspect-[16/9] rounded overflow-hidden cursor-pointer group"
        >
          <Image
            src={featuredNews.image}
            alt={featuredNews.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 66vw"
          />
          <div className="absolute inset-0 bg-black/60 p-4 md:p-6 flex flex-col justify-end text-white">
            <h3 className="text-lg md:text-xl font-bold mb-2">{featuredNews.title}</h3>
            <p className="text-sm mb-3 line-clamp-2">{featuredNews.description}</p>
            <span className="text-xs mb-1">{featuredNews.date}</span>
            <button
              className="text-sm font-semibold border-b-2 border-orange-500 inline-block w-fit"
            >
              Read More
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {otherNews.map((news, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            custom={index + 2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            onClick={() => handleNewsClick(news)}
            className="cursor-pointer group"
          >
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
              <div className="w-full sm:w-32 lg:w-full h-48 sm:h-24 lg:h-32 relative flex-shrink-0 rounded overflow-hidden">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 128px"
                />
              </div>
              <div>
                <h4 className="text-md font-bold line-clamp-2">{news.title}</h4>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{news.description}</p>
                <button
                  className="text-sm font-semibold border-b-2 border-orange-500 inline-block w-fit"
                >
                  Read More
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile See All link */}
      <motion.div
        className="text-center mt-6 md:hidden"
        variants={fadeUp}
        custom={otherNews.length + 3}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <a
          href="/news"
          className="text-sm font-semibold border-b-2 border-orange-500 inline-block w-fit"
        >
          See all
        </a>
      </motion.div>

      <NewsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        news={selectedNews} 
      />
    </motion.section>
  );
};

export default NewsSection;
