// components/Carousel.tsx
import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';

type Business = {
  name: string;
  imageUrl: string;
  href: string;
};

type BusinessCarouselProps = {
  businesses: Business[];
  itemsToShow?: number;
};

export default function BusinessCarousel({
  businesses,
  itemsToShow = 4,
}: BusinessCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + itemsToShow >= businesses.length ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? businesses.length - itemsToShow : prevIndex - 1
    );
  };

  // Adjust items to show on mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visibleItems = isMobile ? 1 : itemsToShow;

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Our Businesses</h2>
        <div className="flex space-x-2">
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-all"
            aria-label="Previous"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex + visibleItems >= businesses.length}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-all"
            aria-label="Next"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
            width: `${(businesses.length / visibleItems) * 100}%`
          }}
        >
          {businesses.map((business, index) => (
            <div 
              key={index}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / visibleItems}%` }}
            >
              <Link href={business.href} passHref>
                <div className="group relative block overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                    <img
                      src={business.imageUrl}
                      alt={business.name}
                      className="object-cover w-full h-48 md:h-56"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <h3 className="text-white text-lg font-semibold">{business.name}</h3>
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="text-gray-800 font-medium">{business.name}</h3>
                    <div className="mt-2 flex items-center text-blue-600 text-sm font-medium">
                      <span>Explore</span>
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile indicators */}
      {isMobile && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: Math.ceil(businesses.length / visibleItems) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * visibleItems)}
              className={`w-3 h-3 rounded-full transition-all ${currentIndex === index * visibleItems ? 'bg-blue-600' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}