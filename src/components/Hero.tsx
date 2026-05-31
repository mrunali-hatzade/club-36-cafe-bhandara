import { motion } from 'motion/react';
import { ArrowRight, MapPin, ChevronDown, Star } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, filter: 'blur(10px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  const handleScrollToMenu = () => {
    const target = document.getElementById('menu');
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollToContact = () => {
    const target = document.getElementById('contact');
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image with elegant overlay / Parallax */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-cream/98 dark:to-charcoal/98 z-10 transition-colors duration-500" 
        />
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 1 }}
          transition={{ 
            opacity: { duration: 1.8, ease: 'easeOut' },
            scale: { duration: 30, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }
          }}
          className="w-full h-full bg-cover bg-center origin-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000')`,
          }}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Floating Sparkles & Coffee Beans Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute backdrop-blur-[1px] bg-white/10 rounded-full"
            style={{
              width: Math.random() * 20 + 8,
              height: Math.random() * 20 + 8,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -45, 0],
              opacity: [0.1, 0.45, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: Math.random() * 6 + 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content wrapper */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 md:px-12 text-center text-cream flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Subtitle Accent */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-terracotta/20 backdrop-blur-md border border-terracotta/30 text-terracotta text-xs md:text-sm font-bold tracking-wider uppercase mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse" />
            Welcoming Bhandara's Finest Hangout Spot
          </motion.div>

          {/* Floating Google Rating Pill */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-cream text-[10px] md:text-xs font-semibold tracking-wide mb-6 cursor-pointer hover:bg-white/10 transition-colors shadow-xs backdrop-blur-xs"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleScrollToContact}
          >
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400 stroke-none" />
              ))}
            </div>
            <span className="text-white/80">4.8 Google Rating (500+ Guest Reviews)</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7.5xl font-black tracking-tight mb-6 leading-tight max-w-4xl text-white drop-shadow-sm"
          >
            More Than a Cafe, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-beige via-terracotta to-amber-400 font-extrabold drop-shadow-xs">
              It's an Experience
            </span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-cream/90 max-w-2xl font-light mb-10 leading-relaxed drop-shadow-xs"
          >
            Enjoy delicious food, refreshing beverages, and memorable moments with friends and family at 
            <strong className="font-semibold text-beige"> Club 26 Cafe</strong>.
          </motion.p>

          {/* Two Interactive Call to Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
          >
            {/* Explore Menu button */}
            <button
              id="explore-menu-hero-btn"
              onClick={handleScrollToMenu}
              className="btn-premium group w-full sm:w-auto px-8 py-4.5 bg-coffee hover:bg-terracotta text-cream font-bold rounded-2xl flex items-center justify-center gap-2.5 shadow-lg shadow-coffee/40 hover:shadow-terracotta/40 hover:scale-[1.03] transition-all cursor-pointer text-base"
            >
              Explore Menu
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>

            {/* Get Directions button */}
            <button
              id="get-directions-hero-btn"
              onClick={handleScrollToContact}
              className="group w-full sm:w-auto px-8 py-4.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-cream font-bold rounded-2xl flex items-center justify-center gap-2.5 border border-white/25 hover:border-white/40 shadow-md cursor-pointer transition-all text-base hover:scale-[1.03]"
            >
              <MapPin className="w-5 h-5 text-terracotta" />
              Get Directions
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Down arrow indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <motion.p 
          className="text-white/40 text-[10px] tracking-widest uppercase mb-2 font-semibold"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to discover
        </motion.p>
        <motion.button
          onClick={handleScrollToMenu}
          className="p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </div>
    </section>
  );
}
