import { motion } from 'motion/react';
import { CalendarCheck, ArrowRight, Phone, Clock, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BookingCTA() {
  return (
    <section className="pt-6 md:pt-8 pb-6 md:pb-8 relative overflow-hidden border-t border-coffee/5 dark:border-beige/5">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-terracotta/6 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-coffee/6 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="glow-spot glow-terracotta w-64 h-64 -top-12 -left-12 opacity-10 dark:opacity-5 animate-pulse-soft" />

            <div className="flex items-center gap-2 mb-5 relative z-10">
              <span className="h-[2px] w-6 bg-terracotta" />
              <p className="text-xs font-bold tracking-widest uppercase text-terracotta">Reserve Your Spot</p>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-coffee dark:text-beige leading-tight mb-5 relative z-10">
              Plan Your Perfect<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta to-amber-600 font-extrabold">
                Club 26 Visit
              </span>
            </h2>
            <p className="text-base text-charcoal/65 dark:text-cream/65 font-light leading-relaxed mb-8 max-w-md relative z-10">
              Whether it's a birthday, anniversary, business lunch, or just a regular hangout — reserve your table in seconds and we'll make it unforgettable.
            </p>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 mb-8 relative z-10">
              {[
                { icon: Clock, text: 'Instant Confirmation', sub: 'via WhatsApp' },
                { icon: Star, text: '4.8★ Rated Experience', sub: 'by real guests' },
                { icon: Users, text: 'Seats up to 20+', sub: 'for all group sizes' },
                { icon: CalendarCheck, text: 'Special Occasions', sub: 'decorated on request' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white/40 dark:bg-neutral-900/30 border border-coffee/8 dark:border-beige/8"
                >
                  <div className="w-8.5 h-8.5 rounded-lg bg-terracotta/10 flex items-center justify-center flex-shrink-0 border border-terracotta/15">
                    <item.icon className="w-4 h-4 text-terracotta" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-coffee dark:text-beige leading-tight">{item.text}</p>
                    <p className="text-[10px] text-charcoal/40 dark:text-cream/40 mt-0.5">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 relative z-10">
              <Link to="/book" className="flex-1 sm:flex-initial">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2.5 px-7 py-4 bg-coffee hover:bg-terracotta text-cream font-bold rounded-2xl text-base transition-colors shadow-lg shadow-coffee/25 cursor-pointer"
                >
                  <CalendarCheck className="w-5 h-5" />
                  Reserve a Table
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="tel:+919527113636"
                className="flex items-center justify-center gap-2.5 px-7 py-4 border border-coffee/30 dark:border-beige/30 text-coffee dark:text-beige hover:bg-coffee/6 dark:hover:bg-beige/6 font-bold rounded-2xl text-base transition-colors cursor-pointer"
              >
                <Phone className="w-5 h-5" />
                Call to Book
              </motion.a>
            </div>
          </motion.div>

          {/* Right: Visual card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-10"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-coffee/15 border border-coffee/10 dark:border-beige/10 group">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800"
                alt="Club 26 Cafe Interior"
                className="w-full h-80 object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Floating stat cards */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-5 left-5 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl rounded-2xl px-5 py-3 shadow-xl border border-coffee/10 dark:border-beige/10"
              >
                <p className="text-[10px] text-charcoal/50 dark:text-cream/50 font-bold uppercase tracking-wider">Next Available</p>
                <p className="text-sm sm:text-base font-extrabold text-coffee dark:text-beige mt-0.5">Today, 7:00 PM</p>
                <p className="text-[11px] text-green-500 font-semibold mt-1">● Open Now</p>
              </motion.div>

              <motion.div
                initial={{ y: -10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute top-5 right-5 bg-coffee text-cream rounded-2xl px-4 py-3 shadow-xl border border-white/5"
              >
                <p className="text-[10px] font-bold opacity-80 uppercase tracking-wider">Seating for</p>
                <p className="text-base sm:text-lg font-extrabold mt-0.5">1–20 guests</p>
              </motion.div>
            </div>

            {/* Occasions strip */}
            <div className="mt-4 flex flex-wrap gap-2">
              {['🎂 Birthday', '💕 Anniversary', '💼 Business', '🎉 Celebration', '👨‍👩‍👧 Family'].map(tag => (
                <span key={tag} className="px-3.5 py-1.5 rounded-full bg-white/50 dark:bg-neutral-900/30 border border-coffee/10 dark:border-beige/10 text-xs font-semibold text-coffee dark:text-beige hover:border-terracotta/30 dark:hover:border-terracotta/30 transition-colors shadow-xs cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
