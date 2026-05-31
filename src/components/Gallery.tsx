import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'motion/react';
import { galleryItems } from '../data';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import MasonryGallery from './MasonryGallery';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'food' | 'drinks' | 'ambience' | 'interior'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'food', name: 'Food' },
    { id: 'drinks', name: 'Drinks' },
    { id: 'ambience', name: 'Ambience' },
    { id: 'interior', name: 'Interior' }
  ];

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const masonryItems = useMemo(() => {
    const heights = [400, 320, 480, 350, 450, 300, 420, 280, 400];
    return filteredItems.map((item, idx) => ({
      id: item.id,
      img: item.url,
      title: item.title,
      category: item.category,
      height: heights[idx % heights.length]
    }));
  }, [filteredItems]);

  const openLightbox = (id: string) => {
    const idx = filteredItems.findIndex(item => item.id === id);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e?: React.MouseEvent | any) => {
    e?.stopPropagation?.();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => (prev === 0 ? filteredItems.length - 1 : prev! - 1));
    }
  };

  const handleNext = (e?: React.MouseEvent | any) => {
    e?.stopPropagation?.();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => (prev === filteredItems.length - 1 ? 0 : prev! + 1));
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section
      id="gallery"
      className="pt-6 md:pt-8 pb-10 md:pb-14 text-charcoal dark:text-cream bg-transparent border-t border-b border-coffee/5 dark:border-beige/5 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-[2px] w-6 bg-terracotta" />
            <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-terracotta">
              MEMORIES IN A SNAP
            </p>
            <span className="h-[2px] w-6 bg-terracotta" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-coffee dark:text-beige leading-tight">
            Club 26 Photo Gallery
          </h2>
          <p className="text-sm sm:text-base text-charcoal/70 dark:text-cream/70 font-light max-w-lg mx-auto">
            Take a visual tour through our mouth-watering recipe creations, vibrant beverages, and cozy seating architecture.
          </p>
        </div>

        {/* Categories Tabs Selector */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-6 py-2 rounded-2xl text-xs md:text-sm font-semibold tracking-wider transition-all duration-300 cursor-pointer border ${
                activeCategory === cat.id
                  ? 'bg-coffee border-coffee text-cream dark:bg-beige dark:border-beige dark:text-charcoal'
                  : 'bg-transparent text-charcoal/70 border-coffee/20 dark:text-cream/70 dark:border-beige/20 hover:border-coffee dark:hover:border-beige'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* GSAP Powered Masonry Grid */}
        <MasonryGallery 
          key={activeCategory} // Ensure re-animate on tab switch
          items={masonryItems}
          animateFrom="bottom"
          blurToFocus={true}
          stagger={0.06}
          scaleOnHover={true}
          hoverScale={0.96}
          onItemClick={(item) => openLightbox(item.id)}
        />

        {/* Lightbox Overlay Preview Panel */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Slider Left Arrow */}
              <button
                onClick={handlePrev}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 z-30 cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Center Image presentation */}
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-4xl max-h-[80vh] flex flex-col items-center bg-transparent z-20 cursor-grab active:cursor-grabbing"
                onClick={(e) => e.stopPropagation()}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    handleNext();
                  } else if (swipe > swipeConfidenceThreshold) {
                    handlePrev();
                  }
                }}
              >
                <img
                  src={filteredItems[lightboxIndex].url}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />

                {/* Info Bar at the bottom */}
                <div className="w-full text-center mt-5 text-white">
                  <h4 className="font-display font-medium text-lg sm:text-xl">
                    {filteredItems[lightboxIndex].title}
                  </h4>
                  <p className="text-xs text-white/40 uppercase tracking-widest mt-1">
                    Category: {filteredItems[lightboxIndex].category} &bull; Image {lightboxIndex + 1} of {filteredItems.length}
                  </p>
                </div>
              </motion.div>

              {/* Slider Right Arrow */}
              <button
                onClick={handleNext}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 z-30 cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
