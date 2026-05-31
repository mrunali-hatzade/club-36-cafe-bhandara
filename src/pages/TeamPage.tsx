import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ChefHat, Star, Award, Heart, Coffee, Utensils } from 'lucide-react';

const chefs = [
  {
    name: 'Chef Rajan Deshmukh',
    role: 'Head Chef & Culinary Director',
    speciality: 'Gourmet Burgers & Continental Cuisine',
    experience: '12 Years',
    icon: ChefHat,
    badge: '⭐ Head Chef',
    color: 'from-amber-700/20 to-coffee/10',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=400',
    quote: '"Every dish is a story told through flavors."',
    skills: ['Burgers', 'Continental', 'Grills', 'Plating'],
  },
  {
    name: 'Chef Priya Raut',
    role: 'Sous Chef & Beverages Expert',
    speciality: 'Artisanal Coffee & Signature Mocktails',
    experience: '8 Years',
    icon: Coffee,
    badge: '☕ Beverages',
    color: 'from-terracotta/20 to-amber-600/10',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=400',
    quote: '"A perfect cup of coffee can change your entire day."',
    skills: ['Cold Coffee', 'Mocktails', 'Milkshakes', 'Lattes'],
  },
  {
    name: 'Chef Amit Bhoyar',
    role: 'Pizza & Snacks Specialist',
    speciality: 'Wood-fired Pizzas & Toasted Sandwiches',
    experience: '6 Years',
    icon: Utensils,
    badge: '🍕 Pizza Expert',
    color: 'from-orange-500/20 to-red-600/10',
    image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?q=80&w=400',
    quote: '"The secret is always the freshest ingredients."',
    skills: ['Pizzas', 'Sandwiches', 'Fries', 'Wraps'],
  },
];

const staff = [
  {
    name: 'Rohit Meshram',
    role: 'Cafe Manager',
    emoji: '🎯',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300',
    description: 'Ensures every visit feels premium and every guest feels at home.',
    color: 'bg-coffee/10 border-coffee/20',
  },
  {
    name: 'Sneha Gajbhiye',
    role: 'Lead Server & Host',
    emoji: '✨',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300',
    description: 'Greets every guest with warmth and ensures seamless table service.',
    color: 'bg-terracotta/10 border-terracotta/20',
  },
  {
    name: 'Rahul Nandanwar',
    role: 'Cashier & Order Manager',
    emoji: '📋',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300',
    description: 'Keeps the orders flowing smoothly and accurately at all times.',
    color: 'bg-amber-600/10 border-amber-600/20',
  },
  {
    name: 'Pooja Ukey',
    role: 'Barista Assistant',
    emoji: '☕',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300',
    description: 'Crafts every cold coffee and milkshake with love and precision.',
    color: 'bg-orange-500/10 border-orange-500/20',
  },
  {
    name: 'Akash Kadu',
    role: 'Delivery & Table Runner',
    emoji: '🏃',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300',
    description: 'Ensures hot food reaches your table before it even gets a chance to cool.',
    color: 'bg-green-600/10 border-green-600/20',
  },
  {
    name: 'Kavita Bawane',
    role: 'Housekeeping & Hygiene',
    emoji: '🌿',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300',
    description: 'Maintains the spotless, cozy, and fresh ambience you love every day.',
    color: 'bg-emerald-600/10 border-emerald-600/20',
  },
];

function ChefCard({ chef, index }: { chef: typeof chefs[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-3xl border border-coffee/10 dark:border-beige/10 bg-white/60 dark:bg-neutral-900/40 backdrop-blur-xs shadow-md transition-all duration-350"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-beige/35">
        <img
          src={chef.image}
          alt={chef.name}
          className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-coffee text-cream border border-white/10 shadow-md">
            {chef.badge}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/45 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/10 shadow-xs">
          <Award className="w-4.5 h-4.5 text-amber-400" />
          <span className="text-xs text-cream font-bold">{chef.experience} Exp</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display font-bold text-xl text-coffee dark:text-beige mb-1 group-hover:text-terracotta transition-colors">{chef.name}</h3>
        <p className="text-[10px] text-terracotta font-extrabold uppercase tracking-widest mb-3">{chef.role}</p>
        <p className="text-sm text-charcoal/70 dark:text-cream/60 font-light mb-4 leading-relaxed">{chef.speciality}</p>

        <p className="text-xs italic text-charcoal/50 dark:text-cream/40 mb-5 border-l-2 border-terracotta/35 pl-3">
          {chef.quote}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {chef.skills.map(skill => (
            <span key={skill} className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-coffee/5 dark:bg-beige/10 text-coffee dark:text-beige border border-coffee/10 dark:border-beige/10 transition-colors">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Rating row */}
      <div className="px-6 pb-6 flex items-center gap-1 border-t border-coffee/5 dark:border-beige/5 pt-4 mt-2">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400 stroke-none" />
          ))}
        </div>
        <span className="text-[11px] text-charcoal/50 dark:text-cream/40 ml-1 font-semibold">5.0 Guest Rating</span>
      </div>
    </motion.div>
  );
}

function StaffCard({ member, index }: { member: typeof staff[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6, scale: 1.01, boxShadow: '0 20px 40px -15px rgba(111, 78, 55, 0.08)' }}
      className="p-5.5 rounded-3xl border border-coffee/8 dark:border-beige/8 bg-white/60 dark:bg-neutral-900/40 flex flex-col gap-3.5 shadow-xs transition-all duration-300"
    >
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 flex-shrink-0">
          <img
            src={member.image}
            alt={member.name}
            className="w-12 h-12 rounded-2xl object-cover border border-coffee/10 dark:border-beige/10"
          />
          <div className="absolute -bottom-1 -right-1 w-5.5 h-5.5 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center text-[10px] shadow-md border border-coffee/10 dark:border-beige/10">
            {member.emoji}
          </div>
        </div>
        <div>
          <p className="font-display font-bold text-coffee dark:text-beige text-base">{member.name}</p>
          <p className="text-[10px] text-terracotta font-extrabold uppercase tracking-widest mt-0.5">{member.role}</p>
        </div>
      </div>
      <p className="text-xs text-charcoal/70 dark:text-cream/50 font-light leading-relaxed">{member.description}</p>
      <div className="flex items-center gap-1.5 border-t border-coffee/5 dark:border-beige/5 pt-3.5 mt-1">
        <Heart className="w-3.5 h-3.5 text-terracotta fill-terracotta stroke-none" />
        <span className="text-[10px] text-charcoal/45 dark:text-cream/35 font-bold uppercase tracking-wider">Part of the Family</span>
      </div>
    </motion.div>
  );
}

export default function TeamPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen pt-16 md:pt-20 pb-16 md:pb-20">
      {/* Hero */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto px-6 md:px-12 text-center mb-20"
      >
        <p className="text-xs font-bold tracking-widest uppercase text-terracotta mb-3">The People Behind The Magic</p>
        <h1 className="font-display text-4xl md:text-6xl font-extrabold text-coffee dark:text-beige mb-5">
          Meet Our Team
        </h1>
        <p className="text-base text-charcoal/60 dark:text-cream/60 font-light leading-relaxed max-w-2xl mx-auto">
          Every smile, every sip, every bite — crafted by a passionate team that truly loves what they do. Club 36 is more than a café, it's a family.
        </p>
      </motion.div>

      {/* Chefs */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-[1px] w-8 bg-terracotta/40" />
          <p className="text-xs font-bold tracking-widest uppercase text-terracotta">Our Culinary Artists</p>
          <div className="h-[1px] flex-1 bg-coffee/10 dark:bg-beige/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chefs.map((chef, i) => (
            <ChefCard key={chef.name} chef={chef} index={i} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-coffee/20 to-transparent" />
      </div>

      {/* Staff */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-[1px] w-8 bg-terracotta/40" />
          <p className="text-xs font-bold tracking-widest uppercase text-terracotta">Our Wonderful Staff</p>
          <div className="h-[1px] flex-1 bg-coffee/10 dark:bg-beige/10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {staff.map((member, i) => (
            <StaffCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto px-6 text-center mt-24 py-12 rounded-3xl bg-coffee/5 dark:bg-beige/5 border border-coffee/10 dark:border-beige/10"
      >
        <div className="text-4xl mb-4">👨‍🍳</div>
        <h2 className="font-display text-2xl font-bold text-coffee dark:text-beige mb-3">Want to Join Our Family?</h2>
        <p className="text-sm text-charcoal/60 dark:text-cream/60 font-light mb-6">
          We're always looking for passionate people who love food, coffee, and great hospitality. Reach out to us!
        </p>
        <a
          href="mailto:club36cafe.bhandara@gmail.com"
          className="inline-flex items-center gap-2 px-6 py-3 bg-coffee text-cream rounded-xl font-semibold text-sm hover:bg-terracotta transition-colors"
        >
          Apply at club36cafe.bhandara@gmail.com
        </a>
      </motion.div>
    </div>
  );
}
