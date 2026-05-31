import { motion } from 'motion/react';
import { instagramPosts } from '../data';
import { Instagram, Heart, MessageCircle } from 'lucide-react';

export default function Socials() {
  return (
    <section
      id="instagram"
      className="py-24 md:py-32 text-charcoal dark:text-cream bg-transparent transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-[2px] w-8 bg-terracotta" />
              <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-terracotta">
                #CLUB26BHANDARA
              </p>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-coffee dark:text-beige leading-tight">
              Follow Our Journey
            </h2>
            <p className="text-sm sm:text-base text-charcoal/70 dark:text-cream/70 font-light mt-3 max-w-lg">
              Get behind-the-scenes sneak peeks, discounts, weekend event announcements, and dynamic food blogs.
            </p>
          </div>

          {/* Follow Button */}
          <motion.a
            id="instagram-follow-btn"
            href="https://instagram.com/club26_bhandara_placeholder"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-premium px-6 py-4 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-cream font-bold rounded-2xl flex items-center justify-center gap-2.5 shadow-lg shadow-red-500/15 cursor-pointer text-sm"
          >
            <Instagram className="w-5 h-5 fill-cream stroke-none" />
            Follow @club26_bhandara
          </motion.a>
        </div>

        {/* 6 Grid Panel */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {instagramPosts.map((post, idx) => (
            <motion.a
              key={post.id}
              href="https://instagram.com/club26_bhandara_placeholder"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-3xl overflow-hidden aspect-square border border-coffee/10 bg-beige/30"
            >
              {/* Image source */}
              <img
                src={post.url}
                alt={`Instagram Moment ${post.id}`}
                className="w-full h-full object-cover group-hover:scale-108 transition-all duration-700"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {/* Dark Hover Glass Panel */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 z-10">
                <div className="flex items-center gap-1.5 text-cream text-xs font-bold transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Heart className="w-4 h-4 fill-cream text-cream stroke-none" />
                  {post.likes}
                </div>

                <div className="flex items-center gap-1.5 text-cream text-xs font-bold transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <MessageCircle className="w-4 h-4 fill-cream text-cream stroke-none" />
                  {post.comments}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
