import { motion } from 'motion/react';
import { signatureSpecials } from '../data';
import { Sparkles, MessageSquare, Check } from 'lucide-react';

export default function Specials() {
  const handleOrderSpecial = (name: string, price: number) => {
    const textMsg = `Hi Club 26! I would love to order your signature special: "${name}" (₹${price})! Please confirm.`;
    const encoded = encodeURIComponent(textMsg);
    window.open(`https://wa.me/919527113636?text=${encoded}`, '_blank');
  };

  return (
    <section
      id="specials"
      className="pt-6 md:pt-8 pb-6 md:pb-8 text-charcoal dark:text-cream bg-transparent border-t border-b border-coffee/5 dark:border-beige/5 overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-[2px] w-6 bg-terracotta" />
            <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-terracotta">
              CHEF RECOMMENDATIONS
            </p>
            <span className="h-[2px] w-6 bg-terracotta" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-coffee dark:text-beige leading-tight">
            Our Signature Specials
          </h2>
          <p className="text-sm sm:text-base text-charcoal/70 dark:text-cream/70 font-light max-w-lg mx-auto">
            These are our absolute masterpieces — culinary recipes perfected with premium ingredients and unmatched presentation.
          </p>
        </div>

        {/* Alternate Staggered Specials List */}
        <div className="flex flex-col gap-10 md:gap-14">
          {signatureSpecials.map((spec, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={spec.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* Image Holder - Alternates side based on index */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`lg:col-span-6 relative rounded-3xl overflow-hidden aspect-4/3 shadow-2xl shadow-coffee/[0.06] group ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  } border border-coffee/10 dark:border-beige/10`}
                >
                  {/* Subtle Accent frame for premium feel */}
                  <div className="absolute inset-0 border border-terracotta/30 rounded-3xl pointer-events-none z-20 m-3 group-hover:scale-97 group-hover:border-terracotta/55 transition-all duration-500" />
                  
                  <img
                    src={spec.image}
                    alt={spec.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-all duration-700"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Soft Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90" />

                  {/* Absolute Badge */}
                  <div className="absolute top-6 right-6 z-20 bg-cream/95 backdrop-blur-md dark:bg-charcoal/95 border border-coffee/15 dark:border-beige/15 px-4.5 py-1.5 rounded-2xl shadow-md">
                    <span className="font-display text-[10px] sm:text-xs tracking-widest font-extrabold text-terracotta uppercase">
                      Signature {idx + 1}
                    </span>
                  </div>
                </motion.div>

                {/* Content Block */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`lg:col-span-6 flex flex-col justify-center relative ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="glow-spot glow-terracotta w-64 h-64 -top-12 -left-12 opacity-10 dark:opacity-5 animate-pulse-soft" />

                  <div className="flex items-center gap-2 mb-3 relative z-10">
                    <Sparkles className="w-5 h-5 text-terracotta fill-terracotta" />
                    <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-terracotta">
                      {spec.tagline}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-coffee dark:text-beige leading-tight mb-5 relative z-10">
                    {spec.name}
                  </h3>

                  <p className="text-base text-charcoal/80 dark:text-cream/80 font-light leading-relaxed mb-6 relative z-10">
                    {spec.description}
                  </p>

                  {/* Features Highlights Bullet checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 relative z-10">
                    {spec.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2">
                        <div className="p-1 rounded-full bg-olive/15 text-olive flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3px]" />
                        </div>
                        <span className="text-xs sm:text-sm text-charcoal/75 dark:text-cream/70 font-medium">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing and Orders Row */}
                  <div className="flex items-center gap-6 border-t border-coffee/10 dark:border-beige/10 pt-6 relative z-10">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-charcoal/50 dark:text-cream/50 uppercase tracking-widest font-bold">
                        Fresh Price
                      </span>
                      <span className="font-display text-3xl font-extrabold text-[#2D2D2D] dark:text-cream leading-none mt-1">
                        ₹{spec.price}
                      </span>
                    </div>

                    <button
                      id={`order-spec-${spec.id}`}
                      onClick={() => handleOrderSpecial(spec.name, spec.price)}
                      className="btn-premium flex-1 sm:flex-initial px-6 py-4 bg-coffee text-cream hover:bg-terracotta dark:bg-beige dark:text-charcoal font-bold rounded-2xl flex items-center justify-center gap-2.5 shadow-lg shadow-coffee/15 hover:shadow-terracotta/20 hover:scale-[1.02] transition-all cursor-pointer text-sm"
                    >
                      <MessageSquare className="w-4.5 h-4.5 fill-cream dark:fill-charcoal stroke-none" />
                      Reserve / Order via WhatsApp
                    </button>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
