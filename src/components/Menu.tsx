import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { menuCategories, menuItems } from '../data';
import { Sparkles, ShoppingBag, Eye, Check, X, Plus, Minus, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();

  // Modal detail states
  const [activeDetailItem, setActiveDetailItem] = useState<any | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState('Medium');
  const [sweetness, setSweetness] = useState('Regular');
  const [temp, setTemp] = useState('Warm');
  const [selectedAddOns, setSelectedAddOns] = useState<{ name: string; price: number }[]>([]);

  // Reset modal state when item changes
  useEffect(() => {
    if (activeDetailItem) {
      setQuantity(1);
      setSpiceLevel('Medium');
      setSweetness('Regular');
      setTemp('Warm');
      setSelectedAddOns([]);
    }
  }, [activeDetailItem]);

  const filteredItems = selectedCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  const getAvailableAddOns = (item: any) => {
    if (!item) return [];
    const cat = item.category;
    if (['coffee', 'cold-coffee', 'mocktails', 'shakes'].includes(cat)) {
      const list = [
        { name: 'Vanilla Ice Cream Scoop', price: 40 },
      ];
      if (['coffee', 'cold-coffee'].includes(cat)) {
        list.push({ name: 'Extra Shot Espresso', price: 30 });
      }
      if (['shakes', 'cold-coffee'].includes(cat)) {
        list.push({ name: 'Whipped Cream', price: 20 });
        list.push({ name: 'Chocolate Chips', price: 20 });
      }
      return list;
    } else if (['burgers', 'pizza', 'sandwiches', 'pasta', 'fries'].includes(cat)) {
      const list = [
        { name: 'Extra Cheese', price: 30 },
        { name: 'Extra Mayo Dip', price: 15 }
      ];
      if (['pizza', 'pasta', 'burgers'].includes(cat)) {
        list.push({ name: 'Add Mushrooms', price: 40 });
      }
      return list;
    } else if (cat === 'desserts') {
      return [
        { name: 'Vanilla Ice Cream Scoop', price: 40 },
        { name: 'Extra Chocolate Drizzle', price: 20 }
      ];
    }
    return [];
  };

  const toggleAddOn = (addOn: { name: string; price: number }) => {
    setSelectedAddOns((prev) => {
      const exists = prev.find((a) => a.name === addOn.name);
      if (exists) {
        return prev.filter((a) => a.name !== addOn.name);
      }
      return [...prev, addOn];
    });
  };

  const getCustomizationText = (item: any) => {
    if (!item) return '';
    const cat = item.category;
    const parts = [];
    if (['coffee', 'cold-coffee', 'mocktails', 'shakes'].includes(cat)) {
      parts.push(`Sweetness: ${sweetness}`);
    } else if (['burgers', 'pizza', 'sandwiches', 'pasta', 'fries'].includes(cat)) {
      parts.push(`Spice: ${spiceLevel}`);
    } else if (cat === 'desserts') {
      parts.push(`Serving: ${temp}`);
    }
    if (selectedAddOns.length > 0) {
      parts.push(`Add-ons: ${selectedAddOns.map((a) => a.name).join('+')}`);
    }
    return parts.join(' | ');
  };

  const handleModalAddToCart = () => {
    if (!activeDetailItem) return;
    const addOnCost = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
    const unitPrice = activeDetailItem.price + addOnCost;
    const customText = getCustomizationText(activeDetailItem);
    
    addToCart({
      id: customText ? `${activeDetailItem.id}-${customText.replace(/\s+/g, '')}` : activeDetailItem.id,
      name: activeDetailItem.name,
      price: unitPrice,
      image: activeDetailItem.image,
      customization: customText || undefined
    }, quantity);

    setActiveDetailItem(null);
  };

  return (
    <section
      id="menu"
      className="pt-6 md:pt-8 pb-6 md:pb-8 text-charcoal dark:text-cream bg-transparent transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-8 md:mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-[2px] w-6 bg-terracotta" />
            <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-terracotta">
              EXPLORE FLAVORS
            </p>
            <span className="h-[2px] w-6 bg-terracotta" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-coffee dark:text-beige leading-tight">
            Our Handcrafted Menu
          </h2>
          <p className="text-sm sm:text-base text-charcoal/70 dark:text-cream/70 font-light max-w-lg mx-auto">
            Choose from freshly prepared premium dishes, hand-brewed hot coffees, thick shakes, and ice-cool mocktails.
          </p>
        </motion.div>

        {/* Sliding Filter Tabs */}
        <div className="flex justify-start xl:justify-center overflow-x-auto pb-6 mb-12 scrollbar-none gap-2 px-1">
          <div className="flex bg-beige/35 dark:bg-neutral-900/50 p-2 rounded-2xl md:rounded-3xl border border-coffee/5 dark:border-beige/5 w-max">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-5 py-2.5 rounded-xl md:rounded-2xl text-xs md:text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer z-10 ${
                  selectedCategory === cat.id
                    ? 'text-cream dark:text-charcoal font-bold'
                    : 'text-charcoal/70 hover:text-coffee dark:text-cream/75 dark:hover:text-beige'
                }`}
              >
                {selectedCategory === cat.id && (
                  <motion.span
                    layoutId="activeMenuCategory"
                    className="absolute inset-0 bg-coffee dark:bg-beige rounded-xl md:rounded-2xl z-[-1] shadow-md"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Card Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 group/grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                layout
                id={`menu-item-${item.id}`}
                key={item.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.35, delay: Math.min(i, 6) * 0.03 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl bg-white/60 dark:bg-neutral-900/40 border border-coffee/10 dark:border-beige/10 flex flex-col justify-between group-hover/grid:opacity-75 hover:!opacity-100 hover:shadow-2xl hover:shadow-coffee/[0.04] transition-all duration-300"
              >
                {/* Product Image Panel */}
                <div 
                  onClick={() => setActiveDetailItem(item)}
                  className="relative aspect-4/3 w-full overflow-hidden bg-beige/30 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-all duration-700"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {/* Subtle Dark Glass Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/35 transition-colors duration-300" />

                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="flex items-center gap-1.5 px-4 py-2 bg-cream/95 dark:bg-charcoal/95 text-coffee dark:text-beige rounded-full text-xs font-bold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 border border-coffee/10 dark:border-beige/10">
                      <Eye className="w-3.5 h-3.5" /> View Details
                    </span>
                  </div>

                  {/* Badges / Signatures */}
                  {item.isSignature && (
                    <div className="absolute top-4 left-4 z-20 flex gap-1.5 items-center bg-terracotta border border-white/20 text-cream text-[10px] uppercase font-extrabold px-3 py-1.5 rounded-full shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 fill-cream" />
                      {item.badge || 'House Special'}
                    </div>
                  )}

                  {/* Price Badge Dynamic Box */}
                  <div className="absolute bottom-4 right-4 z-20 bg-cream/95 backdrop-blur-md dark:bg-charcoal/95 border border-coffee/15 dark:border-beige/15 px-4.5 py-1.5 rounded-2xl shadow-xs">
                    <span className="font-display font-extrabold text-coffee dark:text-beige text-lg">
                      ₹{item.price}
                    </span>
                  </div>
                </div>

                {/* Card Editorial Description Panel */}
                <div 
                  onClick={() => setActiveDetailItem(item)}
                  className="p-6 md:p-8 flex-1 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <h3 className="font-display font-bold text-xl text-coffee dark:text-beige tracking-tight group-hover:text-terracotta dark:group-hover:text-beige transition-colors line-clamp-1 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-xs md:text-sm text-charcoal/65 dark:text-cream/65 line-clamp-3 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Booking / Quick Order button */}
                  <div className="border-t border-coffee/10 dark:border-beige/10 pt-5 mt-5 flex items-center justify-between">
                    <span className="text-[10px] tracking-widest uppercase font-bold text-charcoal/40 dark:text-cream/40">
                      Club 26 Fresh
                    </span>

                    <button
                      id={`order-btn-${item.id}`}
                      onClick={(e) => {
                        e.stopPropagation(); // prevent opening detailed modal again
                        setActiveDetailItem(item);
                      }}
                      className="btn-premium flex items-center gap-2 text-xs md:text-sm font-bold bg-coffee text-cream hover:bg-terracotta dark:bg-beige dark:text-charcoal px-4.5 py-2.5 rounded-xl cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" /> Order Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty status check */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-beige/20 dark:bg-neutral-900/30 rounded-3xl border border-dashed border-coffee/25">
            <p className="text-lg text-charcoal/50 dark:text-cream/50">
              No items currently listed in this category. Visit us to check seasonal specials!
            </p>
          </div>
        )}
      </div>

      {/* macOS Style Interactive Item Detail Modal */}
      {createPortal(
        <AnimatePresence>
          {activeDetailItem && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
            {/* Backdrop click to close */}
            <div className="absolute inset-0" onClick={() => setActiveDetailItem(null)} />

            {/* Modal Card Window */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="relative max-w-3xl w-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border border-coffee/12 dark:border-beige/12 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[92vh] md:max-h-[80vh]"
            >
              {/* Left Side: Product Image (cover style) */}
              <div className="relative w-full md:w-1/2 h-52 md:h-auto overflow-hidden bg-beige/10 border-b md:border-b-0 md:border-r border-coffee/10 dark:border-beige/10">
                <img
                  src={activeDetailItem.image}
                  alt={activeDetailItem.name}
                  className="w-full h-full object-cover"
                />
                
                {/* macOS control dots overlay for visual identity */}
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <span
                    onClick={() => setActiveDetailItem(null)}
                    className="w-3.5 h-3.5 rounded-full bg-red-400 hover:bg-red-500 flex items-center justify-center text-[8px] text-red-950 font-bold cursor-pointer transition-colors group"
                  >
                    <span className="opacity-0 group-hover:opacity-100">×</span>
                  </span>
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-400 cursor-default" />
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 cursor-default" />
                </div>

                {activeDetailItem.isSignature && (
                  <div className="absolute bottom-4 left-4 z-20 flex gap-1.5 items-center bg-terracotta border border-white/20 text-cream text-[10px] uppercase font-extrabold px-3.5 py-2 rounded-full shadow-md">
                    <Sparkles className="w-3.5 h-3.5 fill-cream" />
                    {activeDetailItem.badge || 'Signature'}
                  </div>
                )}
              </div>

              {/* Right Side: Options & Details */}
              <div className="w-full md:w-1/2 flex flex-col justify-between max-h-[60vh] md:max-h-[80vh] relative">
                
                {/* Standard Cross close button in top-right */}
                <button
                  onClick={() => setActiveDetailItem(null)}
                  className="absolute top-4 right-4 z-30 p-1.5 rounded-xl bg-charcoal/5 dark:bg-cream/5 hover:bg-charcoal/10 dark:hover:bg-cream/10 text-charcoal/60 dark:text-cream/60 hover:text-terracotta dark:hover:text-terracotta transition-all cursor-pointer"
                  aria-label="Close details"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
                
                {/* Scrollable details and customization inputs */}
                <div className="overflow-y-auto p-6 md:p-8 flex-1 space-y-6">
                  
                  {/* Title & Description */}
                  <div>
                    <h3 className="font-display font-black text-2xl text-coffee dark:text-beige tracking-tight mb-2">
                      {activeDetailItem.name}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-coffee/8 text-coffee dark:bg-beige/8 dark:text-beige rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
                      {menuCategories.find((c) => c.id === activeDetailItem.category)?.name || activeDetailItem.category}
                    </span>
                    <p className="text-xs sm:text-sm text-charcoal/70 dark:text-cream/70 font-light leading-relaxed">
                      {activeDetailItem.description}
                    </p>
                  </div>

                  <hr className="border-coffee/10 dark:border-beige/10" />

                  {/* Customize Preferences (Spice/Sweetness/Temp) */}
                  {['coffee', 'cold-coffee', 'mocktails', 'shakes'].includes(activeDetailItem.category) && (
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-coffee dark:text-beige mb-2.5">
                        🍬 Sweetness
                      </span>
                      <div className="grid grid-cols-3 gap-1.5">
                        {['Less Sweet', 'Regular', 'Extra Sweet'].map((lvl) => (
                          <button
                            key={lvl}
                            onClick={() => setSweetness(lvl)}
                            className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                              sweetness === lvl
                                ? 'bg-coffee border-coffee text-cream shadow-md dark:bg-beige dark:text-charcoal dark:border-beige'
                                : 'border-coffee/10 dark:border-beige/10 text-charcoal/75 dark:text-cream/65 hover:bg-coffee/5 dark:hover:bg-beige/5'
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {['burgers', 'pizza', 'sandwiches', 'pasta', 'fries'].includes(activeDetailItem.category) && (
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-coffee dark:text-beige mb-2.5">
                        🌶️ Spice Level
                      </span>
                      <div className="grid grid-cols-4 gap-1.5">
                        {['Mild', 'Medium', 'Spicy', 'Extra Spicy'].map((lvl) => (
                          <button
                            key={lvl}
                            onClick={() => setSpiceLevel(lvl)}
                            className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                              spiceLevel === lvl
                                ? 'bg-coffee border-coffee text-cream shadow-md dark:bg-beige dark:text-charcoal dark:border-beige'
                                : 'border-coffee/10 dark:border-beige/10 text-charcoal/75 dark:text-cream/65 hover:bg-coffee/5 dark:hover:bg-beige/5'
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeDetailItem.category === 'desserts' && (
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-coffee dark:text-beige mb-2.5">
                        🔥 Serving Style
                      </span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {['Normal', 'Warm'].map((lvl) => (
                          <button
                            key={lvl}
                            onClick={() => setTemp(lvl)}
                            className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                              temp === lvl
                                ? 'bg-coffee border-coffee text-cream shadow-md dark:bg-beige dark:text-charcoal dark:border-beige'
                                : 'border-coffee/10 dark:border-beige/10 text-charcoal/75 dark:text-cream/65 hover:bg-coffee/5 dark:hover:bg-beige/5'
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add-ons */}
                  {getAvailableAddOns(activeDetailItem).length > 0 && (
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-coffee dark:text-beige mb-2.5">
                        ➕ Add-ons / Extras
                      </span>
                      <div className="space-y-1.5">
                        {getAvailableAddOns(activeDetailItem).map((addOn) => {
                          const isSelected = selectedAddOns.some((a) => a.name === addOn.name);
                          return (
                            <button
                              key={addOn.name}
                              onClick={() => toggleAddOn(addOn)}
                              className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-coffee/5 dark:bg-beige/5 border-coffee text-coffee dark:text-beige'
                                  : 'border-coffee/10 dark:border-beige/10 text-charcoal/75 dark:text-cream/65 hover:bg-coffee/5 dark:hover:bg-beige/5'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                                  isSelected ? 'bg-coffee border-coffee text-cream' : 'border-coffee/30'
                                }`}>
                                  {isSelected && <Check className="w-3 h-3 text-cream" />}
                                </div>
                                <span>{addOn.name}</span>
                              </div>
                              <span className="font-bold text-terracotta">
                                {addOn.price > 0 ? `+₹${addOn.price}` : 'Free'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer block (static at the bottom) */}
                <div className="p-6 md:p-8 bg-coffee/5 dark:bg-beige/5 border-t border-coffee/10 dark:border-beige/10">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <span className="block text-[10px] uppercase font-bold tracking-widest text-charcoal/40 dark:text-cream/40 mb-1">
                        Quantity
                      </span>
                      <div className="flex items-center gap-4 bg-white dark:bg-neutral-800 border border-coffee/10 dark:border-beige/10 rounded-xl p-1.5 w-max">
                        <button
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="p-1 hover:bg-coffee/10 dark:hover:bg-beige/10 rounded-lg transition-colors cursor-pointer text-coffee dark:text-beige"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-display font-extrabold text-sm w-6 text-center text-coffee dark:text-beige">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity((q) => q + 1)}
                          className="p-1 hover:bg-coffee/10 dark:hover:bg-beige/10 rounded-lg transition-colors cursor-pointer text-coffee dark:text-beige"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="block text-[10px] uppercase font-bold tracking-widest text-charcoal/40 dark:text-cream/40 mb-1">
                        Total Price
                      </span>
                      <span className="font-display font-extrabold text-2xl text-terracotta">
                        ₹{(activeDetailItem.price + selectedAddOns.reduce((sum, a) => sum + a.price, 0)) * quantity}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setActiveDetailItem(null)}
                      className="px-5 py-3.5 border border-coffee/20 text-coffee dark:text-beige font-bold rounded-xl text-sm transition-colors hover:bg-coffee/5 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleModalAddToCart}
                      className="flex-1 py-3.5 bg-coffee hover:bg-terracotta dark:bg-beige dark:text-charcoal text-cream rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-coffee/15"
                    >
                      <ShoppingBag className="w-4.5 h-4.5" /> Add to Order
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </section>
  );
}
