import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ArrowUp } from 'lucide-react';

export default function FloatingButtons() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Floating Button */}
      <motion.a
        id="whatsapp-floating-btn"
        href="https://wa.me/919527113636?text=Hi%20Club%2036%20Cafe!%20I'd%20like%20to%20know%20more%20about%20your%20menu%20and%20table%20bookings."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-transform cursor-pointer"
        aria-label="Contact us on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{
          scale: 1.12,
          boxShadow: '0 10px 25px -5px rgba(37, 211, 102, 0.45)',
        }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </motion.a>

      {/* Elegant Scroll To Top Button */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            id="scroll-to-top-btn"
            onClick={scrollToTop}
            className="flex items-center justify-center w-14 h-14 bg-coffee text-cream dark:bg-beige dark:text-charcoal rounded-full shadow-lg cursor-pointer border border-coffee/10 dark:border-beige/10"
            aria-label="Scroll to top"
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            whileHover={{
              scale: 1.12,
              boxShadow: '0 10px 25px -5px rgba(111, 78, 55, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
