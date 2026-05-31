import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import {
  X, ShoppingBag, User, MapPin, CreditCard, ChevronRight,
  ChevronLeft, CheckCircle2, ClipboardList, Utensils, Truck, Coffee, MessageSquare
} from 'lucide-react';

type Step = 1 | 2 | 3;

export default function CheckoutModal() {
  const { items, totalPrice, isCheckoutOpen, setIsCheckoutOpen, clearCart } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState<'table' | 'takeaway' | 'delivery'>('table');
  const [tableNumber, setTableNumber] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cash' | 'card'>('upi');
  const [notes, setNotes] = useState('');

  // Errors State
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  if (!isCheckoutOpen) return null;

  const validateStep = (s: Step) => {
    const errs: typeof errors = {};
    if (s === 1) {
      if (!name.trim()) errs.name = 'Name is required';
      if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) errs.phone = 'Valid 10-digit phone is required';
    }
    if (s === 2) {
      if (serviceType === 'table' && !tableNumber.trim()) {
        errs.tableNumber = 'Table number is required';
      }
      if (serviceType === 'takeaway' && !pickupTime.trim()) {
        errs.pickupTime = 'Pickup time is required';
      }
      if (serviceType === 'delivery' && !address.trim()) {
        errs.address = 'Delivery address is required';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((p) => (p + 1) as Step);
    }
  };

  const handleBack = () => {
    setStep((p) => (p - 1) as Step);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setLoading(true);

    const itemsSummary = items
      .map((item) => `• ${item.quantity}x ${item.name}${item.customization ? ` [${item.customization}]` : ''} (₹${item.price * item.quantity})`)
      .join('\n');

    let serviceDetails = '';
    if (serviceType === 'table') {
      serviceDetails = `🪑 *Service:* Dine-In (Table #${tableNumber})`;
    } else if (serviceType === 'takeaway') {
      serviceDetails = `🛍️ *Service:* Takeaway (Pickup at ${pickupTime})`;
    } else {
      serviceDetails = `🏠 *Service:* Home Delivery\n📍 *Address:* ${address}`;
    }

    const paymentText =
      paymentMethod === 'upi'
        ? '📱 UPI / GPay (Pay on Table/Delivery)'
        : paymentMethod === 'cash'
        ? '💵 Cash on Delivery/Table'
        : '💳 Card Swipe on delivery';

    const msg = 
`🛍️ *New Order — Club 26 Cafe, Bhandara*

👤 *Customer:* ${name}
📞 *Phone:* ${phone}${email ? `\n📧 *Email:* ${email}` : ''}

📦 *Items ordered:*
${itemsSummary}

💰 *Subtotal:* ₹${totalPrice}
🧾 *Taxes/GST (5%):* ₹${Math.round(totalPrice * 0.05)}
💵 *Grand Total:* ₹${Math.round(totalPrice * 1.05)}

${serviceDetails}
💳 *Payment:* ${paymentText}
📝 *Instructions:* ${notes || 'None'}

Please confirm my order. Thank you! 🙏`;

    setTimeout(() => {
      window.open(`https://wa.me/919527113636?text=${encodeURIComponent(msg)}`, '_blank');
      setLoading(false);
      setSubmitted(true);
      clearCart();
    }, 1500);
  };

  const inputCls = (err?: string) =>
    `w-full px-4 py-3 rounded-2xl border text-sm font-medium transition-all bg-white/70 dark:bg-neutral-900/50 text-charcoal dark:text-cream placeholder:text-charcoal/30 dark:placeholder:text-cream/35 outline-none focus:ring-2 backdrop-blur-xs ${
      err
        ? 'border-red-400 focus:ring-red-100'
        : 'border-coffee/12 dark:border-beige/12 focus:border-coffee dark:focus:border-beige focus:ring-coffee/10 dark:focus:ring-beige/10'
    }`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={handleClose} />

        {/* Success screen overlay */}
        {submitted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-md w-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border border-coffee/12 dark:border-beige/12 p-8 rounded-3xl text-center shadow-2xl z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring' }}
              className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-950/30 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-200/20"
            >
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </motion.div>
            <h2 className="font-display text-2xl font-extrabold text-coffee dark:text-beige mb-3">
              Order Dispatched! 🎉
            </h2>
            <p className="text-xs text-charcoal/60 dark:text-cream/60 mb-6 leading-relaxed">
              Your order has been sent to our kitchen via WhatsApp. We will confirm your preparation time and UPI request immediately!
            </p>
            <div className="p-4 rounded-2xl bg-coffee/5 dark:bg-beige/5 border border-coffee/10 dark:border-beige/10 text-left space-y-1.5 mb-6 text-xs text-charcoal/70 dark:text-cream/60">
              <p className="font-bold text-coffee dark:text-beige">📋 Order Summary</p>
              <p>👤 {name} &bull; 📞 {phone}</p>
              <p>📦 Delivery Mode: {serviceType === 'table' ? `Dine-In (Table #${tableNumber})` : serviceType === 'takeaway' ? 'Takeaway' : 'Home Delivery'}</p>
              <p>💵 Paid via: {paymentMethod === 'upi' ? 'UPI' : paymentMethod === 'cash' ? 'Cash' : 'Card'}</p>
            </div>
            <button
              onClick={handleClose}
              className="w-full py-3.5 bg-coffee hover:bg-terracotta text-cream rounded-xl font-bold text-sm transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </motion.div>
        ) : (
          /* Main Interactive OS-Style Checkout Window */
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="relative max-w-2xl w-full bg-white/90 dark:bg-neutral-900/85 backdrop-blur-xl rounded-3xl shadow-2xl border border-coffee/12 dark:border-beige/12 overflow-hidden z-10 flex flex-col max-h-[92vh]"
          >
            {/* Header Control Bar */}
            <div className="px-6 py-4 bg-coffee/5 dark:bg-beige/5 border-b border-coffee/10 dark:border-beige/10 flex items-center justify-between">
              {/* Window dots (Mac layout) */}
              <div className="flex gap-2">
                <span
                  onClick={handleClose}
                  className="w-3.5 h-3.5 rounded-full bg-red-400/90 hover:bg-red-500 cursor-pointer transition-colors flex items-center justify-center text-[8px] text-red-950 font-bold group"
                >
                  <span className="opacity-0 group-hover:opacity-100">×</span>
                </span>
                <span className="w-3.5 h-3.5 rounded-full bg-amber-400/90 cursor-default" />
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-400/90 cursor-default" />
              </div>

              <div className="text-center flex-1">
                <span className="font-display font-bold text-xs tracking-wide text-coffee dark:text-beige uppercase flex items-center justify-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5" /> Order Checkout
                </span>
              </div>

              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg hover:bg-coffee/8 dark:hover:bg-beige/8 text-charcoal/50 dark:text-cream/50 hover:text-terracotta dark:hover:text-terracotta transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Window Scrollable Body */}
            <div className="overflow-y-auto flex-1 p-6 md:p-8">
              {/* Steps indicator */}
              <div className="flex items-center justify-center gap-0 mb-6 sm:mb-8">
                {[
                  { n: 1, label: 'Your Details', icon: User },
                  { n: 2, label: 'Service Mode', icon: Truck },
                  { n: 3, label: 'Summary', icon: ClipboardList }
                ].map((item, i) => {
                  const done = step > item.n;
                  const active = step === item.n;
                  return (
                    <div key={item.n} className="flex items-center">
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                            done
                              ? 'bg-green-500 border-green-500 text-white'
                              : active
                              ? 'bg-coffee border-coffee text-cream'
                              : 'bg-transparent border-coffee/20 text-charcoal/30 dark:text-cream/30'
                          }`}
                        >
                          {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : item.n}
                        </div>
                        <span
                          className={`text-[9px] sm:text-[10px] font-semibold whitespace-nowrap ${
                            active ? 'text-coffee dark:text-beige' : 'text-charcoal/40 dark:text-cream/30'
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      {i < 2 && (
                        <div
                          className={`w-12 sm:w-20 h-[2px] mx-1 sm:mx-2 mb-4 rounded-full transition-all duration-500 ${
                            done ? 'bg-green-500' : 'bg-coffee/10 dark:bg-beige/10'
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {/* STEP 1: Details */}
                  {step === 1 && (
                    <motion.div
                      key="details-step"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -25 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-5"
                    >
                      <div className="text-center mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-coffee/8 flex items-center justify-center mx-auto mb-3">
                          <User className="w-5 h-5 text-coffee" />
                        </div>
                        <h2 className="font-display text-xl font-bold text-coffee dark:text-beige">Your Details</h2>
                        <p className="text-xs text-charcoal/50 dark:text-cream/50 mt-1">
                          Let us know who this order is for
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-coffee dark:text-beige mb-2">
                          Your Name *
                        </label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Rahul Patil"
                          className={inputCls(errors.name)}
                        />
                        {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-coffee dark:text-beige mb-2">
                          Mobile Number *
                        </label>
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="10-digit mobile number"
                          maxLength={10}
                          className={inputCls(errors.phone)}
                        />
                        {errors.phone && <p className="text-red-400 text-[11px] mt-1">{errors.phone}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-coffee dark:text-beige mb-2">
                          Email Address <span className="text-charcoal/30 dark:text-cream/30 font-normal normal-case">(optional)</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="rahul@example.com"
                          className={inputCls()}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Service Mode */}
                  {step === 2 && (
                    <motion.div
                      key="service-step"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -25 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-coffee/8 flex items-center justify-center mx-auto mb-3">
                          <Truck className="w-5 h-5 text-coffee" />
                        </div>
                        <h2 className="font-display text-xl font-bold text-coffee dark:text-beige">Service Mode</h2>
                        <p className="text-xs text-charcoal/50 dark:text-cream/50 mt-1">
                          How would you like to receive your food?
                        </p>
                      </div>

                      {/* Service Type Buttons */}
                      <div className="grid grid-cols-3 gap-2 mb-6">
                        {[
                          { id: 'table', label: 'Dine-In', icon: Utensils },
                          { id: 'takeaway', label: 'Takeaway', icon: Coffee },
                          { id: 'delivery', label: 'Delivery', icon: Truck }
                        ].map((mode) => (
                          <button
                            key={mode.id}
                            type="button"
                            onClick={() => {
                              setServiceType(mode.id as any);
                              setErrors({});
                            }}
                            className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-bold gap-2.5 transition-all ${
                              serviceType === mode.id
                                ? 'bg-coffee text-cream border-coffee shadow-lg shadow-coffee/10'
                                : 'border-coffee/10 dark:border-beige/10 text-charcoal/70 dark:text-cream/60 hover:bg-coffee/5 dark:hover:bg-beige/5'
                            }`}
                          >
                            <mode.icon className="w-4 h-4" />
                            {mode.label}
                          </button>
                        ))}
                      </div>

                      {/* Conditional forms based on Service Mode */}
                      {serviceType === 'table' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-2"
                        >
                          <label className="block text-xs font-bold uppercase tracking-wider text-coffee dark:text-beige mb-2">
                            Table Number *
                          </label>
                          <input
                            value={tableNumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                            placeholder="e.g. 12"
                            className={inputCls(errors.tableNumber)}
                          />
                          {errors.tableNumber && (
                            <p className="text-red-400 text-[11px] mt-1">{errors.tableNumber}</p>
                          )}
                          <p className="text-[10px] text-charcoal/40 dark:text-cream/40 mt-1">
                            Find your table number written on the stand on your table.
                          </p>
                        </motion.div>
                      )}

                      {serviceType === 'takeaway' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-2"
                        >
                          <label className="block text-xs font-bold uppercase tracking-wider text-coffee dark:text-beige mb-2">
                            Estimated Pickup Time *
                          </label>
                          <input
                            type="time"
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                            className={inputCls(errors.pickupTime)}
                          />
                          {errors.pickupTime && (
                            <p className="text-red-400 text-[11px] mt-1">{errors.pickupTime}</p>
                          )}
                          <p className="text-[10px] text-charcoal/40 dark:text-cream/40 mt-1">
                            We will ensure the food is hot and ready at this time!
                          </p>
                        </motion.div>
                      )}

                      {serviceType === 'delivery' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-2"
                        >
                          <label className="block text-xs font-bold uppercase tracking-wider text-coffee dark:text-beige mb-2">
                            Delivery Address *
                          </label>
                          <textarea
                            rows={3}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Provide your complete building name, apartment number, and landmark..."
                            className={inputCls(errors.address) + ' resize-none'}
                          />
                          {errors.address && (
                            <p className="text-red-400 text-[11px] mt-1">{errors.address}</p>
                          )}
                          <p className="text-[10px] text-charcoal/40 dark:text-cream/40 mt-1">
                            Delivery is currently available within a 5km radius of Santaji Nagar, Bhandara.
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* STEP 3: Summary & Final checkout */}
                  {step === 3 && (
                    <motion.div
                      key="summary-step"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -25 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-5"
                    >
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-coffee/8 flex items-center justify-center mx-auto mb-3">
                          <ClipboardList className="w-5 h-5 text-coffee" />
                        </div>
                        <h2 className="font-display text-xl font-bold text-coffee dark:text-beige">Confirm Order</h2>
                        <p className="text-xs text-charcoal/50 dark:text-cream/50 mt-1">
                          Review your items and complete payment setup
                        </p>
                      </div>

                      {/* Items summary list */}
                      <div className="max-h-40 overflow-y-auto border border-coffee/10 dark:border-beige/10 rounded-2xl divide-y divide-coffee/5 dark:divide-beige/5 bg-white/40 dark:bg-neutral-900/30 pr-1">
                        {items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center px-4 py-2 text-xs">
                            <span className="font-medium text-charcoal/80 dark:text-cream/70 flex flex-col">
                              <span>{item.quantity}x {item.name}</span>
                              {item.customization && (
                                <span className="text-[10px] text-charcoal/40 dark:text-cream/30 italic mt-0.5">
                                  {item.customization}
                                </span>
                              )}
                            </span>
                            <span className="font-bold text-coffee dark:text-beige">
                              ₹{item.price * item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Price Calculations */}
                      <div className="p-4 rounded-2xl bg-coffee/5 dark:bg-beige/5 border border-coffee/10 dark:border-beige/10 space-y-1.5 text-xs text-charcoal/65 dark:text-cream/60">
                        <div className="flex justify-between">
                          <span>Items Subtotal</span>
                          <span className="font-semibold text-charcoal dark:text-cream">₹{totalPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>CGST/SGST Tax (5%)</span>
                          <span className="font-semibold text-charcoal dark:text-cream">
                            ₹{Math.round(totalPrice * 0.05)}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-coffee/10 dark:border-beige/10 pt-2 text-sm font-bold text-coffee dark:text-beige">
                          <span>Grand Total</span>
                          <span>₹{Math.round(totalPrice * 1.05)}</span>
                        </div>
                      </div>

                      {/* Payment Method Option */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-coffee dark:text-beige mb-3">
                          Payment Method
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'upi', label: 'UPI / GPay', icon: CreditCard },
                            { id: 'cash', label: 'Cash', icon: Utensils },
                            { id: 'card', label: 'Card Swipe', icon: CreditCard }
                          ].map((pay) => (
                            <button
                              key={pay.id}
                              type="button"
                              onClick={() => setPaymentMethod(pay.id as any)}
                              className={`flex flex-col items-center p-2.5 rounded-xl border text-[10px] font-bold gap-1.5 transition-all ${
                                paymentMethod === pay.id
                                  ? 'bg-coffee text-cream border-coffee shadow-md'
                                  : 'border-coffee/10 dark:border-beige/10 text-charcoal/70 dark:text-cream/60 hover:border-coffee/20'
                              }`}
                            >
                              <pay.icon className="w-3.5 h-3.5" />
                              {pay.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Special cooking notes */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-coffee dark:text-beige mb-2">
                          Cooking Instructions / Notes
                        </label>
                        <textarea
                          rows={2.5}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="e.g. Make it extra spicy, no onions, pack sauces separately..."
                          className={inputCls() + ' resize-none'}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Window Navigation Actions */}
                <div className="flex gap-3 mt-6 sm:mt-8">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl border border-coffee/20 text-coffee dark:text-beige font-semibold text-sm hover:bg-coffee/6 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                  )}

                  {step < 3 ? (
                    <motion.button
                      type="button"
                      onClick={handleNext}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-coffee hover:bg-terracotta text-cream font-bold rounded-xl text-sm transition-colors shadow-lg shadow-coffee/10 cursor-pointer"
                    >
                      Continue <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-coffee hover:bg-terracotta text-cream font-bold rounded-xl text-sm transition-colors shadow-lg shadow-coffee/10 disabled:opacity-60 cursor-pointer"
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full"
                        />
                      ) : (
                        <>
                          <MessageSquare className="w-4 h-4" /> Confirm & Send Order
                        </>
                      )}
                    </motion.button>
                  )}
                </div>

                <p className="text-center text-[9px] text-charcoal/35 dark:text-cream/30 mt-3">
                  {step < 3 ? `Step ${step} of 3` : 'WhatsApp message compiles details automatically'}
                </p>
              </form>
            </div>

            {/* Bottom bar */}
            <div className="px-6 py-2.5 bg-coffee/3 dark:bg-beige/3 border-t border-coffee/10 dark:border-beige/10 flex justify-between items-center text-[9px] text-charcoal/45 dark:text-cream/40">
              <span>🚀 Dine-in, Takeaway & Delivery</span>
              <span>💵 Tax Included • Confirmed Instantly</span>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
