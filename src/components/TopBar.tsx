import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Facebook, MessageSquare, MapPin, Clock, ChevronRight } from 'lucide-react';

function getOpenStatus(): { isOpen: boolean; label: string; nextChange: string } {
  const now = new Date();
  // IST offset: UTC+5:30
  const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const hours = ist.getHours();
  const minutes = ist.getMinutes();
  const totalMins = hours * 60 + minutes;

  // Open: 10:00 AM (600) to 11:00 PM (1380)
  const openTime = 10 * 60;   // 600
  const closeTime = 23 * 60;  // 1380

  if (totalMins >= openTime && totalMins < closeTime) {
    const minsUntilClose = closeTime - totalMins;
    const h = Math.floor(minsUntilClose / 60);
    const m = minsUntilClose % 60;
    const closing = h > 0 ? `Closes in ${h}h ${m}m` : `Closes in ${m}m`;
    return { isOpen: true, label: 'Open Now', nextChange: closing };
  } else {
    const minsUntilOpen = totalMins < openTime
      ? openTime - totalMins
      : (24 * 60 - totalMins) + openTime;
    const h = Math.floor(minsUntilOpen / 60);
    const m = minsUntilOpen % 60;
    const opening = h > 0 ? `Opens in ${h}h ${m}m` : `Opens in ${m}m`;
    return { isOpen: false, label: 'Closed', nextChange: opening };
  }
}

export default function TopBar() {
  const [status, setStatus] = useState(getOpenStatus());
  const [visible, setVisible] = useState(true);
  const [scrollMsg, setScrollMsg] = useState(0);

  const announcements = [
    '🎉 Special Weekend Brunch — Every Saturday & Sunday from 10AM',
    '☕ Buy 2 Coffees, Get 1 Free — Every Monday!',
    '🎂 Celebrate your birthday with us — Complimentary dessert!',
    '📸 Share your Club 36 moment on Instagram & get 10% off next visit!',
  ];

  useEffect(() => {
    const clockTick = setInterval(() => setStatus(getOpenStatus()), 60000);
    const msgTick = setInterval(() => setScrollMsg(p => (p + 1) % announcements.length), 4000);
    return () => { clearInterval(clockTick); clearInterval(msgTick); };
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 w-full z-[50] bg-[#1a1108] text-cream/80 text-xs"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 h-9 flex items-center justify-between gap-4">

        {/* Left: Live status */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${
            status.isOpen
              ? 'bg-green-500/10 border-green-500/30 text-green-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.isOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
            {status.label}
          </div>
          <div className="hidden sm:flex items-center gap-1 text-cream/40">
            <Clock className="w-3 h-3" />
            <span className="text-[11px]">{status.nextChange}</span>
          </div>
          <div className="hidden md:flex items-center gap-1 text-cream/40">
            <MapPin className="w-3 h-3" />
            <span className="text-[11px]">Santaji Nagar, Bhandara</span>
          </div>
        </div>

        {/* Center: Scrolling announcements */}
        <div className="flex-1 overflow-hidden text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={scrollMsg}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="text-[11px] text-cream/60 truncate"
            >
              {announcements[scrollMsg]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Right: Social icons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <a href="https://wa.me/919527113636" target="_blank" rel="noopener noreferrer"
            className="p-1 hover:text-[#25D366] transition-colors">
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
            className="p-1 hover:text-[#E1306C] transition-colors">
            <Instagram className="w-3.5 h-3.5" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
            className="p-1 hover:text-[#1877F2] transition-colors">
            <Facebook className="w-3.5 h-3.5" />
          </a>
          <div className="w-[1px] h-3 bg-cream/10 mx-1" />
          <a href="tel:+919527113636" className="hidden sm:flex items-center gap-1 text-[11px] text-terracotta hover:text-cream transition-colors">
            +91 95271 13636 <ChevronRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
