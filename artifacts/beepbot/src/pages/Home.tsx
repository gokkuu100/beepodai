import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Mic, Brain, Globe, Shield, ChevronRight,
  Menu, X, Volume2, Wifi, Battery, Star, Zap, ArrowRight
} from 'lucide-react';

// @ts-ignore
import beepodLogo from '@assets/Artboard_9_1786736859076.png';
// @ts-ignore
import beepodRobot from '@assets/hf_20260812_210333_7ca1e994-0af8-47de-96e1-fdfebe9398ff_1786735537941.png';

// ─── Design tokens ──────────────────────────────────────────
const AMBER = '#F5A623';
const AMBER_DARK = '#D97706';
const BG = '#09090E';
const SURFACE = '#111118';
const CARD = '#16161F';
const BORDER = 'rgba(255,255,255,0.07)';
const TEXT = '#F0EBE0';
const MUTED = 'rgba(240,235,224,0.5)';

// ─── Animation presets ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
  }
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } }
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
};

// ─── Root ────────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ background: BG, color: TEXT }} className="min-h-screen overflow-x-hidden font-sans antialiased selection:bg-amber-400 selection:text-black">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureStrip />
        <ProductSection />
        <HowItWorksSection />
        <FounderSection />
        <SpecsSection />
        <PreOrderSection />
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
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navLinks = {
    left: [
      { label: 'Product', href: '#product' },
      { label: 'How It Works', href: '#howitworks' },
    ],
    right: [
      { label: 'Story', href: '#story' },
      { label: 'Specs', href: '#specs' },
    ],
  };

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
              background: scrolled ? 'rgba(9,9,14,0.88)' : 'rgba(9,9,14,0.6)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${BORDER}`,
              boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.5)' : 'none',
            }}
          >
            {/* Desktop Left Nav */}
            <nav className="hidden md:flex items-center gap-7 w-48">
              {navLinks.left.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-[13px] font-semibold tracking-wide transition-colors"
                  style={{ color: MUTED }}
                  onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
                  onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* Mobile: hamburger */}
            <button
              className="md:hidden p-1.5 rounded-lg"
              style={{ color: MUTED }}
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo — always centered */}
            <div className="flex-1 md:flex-none flex justify-center">
              <div className="bg-white rounded-xl px-3 py-1.5">
                <img
                  src={beepodLogo}
                  alt="BeePod"
                  className="h-8 md:h-9 w-auto object-contain"
                />
              </div>
            </div>

            {/* Desktop Right Nav */}
            <nav className="hidden md:flex items-center gap-7 w-48 justify-end">
              {navLinks.right.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-[13px] font-semibold tracking-wide transition-colors"
                  style={{ color: MUTED }}
                  onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
                  onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
                >
                  {label}
                </a>
              ))}
              <motion.a
                href="#preorder"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="text-[13px] font-bold tracking-wide px-5 py-2 rounded-xl text-black"
                style={{ background: `linear-gradient(135deg, ${AMBER_DARK}, ${AMBER})` }}
              >
                Pre-Order
              </motion.a>
            </nav>

            {/* Mobile: Pre-Order */}
            <motion.a
              href="#preorder"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="md:hidden text-[12px] font-bold px-4 py-2 rounded-xl text-black"
              style={{ background: `linear-gradient(135deg, ${AMBER_DARK}, ${AMBER})` }}
            >
              Pre-Order
            </motion.a>
          </div>
        </div>
      </motion.header>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 inset-x-4 z-40 rounded-2xl p-5 flex flex-col gap-4"
            style={{ background: CARD, border: `1px solid ${BORDER}` }}
          >
            {[...navLinks.left, ...navLinks.right].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-semibold py-2 border-b"
                style={{ color: TEXT, borderColor: BORDER }}
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero ────────────────────────────────────────────────────
function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const robotY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: BG }}
    >
      {/* Ambient glow behind robot */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, rgba(245,166,35,0.12) 0%, transparent 70%)`,
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(${BORDER} 1px, transparent 1px), linear-gradient(90deg, ${BORDER} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center pt-28 pb-16 lg:pt-0 lg:pb-0 min-h-screen">

        {/* LEFT — Text content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{ y: textY }}
          className="flex flex-col justify-center z-10"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 self-start">
            <span
              className="text-[11px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(245,166,35,0.12)', color: AMBER, border: `1px solid rgba(245,166,35,0.2)` }}
            >
              Introducing BeePod
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-black leading-[0.92] tracking-tighter mb-6"
            style={{ color: TEXT }}
          >
            <span className="block text-[3.4rem] sm:text-[4.5rem] lg:text-[5rem] xl:text-[6rem]">MEET YOUR</span>
            <span className="block text-[3.4rem] sm:text-[4.5rem] lg:text-[5rem] xl:text-[6rem]">NEW AI</span>
            <span
              className="block text-[3.4rem] sm:text-[4.5rem] lg:text-[5rem] xl:text-[6rem]"
              style={{ color: AMBER }}
            >
              COMPANION.
            </span>
          </motion.h1>

          {/* Supporting copy */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg leading-relaxed mb-3 max-w-sm"
            style={{ color: MUTED }}
          >
            Small enough to stay by your side.
            <br />
            Smart enough to keep up.
          </motion.p>

          {/* Social proof micro-line */}
          <motion.p
            variants={fadeUp}
            className="text-[12px] font-medium tracking-wide mb-8"
            style={{ color: 'rgba(240,235,224,0.35)' }}
          >
            Be one of the first to bring BeePod home.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
            <motion.a
              href="#preorder"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2.5 text-black font-display font-bold text-[15px] px-8 py-4 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${AMBER_DARK}, ${AMBER})`,
                boxShadow: `0 0 32px rgba(245,166,35,0.3)`,
              }}
            >
              PRE-ORDER BEEPOD <ChevronRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#howitworks"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2.5 font-display font-semibold text-[15px] px-8 py-4 rounded-2xl transition-colors"
              style={{
                color: TEXT,
                border: `1px solid ${BORDER}`,
                background: 'rgba(255,255,255,0.04)',
              }}
            >
              SEE HOW IT WORKS
            </motion.a>
          </motion.div>
        </motion.div>

        {/* RIGHT — Robot render */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.25, type: 'spring', bounce: 0.2 }}
          style={{ y: robotY }}
          className="relative flex items-center justify-center lg:h-screen"
        >
          {/* Glow rings */}
          <div
            className="absolute w-72 h-72 rounded-full"
            style={{
              background: `radial-gradient(ellipse at center, rgba(245,166,35,0.15) 0%, transparent 70%)`,
            }}
          />
          {/* Robot */}
          <motion.img
            src={beepodRobot}
            alt="BeePod AI Companion"
            className="relative z-10 w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg object-contain"
            style={{
              maxHeight: '85vh',
              mixBlendMode: 'screen',
              filter: 'drop-shadow(0 0 60px rgba(245,166,35,0.25))',
            }}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Mobile robot */}
        <motion.div
          className="lg:hidden flex justify-center -mt-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <motion.img
            src={beepodRobot}
            alt="BeePod AI Companion"
            className="w-52 sm:w-64 object-contain"
            style={{ mixBlendMode: 'screen', filter: 'drop-shadow(0 0 40px rgba(245,166,35,0.2))' }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Feature Strip ────────────────────────────────────────────
const features = [
  { icon: Mic, label: 'AI Voice Chat', desc: 'Talks and listens like a real friend' },
  { icon: Brain, label: 'Learns & Adapts', desc: 'Gets smarter with every conversation' },
  { icon: Globe, label: 'Any Language', desc: 'Speaks 50+ languages fluently' },
  { icon: Shield, label: 'Kid-Safe', desc: 'Private by design, COPPA compliant' },
];

function FeatureStrip() {
  return (
    <section style={{ background: SURFACE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map(({ icon: Icon, label, desc }) => (
            <motion.div key={label} variants={fadeUp} className="flex flex-col items-start gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(245,166,35,0.12)' }}
              >
                <Icon className="w-5 h-5" style={{ color: AMBER }} />
              </div>
              <div>
                <p className="font-display font-bold text-sm" style={{ color: TEXT }}>{label}</p>
                <p className="text-[13px] leading-relaxed mt-0.5" style={{ color: MUTED }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Product Section ──────────────────────────────────────────
function ProductSection() {
  const callouts = [
    { icon: Volume2, title: 'Crystal-Clear Voice', body: "Far-field microphones pick up your child's voice from across the room." },
    { icon: Wifi, title: 'Always Connected', body: 'Fast Wi-Fi keeps BeePod ready to respond in under 200ms.' },
    { icon: Battery, title: '8-Hour Battery', body: 'Play all day on a single charge, with smart sleep mode.' },
    { icon: Zap, title: 'On-Device AI', body: 'Core responses run locally — fast, private, and offline-capable.' },
  ];

  return (
    <section id="product" style={{ background: BG }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-36">
        {/* Label */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-xl mb-16 lg:mb-24"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-4"
            style={{ color: AMBER }}
          >
            The Device
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5"
            style={{ color: TEXT }}
          >
            Designed to<br />delight.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg leading-relaxed" style={{ color: MUTED }}>
            Every curve, every button, every buzz — crafted for little hands and big imaginations.
          </motion.p>
        </motion.div>

        {/* Two-column: callouts left, robot right */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-5"
          >
            {callouts.map(({ icon: Icon, title, body }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="p-5 rounded-2xl"
                style={{ background: CARD, border: `1px solid ${BORDER}` }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: 'rgba(245,166,35,0.1)' }}
                >
                  <Icon className="w-4.5 h-4.5" style={{ color: AMBER }} />
                </div>
                <h3 className="font-display font-bold text-[15px] mb-1.5" style={{ color: TEXT }}>{title}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>{body}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Robot */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center relative"
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: 'radial-gradient(ellipse at center, rgba(245,166,35,0.1) 0%, transparent 70%)' }}
            />
            <motion.img
              src={beepodRobot}
              alt="BeePod"
              className="relative z-10 w-64 sm:w-80 lg:w-96 object-contain"
              style={{ mixBlendMode: 'screen', filter: 'drop-shadow(0 0 40px rgba(245,166,35,0.2))' }}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────
const steps = [
  {
    num: '01',
    title: 'Wake it up',
    body: 'Say "Hey BeePod" from anywhere in the room. It hears you instantly.',
  },
  {
    num: '02',
    title: 'Ask anything',
    body: "Questions, stories, homework help, jokes — BeePod handles it all in your child's language.",
  },
  {
    num: '03',
    title: 'It remembers you',
    body: "BeePod learns your child's name, interests, and pace — getting better every single day.",
  },
];

function HowItWorksSection() {
  return (
    <section id="howitworks" style={{ background: SURFACE, borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-36">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={stagger}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16"
        >
          <motion.span variants={fadeUp} className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: AMBER }}>
            How It Works
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display font-black text-4xl sm:text-5xl lg:text-6xl" style={{ color: TEXT }}>
            Simple for kids.<br />Powerful inside.
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  className="absolute hidden md:block top-8 left-[calc(100%+16px)] w-[calc(100%-80px)] h-px"
                  style={{ background: `linear-gradient(90deg, ${BORDER}, transparent)` }}
                />
              )}
              <div
                className="p-7 rounded-3xl h-full"
                style={{ background: CARD, border: `1px solid ${BORDER}` }}
              >
                <span
                  className="font-display font-black text-5xl leading-none mb-6 block"
                  style={{ color: 'rgba(245,166,35,0.18)' }}
                >
                  {step.num}
                </span>
                <h3 className="font-display font-bold text-xl mb-3" style={{ color: TEXT }}>{step.title}</h3>
                <p className="text-[15px] leading-relaxed" style={{ color: MUTED }}>{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Founder Section ──────────────────────────────────────────
function FounderSection() {
  return (
    <section id="story" style={{ background: BG, borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-24 lg:py-36">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={stagger}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center"
        >
          <motion.span variants={fadeUp} className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: AMBER }}>
            Our Story
          </motion.span>

          <motion.div
            variants={fadeUp}
            className="w-16 h-1 rounded-full mx-auto mb-10"
            style={{ background: `linear-gradient(90deg, ${AMBER_DARK}, ${AMBER})` }}
          />

          <motion.h2
            variants={fadeUp}
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-tight mb-8"
            style={{ color: TEXT }}
          >
            Born from a<br />
            <span style={{ color: AMBER }}>bedtime question.</span>
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="max-w-2xl mx-auto space-y-5 text-[17px] leading-[1.8]"
            style={{ color: MUTED }}
          >
            <p>
              At eight years old, Malya couldn't find a friend who would answer every question, speak every language, and always have time to listen. So she built one.
            </p>
            <p>
              BeePod started as a school project and grew into something bigger — a real AI companion designed not by engineers in a boardroom, but by a kid who knew exactly what kids actually need.
            </p>
            <p>
              Today, Malya leads the team building BeePod — to make sure every child in the world has a friend as curious as they are.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 inline-flex items-center gap-3 px-6 py-3 rounded-full"
            style={{ border: `1px solid ${BORDER}`, background: 'rgba(245,166,35,0.05)' }}
          >
            <div className="flex -space-x-1">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className="w-4 h-4 fill-current" style={{ color: AMBER }} />
              ))}
            </div>
            <span className="text-[13px] font-semibold" style={{ color: TEXT }}>
              From a kid, for every kid.
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Specs Section ────────────────────────────────────────────
const specs = [
  { label: 'AI Engine', value: 'Custom on-device + cloud LLM' },
  { label: 'Languages', value: '50+ supported' },
  { label: 'Microphones', value: 'Quad far-field array' },
  { label: 'Speaker', value: '2W full-range, 360°' },
  { label: 'Battery', value: '2500 mAh — up to 8 hrs' },
  { label: 'Connectivity', value: 'Wi-Fi 6 + Bluetooth 5.3' },
  { label: 'Parental Controls', value: 'Full app-based management' },
  { label: 'Privacy', value: 'COPPA compliant, no ads' },
  { label: 'Age Range', value: '4 – 14 years' },
  { label: 'Materials', value: 'Child-safe ABS + silicone' },
];

function SpecsSection() {
  return (
    <section id="specs" style={{ background: SURFACE, borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-36">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={stagger}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-14"
        >
          <motion.span variants={fadeUp} className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: AMBER }}>
            Specifications
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display font-black text-4xl sm:text-5xl lg:text-6xl" style={{ color: TEXT }}>
            Built to last.<br />Built to impress.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={stagger}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: BORDER, borderRadius: '20px', overflow: 'hidden' }}
        >
          {specs.map(({ label, value }, i) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="p-6 flex flex-col gap-1.5"
              style={{ background: CARD }}
            >
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: AMBER }}>
                {label}
              </span>
              <span className="font-display font-semibold text-[15px]" style={{ color: TEXT }}>
                {value}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Pre-Order Section ────────────────────────────────────────
function PreOrderSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section id="preorder" style={{ background: BG, borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-4xl mx-auto px-6 py-24 lg:py-36 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={stagger}
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ background: 'rgba(245,166,35,0.1)', border: `1px solid rgba(245,166,35,0.2)` }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: AMBER }} />
            <span className="text-[12px] font-bold tracking-[0.14em] uppercase" style={{ color: AMBER }}>
              Early Access Open
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-display font-black text-4xl sm:text-5xl lg:text-7xl leading-none tracking-tighter mb-6"
            style={{ color: TEXT }}
          >
            Be first.<br />
            <span style={{ color: AMBER }}>Be family.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-lg mb-10 max-w-lg mx-auto" style={{ color: MUTED }}>
            Join thousands of families already on the waitlist. Early backers get exclusive pricing and the first units shipped.
          </motion.p>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex flex-col items-center gap-3"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-2"
                  style={{ background: 'rgba(245,166,35,0.15)', border: `1px solid rgba(245,166,35,0.3)` }}
                >
                  <Star className="w-7 h-7" style={{ color: AMBER }} />
                </div>
                <p className="font-display font-bold text-2xl" style={{ color: TEXT }}>You're on the list!</p>
                <p className="text-[15px]" style={{ color: MUTED }}>We'll reach out the moment BeePod is ready for you.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                variants={fadeUp}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-4 rounded-2xl text-[15px] font-medium outline-none transition-all"
                  style={{
                    background: CARD,
                    border: `1px solid ${BORDER}`,
                    color: TEXT,
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = `rgba(245,166,35,0.4)`)}
                  onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 text-black font-display font-bold text-[15px] px-8 py-4 rounded-2xl whitespace-nowrap"
                  style={{
                    background: `linear-gradient(135deg, ${AMBER_DARK}, ${AMBER})`,
                    boxShadow: `0 0 32px rgba(245,166,35,0.25)`,
                  }}
                >
                  PRE-ORDER <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {!submitted && (
            <motion.p
              variants={fadeUp}
              className="mt-4 text-[12px]"
              style={{ color: 'rgba(240,235,224,0.3)' }}
            >
              No spam. Cancel anytime. We'll only email you about BeePod.
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: SURFACE, borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="bg-white rounded-xl px-3 py-2">
          <img src={beepodLogo} alt="BeePod" className="h-8 w-auto object-contain" />
        </div>
        <div className="flex items-center gap-6 text-[13px] font-medium" style={{ color: MUTED }}>
          <a href="#product" className="hover:text-white transition-colors">Product</a>
          <a href="#howitworks" className="hover:text-white transition-colors">How It Works</a>
          <a href="#story" className="hover:text-white transition-colors">Story</a>
          <a href="#specs" className="hover:text-white transition-colors">Specs</a>
        </div>
        <p className="text-[12px]" style={{ color: 'rgba(240,235,224,0.25)' }}>
          © 2025 BeePod. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
