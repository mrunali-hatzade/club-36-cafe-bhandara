import { motion } from 'motion/react';
import { Sparkles, Compass, Users, Smile } from 'lucide-react';

export default function Experience() {
  const collageItems = [
    {
      id: 'col-1',
      url: 'https://images.unsplash.com/photo-1525193612162-0f34c24d83fe?q=80&w=600',
      title: 'Warm Conversations',
      subtitle: 'Gathering with friends',
      span: 'col-span-8 row-span-2'
    },
    {
      id: 'col-2',
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600',
      title: 'Vibrant Coworking',
      subtitle: 'Creative study spots',
      span: 'col-span-4 row-span-1'
    },
    {
      id: 'col-3',
      url: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=600',
      title: 'Summer Refresher Shakes',
      subtitle: 'Yummy milkshakes',
      span: 'col-span-4 row-span-1'
    }
  ];

  const pillars = [
    {
      title: 'Lively Conversations',
      description: 'Laughter echoing, business ideas being mapped, or old classmates catching up — our spacious booth seating is the canvas of true bonding.',
      icon: <Users className="w-6 h-6 text-terracotta" />
    },
    {
      title: 'The Board-Game Haven',
      description: 'Choose from our library of curated tabletop games (Catan, Jenga, Monopoly) to stir some fun friendly matches with your gang.',
      icon: <Compass className="w-6 h-6 text-terracotta" />
    },
    {
      title: 'Gourmet Culinary Philosophy',
      description: 'We prioritize premium ingredients, fastidious hygiene, and local Indian seasoning profiles that fit the robust local palate.',
      icon: <Sparkles className="w-6 h-6 text-terracotta" />
    },
    {
      title: 'Deep Focus & Study Corners',
      description: 'Complete with high-speed complimentary Wi-Fi and individual charging pods, we support remote workers and students looking for peace.',
      icon: <Smile className="w-6 h-6 text-terracotta" />
    }
  ];

  return (
    <section
      id="experience"
      className="py-24 md:py-32 text-charcoal dark:text-cream bg-transparent transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column Description Panel (col-span-5) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col"
          >
            {/* Tagline */}
            <div className="flex items-center gap-2 mb-4">
              <span className="h-[2px] w-8 bg-terracotta" />
              <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-terracotta">
                CAFE CULTURE & VIBE
              </p>
            </div>

            {/* Heading */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-coffee dark:text-beige leading-tight">
              A Warm Backdrop <br />
              <span className="text-charcoal dark:text-cream font-medium">To Every Great Memory</span>
            </h2>

            <p className="text-sm sm:text-base text-charcoal/70 dark:text-cream/70 font-light leading-relaxed mb-8">
              At Club 36 Bhandara, we build experiences. We have combined spacious high-ceiling layouts paths, curated ambient light, and customized leather booths to provide an environment that is energetic yet calming.
            </p>

            {/* List of Culture Pillars */}
            <div className="flex flex-col gap-6">
              {pillars.map((p, pIdx) => (
                <div key={pIdx} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-beige/40 dark:bg-neutral-800 flex items-center justify-center">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-coffee dark:text-beige">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal/60 dark:text-cream/65 mt-1 font-light leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column Grid Collage Panel (col-span-7) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 grid grid-cols-12 grid-rows-2 gap-4 h-[350px] sm:h-[450px] md:h-[500px]"
          >
            {collageItems.map((item, idx) => (
              <div
                key={item.id}
                className={`${item.span} relative rounded-3xl overflow-hidden group shadow-md`}
              >
                {/* Image */}
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-all duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Dark Screen Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 z-10" />

                {/* Information Callout */}
                <div className="absolute bottom-4 left-4 p-2 z-20">
                  <p className="text-[10px] text-terracotta uppercase font-extrabold tracking-widest">
                    {item.subtitle}
                  </p>
                  <h4 className="font-display font-semibold text-white text-base sm:text-lg tracking-tight mt-1">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
