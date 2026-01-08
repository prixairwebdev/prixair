'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

type NewsItem = {
  title: string;
  description: string;
  imageUrl: string;
  date?: string;
  link: string;
};

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
  const featuredNews: NewsItem = {
    title: 'New Lithium Discovery in Eastern Belt',
    description:
      'Our geologists confirmed a significant lithium reserve in the Eastern Belt zone during Q2 exploration. Early estimates indicate high-grade extraction potential.',
    imageUrl: '/images/news1.png',
    date: 'June 24, 2025',
    link: '/news',
  };

  const otherNews: NewsItem[] = [
    {
      title: 'North Core Ridge Begins Full Production',
      description:
        'After final infrastructure and safety approvals, our flagship copper project has officially entered full-scale production. Expected output: 80,000 tons/year.',
      imageUrl: '/images/news2.png',
      link: '/news/north-core-production',
    },
    {
      title: 'MineCore Participates in African Mining Week',
      description:
        'Our leadership team presented key sustainability efforts and digital innovations during Africa’s largest mining summit in Cape Town.',
      imageUrl: '/images/news3.png',
      link: '/news/african-mining-week',
    },
  ];

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
        <div className="relative w-full aspect-[16/9] rounded overflow-hidden">
          <Image
            src={featuredNews.imageUrl}
            alt={featuredNews.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 66vw"
          />
          <div className="absolute inset-0 bg-black/60 p-4 md:p-6 flex flex-col justify-end text-white">
            <h3 className="text-lg md:text-xl font-bold mb-2">{featuredNews.title}</h3>
            <p className="text-sm mb-3">{featuredNews.description}</p>
            <span className="text-xs mb-1">{featuredNews.date}</span>
            <a
              href={featuredNews.link}
              className="text-sm font-semibold border-b-2 border-orange-500 inline-block w-fit"
            >
              Read More
            </a>
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
          >
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
              <div className="w-full sm:w-32 lg:w-full h-48 sm:h-24 lg:h-32 relative flex-shrink-0 rounded overflow-hidden">
                <Image
                  src={news.imageUrl}
                  alt={news.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 128px"
                />
              </div>
              <div>
                <h4 className="text-md font-bold">{news.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{news.description}</p>
                <a
                  href={news.link}
                  className="text-sm font-semibold border-b-2 border-orange-500 inline-block w-fit"
                >
                  Read More
                </a>
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
    </motion.section>
  );
};

export default NewsSection;
