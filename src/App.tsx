import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate, useScroll, useTransform } from 'motion/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Coffee } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import TopBar from './components/TopBar';
import FloatingButtons from './components/FloatingButtons';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';

// Pages
import Home from './pages/Home';
import Order from './pages/Order';
import BookTable from './pages/BookTable';
import GalleryPage from './pages/GalleryPage';
import TeamPage from './pages/TeamPage';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const location = useLocation();

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Parallax background hooks
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.15, 0.05]);

  // Handle initial loading speed
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Sync Dark/Light Mode with HTML document root
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.classList.add('dark-theme');
    } else {
      root.classList.remove('dark');
      root.classList.remove('dark-theme');
    }
  }, [darkMode]);

  // Track Mouse Pointer Motion for ambient glowing vector (smooth)
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', updateMouse);
    return () => {
      window.removeEventListener('mousemove', updateMouse);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* 1. Elegant Brand Loading Overlay screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            id="brand-loading-screen"
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cream transition-colors duration-500"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.15, 1],
              }}
              transition={{ 
                duration: 2.2, 
                repeat: Infinity,
                ease: 'easeInOut' 
              }}
              className="p-5 bg-coffee text-cream rounded-full mb-6 shadow-xl shadow-coffee/10"
            >
              <Coffee className="w-10 h-10" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display font-black text-3xl tracking-widest text-[#6F4E37] uppercase leading-none"
            >
              CLUB 26 CAFE
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.6 }}
              className="font-sans text-[10px] tracking-widest text-[#8F7460] uppercase mt-2.5 font-bold"
            >
              Bhandara &bull; Loading Experience
            </motion.p>
            <div className="w-40 h-[2px] bg-coffee/10 rounded-full mt-8 overflow-hidden">
              <motion.div
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                className="relative h-full w-1/2 bg-coffee rounded-full"
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Layout Wrapper */}
      <motion.div 
        className="relative min-h-screen selection:bg-coffee selection:text-cream overflow-x-hidden bg-cream/85 dark:bg-charcoal/90 text-charcoal dark:text-cream transition-colors duration-500 flex flex-col"
        style={{
          ['--x' as any]: useMotionTemplate`${springX}px`,
          ['--y' as any]: useMotionTemplate`${springY}px`
        }}
      >
        {/* Global Parallax Background */}
        <motion.div 
          className="fixed -inset-10 z-0 pointer-events-none"
          style={{ y: bgY, opacity: bgOpacity }}
        >
          <img 
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1920" 
            alt="Cafe Background Aesthetic"
            className="w-full h-[130vh] object-cover dark:grayscale"
          />
        </motion.div>

        <div className="mouse-glow fixed inset-0 z-30 opacity-70 dark:opacity-40 pointer-events-none" />

        <TopBar />

        <div className="relative z-40 mt-9">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
        
        <main className="flex-1 relative z-10 pt-9">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<Order />} />
            <Route path="/book" element={<BookTable />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/team" element={<TeamPage />} />
          </Routes>
        </main>

        <Footer />
        <FloatingButtons />
        <CartDrawer />
        <CheckoutModal />


      </motion.div>
    </>
  );
}
