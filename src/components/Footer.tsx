import React, { useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef } from 'react';
import { Coffee, Instagram, Facebook, MessageSquare, MapPin, Heart, ArrowUpRight, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Social hover state for temporary named tooltip
  const [activeSocial, setActiveSocial] = useState<{ name: string; details: string } | null>(null);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSocialHover = (name: string, details: string) => {
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    setActiveSocial({ name, details });
    
    // Auto-hide after 3 seconds
    tooltipTimeoutRef.current = setTimeout(() => {
      setActiveSocial(null);
    }, 3000);
  };

  const handleSocialLeave = () => {
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    setActiveSocial(null);
  };

  useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  const quickLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About Us', id: 'about' },
    { label: 'Our Identity', id: 'why-us' },
    { label: 'Menu', id: 'menu' },
    { label: 'Specials', id: 'specials' },
  ];

  const discoverLinks = [
    { label: 'Gallery', id: 'gallery' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <footer
      id="main-footer"
      ref={ref}
      className="relative bg-[#1a1108] text-cream pt-20 pb-12 border-t border-coffee/20 overflow-hidden"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-terracotta/10"
            style={{
              width: Math.random() * 120 + 40,
              height: Math.random() * 120 + 40,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.05, 0.15, 0.05],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 6 + 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 3,
            }}
          />
        ))}
        {/* Glowing coffee gradient blob */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-coffee/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-terracotta/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12"
      >
        {/* Top divider with animated wave */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-16">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-coffee/30 to-transparent" />
          <div className="p-2 bg-coffee/20 rounded-xl border border-coffee/20">
            <Coffee className="w-5 h-5 text-terracotta" />
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-coffee/30 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-coffee/20">

          {/* Brand column */}
          <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col gap-6">
            <motion.div
              className="flex items-center gap-3 group cursor-default"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="p-2.5 bg-coffee text-cream rounded-xl"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
              >
                <Coffee className="w-6 h-6" />
              </motion.div>
              <div>
                <div className="font-display font-extrabold text-2xl tracking-tight text-shimmer-gold leading-none flex">
                  {"CLUB 26".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 350, damping: 8 }}
                      className="inline-block"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </div>
                <div className="font-sans text-[10px] tracking-widest text-coffee/60 uppercase font-bold mt-1">Bhandara</div>
              </div>
            </motion.div>

            <p className="text-sm text-cream/60 font-light leading-relaxed">
              Bhandara's most aesthetic gathering space. Enjoy hand-brewed coffee, premium thick shakes, and gourmet food in a warm, welcoming atmosphere.
            </p>

            {/* Animated hours badge */}
            <motion.div
              className="flex items-center gap-2 px-3 py-2 bg-coffee/10 border border-coffee/20 rounded-xl w-fit"
              animate={{ borderColor: ['rgba(111,78,55,0.2)', 'rgba(201,123,99,0.4)', 'rgba(111,78,55,0.2)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Clock className="w-4 h-4 text-terracotta" />
              <span className="text-xs text-cream/70 font-medium">Open: 10 AM – 11 PM</span>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </motion.div>

            {/* Social icons with tooltip */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                {[
                  { href: 'https://wa.me/919527113636', name: 'WhatsApp', details: 'Order & Chat: +91 95271 13636', icon: <MessageSquare className="w-5 h-5 fill-[#25D366] stroke-none" />, color: 'hover:bg-[#25D366]/20 hover:border-[#25D366]/40' },
                  { href: 'https://instagram.com/club26_bhandara_placeholder', name: 'Instagram', details: '@club26_bhandara', icon: <Instagram className="w-5 h-5" />, color: 'hover:bg-[#E1306C]/20 hover:border-[#E1306C]/40' },
                  { href: 'https://facebook.com', name: 'Facebook', details: 'Club 26 Cafe Facebook', icon: <Facebook className="w-5 h-5 fill-[#1877F2] stroke-none" />, color: 'hover:bg-[#1877F2]/20 hover:border-[#1877F2]/40' },
                  { href: 'https://maps.google.com/?q=Club+36+Cafe+Bhandara', name: 'Google Maps', details: 'Santaji Nagar, Bhandara', icon: <MapPin className="w-5 h-5" />, color: 'hover:bg-terracotta/20 hover:border-terracotta/40' },
                ].map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 bg-white/5 border border-white/10 rounded-xl text-cream/70 transition-all duration-300 ${s.color}`}
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => handleSocialHover(s.name, s.details)}
                    onMouseLeave={handleSocialLeave}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
              
              {/* Animated Floating Social Name popup box */}
              <div className="h-7 relative">
                <AnimatePresence>
                  {activeSocial && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 0.9, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.95 }}
                      className="absolute left-0 top-0 bg-coffee/90 border border-coffee/20 px-3 py-1 rounded-xl backdrop-blur-md flex items-center gap-2 text-[11px] text-cream shadow-lg w-max z-20 pointer-events-none"
                    >
                      <span className="font-bold text-terracotta">{activeSocial.name}:</span>
                      <span className="opacity-95">{activeSocial.details}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-2 lg:ml-4 flex flex-col gap-5">
            <h3 className="font-display font-semibold text-terracotta uppercase tracking-widest text-xs">Quick Links</h3>
            <div className="flex flex-col gap-3">
              {quickLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className="group flex items-center gap-2 text-sm text-cream/50 hover:text-cream transition-colors duration-300 font-light"
                  whileHover={{ x: 4 }}
                >
                  <span className="w-1 h-1 rounded-full bg-terracotta/40 group-hover:bg-terracotta group-hover:scale-150 transition-all duration-300" />
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Discover Links */}
          <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col gap-5">
            <h3 className="font-display font-semibold text-terracotta uppercase tracking-widest text-xs">Discover</h3>
            <div className="flex flex-col gap-3">
              {discoverLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className="group flex items-center gap-2 text-sm text-cream/50 hover:text-cream transition-colors duration-300 font-light"
                  whileHover={{ x: 4 }}
                >
                  <span className="w-1 h-1 rounded-full bg-terracotta/40 group-hover:bg-terracotta group-hover:scale-150 transition-all duration-300" />
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col gap-5">
            <h3 className="font-display font-semibold text-terracotta uppercase tracking-widest text-xs">Contact Us</h3>
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: <MapPin className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />,
                  content: 'Sursuman Bhavan, Station Road, beside MedPlus, Santaji Ward, Santaji Nagar, Bhandara, Maharashtra 441904',
                },
                {
                  icon: <Phone className="w-4 h-4 text-terracotta flex-shrink-0" />,
                  content: <a href="tel:+919527113636" className="hover:text-terracotta transition-colors">+91 95271 13636</a>,
                },
                {
                  icon: <Mail className="w-4 h-4 text-terracotta flex-shrink-0" />,
                  content: <a href="mailto:club26cafe.bhandara@gmail.com" className="hover:text-terracotta transition-colors break-all">club26cafe.bhandara@gmail.com</a>,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 group"
                  whileHover={{ x: 2 }}
                >
                  <div className="p-1.5 bg-coffee/10 rounded-lg border border-coffee/20 group-hover:bg-terracotta/10 group-hover:border-terracotta/20 transition-colors">
                    {item.icon}
                  </div>
                  <p className="text-sm text-cream/60 font-light leading-relaxed">{item.content}</p>
                </motion.div>
              ))}
            </div>

            {/* Google Maps CTA */}
            <motion.a
              href="https://maps.google.com/?q=Sursuman+Bhavan+Bhandara"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold text-terracotta border border-terracotta/30 px-4 py-2.5 rounded-xl w-fit hover:bg-terracotta/10 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Open in Google Maps <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={itemVariants}
          className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-cream/30"
        >
          <div>© {currentYear} Club 26 Cafe, Bhandara. All Rights Reserved.</div>
          <motion.div
            className="flex items-center gap-1.5"
            whileHover={{ scale: 1.05 }}
          >
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-terracotta fill-terracotta animate-pulse" />
            <span>by MrunaliHatzade</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
