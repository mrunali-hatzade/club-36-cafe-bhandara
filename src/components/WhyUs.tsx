import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { whyUsData } from '../data';
import { 
  Coffee, 
  Utensils, 
  Sparkles, 
  Heart, 
  Banknote, 
  Award,
  Users,
  Star,
  Flame 
} from 'lucide-react';

function useCounter(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

export default function WhyUs() {
  // Simple map to match named icons
  const getIcon = (name: string) => {
    switch (name) {
      case 'Coffee':
        return <Coffee className="w-8 h-8 text-coffee" />;
      case 'Utensils':
        return <Utensils className="w-8 h-8 text-coffee" />;
      case 'Sparkles':
        return <Sparkles className="w-8 h-8 text-coffee" />;
      case 'Heart':
        return <Heart className="w-8 h-8 text-coffee" />;
      case 'Banknote':
        return <Banknote className="w-8 h-8 text-coffee" />;
      case 'Award':
        return <Award className="w-8 h-8 text-coffee" />;
      default:
        return <Coffee className="w-8 h-8 text-coffee" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 80, damping: 15 }
    }
  };

  // Fun statistics metrics
  const statsData = [
    { numeric: 48, suffix: '★', label: 'Google Rating', icon: <Star className="w-5 h-5 text-terracotta" />, display: (n: number) => `${(n / 10).toFixed(1)}` },
    { numeric: 25000, suffix: 'k+', label: 'Happy Guests', icon: <Users className="w-5 h-5 text-terracotta" />, display: (n: number) => `${Math.round(n / 1000)}k` },
    { numeric: 98, suffix: '%', label: 'Flavor Consistency', icon: <Flame className="w-5 h-5 text-terracotta" />, display: (n: number) => `${n}` },
    { numeric: 150, suffix: '+', label: 'Positive Daily Orders', icon: <Coffee className="w-5 h-5 text-terracotta" />, display: (n: number) => `${n}` },
  ];

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' });

  const c0 = useCounter(statsData[0].numeric, 1800, statsInView);
  const c1 = useCounter(statsData[1].numeric, 2200, statsInView);
  const c2 = useCounter(statsData[2].numeric, 1600, statsInView);
  const c3 = useCounter(statsData[3].numeric, 1400, statsInView);
  const counts = [c0, c1, c2, c3];

  return (
    <section
      id="why-us"
      className="pt-6 md:pt-8 pb-6 md:pb-8 text-charcoal dark:text-cream bg-transparent border-t border-b border-coffee/5 dark:border-beige/5 relative overflow-hidden transition-colors duration-500"
    >
      {/* Decorative ambient background accent */}
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-terracotta/5 dark:bg-neutral-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-[2px] w-6 bg-terracotta" />
            <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-terracotta">
              THE CLUB 36 IDENTITY
            </p>
            <span className="h-[2px] w-6 bg-terracotta" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-coffee dark:text-beige leading-tight">
            Why Customers Love Us
          </h2>
          <p className="text-sm sm:text-base text-charcoal/70 dark:text-cream/70 font-light max-w-lg mx-auto">
            We merge premium, fresh flavors with beautiful aesthetics and incredible hospitality to create memories.
          </p>
        </div>

        {/* Feature Grid Block */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 md:mb-10"
        >
          {whyUsData.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                boxShadow: '0 25px 50px -15px rgba(111, 78, 55, 0.15)',
                borderColor: 'rgba(201, 123, 99, 0.45)',
              }}
              className="group overflow-hidden bg-white/60 dark:bg-neutral-900/40 border border-coffee/10 dark:border-beige/10 rounded-3xl transition-all duration-300 flex flex-col justify-between p-0 shadow-sm"
            >
              <div>
                {item.image && (
                  <div className="relative h-48 w-full overflow-hidden mb-6">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-6 w-14 h-14 rounded-2xl bg-white/95 dark:bg-neutral-900/95 flex items-center justify-center shadow-lg backdrop-blur-md border border-coffee/10 dark:border-beige/10">
                      {getIcon(item.iconName)}
                    </div>
                  </div>
                )}
                
                <div className="px-8">
                  {!item.image && (
                    <div className="w-16 h-16 rounded-2xl bg-coffee/5 dark:bg-beige/10 flex items-center justify-center mb-6 shadow-xs border border-coffee/10 dark:border-beige/10">
                      {getIcon(item.iconName)}
                    </div>
                  )}
                  <h3 className="font-display font-bold text-xl text-coffee dark:text-beige mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-charcoal/75 dark:text-cream/70 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Decorative Subtle Bottom border line */}
              <div className="px-8 pb-8 mt-6">
                <div className="w-12 h-1.5 bg-terracotta/20 dark:bg-beige/25 rounded-full group-hover:bg-terracotta/40 dark:group-hover:bg-terracotta/40 transition-colors" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Statistics Row */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 md:p-12 bg-white/40 dark:bg-neutral-900/30 rounded-3xl border border-coffee/10 dark:border-beige/10 shadow-xl shadow-coffee/[0.01] backdrop-blur-xs">
          {statsData.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="flex flex-col items-center justify-center text-center p-4 border-r last:border-r-0 border-coffee/10 dark:border-beige/10"
            >
              <div className="mb-3.5 p-3 bg-white dark:bg-neutral-950 text-terracotta rounded-2xl shadow-md border border-coffee/5 dark:border-beige/5">
                {stat.icon}
              </div>
              <motion.p
                className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-coffee dark:text-beige tracking-tight tabular-nums"
              >
                {stat.display(counts[idx])}{stat.suffix}
              </motion.p>
              <p className="text-[10px] sm:text-xs text-charcoal/60 dark:text-cream/50 mt-1.5 font-bold uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
