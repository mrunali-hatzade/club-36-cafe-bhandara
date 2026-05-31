import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

// 3D-styled Moka Pot SVG
function MokaPotSVG() {
  return (
    <svg width="120" height="150" viewBox="0 0 120 150" fill="none" className="drop-shadow-2xl">
      <defs>
        <linearGradient id="moka-metal-light" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="30%" stopColor="#DFD8CF" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#9C9285" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4A4135" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="moka-metal-dark" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3C332A" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#63574A" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#251E18" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="moka-copper" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E6A18C" />
          <stop offset="50%" stopColor="#C97B63" />
          <stop offset="100%" stopColor="#964E3A" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="18" rx="8" ry="6" fill="url(#moka-metal-dark)" />
      <path d="M40 30 L60 15 L80 30 Z" fill="url(#moka-metal-light)" stroke="url(#moka-metal-dark)" strokeWidth="1" />
      <ellipse cx="60" cy="30" rx="20" ry="4" fill="url(#moka-metal-dark)" />
      <path d="M40 30 L30 80 L90 80 L80 30 Z" fill="url(#moka-metal-light)" />
      <path d="M50 30 L45 80" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <path d="M60 30 L60 80" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
      <path d="M70 30 L75 80" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
      <rect x="29" y="80" width="62" height="6" fill="url(#moka-copper)" rx="2" />
      <path d="M30 86 L22 135 L98 135 L90 86 Z" fill="url(#moka-metal-dark)" />
      <path d="M30 86 L22 135 L98 135 L90 86 Z" fill="url(#moka-metal-light)" opacity="0.4" />
      <path d="M45 86 L40 135" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <path d="M60 86 L60 135" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
      <path d="M75 86 L80 135" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
      <path d="M35 38 L15 36 L32 50 Z" fill="url(#moka-metal-light)" stroke="url(#moka-metal-dark)" strokeWidth="1" />
      <path d="M85 45 C108 45 112 90 88 95 C82 92 82 88 88 86 C102 82 98 56 85 54 Z" fill="#2D2319" />
    </svg>
  );
}

// 3D-styled Coffee Grinder SVG
function CoffeeGrinderSVG() {
  return (
    <svg width="120" height="150" viewBox="0 0 120 150" fill="none" className="drop-shadow-2xl">
      <defs>
        <linearGradient id="grinder-wood" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8A5A36" />
          <stop offset="50%" stopColor="#5C3A21" />
          <stop offset="100%" stopColor="#362213" />
        </linearGradient>
        <linearGradient id="grinder-brass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFECA1" />
          <stop offset="40%" stopColor="#D9A05B" />
          <stop offset="100%" stopColor="#7D5120" />
        </linearGradient>
        <linearGradient id="grinder-handle-metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#A8A29A" />
          <stop offset="100%" stopColor="#54504B" />
        </linearGradient>
      </defs>
      <rect x="58" y="10" width="4" height="25" fill="url(#grinder-handle-metal)" />
      <path d="M60 10 L100 18 C105 19 105 24 100 25 L60 20 Z" fill="url(#grinder-handle-metal)" />
      <circle cx="102" cy="22" r="8" fill="url(#grinder-wood)" />
      <path d="M30 35 C30 20 90 20 90 35 L80 50 L40 50 Z" fill="url(#grinder-brass)" />
      <ellipse cx="60" cy="35" rx="30" ry="6" fill="#472F19" opacity="0.6" />
      <rect x="25" y="50" width="70" height="75" rx="6" fill="url(#grinder-wood)" />
      <rect x="28" y="53" width="3" height="69" fill="rgba(255,255,255,0.15)" rx="1.5" />
      <rect x="34" y="53" width="52" height="3" fill="rgba(255,255,255,0.1)" rx="1.5" />
      <rect x="35" y="85" width="50" height="32" fill="#3D2513" rx="4" stroke="#704729" strokeWidth="1" />
      <circle cx="60" cy="101" r="5" fill="url(#grinder-brass)" />
      <rect x="20" y="125" width="80" height="8" fill="#331E10" rx="3" />
    </svg>
  );
}

// 3D-styled French Press SVG
function FrenchPressSVG() {
  return (
    <svg width="120" height="150" viewBox="0 0 120 150" fill="none" className="drop-shadow-2xl">
      <defs>
        <linearGradient id="press-metal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="35%" stopColor="#C4BEB5" stopOpacity="0.7" />
          <stop offset="70%" stopColor="#7E776E" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3B3630" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="press-glass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
          <stop offset="10%" stopColor="#EBF4F6" stopOpacity="0.1" />
          <stop offset="90%" stopColor="#EBF4F6" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="press-coffee" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7A4C31" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#4A2B18" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#251206" stopOpacity="0.98" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="12" r="6" fill="url(#press-metal)" />
      <rect x="58" y="18" width="4" height="20" fill="url(#press-metal)" />
      <path d="M32 38 L32 34 C32 30 88 30 88 34 L88 38 Z" fill="url(#press-metal)" />
      <ellipse cx="60" cy="38" rx="28" ry="4" fill="url(#press-metal)" />
      <rect x="34" y="42" width="52" height="92" rx="4" fill="url(#press-glass)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <path d="M35 72 L35 132 C35 133 36 134 37 134 L83 134 C84 134 85 133 85 132 L85 72 Z" fill="url(#press-coffee)" />
      <ellipse cx="60" cy="72" rx="24.8" ry="3" fill="#B07856" opacity="0.8" />
      <ellipse cx="60" cy="85" rx="24.5" ry="3.5" fill="url(#press-metal)" />
      <rect x="59" y="38" width="2" height="47" fill="url(#press-metal)" opacity="0.8" />
      <path d="M32 40 L32 136 L38 136 L38 40 Z" fill="url(#press-metal)" opacity="0.8" />
      <path d="M82 40 L82 136 L88 136 L88 40 Z" fill="url(#press-metal)" opacity="0.8" />
      <rect x="32" y="132" width="56" height="6" fill="url(#press-metal)" />
      <rect x="32" y="80" width="56" height="4" fill="url(#press-metal)" />
      <path d="M88 50 C105 50 110 112 88 116 C84 114 84 110 88 108 C100 104 98 62 88 60 Z" fill="#221E19" />
    </svg>
  );
}

// 3D-styled Chemex SVG
function ChemexSVG() {
  return (
    <svg width="100" height="140" viewBox="0 0 100 140" fill="none" className="drop-shadow-2xl">
      <defs>
        <linearGradient id="chemex-glass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
          <stop offset="25%" stopColor="#E6F2F5" stopOpacity="0.1" />
          <stop offset="75%" stopColor="#E6F2F5" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="chemex-wood" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C68A5C" />
          <stop offset="50%" stopColor="#A05C30" />
          <stop offset="100%" stopColor="#6E3816" />
        </linearGradient>
        <linearGradient id="chemex-coffee" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8F593C" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#301B0E" stopOpacity="0.98" />
        </linearGradient>
      </defs>
      <path d="M20 15 L38 65 L62 65 L80 15 Z" fill="url(#chemex-glass)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <ellipse cx="50" cy="15" rx="30" ry="4" fill="url(#chemex-glass)" />
      <path d="M38 65 L20 125 C18 132 25 138 32 138 L68 138 C75 138 82 132 80 125 L62 65 Z" fill="url(#chemex-glass)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <path d="M34 85 L23 125 C22 129 25 134 30 134 L70 134 C75 134 78 129 77 125 L66 85 Z" fill="url(#chemex-coffee)" />
      <ellipse cx="50" cy="85" rx="16" ry="2.5" fill="#B57A57" opacity="0.8" />
      <path d="M36 62 L32 78 L68 78 L64 62 Z" fill="url(#chemex-wood)" />
      <rect x="48" y="68" width="4" height="20" fill="#4E2B12" rx="1" />
      <circle cx="50" cy="71" r="3" fill="#D9A05B" />
    </svg>
  );
}

// 3D-styled Takeaway Cup SVG
function TakeawayCupSVG() {
  return (
    <svg width="90" height="130" viewBox="0 0 90 130" fill="none" className="drop-shadow-2xl">
      <defs>
        <linearGradient id="paper-cup" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5EFE6" />
          <stop offset="60%" stopColor="#E4D5C3" />
          <stop offset="100%" stopColor="#CBB49C" />
        </linearGradient>
        <linearGradient id="cup-lid" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4A3F35" />
          <stop offset="50%" stopColor="#28221D" />
          <stop offset="100%" stopColor="#15110E" />
        </linearGradient>
        <linearGradient id="sleeve" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B68E65" />
          <stop offset="50%" stopColor="#8F6336" />
          <stop offset="100%" stopColor="#67411F" />
        </linearGradient>
      </defs>
      <path d="M22 26 L30 115 C30 119 34 122 38 122 L52 122 C56 122 60 119 60 115 L68 26 Z" fill="url(#paper-cup)" />
      <path d="M24 55 L27 90 L63 90 L66 55 Z" fill="url(#sleeve)" />
      <circle cx="45" cy="72.5" r="10" fill="rgba(255,255,255,0.12)" />
      <path d="M42 70 C42 66 48 66 48 70 C48 74 42 74 42 70" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <ellipse cx="45" cy="26" rx="25" ry="6" fill="url(#cup-lid)" />
      <rect x="18" y="22" width="54" height="4" fill="url(#cup-lid)" rx="2" />
      <path d="M38 18 H52 V22 H38 Z" fill="url(#cup-lid)" />
    </svg>
  );
}

// 3D-styled Coffee Bean SVG
function CoffeeBeanSVG() {
  return (
    <svg width="45" height="32" viewBox="0 0 45 32" fill="none" className="drop-shadow-lg">
      <defs>
        <linearGradient id="bean-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8C5C41" />
          <stop offset="40%" stopColor="#5E3823" />
          <stop offset="85%" stopColor="#381D0E" />
          <stop offset="100%" stopColor="#1E0E06" />
        </linearGradient>
        <linearGradient id="bean-highlight" x1="20%" y1="10%" x2="40%" y2="40%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M6 16 C6 6 39 6 39 16 C39 26 6 26 6 16 Z" fill="url(#bean-grad)" />
      <path d="M6 16 Q22.5 25 39 16" stroke="#251207" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6 16 Q22.5 25 39 16" stroke="#C28A6B" strokeWidth="0.6" strokeLinecap="round" opacity="0.3" />
      <path d="M10 12 C14 8 30 8 35 12" stroke="url(#bean-highlight)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// 3D-styled Hot Coffee Mug SVG
function CoffeeCupSVG() {
  return (
    <svg width="110" height="90" viewBox="0 0 110 90" fill="none" className="drop-shadow-2xl">
      <defs>
        <linearGradient id="cup-ceramic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCFAF7" />
          <stop offset="35%" stopColor="#EADBC8" />
          <stop offset="70%" stopColor="#BBA995" />
          <stop offset="100%" stopColor="#6E5E4E" />
        </linearGradient>
        <linearGradient id="cup-coffee" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A2611" />
          <stop offset="70%" stopColor="#2D1405" />
          <stop offset="100%" stopColor="#120500" />
        </linearGradient>
        <linearGradient id="foam" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E6C8B5" />
          <stop offset="50%" stopColor="#F5E3D7" />
          <stop offset="100%" stopColor="#D9BAA6" />
        </linearGradient>
      </defs>
      <path d="M20 18 L28 72 C29 78 35 84 42 84 L68 84 C75 84 81 78 82 72 L90 18 Z" fill="url(#cup-ceramic)" />
      <ellipse cx="55" cy="18" rx="35" ry="8" fill="url(#cup-ceramic)" />
      <ellipse cx="55" cy="18" rx="31" ry="6" fill="url(#cup-coffee)" />
      <path d="M40 18 C40 14 70 14 70 18 C70 22 40 22 40 18 Z" fill="url(#foam)" opacity="0.9" />
      <path d="M45 18 C48 16 62 16 65 18 C65 20 48 20 45 18 Z" fill="url(#cup-coffee)" opacity="0.65" />
      <path d="M90 30 C108 30 110 65 90 68 C86 66 86 64 90 62 C100 58 98 40 90 38 Z" fill="url(#cup-ceramic)" />
      <path d="M42 6 Q44 2 48 4 T52 0" stroke="rgba(201, 123, 99, 0.45)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M55 7 Q57 1 63 4 T69 -2" stroke="rgba(201, 123, 99, 0.45)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M68 5 Q70 1 74 3 T78 -1" stroke="rgba(201, 123, 99, 0.45)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function FloatingEquipment() {
  const containerRef = useRef(null);
  
  // Track scroll position for deep parallax drift
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Maps scroll positions to distinct vertical translation offsets (increased ranges for more motion)
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], [0, -450]);
  const yParallaxMedium = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], [0, -280]);
  const yParallaxUltra = useTransform(scrollYProgress, [0, 1], [0, 580]);

  // Combined 3D floating effect (increased ranges for y and multi-axis angles)
  const floatingVariants = {
    animate: (custom: { duration: number; yRange: number; rotateRange: number }) => ({
      y: [-custom.yRange, custom.yRange],
      rotate: [-custom.rotateRange, custom.rotateRange],
      rotateX: [-25, 25],
      rotateY: [-25, 25],
      transition: {
        y: {
          duration: custom.duration,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        },
        rotate: {
          duration: custom.duration * 1.4,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        },
        rotateX: {
          duration: custom.duration * 1.1,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        },
        rotateY: {
          duration: custom.duration * 1.5,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        },
      },
    }),
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-visible [perspective:1200px] [transform-style:preserve-3d]"
    >
      {/* ================= SECTION HEIGHT 0% - 15% (About Section) ================= */}
      {/* 1. Moka Pot */}
      <motion.div style={{ y: yParallaxFast, top: '4%' }} className="absolute left-[3%] sm:left-[6%] opacity-40 dark:opacity-[0.2]">
        <motion.div custom={{ duration: 6.5, yRange: 30, rotateRange: 30 }} variants={floatingVariants} animate="animate" whileHover={{ scale: 1.12, rotateY: 45 }} className="pointer-events-auto cursor-pointer">
          <MokaPotSVG />
        </motion.div>
      </motion.div>

      {/* 2. Coffee Bean 1 */}
      <motion.div style={{ y: yParallaxSlow, top: '8%' }} className="absolute right-[12%] opacity-55 dark:opacity-[0.25]">
        <motion.div custom={{ duration: 4.5, yRange: 20, rotateRange: 60 }} variants={floatingVariants} animate="animate" whileHover={{ scale: 1.25, rotate: 180 }} className="pointer-events-auto cursor-pointer">
          <CoffeeBeanSVG />
        </motion.div>
      </motion.div>


      {/* ================= SECTION HEIGHT 15% - 30% (Why Us Section) ================= */}
      {/* 3. Vintage Coffee Grinder */}
      <motion.div style={{ y: yParallaxMedium, top: '17%' }} className="absolute right-[4%] sm:right-[7%] opacity-40 dark:opacity-[0.2]">
        <motion.div custom={{ duration: 8, yRange: 35, rotateRange: 25 }} variants={floatingVariants} animate="animate" whileHover={{ scale: 1.12, rotateY: -45 }} className="pointer-events-auto cursor-pointer">
          <CoffeeGrinderSVG />
        </motion.div>
      </motion.div>

      {/* 4. Takeaway Paper Cup */}
      <motion.div style={{ y: yParallaxFast, top: '24%' }} className="absolute left-[5%] sm:left-[8%] opacity-35 dark:opacity-[0.18]">
        <motion.div custom={{ duration: 7, yRange: 25, rotateRange: 20 }} variants={floatingVariants} animate="animate" whileHover={{ scale: 1.15, rotateX: 30 }} className="pointer-events-auto cursor-pointer">
          <TakeawayCupSVG />
        </motion.div>
      </motion.div>

      {/* 5. Coffee Bean 2 */}
      <motion.div style={{ y: yParallaxSlow, top: '28%' }} className="absolute right-[15%] opacity-55 dark:opacity-[0.25]">
        <motion.div custom={{ duration: 5.5, yRange: 22, rotateRange: 45 }} variants={floatingVariants} animate="animate" whileHover={{ scale: 1.2, y: -10 }} className="pointer-events-auto cursor-pointer">
          <CoffeeBeanSVG />
        </motion.div>
      </motion.div>


      {/* ================= SECTION HEIGHT 30% - 45% (Menu Section) ================= */}
      {/* 6. Chemex Pour-over maker */}
      <motion.div style={{ y: yParallaxUltra, top: '36%' }} className="absolute right-[3%] sm:right-[6%] opacity-40 dark:opacity-[0.2]">
        <motion.div custom={{ duration: 9, yRange: 32, rotateRange: 22 }} variants={floatingVariants} animate="animate" whileHover={{ scale: 1.12, rotateY: 45 }} className="pointer-events-auto cursor-pointer">
          <ChemexSVG />
        </motion.div>
      </motion.div>

      {/* 7. Coffee Bean Group A */}
      <motion.div style={{ y: yParallaxSlow, top: '41%' }} className="absolute left-[6%] sm:left-[10%] opacity-50 dark:opacity-[0.25]">
        <motion.div custom={{ duration: 5, yRange: 18, rotateRange: 90 }} variants={floatingVariants} animate="animate" whileHover={{ scale: 1.22 }} className="pointer-events-auto cursor-pointer flex flex-col gap-8">
          <CoffeeBeanSVG />
          <div className="scale-75 translate-x-12 rotate-45">
            <CoffeeBeanSVG />
          </div>
        </motion.div>
      </motion.div>


      {/* ================= SECTION HEIGHT 45% - 60% (Specials Section) ================= */}
      {/* 8. French Press */}
      <motion.div style={{ y: yParallaxUltra, top: '50%' }} className="absolute left-[3%] sm:left-[6%] opacity-40 dark:opacity-[0.2]">
        <motion.div custom={{ duration: 8.5, yRange: 28, rotateRange: 18 }} variants={floatingVariants} animate="animate" whileHover={{ scale: 1.12, rotateX: -30 }} className="pointer-events-auto cursor-pointer">
          <FrenchPressSVG />
        </motion.div>
      </motion.div>

      {/* 9. Coffee Bean 3 */}
      <motion.div style={{ y: yParallaxSlow, top: '58%' }} className="absolute right-[10%] opacity-55 dark:opacity-[0.25]">
        <motion.div custom={{ duration: 6, yRange: 25, rotateRange: 50 }} variants={floatingVariants} animate="animate" whileHover={{ scale: 1.25, rotate: -90 }} className="pointer-events-auto cursor-pointer">
          <CoffeeBeanSVG />
        </motion.div>
      </motion.div>


      {/* ================= SECTION HEIGHT 60% - 75% (Booking CTA & Reviews Section) ================= */}
      {/* 10. Takeaway Paper Cup (Second Layer) */}
      <motion.div style={{ y: yParallaxMedium, top: '64%' }} className="absolute left-[8%] opacity-30 dark:opacity-[0.15]">
        <motion.div custom={{ duration: 7.5, yRange: 24, rotateRange: 35 }} variants={floatingVariants} animate="animate" whileHover={{ scale: 1.15, rotateY: 30 }} className="pointer-events-auto cursor-pointer">
          <TakeawayCupSVG />
        </motion.div>
      </motion.div>

      {/* 11. Steaming Coffee Cup Mug */}
      <motion.div style={{ y: yParallaxSlow, top: '70%' }} className="absolute right-[4%] sm:right-[8%] opacity-40 dark:opacity-[0.2]">
        <motion.div custom={{ duration: 7, yRange: 26, rotateRange: 20 }} variants={floatingVariants} animate="animate" whileHover={{ scale: 1.15, y: -15 }} className="pointer-events-auto cursor-pointer">
          <CoffeeCupSVG />
        </motion.div>
      </motion.div>

      {/* 12. Coffee Bean 4 */}
      <motion.div style={{ y: yParallaxFast, top: '75%' }} className="absolute left-[12%] opacity-55 dark:opacity-[0.25]">
        <motion.div custom={{ duration: 4.8, yRange: 18, rotateRange: 40 }} variants={floatingVariants} animate="animate" whileHover={{ scale: 1.2, rotate: 120 }} className="pointer-events-auto cursor-pointer">
          <CoffeeBeanSVG />
        </motion.div>
      </motion.div>


      {/* ================= SECTION HEIGHT 75% - 90% (Reviews & Contact Section) ================= */}
      {/* 13. Moka Pot (Second Layer / Small) */}
      <motion.div style={{ y: yParallaxFast, top: '81%' }} className="absolute left-[3%] sm:left-[6%] opacity-25 dark:opacity-[0.12] scale-90">
        <motion.div custom={{ duration: 8, yRange: 25, rotateRange: 25 }} variants={floatingVariants} animate="animate" whileHover={{ scale: 1.1, rotateX: 30 }} className="pointer-events-auto cursor-pointer">
          <MokaPotSVG />
        </motion.div>
      </motion.div>

      {/* 14. Coffee Bean Group B */}
      <motion.div style={{ y: yParallaxSlow, top: '86%' }} className="absolute right-[8%] sm:right-[11%] opacity-50 dark:opacity-[0.25]">
        <motion.div custom={{ duration: 5.5, yRange: 20, rotateRange: 80 }} variants={floatingVariants} animate="animate" whileHover={{ scale: 1.22 }} className="pointer-events-auto cursor-pointer flex flex-col gap-6">
          <CoffeeBeanSVG />
          <div className="scale-90 -rotate-45 -translate-x-8">
            <CoffeeBeanSVG />
          </div>
        </motion.div>
      </motion.div>


      {/* ================= SECTION HEIGHT 90% - 100% (Footer Top Boundary) ================= */}
      {/* 15. Chemex (Second Layer / Small) */}
      <motion.div style={{ y: yParallaxUltra, top: '91%' }} className="absolute left-[10%] opacity-25 dark:opacity-[0.12] scale-80">
        <motion.div custom={{ duration: 9.5, yRange: 30, rotateRange: 15 }} variants={floatingVariants} animate="animate" whileHover={{ scale: 1.1, rotateY: 30 }} className="pointer-events-auto cursor-pointer">
          <ChemexSVG />
        </motion.div>
      </motion.div>

      {/* 16. Coffee Bean 5 */}
      <motion.div style={{ y: yParallaxFast, top: '95%' }} className="absolute right-[15%] opacity-55 dark:opacity-[0.25]">
        <motion.div custom={{ duration: 4.2, yRange: 16, rotateRange: 45 }} variants={floatingVariants} animate="animate" whileHover={{ scale: 1.3, rotate: 360 }} className="pointer-events-auto cursor-pointer">
          <CoffeeBeanSVG />
        </motion.div>
      </motion.div>
    </div>
  );
}
