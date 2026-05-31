import { Star, Quote, ArrowUpRight } from 'lucide-react';
import { reviewsData } from '../data';

export default function Reviews() {
  // Duplicate the reviews array twice to ensure seamless continuous scrolling
  const duplicatedReviews = [...reviewsData, ...reviewsData, ...reviewsData];

  return (
    <section
      id="reviews"
      className="pt-6 md:pt-8 pb-6 md:pb-8 text-charcoal dark:text-cream bg-transparent overflow-hidden relative transition-colors duration-500"
    >
      {/* Decorative background accent grids */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-beige/20 dark:bg-neutral-800/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-terracotta/5 dark:bg-neutral-800/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-[2px] w-6 bg-terracotta" />
            <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-terracotta">
              HAPPY VOICES
            </p>
            <span className="h-[2px] w-6 bg-terracotta" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-coffee dark:text-beige leading-tight">
            What Our Guests Say
          </h2>
          <p className="text-sm sm:text-base text-charcoal/70 dark:text-cream/70 font-light max-w-lg mx-auto">
            These are genuine reviews posted on Google by coffee lovers and food enthusiasts from Bhandara, Maharashtra.
          </p>
        </div>

        {/* Infinite Looping Marquee container */}
        <div className="relative w-full overflow-hidden marquee-mask z-10 py-4">
          <div className="animate-marquee flex gap-6 w-max">
            {duplicatedReviews.map((review, idx) => (
              <div
                key={`${review.id}-${idx}`}
                className="w-[320px] sm:w-[400px] flex-shrink-0 bg-white/70 border border-coffee/10 dark:bg-neutral-900/60 dark:border-beige/10 p-6 sm:p-8 rounded-3xl flex flex-col justify-between shadow-xl shadow-coffee/[0.01] backdrop-blur-md transition-all duration-300 hover:border-terracotta/30 dark:hover:border-terracotta/30 hover:shadow-2xl hover:shadow-coffee/[0.02]"
              >
                {/* Top decorative elements */}
                <div className="flex justify-between items-start mb-5">
                  <div className="flex flex-col gap-1.5">
                    {/* Star rating row */}
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500 stroke-none" />
                      ))}
                    </div>
                    {/* Google Verified Review label */}
                    <span className="inline-flex items-center gap-1.5 text-[8.5px] uppercase font-bold tracking-widest text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/20 px-2 py-0.5 rounded-md border border-emerald-500/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Verified Review
                    </span>
                  </div>
                  <Quote className="w-8 h-8 text-terracotta/20 stroke-[1.5px]" />
                </div>

                {/* Testimonial Message */}
                <div className="mb-6 flex-1">
                  <p className="text-xs sm:text-sm font-light italic leading-relaxed text-charcoal/90 dark:text-cream/90">
                    "{review.comment}"
                  </p>
                </div>

                {/* User Bio Footer */}
                <div className="flex items-center gap-3.5 border-t border-coffee/10 dark:border-beige/10 pt-4 mt-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-terracotta/20 shadow-xs flex-shrink-0">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-display font-semibold text-sm text-coffee dark:text-beige leading-tight truncate">
                      {review.name}
                    </h4>
                    <p className="text-[10px] text-charcoal/50 dark:text-cream/50 mt-1 font-medium truncate">
                      {review.role} &bull; {review.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Share Feedback / Write Review Link */}
        <div className="text-center mt-6 md:mt-8 relative z-20">
          <a
            href="https://maps.app.goo.gl/Club36CafeBhandaraPlaceHolder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-coffee/20 dark:border-beige/20 text-coffee dark:text-beige hover:bg-coffee hover:text-cream dark:hover:bg-beige dark:hover:text-charcoal rounded-2xl text-sm font-bold transition-all shadow-md cursor-pointer hover:scale-105 duration-300"
          >
            Share Your Experience on Google
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
