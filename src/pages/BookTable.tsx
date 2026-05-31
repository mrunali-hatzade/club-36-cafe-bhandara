import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarDays, Clock, Users, ChevronDown, CheckCircle2,
  ArrowRight, ArrowLeft, Coffee, MapPin, Utensils, Star,
  Phone, User, Mail, MessageSquare, Sparkles, ChevronRight, X
} from 'lucide-react';

/* ─── Data ─────────────────────────────────────────── */
const timeSlots = [
  '10:00 AM','10:30 AM','11:00 AM','11:30 AM',
  '12:00 PM','12:30 PM','01:00 PM','01:30 PM',
  '02:00 PM','02:30 PM','03:00 PM','03:30 PM',
  '04:00 PM','04:30 PM','05:00 PM','05:30 PM',
  '06:00 PM','06:30 PM','07:00 PM','07:30 PM',
  '08:00 PM','08:30 PM','09:00 PM','09:30 PM',
  '10:00 PM','10:30 PM',
];

const occasions = [
  { label: 'Birthday 🎂', value: 'Birthday' },
  { label: 'Anniversary 💕', value: 'Anniversary' },
  { label: 'Business Meeting 💼', value: 'Business Meeting' },
  { label: 'Family Gathering 👨‍👩‍👧', value: 'Family Gathering' },
  { label: 'Date Night 🌹', value: 'Date Night' },
  { label: 'Friends Meetup 🎉', value: 'Friends Meetup' },
  { label: 'Farewell Party 🙌', value: 'Farewell Party' },
  { label: 'Just Visiting ☕', value: 'Just Visiting' },
];

const seating = [
  { label: 'Indoor – AC Hall', icon: '❄️' },
  { label: 'Window Side', icon: '🪟' },
  { label: 'Outdoor Terrace', icon: '🌿' },
  { label: 'Private Corner', icon: '🕯️' },
  { label: 'Any Available', icon: '✨' },
];

type Step = 1 | 2 | 3;
interface Form {
  name: string; phone: string; email: string;
  date: string; time: string; guests: number;
  occasion: string; seating: string; requests: string;
}

/* ─── Step Indicator ────────────────────────────────── */
function Steps({ step }: { step: Step }) {
  const labels = ['Your Details', 'Date & Time', 'Preferences'];
  return (
    <div className="flex items-center justify-center gap-0 mb-6 sm:mb-8">
      {labels.map((label, i) => {
        const n = (i + 1) as Step;
        const done = step > n;
        const active = step === n;
        return (
          <div key={n} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                animate={{ scale: active ? 1.08 : 1 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                  done ? 'bg-green-500 border-green-500 text-white' :
                  active ? 'bg-coffee border-coffee text-cream' :
                  'bg-transparent border-coffee/20 text-charcoal/30 dark:text-cream/30'
                }`}
              >
                {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : n}
              </motion.div>
              <span className={`text-[9px] sm:text-[10px] font-semibold whitespace-nowrap ${active ? 'text-coffee dark:text-beige' : 'text-charcoal/40 dark:text-cream/30'}`}>
                {label}
              </span>
            </div>
            {i < 2 && (
              <div className={`w-12 sm:w-20 h-[2px] mx-1 sm:mx-2 mb-4 rounded-full transition-all duration-500 ${done ? 'bg-green-500' : 'bg-coffee/10 dark:bg-beige/10'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Main Component ────────────────────────────────── */
export default function BookTable() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<Form>({
    name: '', phone: '', email: '',
    date: '', time: '', guests: 2,
    occasion: '', seating: 'Any Available', requests: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});

  const today = new Date().toISOString().split('T')[0];
  const set = (k: keyof Form, v: string | number) => {
    setForm(p => ({ ...p, [k]: v }));
    setErrors(p => ({ ...p, [k]: undefined }));
  };

  const handleClose = () => {
    navigate('/');
  };

  /* Validation per step */
  const validateStep = (s: Step) => {
    const e: typeof errors = {};
    if (s === 1) {
      if (!form.name.trim()) e.name = 'Name is required';
      if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) e.phone = 'Valid 10-digit phone required';
    }
    if (s === 2) {
      if (!form.date) e.date = 'Please choose a date';
      if (!form.time) e.time = 'Please select a time';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep(step)) setStep(s => (s + 1) as Step); };
  const back = () => setStep(s => (s - 1) as Step);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    setLoading(true);
    const msg =
`🍽️ *Table Reservation — Club 26 Cafe, Bhandara*

👤 *Name:* ${form.name}
📞 *Phone:* ${form.phone}${form.email ? `\n📧 *Email:* ${form.email}` : ''}
📅 *Date:* ${form.date}
⏰ *Time:* ${form.time}
👥 *Guests:* ${form.guests}
🎉 *Occasion:* ${form.occasion || 'Not specified'}
🪑 *Seating:* ${form.seating}${form.requests ? `\n📝 *Requests:* ${form.requests}` : ''}

Please confirm my reservation. Thank you! 🙏`;
    setTimeout(() => {
      window.open(`https://wa.me/919527113636?text=${encodeURIComponent(msg)}`, '_blank');
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const inputCls = (err?: string) =>
    `w-full px-4 py-3 rounded-2xl border text-sm font-medium transition-all bg-white/70 dark:bg-neutral-900/50 text-charcoal dark:text-cream placeholder:text-charcoal/30 dark:placeholder:text-cream/35 outline-none focus:ring-2 backdrop-blur-xs ${
      err ? 'border-red-400 focus:ring-red-100' : 'border-coffee/12 dark:border-beige/12 focus:border-coffee dark:focus:border-beige focus:ring-coffee/10 dark:focus:ring-beige/10'
    }`;

  /* ── Success ── */
  if (submitted) return (
    <div className="min-h-screen bg-cream/90 dark:bg-neutral-950/90 relative flex items-center justify-center py-12 px-4 sm:px-6">
      {/* Immersive Blurred Cafe Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1920" 
          alt="Cafe Backdrop" 
          className="w-full h-full object-cover blur-md scale-105 opacity-40 dark:opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-coffee/20 via-cream/50 to-coffee/10 dark:from-neutral-950 dark:via-neutral-900/60 dark:to-neutral-950/40" />
      </div>

      <motion.div initial={{ scale:.8, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ type:'spring', damping:18 }} className="relative max-w-md w-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border border-coffee/12 dark:border-beige/12 p-8 rounded-3xl text-center shadow-2xl z-10">
        <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:.15, type:'spring' }}
          className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-950/30 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-200/20">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </motion.div>
        <h2 className="font-display text-2xl font-extrabold text-coffee dark:text-beige mb-3">Reservation Sent! 🎉</h2>
        <p className="text-xs text-charcoal/60 dark:text-cream/60 mb-5 leading-relaxed">Your booking request has been sent to our team on WhatsApp. We will confirm your table shortly!</p>
        
        <div className="p-4 rounded-2xl bg-coffee/5 dark:bg-beige/5 border border-coffee/10 text-left space-y-1.5 mb-6 text-xs text-charcoal/70 dark:text-cream/60">
          <p className="font-bold text-coffee dark:text-beige">📋 Booking Summary</p>
          <p>👤 {form.name} &nbsp;·&nbsp; 📅 {form.date} &nbsp;·&nbsp; ⏰ {form.time}</p>
          <p>👥 {form.guests} guests &nbsp;·&nbsp; 🪑 {form.seating}</p>
        </div>

        <div className="flex flex-col gap-2">
          <button 
            onClick={() => handleClose()}
            className="w-full py-3.5 bg-coffee hover:bg-terracotta text-cream rounded-xl font-bold text-sm transition-colors cursor-pointer"
          >
            Close Window
          </button>
          <button 
            onClick={() => { setSubmitted(false); setStep(1); setForm({ name:'',phone:'',email:'',date:'',time:'',guests:2,occasion:'',seating:'Any Available',requests:'' }); }}
            className="w-full py-3 border border-coffee/20 text-coffee dark:text-beige hover:bg-coffee/5 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
          >
            Make Another Reservation
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream/90 dark:bg-neutral-950/90 relative flex items-center justify-center py-12 px-4 sm:px-6">
      
      {/* Immersive Blurred Cafe Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1920" 
          alt="Cafe Backdrop" 
          className="w-full h-full object-cover blur-md scale-105 opacity-40 dark:opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-coffee/20 via-cream/50 to-coffee/10 dark:from-neutral-950 dark:via-neutral-900/60 dark:to-neutral-950/40" />
      </div>

      {/* Floating Interactive OS-Style Reservation Window */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="relative max-w-2xl w-full bg-white/90 dark:bg-neutral-900/85 backdrop-blur-xl rounded-3xl shadow-2xl border border-coffee/12 dark:border-beige/12 overflow-hidden z-10 flex flex-col max-h-[92vh]"
      >
        {/* Window Top Header Bar */}
        <div className="px-6 py-4 bg-coffee/5 dark:bg-beige/5 border-b border-coffee/10 dark:border-beige/10 flex items-center justify-between">
          {/* OS-Style Window Dots (macOS style) */}
          <div className="flex gap-2">
            <span onClick={handleClose} className="w-3.5 h-3.5 rounded-full bg-red-400/90 hover:bg-red-500 cursor-pointer transition-colors flex items-center justify-center text-[8px] text-red-950 font-bold group">
              <span className="opacity-0 group-hover:opacity-100">×</span>
            </span>
            <span className="w-3.5 h-3.5 rounded-full bg-amber-400/90 cursor-default" />
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-400/90 cursor-default" />
          </div>
          
          <div className="text-center flex-1">
            <span className="font-display font-bold text-xs tracking-wide text-coffee dark:text-beige uppercase">Table Reservation</span>
          </div>

          {/* Close X Button */}
          <button 
            onClick={handleClose} 
            className="p-1.5 rounded-lg hover:bg-coffee/8 dark:hover:bg-beige/8 text-charcoal/50 dark:text-cream/50 hover:text-terracotta dark:hover:text-terracotta transition-colors"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Content Section (Scrollable) */}
        <div className="overflow-y-auto flex-1 p-6 md:p-8">
          
          <Steps step={step} />

          <form onSubmit={submit}>
            <AnimatePresence mode="wait">

              {/* ── STEP 1: Personal Info ── */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity:0, x:25 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-25 }} transition={{ duration:.2 }} className="space-y-5">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-coffee/8 flex items-center justify-center mx-auto mb-3">
                      <User className="w-5 h-5 text-coffee" />
                    </div>
                    <h2 className="font-display text-xl font-bold text-coffee dark:text-beige">Tell us about you</h2>
                    <p className="text-xs text-charcoal/50 dark:text-cream/50 mt-1">We'll use this to send confirmation on WhatsApp</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-coffee dark:text-beige mb-2">Full Name *</label>
                    <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Priya Deshmukh" className={inputCls(errors.name)} />
                    {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-coffee dark:text-beige mb-2">Phone Number *</label>
                    <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="10-digit mobile number" maxLength={10} className={inputCls(errors.phone)} />
                    {errors.phone && <p className="text-red-400 text-[11px] mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-coffee dark:text-beige mb-2">Email <span className="text-charcoal/30 dark:text-cream/30 font-normal normal-case">(optional)</span></label>
                    <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" className={inputCls()} />
                  </div>

                  <div className="flex items-center gap-2 p-3.5 rounded-xl bg-green-500/10 dark:bg-green-950/20 border border-green-500/20">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <p className="text-xs text-green-700 dark:text-green-400">Your contact info is safe and will only be used to confirm this booking.</p>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 2: Date & Time ── */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity:0, x:25 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-25 }} transition={{ duration:.2 }} className="space-y-6">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-coffee/8 flex items-center justify-center mx-auto mb-3">
                      <CalendarDays className="w-5 h-5 text-coffee" />
                    </div>
                    <h2 className="font-display text-xl font-bold text-coffee dark:text-beige">When are you visiting?</h2>
                    <p className="text-xs text-charcoal/50 dark:text-cream/50 mt-1">Pick a date and your preferred time slot</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-coffee dark:text-beige mb-2">Date *</label>
                    <input type="date" min={today} value={form.date} onChange={e => set('date', e.target.value)} className={inputCls(errors.date)} />
                    {errors.date && <p className="text-red-400 text-[11px] mt-1">{errors.date}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-coffee dark:text-beige mb-3">Number of Guests</label>
                    <div className="flex items-center gap-4">
                      <button type="button" onClick={() => set('guests', Math.max(1, form.guests - 1))}
                        className="w-10 h-10 rounded-xl border border-coffee/15 hover:bg-coffee/8 text-coffee dark:text-beige font-bold text-lg flex items-center justify-center transition-colors cursor-pointer">−</button>
                      <div className="flex-1 text-center">
                        <span className="font-display text-3xl font-extrabold text-coffee dark:text-beige">{form.guests}</span>
                        <p className="text-[10px] text-charcoal/40 dark:text-cream/40 uppercase tracking-widest font-bold mt-0.5">guests</p>
                      </div>
                      <button type="button" onClick={() => set('guests', Math.min(30, form.guests + 1))}
                        className="w-10 h-10 rounded-xl border border-coffee/15 hover:bg-coffee/8 text-coffee dark:text-beige font-bold text-lg flex items-center justify-center transition-colors cursor-pointer">+</button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-coffee dark:text-beige mb-3">Preferred Time Slot *</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1">
                      {timeSlots.map(slot => (
                        <button key={slot} type="button" onClick={() => set('time', slot)}
                          className={`text-[11px] font-semibold py-2 rounded-xl border transition-all ${
                            form.time === slot
                              ? 'bg-coffee text-cream border-coffee shadow-lg shadow-coffee/20'
                              : 'border-coffee/12 dark:border-beige/12 text-charcoal/60 dark:text-cream/60 hover:border-terracotta hover:text-terracotta hover:bg-terracotta/5'
                          }`}>
                          {slot}
                        </button>
                      ))}
                    </div>
                    {errors.time && <p className="text-red-400 text-[11px] mt-1">{errors.time}</p>}
                  </div>
                </motion.div>
              )}

              {/* ── STEP 3: Preferences ── */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity:0, x:25 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-25 }} transition={{ duration:.2 }} className="space-y-6">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-coffee/8 flex items-center justify-center mx-auto mb-3">
                      <Utensils className="w-5 h-5 text-coffee" />
                    </div>
                    <h2 className="font-display text-xl font-bold text-coffee dark:text-beige">Customize your table</h2>
                    <p className="text-xs text-charcoal/50 dark:text-cream/50 mt-1">Help us prepare the perfect setup for you</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-coffee dark:text-beige mb-3">Occasion</label>
                    <div className="grid grid-cols-2 gap-2">
                      {occasions.map(o => (
                        <button key={o.value} type="button" onClick={() => set('occasion', o.value === form.occasion ? '' : o.value)}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold border text-left transition-all ${
                            form.occasion === o.value
                              ? 'bg-coffee text-cream border-coffee'
                              : 'border-coffee/12 dark:border-beige/12 text-charcoal/70 dark:text-cream/70 hover:border-terracotta hover:text-terracotta hover:bg-terracotta/5'
                          }`}>
                          {o.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-coffee dark:text-beige mb-3">Seating Preference</label>
                    <div className="grid grid-cols-2 gap-2">
                      {seating.map(s => (
                        <button key={s.label} type="button" onClick={() => set('seating', s.label)}
                          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                            form.seating === s.label
                              ? 'bg-coffee/10 border-coffee text-coffee dark:text-beige'
                              : 'border-coffee/10 dark:border-beige/10 text-charcoal/70 dark:text-cream/60 hover:border-coffee/25'
                          }`}>
                          <span className="text-sm">{s.icon}</span>
                          {s.label}
                          {form.seating === s.label && <CheckCircle2 className="w-3.5 h-3.5 text-coffee ml-auto" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-coffee dark:text-beige mb-2">Special Requests</label>
                    <textarea rows={2.5} value={form.requests} onChange={e => set('requests', e.target.value)}
                      placeholder="Birthday decor, kids high chair, dietary rules, quiet corner..."
                      className={inputCls() + ' resize-none'} />
                  </div>

                  {/* Summary preview */}
                  <div className="p-4 rounded-xl bg-coffee/5 dark:bg-beige/5 border border-coffee/10 dark:border-beige/10 space-y-1.5 text-xs text-charcoal/60 dark:text-cream/50">
                    <p className="font-bold text-coffee dark:text-beige mb-1.5">📋 Reservation Summary</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      <span>👤 {form.name}</span>
                      <span>📞 {form.phone}</span>
                      <span>📅 {form.date}</span>
                      <span>⏰ {form.time}</span>
                      <span>👥 {form.guests} guests</span>
                      <span>🪑 {form.seating}</span>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* ── Navigation Buttons ── */}
            <div className="flex gap-3 mt-6 sm:mt-8">
              {step > 1 && (
                <button type="button" onClick={back}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-coffee/20 text-coffee dark:text-beige font-semibold text-sm hover:bg-coffee/6 transition-colors cursor-pointer">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              )}

              {step < 3 ? (
                <motion.button type="button" onClick={next} whileTap={{ scale:.98 }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-coffee hover:bg-terracotta text-cream font-bold rounded-xl text-sm transition-colors shadow-lg shadow-coffee/10 cursor-pointer">
                  Continue <ArrowRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <motion.button type="submit" disabled={loading} whileTap={{ scale:.98 }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-coffee hover:bg-terracotta text-cream font-bold rounded-xl text-sm transition-colors shadow-lg shadow-coffee/10 disabled:opacity-60 cursor-pointer">
                  {loading ? (
                    <motion.div animate={{ rotate:360 }} transition={{ repeat:Infinity, duration:.8, ease:'linear' }}
                      className="w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full" />
                  ) : (
                    <><MessageSquare className="w-4 h-4" /> Send Request via WhatsApp</>
                  )}
                </motion.button>
              )}
            </div>

            <p className="text-center text-[10px] text-charcoal/35 dark:text-cream/30 mt-3.5">
              {step < 3 ? `Step ${step} of 3` : 'Instant confirmation via WhatsApp redirect'}
            </p>
          </form>
        </div>
        
        {/* Bottom Window Info Bar */}
        <div className="px-6 py-3 bg-coffee/3 dark:bg-beige/3 border-t border-coffee/10 dark:border-beige/10 flex justify-between items-center text-[10px] text-charcoal/45 dark:text-cream/40">
          <span>🕒 10:00 AM – 11:00 PM Daily</span>
          <span>📍 Santaji Nagar, Bhandara</span>
        </div>
      </motion.div>
    </div>
  );
}
