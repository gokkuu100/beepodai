import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, Brain, Globe, Shield, ChevronRight,
  Menu, X, Volume2, Wifi, Battery, Star,
  Zap, ArrowRight, BookOpen, Users, Languages, HelpCircle,
  Instagram, Twitter, Youtube
} from 'lucide-react';

// @ts-ignore
import beepodLogo from '@assets/Artboard_9_1786736859076.png';
// @ts-ignore
import beepodLogoWhite from '@assets/WHITE_LOGO__1786738581248.png';
// @ts-ignore
import beepodRobot from '@assets/hf_20260812_210333_7ca1e994-0af8-47de-96e1-fdfebe9398ff_1786735537941.png';

// ─── Brand Palette ───────────────────────────────────────────
const ESPRESSO   = '#1A0F00';   // Deep Espresso (primary dark)
const BEE_ORANGE = '#FF9A00';   // Bee Orange
const AMBER_GLOW = '#F57C00';   // Amber Glow
const WHITE      = '#FFFFFF';
const CREAM      = '#FFFDF5';
const WARM_WHITE = '#FFF8F0';
const CARD_DARK  = '#261600';   // slightly lighter espresso for cards on dark
const CARD_LIGHT = '#FFF3E0';   // warm tinted card on white sections

const MUTED_DARK  = 'rgba(255,248,240,0.55)';
const MUTED_LIGHT = 'rgba(26,15,0,0.5)';
const BORDER_DARK  = 'rgba(255,154,0,0.12)';
const BORDER_LIGHT = 'rgba(26,15,0,0.08)';

// ─── Reusable animation variants ─────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

// ─── Amber CTA button ────────────────────────────────────────
function AmberButton({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2.5 text-black font-display font-bold text-[15px] px-8 py-4 rounded-2xl ${className}`}
      style={{
        background: `linear-gradient(135deg, ${AMBER_GLOW}, ${BEE_ORANGE})`,
        boxShadow: `0 0 40px rgba(255,154,0,0.3)`,
      }}
    >
      {children}
    </motion.a>
  );
}

// ─── Root ────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden font-sans antialiased selection:bg-amber-400 selection:text-black">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureStrip />
        <HowItWorksSection />
        <ProductShowcase />
        <WhoIsItForSection />
        <SpecsSection />
        <FounderSection />
        <PreOrderSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

// ─── Navbar ──────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50"
      >
        <div className="mx-4 mt-4 max-w-6xl xl:mx-auto">
          <div
            className="rounded-2xl px-5 py-3 flex items-center justify-between transition-all duration-300"
            style={{
              background: WHITE,
              backdropFilter: 'blur(20px)',
              border: `1px solid rgba(26,15,0,0.08)`,
              boxShadow: scrolled ? `0 4px 24px rgba(0,0,0,0.12)` : `0 2px 12px rgba(0,0,0,0.06)`,
            }}
          >
            {/* Desktop Left */}
            <nav className="hidden md:flex items-center gap-7 w-56">
              {[['Product', '#product'], ['How It Works', '#howitworks']].map(([label, href]) => (
                <a key={label} href={href}
                  className="text-[13px] font-semibold tracking-wide transition-colors"
                  style={{ color: MUTED_LIGHT }}
                  onMouseEnter={e => (e.currentTarget.style.color = ESPRESSO)}
                  onMouseLeave={e => (e.currentTarget.style.color = MUTED_LIGHT)}
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button className="md:hidden p-1.5" style={{ color: MUTED_LIGHT }} onClick={() => setMobileOpen(v => !v)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo — centered, white bg so white logo shows directly */}
            <div className="flex-1 md:flex-none flex justify-center">
              <img src={beepodLogoWhite} alt="BeePod" className="h-10 md:h-12 w-auto object-contain" />
            </div>

            {/* Desktop Right */}
            <nav className="hidden md:flex items-center gap-7 w-56 justify-end">
              {[['Story', '#story'], ['Specs', '#specs']].map(([label, href]) => (
                <a key={label} href={href}
                  className="text-[13px] font-semibold tracking-wide transition-colors"
                  style={{ color: MUTED_LIGHT }}
                  onMouseEnter={e => (e.currentTarget.style.color = ESPRESSO)}
                  onMouseLeave={e => (e.currentTarget.style.color = MUTED_LIGHT)}
                >
                  {label}
                </a>
              ))}
              <motion.a href="#preorder" whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}
                className="text-[13px] font-bold tracking-wide px-5 py-2 rounded-xl text-black whitespace-nowrap"
                style={{ background: `linear-gradient(135deg, ${AMBER_GLOW}, ${BEE_ORANGE})` }}
              >
                Pre-Order
              </motion.a>
            </nav>

            {/* Mobile Pre-Order */}
            <motion.a href="#preorder" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="md:hidden text-[12px] font-bold px-4 py-2 rounded-xl text-black whitespace-nowrap"
              style={{ background: `linear-gradient(135deg, ${AMBER_GLOW}, ${BEE_ORANGE})` }}
            >
              Pre-Order
            </motion.a>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div key="mob" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
            className="fixed top-24 inset-x-4 z-40 rounded-2xl p-5 flex flex-col gap-4"
            style={{ background: CARD_DARK, border: `1px solid ${BORDER_DARK}` }}
          >
            {[['Product','#product'],['How It Works','#howitworks'],['Story','#story'],['Specs','#specs']].map(([l, h]) => (
              <a key={l} href={h} onClick={() => setMobileOpen(false)}
                className="text-base font-semibold py-2 border-b"
                style={{ color: WARM_WHITE, borderColor: BORDER_DARK }}
              >{l}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── SECTION 1: Hero ─────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: ESPRESSO }}>
      {/* Ambient glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, rgba(255,154,0,0.13) 0%, transparent 65%)` }} />
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: `linear-gradient(${BORDER_DARK} 1px, transparent 1px), linear-gradient(90deg, ${BORDER_DARK} 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center pt-28 pb-16 lg:pt-0 lg:pb-0 min-h-screen">
        {/* Left */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col justify-center z-10">
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 self-start">
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(255,154,0,0.12)', color: BEE_ORANGE, border: `1px solid rgba(255,154,0,0.25)` }}>
              Introducing BeePod
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp}
            className="font-display font-black leading-[0.92] tracking-tighter mb-6"
            style={{ color: WARM_WHITE }}>
            <span className="block text-[3.4rem] sm:text-[4.5rem] lg:text-[5rem] xl:text-[6rem]">MEET YOUR</span>
            <span className="block text-[3.4rem] sm:text-[4.5rem] lg:text-[5rem] xl:text-[6rem]">NEW AI</span>
            <span className="block text-[3.4rem] sm:text-[4.5rem] lg:text-[5rem] xl:text-[6rem]" style={{ color: BEE_ORANGE }}>
              COMPANION.
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-base sm:text-lg leading-relaxed mb-2 max-w-sm" style={{ color: MUTED_DARK }}>
            Small enough to stay by your side.<br />Smart enough to keep up.
          </motion.p>
          <motion.p variants={fadeUp} className="text-[12px] font-medium tracking-wide mb-8" style={{ color: 'rgba(255,248,240,0.3)' }}>
            Be one of the first to bring BeePod home.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
            <AmberButton href="#preorder">
              PRE-ORDER BEEPOD <ChevronRight className="w-4 h-4" />
            </AmberButton>
            <motion.a href="#howitworks" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2.5 font-display font-semibold text-[15px] px-8 py-4 rounded-2xl transition-colors"
              style={{ color: WARM_WHITE, border: `1px solid rgba(255,248,240,0.12)`, background: 'rgba(255,248,240,0.04)' }}>
              SEE HOW IT WORKS
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right — Robot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }} animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.25, type: 'spring', bounce: 0.2 }}
          className="relative hidden lg:flex items-center justify-center lg:h-screen"
        >
          <div className="absolute w-80 h-80 rounded-full"
            style={{ background: `radial-gradient(ellipse at center, rgba(255,154,0,0.18) 0%, transparent 70%)` }} />
          <motion.img src={beepodRobot} alt="BeePod AI Companion"
            className="relative z-10 w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg object-contain"
            style={{ maxHeight: '85vh', mixBlendMode: 'screen', filter: `drop-shadow(0 0 60px rgba(255,154,0,0.3))` }}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        <motion.div className="lg:hidden flex justify-center -mt-4"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}>
          <motion.img src={beepodRobot} alt="BeePod" className="w-52 sm:w-64 object-contain"
            style={{ mixBlendMode: 'screen', filter: `drop-shadow(0 0 40px rgba(255,154,0,0.25))` }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  );
}

// ─── SECTION 2: Feature Strip (WHITE bg) ─────────────────────
const features = [
  { icon: Mic,     label: 'AI Voice Chat',    desc: 'Talks and listens like a real friend' },
  { icon: Brain,   label: 'Learns & Adapts',  desc: 'Gets smarter with every conversation' },
  { icon: Globe,   label: 'Any Language',     desc: 'Speaks 50+ languages fluently' },
  { icon: Shield,  label: 'Kid-Safe',         desc: 'Private by design, no ads ever' },
];

function FeatureStrip() {
  return (
    <section style={{ background: WHITE, borderTop: `1px solid ${BORDER_LIGHT}`, borderBottom: `1px solid ${BORDER_LIGHT}` }}>
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-16">
        <motion.div variants={stagger} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, label, desc }) => (
            <motion.div key={label} variants={fadeUp} className="flex flex-col items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255,154,0,0.1)' }}>
                <Icon className="w-5 h-5" style={{ color: BEE_ORANGE }} />
              </div>
              <div>
                <p className="font-display font-bold text-sm" style={{ color: ESPRESSO }}>{label}</p>
                <p className="text-[13px] leading-relaxed mt-0.5" style={{ color: MUTED_LIGHT }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── SECTION 3: How It Works (ESPRESSO bg) ───────────────────
const steps = [
  { num: '01', label: 'YOU SPEAK',        icon: Mic,     desc: "Just say what's on your mind." },
  { num: '02', label: 'BEEPOD LISTENS',   icon: Volume2, desc: 'Far-field mics pick you up instantly.' },
  { num: '03', label: 'AI PROCESSES',     icon: Brain,   desc: 'Cloud AI or on-device intelligence takes over.' },
  { num: '04', label: 'BEEPOD RESPONDS',  icon: Zap,     desc: 'A helpful, friendly answer every time.' },
];

function HowItWorksSection() {
  return (
    <section id="howitworks" style={{ background: ESPRESSO, borderTop: `1px solid ${BORDER_DARK}` }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-36">
        <motion.div initial="hidden" whileInView="visible" variants={stagger}
          viewport={{ once: true, margin: '-80px' }} className="mb-16 lg:mb-24">
          <motion.span variants={fadeUp} className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-4"
            style={{ color: BEE_ORANGE }}>
            How It Works
          </motion.span>
          <motion.h2 variants={fadeUp}
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"
            style={{ color: WARM_WHITE }}>
            JUST TALK<br />TO BEEPOD.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-base max-w-sm" style={{ color: MUTED_DARK }}>
            Internet can enhance BeePod's AI experience and capabilities.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-6 relative">
          {steps.map(({ num, label, icon: Icon, desc }, i) => (
            <motion.div key={num}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col"
            >
              {/* Connector arrow */}
              {i < steps.length - 1 && (
                <div className="absolute hidden md:flex items-center top-10 left-[calc(100%+4px)] w-8 z-10">
                  <motion.div className="w-full h-px" style={{ background: `linear-gradient(90deg, ${BEE_ORANGE}, transparent)` }}
                    initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.12 + 0.4 }}
                  />
                </div>
              )}

              <div className="p-6 rounded-3xl flex flex-col gap-4 h-full"
                style={{ background: CARD_DARK, border: `1px solid ${BORDER_DARK}` }}>
                <span className="font-display font-black text-4xl leading-none"
                  style={{ color: 'rgba(255,154,0,0.2)' }}>
                  {num}
                </span>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(255,154,0,0.12)' }}>
                  <Icon className="w-5 h-5" style={{ color: BEE_ORANGE }} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-[13px] tracking-[0.1em] mb-2"
                    style={{ color: BEE_ORANGE }}>{label}</h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: MUTED_DARK }}>{desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Robot in process */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-16 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full"
              style={{ background: `radial-gradient(ellipse at center, rgba(255,154,0,0.12) 0%, transparent 70%)` }} />
            <motion.img src={beepodRobot} alt="BeePod" className="w-40 sm:w-56 relative z-10 object-contain"
              style={{ mixBlendMode: 'screen', filter: `drop-shadow(0 0 30px rgba(255,154,0,0.2))` }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── SECTION 4: Product Showcase (WHITE bg) ──────────────────
const angles = ['FRONT', '45° FRONT', 'SIDE', 'BACK', '45° REAR'];
const angleTransforms: Record<string, string> = {
  'FRONT':    'perspective(800px) rotateY(0deg)',
  '45° FRONT':'perspective(800px) rotateY(-20deg)',
  'SIDE':     'perspective(800px) rotateY(-45deg)',
  'BACK':     'perspective(800px) rotateY(-160deg) scaleX(-1)',
  '45° REAR': 'perspective(800px) rotateY(-135deg) scaleX(-1)',
};

function ProductShowcase() {
  const [active, setActive] = useState('FRONT');

  return (
    <section id="product" style={{ background: WHITE, borderTop: `1px solid ${BORDER_LIGHT}` }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-36">
        {/* Headline */}
        <motion.div initial="hidden" whileInView="visible" variants={stagger}
          viewport={{ once: true, margin: '-80px' }} className="text-center mb-16">
          <motion.span variants={fadeUp} className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-4"
            style={{ color: BEE_ORANGE }}>
            The Device
          </motion.span>
          <motion.h2 variants={fadeUp}
            className="font-display font-black text-5xl sm:text-6xl lg:text-8xl tracking-tighter"
            style={{ color: ESPRESSO }}>
            MEET BEEPOD.
          </motion.h2>
        </motion.div>

        {/* Gallery */}
        <div className="flex flex-col items-center gap-10">
          {/* Angle tabs */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="flex flex-wrap justify-center gap-2">
            {angles.map(a => (
              <button key={a} onClick={() => setActive(a)}
                className="text-[11px] font-bold tracking-[0.1em] px-4 py-2 rounded-full transition-all duration-300"
                style={{
                  background: active === a ? `linear-gradient(135deg, ${AMBER_GLOW}, ${BEE_ORANGE})` : CARD_LIGHT,
                  color: active === a ? '#000' : MUTED_LIGHT,
                  border: `1px solid ${active === a ? 'transparent' : BORDER_LIGHT}`,
                }}>
                {a}
              </button>
            ))}
          </motion.div>

          {/* Robot render */}
          <div className="relative flex items-center justify-center h-72 sm:h-96">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full"
                style={{ background: `radial-gradient(ellipse at center, rgba(255,154,0,0.07) 0%, transparent 70%)` }} />
            </div>
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={beepodRobot}
                alt={`BeePod — ${active}`}
                className="h-full object-contain relative z-10"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ transform: angleTransforms[active], transition: 'transform 0.5s ease' }}
              />
            </AnimatePresence>
          </div>

          {/* Sub-headline */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center max-w-lg">
            <h3 className="font-display font-black text-2xl sm:text-3xl mb-3" style={{ color: ESPRESSO }}>
              MADE TO BE YOUR COMPANION.
            </h3>
            <p className="text-[16px] leading-relaxed" style={{ color: MUTED_LIGHT }}>
              Expressive, approachable and always ready to help.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 5: Who Is It For (ESPRESSO bg) ──────────────────
const audiences = [
  { icon: BookOpen,  title: 'KIDS & LEARNING',          desc: 'Homework help, questions, stories and discovery.' },
  { icon: Users,     title: 'FAMILIES',                  desc: 'A friendly AI companion for everyday interaction.' },
  { icon: Languages, title: 'LANGUAGE & TRANSLATION',    desc: 'Communicate, learn and explore different languages.' },
  { icon: HelpCircle,title: 'EVERYDAY ASSISTANCE',       desc: 'Ask questions, get information, brainstorm and interact.' },
];

function WhoIsItForSection() {
  return (
    <section style={{ background: ESPRESSO, borderTop: `1px solid ${BORDER_DARK}` }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-36">
        <motion.div initial="hidden" whileInView="visible" variants={stagger}
          viewport={{ once: true, margin: '-80px' }} className="mb-16">
          <motion.span variants={fadeUp} className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-4"
            style={{ color: BEE_ORANGE }}>
            Who It's For
          </motion.span>
          <motion.h2 variants={fadeUp}
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"
            style={{ color: WARM_WHITE }}>
            MADE FOR<br />CURIOUS MINDS.
          </motion.h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {audiences.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="p-7 rounded-3xl flex flex-col gap-5 group hover:border-amber-400 transition-colors duration-300"
              style={{ background: CARD_DARK, border: `1px solid ${BORDER_DARK}` }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(255,154,0,0.1)' }}>
                <Icon className="w-6 h-6" style={{ color: BEE_ORANGE }} />
              </div>
              <div>
                <h3 className="font-display font-bold text-[13px] tracking-[0.1em] mb-2"
                  style={{ color: BEE_ORANGE }}>{title}</h3>
                <p className="text-[14px] leading-relaxed" style={{ color: MUTED_DARK }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 6: Specs (WHITE bg) ─────────────────────────────
const specs = [
  { label: 'MCU',          value: 'ESP32-WROOM-32' },
  { label: 'Display',      value: '1.8" ST7735S LCD' },
  { label: 'Microphone',   value: 'I2S MEMS (INMP441)' },
  { label: 'Speaker',      value: 'MAX98357A + 3W' },
  { label: 'Connectivity', value: 'Wi-Fi + Bluetooth' },
  { label: 'Storage',      value: 'MicroSD (Optional)' },
  { label: 'Power',        value: '18650 (2000mAh)' },
  { label: 'Charging',     value: 'USB-C' },
  { label: 'Size',         value: '90 × 70 × 60mm' },
  { label: 'Weight',       value: '~220g' },
];

function SpecsSection() {
  return (
    <section id="specs" style={{ background: CREAM, borderTop: `1px solid ${BORDER_LIGHT}` }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-36">
        <motion.div initial="hidden" whileInView="visible" variants={stagger}
          viewport={{ once: true, margin: '-80px' }} className="mb-14">
          <motion.span variants={fadeUp} className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-4"
            style={{ color: BEE_ORANGE }}>
            Specifications
          </motion.span>
          <motion.h2 variants={fadeUp}
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl"
            style={{ color: ESPRESSO }}>
            INSIDE BEEPOD.
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" variants={stagger}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px"
          style={{ background: BORDER_LIGHT, borderRadius: '20px', overflow: 'hidden' }}>
          {specs.map(({ label, value }) => (
            <motion.div key={label} variants={fadeUp}
              className="p-6 flex flex-col gap-1.5"
              style={{ background: WHITE }}>
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: BEE_ORANGE }}>
                {label}
              </span>
              <span className="font-display font-semibold text-[14px]" style={{ color: ESPRESSO }}>
                {value}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── SECTION 7: Founder Story (ESPRESSO bg) ──────────────────
function FounderSection() {
  return (
    <section id="story" style={{ background: ESPRESSO, borderTop: `1px solid ${BORDER_DARK}` }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-24 lg:py-36">
        <motion.div initial="hidden" whileInView="visible" variants={stagger}
          viewport={{ once: true, margin: '-80px' }}>
          <motion.span variants={fadeUp} className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-6"
            style={{ color: BEE_ORANGE }}>
            The Story
          </motion.span>

          <motion.h2 variants={fadeUp}
            className="font-display font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-12"
            style={{ color: WARM_WHITE }}>
            FROM A LEMONADE STAND<br />
            <span style={{ color: BEE_ORANGE }}>TO AN AI REVOLUTION.</span>
          </motion.h2>

          {/* Story blocks */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div variants={stagger} className="space-y-6 text-[17px] leading-[1.8]"
              style={{ color: MUTED_DARK }}>
              <motion.p variants={fadeUp}>
                The story of BeePod begins with{' '}
                <span style={{ color: WARM_WHITE, fontWeight: 600 }}>Malya</span>
                {' '}— just 8 years old. She was selling lemonade with her friends when they fired her from her own stand.
              </motion.p>
              <motion.p variants={fadeUp}>
                Instead of giving up, she made a decision:
              </motion.p>
              <motion.blockquote variants={fadeUp}
                className="pl-5 py-1 italic font-display font-semibold text-xl sm:text-2xl"
                style={{ color: BEE_ORANGE, borderLeft: `3px solid ${BEE_ORANGE}` }}>
                "I'll build my own business — and it'll be bigger than the lemonade stand."
              </motion.blockquote>
            </motion.div>

            <motion.div variants={stagger} className="space-y-6 text-[17px] leading-[1.8]"
              style={{ color: MUTED_DARK }}>
              <motion.p variants={fadeUp}>
                Through her inventing school, Malya discovered AI learning bots — but they were far too expensive for most families.
              </motion.p>
              <motion.p variants={fadeUp}>
                She believed{' '}
                <span style={{ color: WARM_WHITE, fontWeight: 600 }}>every kid deserved a brilliant, patient learning companion</span>
                {' '}they could actually afford.
              </motion.p>
              <motion.p variants={fadeUp}>
                So she decided to build it herself.
              </motion.p>
            </motion.div>
          </div>

          {/* Founder badge */}
          <motion.div variants={fadeUp}
            className="mt-12 inline-flex items-center gap-4 px-6 py-4 rounded-2xl"
            style={{ background: CARD_DARK, border: `1px solid ${BORDER_DARK}` }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${AMBER_GLOW}, ${BEE_ORANGE})` }}>
              <Star className="w-5 h-5 text-black" />
            </div>
            <div>
              <p className="font-display font-bold text-sm" style={{ color: WARM_WHITE }}>
                Malya, Founder — Age 8
              </p>
              <p className="text-[12px]" style={{ color: MUTED_DARK }}>
                Kid-invented. Kid-approved. Built for every kid.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── SECTION 8: Pre-Order (WHITE bg) ─────────────────────────
function PreOrderSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email) setSubmitted(true);
  };

  const inputStyle = {
    background: CREAM,
    border: `1px solid ${BORDER_LIGHT}`,
    color: ESPRESSO,
    borderRadius: '14px',
    padding: '14px 18px',
    fontSize: '15px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <section id="preorder" style={{ background: WHITE, borderTop: `1px solid ${BORDER_LIGHT}` }}>
      <div className="max-w-4xl mx-auto px-6 py-24 lg:py-36">
        <motion.div initial="hidden" whileInView="visible" variants={stagger}
          viewport={{ once: true, margin: '-80px' }}>
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ background: 'rgba(255,154,0,0.08)', border: `1px solid rgba(255,154,0,0.2)` }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: BEE_ORANGE }} />
            <span className="text-[12px] font-bold tracking-[0.14em] uppercase" style={{ color: BEE_ORANGE }}>
              Early Access Open
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp}
            className="font-display font-black text-4xl sm:text-5xl lg:text-7xl leading-none tracking-tighter mb-4"
            style={{ color: ESPRESSO }}>
            BE ONE OF THE FIRST<br />
            <span style={{ color: BEE_ORANGE }}>TO MEET BEEPOD.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-[16px] leading-relaxed mb-12 max-w-xl"
            style={{ color: MUTED_LIGHT }}>
            BeePod is being built for curious minds, families and anyone who wants a smarter, friendlier way to interact with AI.
          </motion.p>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-start gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(255,154,0,0.1)', border: `1px solid rgba(255,154,0,0.25)` }}>
                  <Star className="w-7 h-7" style={{ color: BEE_ORANGE }} />
                </div>
                <h3 className="font-display font-black text-3xl" style={{ color: ESPRESSO }}>
                  You're on the list!
                </h3>
                <p className="text-[16px]" style={{ color: MUTED_LIGHT }}>
                  We'll reach out the moment BeePod is ready for you.
                </p>
              </motion.div>
            ) : (
              <motion.form key="form" variants={fadeUp} onSubmit={handleSubmit}
                className="grid sm:grid-cols-2 gap-4 max-w-xl">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold tracking-[0.12em] uppercase" style={{ color: MUTED_LIGHT }}>
                    Name
                  </label>
                  <input type="text" required placeholder="Your name" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = BEE_ORANGE)}
                    onBlur={e => (e.currentTarget.style.borderColor = BORDER_LIGHT)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold tracking-[0.12em] uppercase" style={{ color: MUTED_LIGHT }}>
                    Email
                  </label>
                  <input type="email" required placeholder="you@example.com" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = BEE_ORANGE)}
                    onBlur={e => (e.currentTarget.style.borderColor = BORDER_LIGHT)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold tracking-[0.12em] uppercase" style={{ color: MUTED_LIGHT }}>
                    Phone
                  </label>
                  <input type="tel" placeholder="+1 555 000 0000" value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = BEE_ORANGE)}
                    onBlur={e => (e.currentTarget.style.borderColor = BORDER_LIGHT)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold tracking-[0.12em] uppercase" style={{ color: MUTED_LIGHT }}>
                    Country
                  </label>
                  <input type="text" placeholder="United States" value={form.country}
                    onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = BEE_ORANGE)}
                    onBlur={e => (e.currentTarget.style.borderColor = BORDER_LIGHT)}
                  />
                </div>
                <div className="sm:col-span-2 mt-2">
                  <motion.button type="submit" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                    className="w-full inline-flex items-center justify-center gap-2 text-black font-display font-bold text-[15px] px-8 py-4 rounded-2xl"
                    style={{ background: `linear-gradient(135deg, ${AMBER_GLOW}, ${BEE_ORANGE})`, boxShadow: `0 0 40px rgba(255,154,0,0.25)` }}>
                    JOIN THE BEEPOD PRE-ORDER <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Final CTA (ESPRESSO + amber gradient) ───────────────────
function FinalCTA() {
  return (
    <section style={{ background: ESPRESSO, borderTop: `1px solid ${BORDER_DARK}` }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-36">
        <div className="grid lg:grid-cols-2 items-center gap-12">
          {/* Left: text */}
          <motion.div initial="hidden" whileInView="visible" variants={stagger}
            viewport={{ once: true, margin: '-80px' }}>
            <motion.h2 variants={fadeUp}
              className="font-display font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-tighter mb-10"
              style={{ color: WARM_WHITE }}>
              <span className="block">SMALL BOT.</span>
              <span className="block" style={{ color: BEE_ORANGE }}>BIG VOICE.</span>
              <span className="block">INFINITE</span>
              <span className="block">POSSIBILITIES.</span>
            </motion.h2>
            <motion.div variants={fadeUp}>
              <AmberButton href="#preorder">
                PRE-ORDER BEEPOD <ChevronRight className="w-4 h-4" />
              </AmberButton>
            </motion.div>
          </motion.div>

          {/* Right: Robot */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 sm:w-96 sm:h-96 rounded-full"
                style={{ background: `radial-gradient(ellipse at center, rgba(255,154,0,0.15) 0%, transparent 70%)` }} />
            </div>
            <motion.img src={beepodRobot} alt="BeePod"
              className="relative z-10 w-52 sm:w-72 lg:w-80 object-contain"
              style={{ mixBlendMode: 'screen', filter: `drop-shadow(0 0 60px rgba(255,154,0,0.35))` }}
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: ESPRESSO, borderTop: `1px solid ${BORDER_DARK}` }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl px-3 py-2 self-start">
              <img src={beepodLogo} alt="BeePod" className="h-9 w-auto object-contain" />
            </div>
            <p className="text-[13px] leading-relaxed max-w-[200px]" style={{ color: MUTED_DARK }}>
              Your smart AI companion. Built by a kid, for every kid.
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-bold tracking-[0.16em] uppercase mb-2" style={{ color: BEE_ORANGE }}>
              Navigation
            </p>
            {[['Product','#product'],['Features','#howitworks'],['How It Works','#howitworks'],['Specs','#specs'],['Story','#story'],['Pre-Order','#preorder']].map(([l,h]) => (
              <a key={l} href={h} className="text-[13px] font-medium transition-colors"
                style={{ color: MUTED_DARK }}
                onMouseEnter={e => (e.currentTarget.style.color = WARM_WHITE)}
                onMouseLeave={e => (e.currentTarget.style.color = MUTED_DARK)}
              >{l}</a>
            ))}
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-bold tracking-[0.16em] uppercase mb-2" style={{ color: BEE_ORANGE }}>
              Follow Along
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter,   label: 'Twitter/X' },
                { icon: Youtube,   label: 'YouTube' },
              ].map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                  style={{ background: CARD_DARK, border: `1px solid ${BORDER_DARK}`, color: MUTED_DARK }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = BEE_ORANGE; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,154,0,0.3)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = MUTED_DARK; (e.currentTarget as HTMLElement).style.borderColor = BORDER_DARK; }}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: `1px solid ${BORDER_DARK}` }}>
          <p className="text-[12px]" style={{ color: 'rgba(255,248,240,0.2)' }}>
            © 2025 BeePod. All rights reserved.
          </p>
          <p className="text-[12px]" style={{ color: 'rgba(255,248,240,0.2)' }}>
            Invented by Malya, age 8.
          </p>
        </div>
      </div>
    </footer>
  );
}
