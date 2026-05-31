import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin, Phone, Mail, Clock, MessageSquare, Compass,
  Send, Star, CheckCircle2, User, ArrowRight, Smile, ThumbsUp
} from 'lucide-react';

type Tab = 'contact' | 'feedback';

const brandInfo = {
  address: 'Sursuman Bhavan, Station Road, beside MedPlus, Santaji Ward, Santaji Nagar, Bhandara, Maharashtra 441904',
  phone: '+91 95271 13636',
  email: 'club26cafe.bhandara@gmail.com',
  hours: 'Monday – Sunday: 10:00 AM – 11:00 PM',
};

const feedbackCategories = ['Food Quality', 'Beverages', 'Service', 'Ambience', 'Cleanliness', 'Value for Money', 'Overall Experience'];

function StarRating({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1.5 py-1">
      {[1, 2, 3, 4, 5].map(i => (
        <motion.button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 0.9 }}
          className="focus:outline-none cursor-pointer"
        >
          <Star className={`w-8 h-8 transition-all duration-150 ${
            (hover || value) >= i 
              ? 'text-amber-400 fill-amber-400 drop-shadow-md' 
              : 'text-coffee/15 dark:text-beige/15 fill-transparent'
          }`} />
        </motion.button>
      ))}
      {value > 0 && (
        <motion.span 
          initial={{ opacity: 0, x: -10 }} 
          animate={{ opacity: 1, x: 0 }}
          className="ml-3 text-xs font-extrabold text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/10"
        >
          {['', 'Poor 😞', 'Fair 😐', 'Good 🙂', 'Great 😄', 'Amazing! 🤩'][value]}
        </motion.span>
      )}
    </div>
  );
}

export default function Contact() {
  const [activeTab, setActiveTab] = useState<Tab>('contact');

  // Contact form state
  const [contact, setContact] = useState({ name: '', phone: '', email: '', message: '' });
  const [contactSent, setContactSent] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  // Feedback form state
  const [feedback, setFeedback] = useState({ name: '', category: 'Overall Experience', rating: 0, comment: '', recommend: '' });
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  const inputCls = 'w-full px-4 py-3.5 rounded-xl border border-coffee/12 dark:border-beige/15 bg-white/70 dark:bg-neutral-900/50 text-sm text-charcoal dark:text-cream placeholder:text-charcoal/30 dark:placeholder:text-cream/35 focus:outline-none focus:border-terracotta dark:focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 dark:focus:ring-terracotta/20 transition-all shadow-xs backdrop-blur-xs';
  const labelCls = 'block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-coffee dark:text-beige mb-1.5';

  const sendContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.name || !contact.phone || !contact.message) return;
    setContactLoading(true);
    const msg = `📩 *Contact Us – Club 26 Cafe*\n\n👤 *Name:* ${contact.name}\n📞 *Phone:* ${contact.phone}\n📧 *Email:* ${contact.email || 'Not provided'}\n\n💬 *Message:*\n${contact.message}`;
    setTimeout(() => {
      setContactLoading(false);
      setContactSent(true);
      window.open(`https://wa.me/919527113636?text=${encodeURIComponent(msg)}`, '_blank');
    }, 1000);
  };

  const sendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.rating || !feedback.comment) return;
    setFeedbackLoading(true);
    const stars = '⭐'.repeat(feedback.rating);
    const msg = `⭐ *Customer Feedback – Club 26 Cafe*\n\n${feedback.name ? `👤 *Name:* ${feedback.name}\n` : ''}📋 *Category:* ${feedback.category}\n${stars} *Rating:* ${feedback.rating}/5\n\n💬 *Comments:*\n${feedback.comment}\n\n🤝 *Would Recommend:* ${feedback.recommend || 'Not answered'}`;
    setTimeout(() => {
      setFeedbackLoading(false);
      setFeedbackSent(true);
      window.open(`https://wa.me/919527113636?text=${encodeURIComponent(msg)}`, '_blank');
    }, 1000);
  };

  return (
    <section id="contact" className="pt-6 md:pt-8 pb-10 md:pb-14 border-t border-coffee/8 dark:border-beige/8">
      <div className="max-w-7xl mx-auto px-5 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-8 md:mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[2px] w-6 bg-terracotta" />
            <p className="text-xs font-bold tracking-widest uppercase text-terracotta">Get In Touch</p>
            <span className="h-[2px] w-6 bg-terracotta" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-coffee dark:text-beige mb-3">
            Contact & Feedback
          </h2>
          <p className="text-sm text-charcoal/60 dark:text-cream/60 font-light">
            We love hearing from you — send us a message or share your experience!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Info card */}
            <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-3xl border border-coffee/10 dark:border-beige/10 p-7 shadow-lg space-y-5">
              <h3 className="font-display font-bold text-xl text-coffee dark:text-beige">Club 26 Cafe</h3>

              {[
                { icon: MapPin, title: 'Address', content: brandInfo.address },
                { icon: Phone, title: 'Phone', content: brandInfo.phone, href: `tel:${brandInfo.phone.replace(/\s/g, '')}` },
                { icon: Mail, title: 'Email', content: brandInfo.email, href: `mailto:${brandInfo.email}` },
                { icon: Clock, title: 'Hours', content: brandInfo.hours },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-terracotta/10 flex items-center justify-center flex-shrink-0 border border-terracotta/15">
                    <item.icon className="w-4.5 h-4.5 text-terracotta" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-coffee/60 dark:text-beige/60 mb-0.5">{item.title}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-charcoal/80 dark:text-cream/80 hover:text-terracotta transition-colors">{item.content}</a>
                    ) : (
                      <p className="text-sm text-charcoal/80 dark:text-cream/80 leading-relaxed">{item.content}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-coffee/8 dark:border-beige/8 flex gap-3">
                <a href={`https://maps.google.com/?q=${encodeURIComponent(brandInfo.address)}`} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-coffee hover:bg-terracotta text-cream text-xs font-bold rounded-xl transition-colors">
                  <Compass className="w-4 h-4" /> Directions
                </a>
                <a href={`https://wa.me/919527113636`} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#25D366] hover:bg-[#1eac55] text-white text-xs font-bold rounded-xl transition-colors">
                  <MessageSquare className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-3xl overflow-hidden border border-coffee/10 dark:border-beige/10 shadow-md" style={{ height: 240 }}>
              <iframe
                src="https://maps.google.com/maps?q=sursuman%20Bhavan,%20Station%20road,%20beside%20MedPlus,%20Santaji%20Ward,%20Santaji%20Nagar,%20Bhandara,%20Maharashtra%20441904&t=&z=15&ie=UTF8&iwloc=&output=embed"
                title="Club 26 Location"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Right: Forms */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            {/* Tab switcher */}
            <div className="flex bg-coffee/6 dark:bg-beige/6 rounded-2xl p-1 mb-4 md:mb-6 border border-coffee/8 dark:border-beige/8 relative">
              {(['contact', 'feedback'] as Tab[]).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all z-10 cursor-pointer ${
                    activeTab === tab
                      ? 'text-coffee dark:text-beige'
                      : 'text-charcoal/50 dark:text-cream/50 hover:text-coffee dark:hover:text-beige'
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeContactTab"
                      className="absolute inset-0 bg-white dark:bg-neutral-800 rounded-xl shadow-md z-[-1]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {tab === 'contact' ? <><Send className="w-4 h-4" /> Contact Us</> : <><Smile className="w-4 h-4" /> Leave Feedback</>}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'contact' && (
                <motion.div key="contact" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                  {contactSent ? (
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center py-16">
                      <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="font-display text-2xl font-bold text-coffee dark:text-beige mb-2">Message Sent! 🎉</h3>
                      <p className="text-sm text-charcoal/60 dark:text-cream/60 mb-6">We'll get back to you within 24 hours.</p>
                      <button onClick={() => { setContactSent(false); setContact({ name:'',phone:'',email:'',message:'' }); }}
                        className="px-6 py-3 bg-coffee text-cream rounded-xl font-bold text-sm hover:bg-terracotta transition-colors">
                        Send Another
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={sendContact} className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-3xl border border-coffee/10 dark:border-beige/10 p-7 shadow-lg space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelCls}>Your Name *</label>
                          <input required placeholder="Full name" value={contact.name} onChange={e => setContact(p=>({...p,name:e.target.value}))} className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Phone Number *</label>
                          <input required placeholder="10-digit number" value={contact.phone} onChange={e => setContact(p=>({...p,phone:e.target.value}))} className={inputCls} />
                        </div>
                        <div className="sm:col-span-2">
                          <label className={labelCls}>Email (optional)</label>
                          <input type="email" placeholder="your@email.com" value={contact.email} onChange={e => setContact(p=>({...p,email:e.target.value}))} className={inputCls} />
                        </div>
                        <div className="sm:col-span-2">
                          <label className={labelCls}>Message *</label>
                          <textarea required rows={5} placeholder="Write your message, inquiry, or complaint here…" value={contact.message} onChange={e => setContact(p=>({...p,message:e.target.value}))} className={inputCls + ' resize-none'} />
                        </div>
                      </div>
                      <motion.button type="submit" disabled={contactLoading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-coffee hover:bg-terracotta text-cream font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors disabled:opacity-60 cursor-pointer">
                        {contactLoading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full" /> : <><Send className="w-4 h-4" /> Send via WhatsApp <ArrowRight className="w-4 h-4" /></>}
                      </motion.button>
                      <p className="text-center text-[11px] text-charcoal/35 dark:text-cream/30">Your message will be sent to our WhatsApp for a quick response</p>
                    </form>
                  )}
                </motion.div>
              )}

              {activeTab === 'feedback' && (
                <motion.div key="feedback" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                  {feedbackSent ? (
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center py-16">
                      <ThumbsUp className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                      <h3 className="font-display text-2xl font-bold text-coffee dark:text-beige mb-2">Thank You! 🙏</h3>
                      <p className="text-sm text-charcoal/60 dark:text-cream/60 mb-2">Your feedback helps us improve every day.</p>
                      <div className="text-2xl mb-6">{'⭐'.repeat(feedback.rating)}</div>
                      <button onClick={() => { setFeedbackSent(false); setFeedback({ name:'',category:'Overall Experience',rating:0,comment:'',recommend:'' }); }}
                        className="px-6 py-3 bg-coffee text-cream rounded-xl font-bold text-sm hover:bg-terracotta transition-colors">
                        Submit Another
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={sendFeedback} className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-3xl border border-coffee/10 dark:border-beige/10 p-7 shadow-lg space-y-5">

                      <div>
                        <label className={labelCls}>Your Name (optional)</label>
                        <input placeholder="Stay anonymous or share your name" value={feedback.name} onChange={e => setFeedback(p=>({...p,name:e.target.value}))} className={inputCls} />
                      </div>

                      <div>
                        <label className={labelCls}>Feedback Category</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {feedbackCategories.map(cat => (
                            <button key={cat} type="button" onClick={() => setFeedback(p=>({...p,category:cat}))}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                                feedback.category === cat 
                                  ? 'bg-coffee border-coffee text-cream dark:bg-beige dark:border-beige dark:text-charcoal shadow-sm scale-103 font-bold' 
                                  : 'border-coffee/10 dark:border-beige/10 bg-white/40 dark:bg-neutral-800/40 text-charcoal/70 dark:text-cream/70 hover:border-terracotta hover:text-terracotta hover:bg-white/60 dark:hover:bg-neutral-900/60'
                              }`}>
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className={labelCls}>Your Rating *</label>
                        <StarRating value={feedback.rating} onChange={r => setFeedback(p=>({...p,rating:r}))} />
                        {!feedback.rating && <p className="text-[11px] text-red-400 mt-1">Please select a rating</p>}
                      </div>

                      <div>
                        <label className={labelCls}>Your Comments *</label>
                        <textarea required rows={4} placeholder="Tell us what you loved or what we can do better…" value={feedback.comment} onChange={e => setFeedback(p=>({...p,comment:e.target.value}))} className={inputCls + ' resize-none'} />
                      </div>

                      <div>
                        <label className={labelCls}>Would you recommend us to friends?</label>
                        <div className="flex gap-3">
                          {['Definitely! 👍', 'Maybe 🤔', 'Not Really 👎'].map(opt => (
                            <button key={opt} type="button" onClick={() => setFeedback(p=>({...p,recommend:opt}))}
                              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all ${feedback.recommend === opt ? 'bg-coffee text-cream border-coffee' : 'border-coffee/15 dark:border-beige/15 text-charcoal/70 dark:text-cream/70 hover:border-terracotta'}`}>
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <motion.button type="submit" disabled={feedbackLoading || !feedback.rating} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer">
                        {feedbackLoading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" /> : <><Star className="w-4 h-4" /> Submit Feedback <ArrowRight className="w-4 h-4" /></>}
                      </motion.button>
                      <p className="text-center text-[11px] text-charcoal/35 dark:text-cream/30">Feedback is sent privately to our team via WhatsApp</p>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
