import { motion } from 'motion/react';
import { Sofa, Waves, Sparkles, Clock } from 'lucide-react';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const gridVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="about"
      className="pt-10 md:pt-14 pb-6 md:pb-8 text-charcoal dark:text-cream bg-transparent relative overflow-hidden transition-colors duration-500"
    >
      {/* Decorative ambient background accent */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-beige/30 dark:bg-neutral-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Images Layout Left Block (lg:col-span-5) */}
          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-5 grid grid-cols-12 gap-4"
          >
            {/* Top primary image (Warm interior seating) */}
            <div className="col-span-12 relative rounded-3xl overflow-hidden shadow-xl shadow-coffee/[0.04] group border border-coffee/10 dark:border-beige/10">
              <div className="absolute inset-0 bg-coffee/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800"
                alt="Cozy leather booths at Club 36"
                className="w-full h-64 sm:h-80 object-cover group-hover:scale-103 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 z-20 bg-cream/90 backdrop-blur-md dark:bg-charcoal/90 px-4 py-2 rounded-xl border border-coffee/10 dark:border-beige/10 shadow-xs">
                <p className="text-xs font-bold text-coffee dark:text-beige tracking-wide">Modern Cafe Vibe</p>
              </div>
            </div>

            {/* Bottom Left decorative detail (Aesthetic latte) */}
            <div className="col-span-6 relative rounded-2xl overflow-hidden shadow-md group border border-coffee/10 dark:border-beige/10">
              <img
                src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600"
                alt="Bhandara premium espresso brewing"
                className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Bottom Right detail (Youth cafe ambiance) */}
            <div className="col-span-6 relative rounded-2xl overflow-hidden shadow-md group border border-coffee/10 dark:border-beige/10">
              <img
                src="https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=600"
                alt="Friends sharing great moments"
                className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Narrative Info Block Right (lg:col-span-7) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Soft terracotta marker */}
            <motion.div variants={textVariants} className="flex items-center gap-2 mb-4">
              <span className="h-[2px] w-8 bg-terracotta" />
              <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-terracotta">
                OUR STORY & MISSION
              </p>
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={textVariants}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-coffee dark:text-beige leading-tight"
            >
              Bhandara's Ultimate <br />
              <span className="text-charcoal dark:text-cream font-medium">
                Friendly Gathering Space
              </span>
            </motion.h2>

            {/* Text description */}
            <motion.p
              variants={textVariants}
              className="text-base sm:text-lg text-charcoal/80 dark:text-cream/85 font-light leading-relaxed mb-6"
            >
              Created as a vibrant hub for the youth, families, and food lovers of Bhandara, 
              <strong className="font-semibold text-coffee dark:text-beige"> Club 36 Cafe </strong> 
              is more than just a destination; it is where community converges. It represents a 
              beautiful oasis crafted to help you slow down, relax, and savor life's best slices.
            </motion.p>

            <motion.p
              variants={textVariants}
              className="text-sm sm:text-base text-charcoal/70 dark:text-cream/70 leading-relaxed mb-10"
            >
              From comfortable plush seating and ambient warm lighting to our carefully curated 
              beverage recipes and fresh gourmet sandwiches, pizzas, and burger platters — everything 
              at Club 36 is designed with passion. Here, conversations flow seamlessly over hand-brewed 
              cappuccinos and crispy, loaded fries.
            </motion.p>

            {/* Dynamic Features Highlights Grid */}
            <motion.div
              variants={textVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-coffee/10 dark:border-beige/10 pt-8"
            >
              {/* Feature item 1 */}
              <div className="flex gap-4 p-4.5 rounded-2xl bg-white/40 dark:bg-neutral-900/30 border border-coffee/5 dark:border-beige/5 backdrop-blur-xs hover:border-terracotta/20 dark:hover:border-terracotta/20 hover:bg-white/60 dark:hover:bg-neutral-950/40 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-coffee/5 dark:bg-beige/10 flex items-center justify-center text-coffee dark:text-beige">
                  <Sofa className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm md:text-base text-coffee dark:text-beige">
                    Comfortable Seating
                  </h3>
                  <p className="text-xs text-charcoal/60 dark:text-cream/60 mt-1 leading-relaxed">
                    Plush couches, private tables, and dynamic ergonomic corners.
                  </p>
                </div>
              </div>

              {/* Feature item 2 */}
              <div className="flex gap-4 p-4.5 rounded-2xl bg-white/40 dark:bg-neutral-900/30 border border-coffee/5 dark:border-beige/5 backdrop-blur-xs hover:border-terracotta/20 dark:hover:border-terracotta/20 hover:bg-white/60 dark:hover:bg-neutral-950/40 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-coffee/5 dark:bg-beige/10 flex items-center justify-center text-coffee dark:text-beige">
                  <Waves className="w-5.5 h-5.5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm md:text-base text-coffee dark:text-beige">
                    Great Ambience
                  </h3>
                  <p className="text-xs text-charcoal/60 dark:text-cream/60 mt-1 leading-relaxed">
                    Lively background playlist, warm glows, and absolute tranquility.
                  </p>
                </div>
              </div>

              {/* Feature item 3 */}
              <div className="flex gap-4 p-4.5 rounded-2xl bg-white/40 dark:bg-neutral-900/30 border border-coffee/5 dark:border-beige/5 backdrop-blur-xs hover:border-terracotta/20 dark:hover:border-terracotta/20 hover:bg-white/60 dark:hover:bg-neutral-950/40 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-coffee/5 dark:bg-beige/10 flex items-center justify-center text-coffee dark:text-beige">
                  <Sparkles className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm md:text-base text-coffee dark:text-beige">
                    Gourmet Highlights
                  </h3>
                  <p className="text-xs text-charcoal/60 dark:text-cream/60 mt-1 leading-relaxed">
                    Local spices combined with high-end Italian, Continental recipes.
                  </p>
                </div>
              </div>

              {/* Feature item 4 */}
              <div className="flex gap-4 p-4.5 rounded-2xl bg-white/40 dark:bg-neutral-900/30 border border-coffee/5 dark:border-beige/5 backdrop-blur-xs hover:border-terracotta/20 dark:hover:border-terracotta/20 hover:bg-white/60 dark:hover:bg-neutral-950/40 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-coffee/5 dark:bg-beige/10 flex items-center justify-center text-coffee dark:text-beige">
                  <Clock className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm md:text-base text-coffee dark:text-beige">
                    Open Daily
                  </h3>
                  <p className="text-xs text-charcoal/60 dark:text-cream/60 mt-1 leading-relaxed">
                    Serving delicious happiness daily from 10:00 AM to 11:00 PM.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
