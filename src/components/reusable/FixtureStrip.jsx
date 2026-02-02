'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import FixtureCard from './FixtureCard';
import { useFixtures } from '@/hooks/useFixtures';
import { FIXTURE_API_CONFIG } from '@/lib/apiConfig';
import { fixtureStripDefaults } from '@/lib/fixtureConfig';

export default function FixtureStrip({ 
  fixtures: propsFixtures, 
  title = fixtureStripDefaults.title, 
  showMore = fixtureStripDefaults.showMore, 
  config = FIXTURE_API_CONFIG.fixtures
}) {
  // Use config object for API fetching, or propsFixtures if provided
  const { fixtures: apiFixtures, initialLoading } = useFixtures(config);
  const fixtures = propsFixtures || apiFixtures;
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (swiperInstance) {
      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);
    }
  }, [swiperInstance]);

  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  // Show loading state during initial load (matching table pattern)
  if (!propsFixtures && initialLoading) {
    return (
      <section className="w-full py-6 md:py-8 bg-white overflow-x-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center items-center py-12">
            <div className="text-primary">Loading fixtures...</div>
          </div>
        </div>
      </section>
    );
  }

  // Return null if no fixtures (matching table pattern - no "No data available" message)
  if (!fixtures || fixtures.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-6 md:py-8 bg-white overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-primary">{title}</h2>
          {showMore && (
            <button className="px-4 py-2 bg-secondary-gradient-1 text-primary font-semibold rounded-full hover:opacity-90 transition-opacity text-sm md:text-base">
              More
            </button>
          )}
        </div>

        {/* Swiper */}
        <div className="relative overflow-visible">
          <Swiper
            onSwiper={setSwiperInstance}
            onSlideChange={handleSlideChange}
            modules={[Navigation]}
            spaceBetween={fixtureStripDefaults.swiperSpaceBetween}
            slidesPerView={fixtureStripDefaults.swiperSlidesPerView}
            breakpoints={fixtureStripDefaults.swiperBreakpoints}
            className="fixture-strip-swiper"
          >
            {fixtures.map((fixture) => (
              <SwiperSlide key={fixture.id} className="!h-auto">
                <FixtureCard fixture={fixture} variant={fixture.variant} rounded={false} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons - Below the card */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <button 
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all ${isBeginning ? 'bg-gray-200 border border-gray-300 text-gray-700 opacity-30 cursor-not-allowed' : 'bg-secondary text-primary hover:opacity-90'}`}
              onClick={() => swiperInstance?.slidePrev()}
              disabled={isBeginning}
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all ${isEnd ? 'bg-gray-200 border border-gray-300 text-gray-700 opacity-30 cursor-not-allowed' : 'bg-secondary text-primary hover:opacity-90'}`}
              onClick={() => swiperInstance?.slideNext()}
              disabled={isEnd}
              aria-label="Next slide"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
