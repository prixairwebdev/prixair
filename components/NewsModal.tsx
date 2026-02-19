'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';
import { NewsItem } from '@/types/news';
import { useEffect } from 'react';
import ImageCarousel from './ImageCarousel';

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  news: NewsItem | null;
}

export default function NewsModal({ isOpen, onClose, news }: NewsModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!news) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors border border-white/20"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Scrollable Content Area */}
            <div className="overflow-y-auto custom-scrollbar">
              {/* Main Image or Carousel */}
              {news.additionalImages && news.additionalImages.length > 0 ? (
                <div className="p-4 sm:p-6 pb-0">
                  <ImageCarousel images={[news.image, ...news.additionalImages]} />
                </div>
              ) : (
                <div className="relative w-full aspect-video sm:aspect-[21/9]">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 sm:p-8 text-white">
                    <span className="inline-block bg-orange-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                      News Story
                    </span>
                    <p className="text-sm opacity-90 mb-2">{news.date}</p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                      {news.title}
                    </h2>
                  </div>
                </div>
              )}

              {/* Text Content */}
              <div className="p-6 sm:p-10 pt-8">
                {news.additionalImages && news.additionalImages.length > 0 && (
                   <>
                    <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                      LATEST UPDATES
                    </span>
                    <p className="text-sm text-gray-500 mb-4">{news.date}</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                      {news.title}
                    </h2>
                   </>
                )}
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {news.content || news.description}
                </div>
              </div>
            </div>

            {/* Footer / Call to Action (Optional) */}
            <div className="p-4 sm:p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
               <span className="text-sm text-gray-500 font-medium hidden sm:inline">Prixair Group News Room</span>
               <button 
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-2.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all hover:shadow-lg active:scale-95"
               >
                Close Story
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
