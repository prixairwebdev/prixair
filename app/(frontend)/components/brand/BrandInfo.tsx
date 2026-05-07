'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface BrandInfoProps {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  buttonText?: string;
  onLinkClick?: () => void;
  reverse?: boolean;
  accentColor?: string;
}

const BrandInfo = ({
  title,
  description,
  image,
  imageAlt = "Brand image",
  buttonText = "Learn more",
  onLinkClick,
  reverse = false,
  accentColor = "#F3A35C",
}: BrandInfoProps) => {
  return (
    <section className="w-full bg-[#fafaf8] py-24 px-6 md:px-12">
      <div className={`max-w-6xl mx-auto flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-16 items-center`}>

        {/* Image block */}
        <motion.div
          className="w-full md:w-1/2 flex-shrink-0"
          initial={{ opacity: 0, x: reverse ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
            />
            {/* Subtle inner shadow */}
            <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]" />
          </div>
        </motion.div>

        {/* Text block */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: reverse ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <div
            className="w-10 h-1 rounded-full mb-6"
            style={{ backgroundColor: accentColor }}
          />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-snug tracking-tight">
            {title}
          </h2>
          <p className="text-gray-500 leading-relaxed text-base mb-8">
            {description}
          </p>
          {onLinkClick && (
            <button
              onClick={onLinkClick}
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:gap-3 transition-all group"
            >
              {buttonText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </motion.div>

      </div>
    </section>
  );
};

export default BrandInfo;
