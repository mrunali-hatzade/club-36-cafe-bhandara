import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, totalPrice, setIsCheckoutOpen } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-cream dark:bg-charcoal shadow-2xl z-[101] flex flex-col border-l border-coffee/10 dark:border-beige/10"
          >
            {/* Header */}
            <div className="p-6 border-b border-coffee/10 dark:border-beige/10 flex justify-between items-center bg-beige/30 dark:bg-neutral-900/50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-coffee dark:text-beige" />
                <h2 className="font-display font-bold text-xl text-coffee dark:text-beige">
                  Your Order
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-coffee/10 text-charcoal/70 dark:text-cream/70 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full opacity-50 text-center">
                  <ShoppingBag className="w-16 h-16 mb-4 opacity-50" />
                  <p>Your cart is empty.</p>
                  <p className="text-sm mt-2">Add some delicious items from the menu!</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center bg-white dark:bg-neutral-800 p-3 rounded-2xl shadow-sm border border-coffee/5 dark:border-beige/5">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-sm line-clamp-1">{item.name}</h3>
                      {item.customization && (
                        <p className="text-[10px] text-charcoal/50 dark:text-cream/40 italic mt-0.5">
                          {item.customization}
                        </p>
                      )}
                      <p className="text-terracotta font-bold text-sm mt-1">₹{item.price}</p>
                      <div className="flex items-center gap-3 mt-2 bg-cream dark:bg-neutral-950 w-max rounded-lg p-1 border border-coffee/5 dark:border-beige/5">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-coffee/10 rounded-md cursor-pointer">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-coffee/10 rounded-md cursor-pointer">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="font-bold text-coffee dark:text-beige">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-coffee/10 dark:border-beige/10 bg-beige/10 dark:bg-neutral-900/30">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium text-charcoal/70 dark:text-cream/70">Subtotal</span>
                  <span className="font-display font-bold text-xl text-coffee dark:text-beige">₹{totalPrice}</span>
                </div>
                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full btn-premium py-4 bg-coffee text-cream hover:bg-terracotta dark:bg-beige dark:text-charcoal rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-coffee/15"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
