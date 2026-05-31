import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu as MenuIcon, X, Sun, Moon, Coffee, ShoppingBag, CalendarCheck, ArrowRight, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isMobileGallerySubOpen, setIsMobileGallerySubOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const location = useLocation();
  const navigate = useNavigate();
  const activeSegment = location.pathname;
  const { items, setIsCartOpen } = useCart();
  const totalCartItems = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) setScrollProgress((window.scrollY / totalScroll) * 100);

      // Scrollspy calculation
      if (location.pathname !== '/') return;

      // Check if user is scrolled to the absolute bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      const scrollPosition = window.scrollY + 140; // top offset for headers
      const sections = ['home', 'about', 'why-us', 'menu', 'specials', 'reviews', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set active section on load
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Handle hash scrolling with offset on page changes or hash updates
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          window.scrollTo({
            top: el.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  }, [location.pathname, location.hash]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
  };

  const isScrolledOrNotHome = isScrolled || activeSegment !== '/';

  const navLinks = [
    { name: 'Home', id: 'home', type: 'scroll' },
    { name: 'About', id: 'about', type: 'scroll' },
    { name: 'Why Us', id: 'why-us', type: 'scroll' },
    { name: 'Menu', id: 'menu', type: 'scroll' },
    { name: 'Specials', id: 'specials', type: 'scroll' },
    { name: 'Reviews', id: 'reviews', type: 'scroll' },
    { name: 'Gallery', to: '/gallery', type: 'route' },
    { name: 'Our Team', to: '/team', type: 'route' },
    { name: 'Contact', id: 'contact', type: 'scroll' },
  ];

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-9 left-0 h-[2px] bg-gradient-to-r from-coffee via-terracotta to-amber-500 z-[200] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav
        id="main-navbar"
        className={`fixed top-9 left-0 w-full z-[90] transition-all duration-300 border-b border-coffee/10 dark:border-beige/10 shadow-sm ${
          isScrolledOrNotHome
            ? 'py-2.5 shadow-xl backdrop-blur-xl bg-[#fdfcfb]/95 dark:bg-neutral-900/95 shadow-coffee/[0.03]'
            : 'py-4 bg-[#fdfcfb]/85 dark:bg-neutral-900/85 backdrop-blur-lg'
        }`}
      >
        <div className="max-w-[85rem] mx-auto px-4 xl:px-8 flex justify-between items-center w-full">

          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo({ top: 0 })} className="flex items-center gap-2.5 group cursor-pointer flex-shrink-0">
            <motion.div whileHover={{ rotate: -10, scale: 1.1 }} className="p-2 bg-coffee text-cream rounded-xl">
              <Coffee className="w-5 h-5" />
            </motion.div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-extrabold text-xl tracking-tight leading-none text-shimmer-gold flex overflow-visible">
                {"CLUB 36 CAFE".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ y: -4, scale: 1.15, color: "#C97B63" }}
                    transition={{ type: "spring", stiffness: 350, damping: 10 }}
                    className="inline-block cursor-pointer origin-bottom"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
              <span className="font-sans text-[9px] tracking-widest text-[#8F7460] uppercase font-bold mt-0.5">Bhandara</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-2.5">
            {navLinks.map((link) => {
              const isActive = link.type === 'route'
                ? activeSegment === link.to
                : activeSegment === '/' && activeSection === link.id;

              if (link.type === 'route') {
                if (link.name === 'Gallery') {
                  return (
                    <div
                      key={link.name}
                      className="relative group"
                      onMouseEnter={() => setIsGalleryOpen(true)}
                      onMouseLeave={() => setIsGalleryOpen(false)}
                    >
                      <Link
                        to={link.to}
                        className={`nav-link flex items-center gap-1 ${
                          isActive
                            ? 'text-terracotta bg-coffee/5 dark:bg-beige/5 font-bold'
                            : 'text-coffee dark:text-beige'
                        }`}
                      >
                        {link.name} <ChevronDown className="w-3 h-3 text-coffee/60 dark:text-beige/60" />
                      </Link>

                      {/* Submenu Dropdown */}
                      <AnimatePresence>
                        {isGalleryOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-1/2 -translate-x-1/2 mt-1.5 w-60 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-coffee/10 dark:border-beige/10 rounded-2xl shadow-xl p-1.5 z-50 flex flex-col gap-0.5"
                          >
                            {[
                              { label: 'Memories In A Snap', hash: 'gallery' },
                              { label: 'Cafe Culture & Vibe', hash: 'experience' },
                              { label: '#CLUB36BHANDARA', hash: 'instagram' },
                            ].map((sub) => (
                              <Link
                                key={sub.label}
                                to={`/gallery#${sub.hash}`}
                                onClick={() => {
                                  setIsGalleryOpen(false);
                                  if (location.pathname === '/gallery') {
                                    const el = document.getElementById(sub.hash);
                                    if (el) {
                                      window.scrollTo({
                                        top: el.getBoundingClientRect().top + window.scrollY - 100,
                                        behavior: 'smooth'
                                      });
                                    }
                                  }
                                }}
                                className="px-4 py-2.5 rounded-xl text-[10px] font-bold text-charcoal/80 dark:text-cream/85 hover:bg-coffee/5 dark:hover:bg-beige/5 hover:text-terracotta transition-colors text-left uppercase tracking-wider font-sans"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.to}
                    className={`nav-link ${
                      isActive
                        ? 'text-terracotta bg-coffee/5 dark:bg-beige/5 font-bold'
                        : 'text-coffee dark:text-beige'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              } else {
                return (
                  <button
                    key={link.name}
                    onClick={() => scrollTo(link.id)}
                    className={`nav-link ${
                      isActive
                        ? 'text-terracotta bg-coffee/5 dark:bg-beige/5 font-bold'
                        : 'text-coffee dark:text-beige'
                    }`}
                  >
                    {link.name}
                  </button>
                );
              }
            })}
          </div>

          {/* Right action buttons */}
          <div className="hidden xl:flex items-center gap-2">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full transition-colors cursor-pointer hover:bg-coffee/8 dark:hover:bg-beige/8 text-coffee dark:text-beige">
              {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            <button onClick={() => setIsCartOpen(true)} className="relative p-2 rounded-full transition-colors cursor-pointer hover:bg-coffee/8 dark:hover:bg-beige/8 text-coffee dark:text-beige">
              <ShoppingBag className="w-4.5 h-4.5" />
              {totalCartItems > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-terracotta text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalCartItems}
                </motion.span>
              )}
            </button>

            <div className="w-[1px] h-5 bg-coffee/15 dark:bg-beige/15 mx-1" />

            <Link
              to="/book"
              className="flex items-center gap-1.5 px-3 py-1.5 border border-coffee/30 dark:border-beige/30 text-coffee dark:text-beige hover:bg-coffee/8 dark:hover:bg-beige/8 rounded-xl text-sm font-semibold transition-all cursor-pointer">
              <CalendarCheck className="w-4 h-4" /> Reserve
            </Link>

            <Link to="/order" className="flex items-center gap-1.5 px-3 py-1.5 bg-coffee hover:bg-terracotta text-cream rounded-xl text-sm font-bold transition-colors shadow-md shadow-coffee/20">
              Order Now <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile right */}
          <div className="flex xl:hidden items-center gap-2">
            <button onClick={() => setIsCartOpen(true)} className="relative p-2 rounded-full text-coffee dark:text-beige hover:bg-coffee/8 dark:hover:bg-beige/8">
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && <span className="absolute top-0 right-0 w-4 h-4 bg-terracotta text-white text-[10px] font-bold rounded-full flex items-center justify-center">{totalCartItems}</span>}
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full text-coffee dark:text-beige hover:bg-coffee/8 dark:hover:bg-beige/8">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={toggleMenu} className="p-2 rounded-xl border border-coffee/20 dark:border-beige/20 text-charcoal dark:text-cream hover:bg-coffee/8 dark:hover:bg-beige/8">
              {isOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[95] xl:hidden" onClick={toggleMenu} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed right-0 top-0 h-full w-[85%] max-w-sm bg-white dark:bg-neutral-900 shadow-2xl z-[96] flex flex-col border-l border-coffee/10 dark:border-beige/10 overflow-y-auto"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-coffee/8 dark:border-beige/8">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-coffee text-cream rounded-lg"><Coffee className="w-4 h-4" /></div>
                  <span className="font-display font-bold text-shimmer-gold flex overflow-visible">
                    {"CLUB 36 CAFE".split("").map((char, index) => (
                      <motion.span
                        key={index}
                        whileHover={{ y: -3, scale: 1.15, color: "#C97B63" }}
                        transition={{ type: "spring", stiffness: 350, damping: 10 }}
                        className="inline-block cursor-pointer origin-bottom"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </span>
                </div>
                <button onClick={toggleMenu} className="p-1.5 rounded-lg hover:bg-coffee/8 text-charcoal dark:text-cream"><X className="w-5 h-5" /></button>
              </div>

              {/* Links */}
              <div className="flex-1 px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = link.type === 'route'
                    ? activeSegment === link.to
                    : activeSegment === '/' && activeSection === link.id;

                  if (link.type === 'route') {
                    if (link.name === 'Gallery') {
                      return (
                        <div key={i} className="flex flex-col">
                          <div className="flex items-center justify-between px-4 py-1.5">
                            <Link
                              to={link.to}
                              onClick={toggleMenu}
                              className={`flex-1 py-1 rounded-xl text-base font-medium transition-colors ${
                                isActive
                                  ? 'text-terracotta font-bold'
                                  : 'text-charcoal/80 dark:text-cream/80 hover:text-terracotta'
                              }`}
                            >
                              {link.name}
                            </Link>
                            <button
                              onClick={() => setIsMobileGallerySubOpen(!isMobileGallerySubOpen)}
                              className="p-2 hover:bg-coffee/8 dark:hover:bg-beige/8 rounded-lg text-charcoal/50 dark:text-cream/50 cursor-pointer"
                            >
                              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileGallerySubOpen ? 'rotate-180' : ''}`} />
                            </button>
                          </div>
                          
                          {/* Collapsible Mobile Submenu */}
                          <AnimatePresence>
                            {isMobileGallerySubOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden flex flex-col pl-6 pr-4 gap-1 border-l border-coffee/10 dark:border-beige/10 ml-6 mb-2"
                              >
                                {[
                                  { label: 'Memories In A Snap', hash: 'gallery' },
                                  { label: 'Cafe Culture & Vibe', hash: 'experience' },
                                  { label: '#CLUB36BHANDARA', hash: 'instagram' },
                                ].map((sub) => (
                                  <Link
                                    key={sub.label}
                                    to={`/gallery#${sub.hash}`}
                                    onClick={() => {
                                      toggleMenu();
                                      if (location.pathname === '/gallery') {
                                        const el = document.getElementById(sub.hash);
                                        if (el) {
                                          window.scrollTo({
                                            top: el.getBoundingClientRect().top + window.scrollY - 100,
                                            behavior: 'smooth'
                                          });
                                        }
                                      }
                                    }}
                                    className="py-2.5 text-xs text-charcoal/70 dark:text-cream/70 hover:text-terracotta transition-colors uppercase tracking-wider font-bold text-left"
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={i}
                        to={link.to}
                        onClick={toggleMenu}
                        className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                          isActive
                            ? 'text-terracotta bg-terracotta/8 font-bold'
                            : 'text-charcoal/80 dark:text-cream/80 hover:bg-coffee/8 hover:text-terracotta'
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  } else {
                    return (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        onClick={() => {
                          scrollTo(link.id);
                          toggleMenu();
                        }}
                        className={`text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                          isActive
                            ? 'text-terracotta bg-terracotta/8 font-bold'
                            : 'text-charcoal/80 dark:text-cream/80 hover:bg-coffee/8 hover:text-terracotta'
                        }`}
                      >
                        {link.name}
                      </motion.button>
                    );
                  }
                })}
              </div>

              {/* CTA buttons */}
              <div className="px-4 pb-8 pt-4 flex flex-col gap-3 border-t border-coffee/8 dark:border-beige/8">
                <Link to="/book" onClick={toggleMenu} className="flex items-center justify-center gap-2 w-full py-3.5 border border-coffee/30 text-coffee dark:text-beige font-bold rounded-xl text-base transition-colors hover:bg-coffee/8 cursor-pointer">
                  <CalendarCheck className="w-5 h-5" /> Reserve a Table
                </Link>
                <Link to="/order" onClick={toggleMenu} className="flex items-center justify-center gap-2 w-full py-3.5 bg-coffee hover:bg-terracotta text-cream font-bold rounded-xl text-base transition-colors">
                  Order Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
