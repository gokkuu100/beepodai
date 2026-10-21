import { useState, useEffect, useRef, type MouseEvent } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Mic, Brain, Shield, ChevronRight,
  Menu, X, Volume2, Star,
  Zap, ArrowRight, Users, Play,
  Youtube, Linkedin, Facebook, Lightbulb, Sparkles, Puzzle
} from 'lucide-react';

// @ts-ignore
import beepodLogo from '@assets/beepodgen/beeplogo.png';
// @ts-ignore
import beepodProduct from '@assets/beepodgen/beepodgen.png';
// @ts-ignore
import parentAppPhone from '@assets/beepodgen/phone.png';
// @ts-ignore
import productFront from '@assets/beepodgen/beepodfrontyellow.png';
// @ts-ignore
import productSide from '@assets/beepodgen/beepodsideyellw.png';
// @ts-ignore
import productBack from '@assets/beepodgen/beepodbackyellow.png';
// @ts-ignore
import logoGemini from '@assets/Gemini_language_model_logo_1786738681958.png';
// @ts-ignore
import logoDeepSeek from '@assets/DeepSeek_logo.svg_1786738681959.webp';
// @ts-ignore
import logoChatGPT from '@assets/new-ChatGPT-logo-black-png-large-size_1786738681959.png';
// @ts-ignore
import logoClaude from '@assets/Claude_AI_logo.svg_1786738715630.webp';
// @ts-ignore
import heroKids from '@assets/hero-kids.webp';
// @ts-ignore
import heroBoys from '@assets/hero-boys.webp';

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

const apiUrl = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/api${path}`;

function anonymousSessionId() {
  const key = 'beepod-anonymous-session';
  const existing = sessionStorage.getItem(key);
  if (existing) return existing;

  const id = crypto.randomUUID().replace(/-/g, '_');
  sessionStorage.setItem(key, id);
  return id;
}

// ─── Reusable animation variants ─────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

function scrollToSection(href: string) {
  const id = href.replace(/^#/, '');
  const target = id ? document.getElementById(id) : null;
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  const cleanUrl = `${window.location.pathname}${window.location.search}`;
  if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== cleanUrl) {
    window.history.replaceState(null, '', cleanUrl);
  }
}

function onSectionLink(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
  if (!href.startsWith('#')) return;
  event.preventDefault();
  scrollToSection(href);
}

// ─── Amber CTA button ────────────────────────────────────────
function AmberButton({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.a
      href={href}
      onClick={(event) => onSectionLink(event, href)}
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
  useEffect(() => {
    const controller = new AbortController();

    void fetch(apiUrl('/analytics/visit'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: anonymousSessionId(), pagePath: window.location.pathname }),
      signal: controller.signal,
      keepalive: true,
    }).catch(() => {
      // Anonymous reporting must never interrupt the visitor experience.
    });

    if (window.location.hash) {
      scrollToSection(window.location.hash);
    }

    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden font-sans antialiased selection:bg-amber-400 selection:text-black">
      <Navbar />
      <main>
        <HeroSection />
        <LLMLogosStrip />
        <AboutSection />
        <MissionSection />
        <FeatureStrip />
        <HowItWorksSection />
        <ProductShowcase />
        <ParentAppSection />
        <WhoIsItForSection />
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
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.97)' : ESPRESSO,
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : `1px solid ${BORDER_DARK}`,
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.08)' : '0 4px 24px rgba(0,0,0,0.3)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[128px]">

            {/* Desktop Left nav */}
            <nav className="hidden md:flex items-center gap-8 flex-1">
              {[['About', '#about'], ['Mission', '#mission'], ['How It Works', '#howitworks'], ['Product', '#product']].map(([label, href]) => (
                <a key={label} href={href}
                  className="text-[13px] font-semibold tracking-wide transition-colors whitespace-nowrap"
                  style={{ color: scrolled ? 'rgba(26,15,0,0.65)' : 'rgba(255,248,240,0.72)' }}
                  onClick={(event) => onSectionLink(event, href)}
                  onMouseEnter={e => (e.currentTarget.style.color = BEE_ORANGE)}
                  onMouseLeave={e => (e.currentTarget.style.color = scrolled ? 'rgba(26,15,0,0.65)' : 'rgba(255,248,240,0.72)')}
                >{label}</a>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button className="md:hidden p-1.5" style={{ color: WARM_WHITE }} onClick={() => setMobileOpen(v => !v)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Centre logo — white version on dark hero, colour version on white navbar */}
            <div className="flex-shrink-0 mx-6">
              <a href="/" className="block" onClick={(event) => { event.preventDefault(); scrollToSection(''); }}>
                <img
                  src={beepodLogo}
                  alt="BeePod"
                  className="h-[105px] md:h-[125px] w-auto object-contain transition-all duration-300"
                  style={{ filter: scrolled ? 'none' : 'invert(1)' }}
                />
              </a>
            </div>

            {/* Desktop Right nav */}
            <nav className="hidden md:flex items-center gap-7 flex-1 justify-end">
              {[['Safety', '#parentapp'], ['Story', '#story']].map(([label, href]) => (
                <a key={label} href={href}
                  className="text-[13px] font-semibold tracking-wide transition-colors whitespace-nowrap"
                  style={{ color: scrolled ? 'rgba(26,15,0,0.65)' : 'rgba(255,248,240,0.72)' }}
                  onClick={(event) => onSectionLink(event, href)}
                  onMouseEnter={e => (e.currentTarget.style.color = BEE_ORANGE)}
                  onMouseLeave={e => (e.currentTarget.style.color = scrolled ? 'rgba(26,15,0,0.65)' : 'rgba(255,248,240,0.72)')}
                >{label}</a>
              ))}
              <motion.a href="#preorder" onClick={(event) => onSectionLink(event, '#preorder')} whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}
                className="text-[13px] font-bold tracking-wide px-5 py-2.5 rounded-xl text-black whitespace-nowrap"
                style={{ background: `linear-gradient(135deg, ${AMBER_GLOW}, ${BEE_ORANGE})` }}
              >
                Pre-Order
              </motion.a>
            </nav>

            {/* Mobile Pre-Order */}
            <motion.a href="#preorder" onClick={(event) => onSectionLink(event, '#preorder')} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
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
            {[['About','#about'],['Mission','#mission'],['How It Works','#howitworks'],['Product','#product'],['Safety','#parentapp'],['Story','#story']].map(([l, h]) => (
              <a key={l} href={h} onClick={(event) => { onSectionLink(event, h); setMobileOpen(false); }}
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
  const slides = [
    {
      badge: 'BeePod AI',
      headline: ['MORE THAN', 'A TOY.'],
      accentLine: 1,
      body: <>Inspiring the next generation,<br />one curious mind at a time.</>,
      sub: 'An AI companion robot that inspires children to think, explore, create, and innovate.',
      cta1: { label: 'PRE-ORDER BEEPOD', href: '#preorder' },
      cta2: { label: 'SEE HOW IT WORKS', href: '#howitworks' },
      visual: (
        <motion.img
          key="slide0-img"
          src={beepodProduct}
          alt="BeePod AI Companion"
          className="w-full max-w-sm sm:max-w-md lg:max-w-xl xl:max-w-2xl object-contain"
          style={{ maxHeight: '80vh', filter: 'drop-shadow(0 24px 40px rgba(0,0,0,0.35))' }}
          initial={{ opacity: 0, scale: 0.92, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.92, x: -40 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      ),
    },
    {
      badge: 'Voice-Powered Learning',
      headline: ['LESS SCREEN TIME.', 'MORE CURIOSITY.'],
      accentLine: 1,
      body: <>BeePod AI is a voice-powered learning companion designed to spark children's curiosity, nurture creativity, develop skills, and encourage less screen time.</>,
      sub: '',
      cta1: { label: 'PRE-ORDER BEEPOD', href: '#preorder' },
      cta2: { label: 'LEARN MORE', href: '#about' },
      visual: null,
      fullImage: heroKids,
    },
    {
      badge: 'Our Mission',
      headline: ['CURIOSITY', 'INTO IDEAS.'],
      accentLine: 1,
      body: <>Our mission is to inspire curious thinkers, confident creators, and innovative problem-solvers — turning curiosity into ideas, skills, and real-world solutions.</>,
      sub: '',
      cta1: { label: 'PRE-ORDER BEEPOD', href: '#preorder' },
      cta2: { label: 'SEE HOW IT WORKS', href: '#howitworks' },
      visual: null,
      fullImage: heroBoys,
    },
  ];

  const [active, setActive] = useState(0);

  // Preload all hero images on mount so transitions are instant
  useEffect(() => {
    [heroKids, heroBoys, beepodProduct].forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[active];

  const isFullImage = !!(slide as any).fullImage;

  // ── Shared dots control ──
  const Dots = ({ centered }: { centered?: boolean }) => (
    <div className={`flex items-center gap-3 mt-10 ${centered ? 'justify-center' : ''}`}>
      {slides.map((_, i) => (
        <button key={i} onClick={() => setActive(i)}
          className="transition-all duration-300 rounded-full"
          style={{
            width: i === active ? '28px' : '8px',
            height: '8px',
            background: i === active ? BEE_ORANGE : 'rgba(255,248,240,0.25)',
          }}
        />
      ))}
    </div>
  );

  // ── Shared text block ──
  const TextBlock = ({ centered }: { centered?: boolean }) => (
    <AnimatePresence mode="wait">
      <motion.div key={active}
        variants={stagger} initial="hidden" animate="visible"
        exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
        className={`flex flex-col z-10 ${centered ? 'items-center text-center max-w-3xl mx-auto' : 'items-center lg:items-start text-center lg:text-left'}`}>
        <motion.div variants={fadeUp} className="mb-5">
          <span className="text-[11px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(255,154,0,0.12)', color: BEE_ORANGE, border: `1px solid rgba(255,154,0,0.25)` }}>
            {slide.badge}
          </span>
        </motion.div>

        <motion.h1 variants={fadeUp}
          className="font-display font-black leading-[0.92] tracking-tighter mb-5"
          style={{ color: WARM_WHITE }}>
          {slide.headline.map((line, i) => (
            <span key={i} className="block text-[2.8rem] sm:text-[3.8rem] lg:text-[4.4rem] xl:text-[5.2rem]"
              style={i === slide.accentLine ? { color: BEE_ORANGE } : {}}>
              {line}
            </span>
          ))}
        </motion.h1>

        <motion.p variants={fadeUp}
          className={`text-base sm:text-lg leading-relaxed mb-2 ${centered ? 'max-w-xl' : 'max-w-md'}`}
          style={{ color: MUTED_DARK }}>
          {slide.body}
        </motion.p>
        {slide.sub && (
          <motion.p variants={fadeUp} className="text-[12px] font-medium tracking-wide mb-7"
            style={{ color: 'rgba(255,248,240,0.3)' }}>
            {slide.sub}
          </motion.p>
        )}

        <motion.div variants={fadeUp} className={`flex flex-col sm:flex-row gap-3 mt-6 ${centered ? 'justify-center' : ''}`}>
          <AmberButton href={slide.cta1.href}>
            {slide.cta1.label} <ChevronRight className="w-4 h-4" />
          </AmberButton>
          <motion.a href={slide.cta2.href} onClick={(event) => onSectionLink(event, slide.cta2.href)} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2.5 font-display font-semibold text-[15px] px-8 py-4 rounded-2xl"
            style={{ color: WARM_WHITE, border: `1px solid rgba(255,248,240,0.12)`, background: 'rgba(255,248,240,0.04)' }}>
            {slide.cta2.label}
          </motion.a>
        </motion.div>

        <Dots centered={centered} />
      </motion.div>
    </AnimatePresence>
  );

  // Single section — all images always mounted, cross-fade via opacity only
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden" style={{ background: ESPRESSO }}>

      {/* ── Slide 2: full-bleed kids photo — always in DOM ── */}
      <motion.img
        src={heroKids}
        alt=""
        aria-hidden
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        animate={{ opacity: active === 1 ? 1 : 0, scale: active === 1 ? 1 : 1.06 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* ── Slide 3: boys treehouse photo — always in DOM ── */}
      <motion.img
        src={heroBoys}
        alt=""
        aria-hidden
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        animate={{ opacity: active === 2 ? 1 : 0, scale: active === 2 ? 1 : 1.06 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Gradient overlay for slides 2 & 3 */}
      <motion.div className="absolute inset-0 pointer-events-none"
        animate={{ opacity: active === 1 || active === 2 ? 1 : 0 }}
        transition={{ duration: 1 }}
        style={{ background: 'linear-gradient(to bottom, rgba(26,15,0,0.4) 0%, rgba(26,15,0,0.1) 35%, rgba(26,15,0,0.7) 70%, rgba(26,15,0,0.96) 100%)' }}
      />

      {/* ── Slide 1 decorative layers ── */}
      <motion.div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        animate={{ opacity: active === 0 ? 1 : 0 }} transition={{ duration: 0.8 }}
        style={{ background: `radial-gradient(ellipse at center, rgba(255,154,0,0.13) 0%, transparent 65%)` }}
      />
      <motion.div className="absolute inset-0 pointer-events-none"
        animate={{ opacity: active === 0 ? 0.025 : 0 }} transition={{ duration: 0.8 }}
        style={{ backgroundImage: `linear-gradient(${BORDER_DARK} 1px, transparent 1px), linear-gradient(90deg, ${BORDER_DARK} 1px, transparent 1px)`, backgroundSize: '60px 60px' }}
      />

      {/* ── Content ── */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 min-h-screen pt-36 pb-16 flex items-center">
        <div className="w-full grid lg:grid-cols-2 gap-8 items-center">
          <TextBlock />

          {/* Slide 1 product image — always in DOM */}
          <motion.div
            className="relative flex items-center justify-center h-full"
            animate={{ opacity: active === 0 ? 1 : 0, x: active === 0 ? 0 : 40 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={beepodProduct}
              alt="BeePod AI Companion"
              fetchPriority="high"
              decoding="async"
              className="w-full max-w-sm sm:max-w-md lg:max-w-xl xl:max-w-2xl object-contain"
              style={{ maxHeight: '80vh', filter: 'drop-shadow(0 24px 40px rgba(0,0,0,0.35))' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 2: Feature Strip (WHITE bg) ─────────────────────
const features = [
  { icon: Mic,     label: 'Voice Learning',   desc: 'Ask questions out loud and explore ideas together' },
  { icon: Sparkles, label: 'Creativity',      desc: 'Turn imagination into projects kids can actually try' },
  { icon: Brain,   label: 'Real Skills',      desc: 'Practice thinking, making, and problem-solving' },
  { icon: Shield,  label: 'Less Screen Time', desc: 'Learn by talking, with parents still in control' },
];

// ─── LLM Logos Strip (after hero) ────────────────────────────
function LLMLogosStrip() {
  const llms: { src: string; alt: string; invert?: boolean; blend?: boolean }[] = [
    { src: logoChatGPT,  alt: 'ChatGPT',   invert: true  },
    { src: logoGemini,   alt: 'Gemini',    blend: true   },
    { src: logoClaude,   alt: 'Claude',    invert: true  },
    { src: logoDeepSeek, alt: 'DeepSeek',  blend: true   },
  ];

  return (
    <section style={{ background: ESPRESSO, borderTop: `1px solid ${BORDER_DARK}` }}>
      <div className="max-w-5xl mx-auto px-6 py-10 lg:py-14">
        <motion.div
          initial="hidden" whileInView="visible" variants={stagger}
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.p
            variants={fadeUp}
            className="text-center text-[10px] font-bold tracking-[0.22em] uppercase mb-8"
            style={{ color: 'rgba(255,154,0,0.5)' }}
          >
            Compatible with leading AI engines
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-10 md:gap-16"
          >
            {llms.map(({ src, alt, invert, blend }) => (
              <img
                key={alt}
                src={src}
                alt={alt}
                className="h-7 md:h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                style={{
                  filter: invert ? 'brightness(0) invert(1)' : undefined,
                  mixBlendMode: blend ? 'screen' : undefined,
                } as React.CSSProperties}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── About Section ───────────────────────────────────────────
function AboutSection() {
  const stats = [
    { number: '01', label: 'Spark curiosity' },
    { number: '02', label: 'Nurture creativity' },
    { number: '03', label: 'Develop skills' },
    { number: '04', label: 'Less screen time' },
  ];

  return (
    <section id="about" className="scroll-mt-32" style={{ background: WHITE, borderTop: `1px solid ${BORDER_LIGHT}` }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <motion.div initial="hidden" whileInView="visible" variants={stagger}
            viewport={{ once: true, margin: '-80px' }}>
            <motion.span variants={fadeUp}
              className="block text-[11px] font-bold tracking-[0.18em] uppercase mb-4"
              style={{ color: BEE_ORANGE }}>
              About BeePod AI
            </motion.span>
            <motion.h2 variants={fadeUp}
              className="font-display font-black text-4xl sm:text-5xl lg:text-[3.5rem] leading-[0.95] tracking-tighter mb-6"
              style={{ color: ESPRESSO }}>
              MORE THAN<br />A TOY.
            </motion.h2>
            <motion.p variants={fadeUp}
              className="text-[17px] leading-relaxed mb-4"
              style={{ color: MUTED_LIGHT }}>
              BeePod AI is an AI companion robot inspiring children to think, explore, create, and innovate. It is a voice-powered learning companion designed to spark curiosity, nurture creativity, develop skills, and encourage less screen time.
            </motion.p>
            <motion.p variants={fadeUp}
              className="text-[17px] leading-relaxed"
              style={{ color: MUTED_LIGHT }}>
              Our mission is to inspire curious thinkers, confident creators, and innovative problem-solvers — turning curiosity into ideas, skills, and real-world solutions.
            </motion.p>
          </motion.div>

          {/* Right — stats grid */}
          <motion.div initial="hidden" whileInView="visible" variants={stagger}
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 gap-5">
            {stats.map(({ number, label }) => (
              <motion.div key={label} variants={fadeUp}
                className="flex flex-col gap-2 p-6 rounded-2xl"
                style={{ background: CARD_LIGHT, border: `1px solid ${BORDER_LIGHT}` }}>
                <span className="font-display font-black text-3xl sm:text-4xl"
                  style={{ color: BEE_ORANGE }}>{number}</span>
                <span className="text-[14px] font-semibold" style={{ color: MUTED_LIGHT }}>{label}</span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  const pillars = [
    {
      icon: Lightbulb,
      title: 'Curious thinkers',
      desc: 'Children ask the next question instead of only consuming what a screen shows them.',
    },
    {
      icon: Sparkles,
      title: 'Confident creators',
      desc: 'Ideas leave the conversation and become sketches, projects, and things kids can try.',
    },
    {
      icon: Puzzle,
      title: 'Problem-solvers',
      desc: 'Curiosity becomes a skill and a real-world solution — the way a lemonade stand starts with one idea.',
    },
  ];

  return (
    <section id="mission" className="scroll-mt-32" style={{ background: ESPRESSO, borderTop: `1px solid ${BORDER_DARK}` }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <motion.div initial="hidden" whileInView="visible" variants={stagger}
          viewport={{ once: true, margin: '-80px' }} className="max-w-3xl mb-14">
          <motion.span variants={fadeUp}
            className="block text-[11px] font-bold tracking-[0.18em] uppercase mb-4"
            style={{ color: BEE_ORANGE }}>
            Our Mission
          </motion.span>
          <motion.h2 variants={fadeUp}
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tighter mb-6"
            style={{ color: WARM_WHITE }}>
            INSPIRING THE<br />
            <span style={{ color: BEE_ORANGE }}>NEXT GENERATION.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[17px] leading-relaxed" style={{ color: MUTED_DARK }}>
            One curious mind at a time. BeePod AI exists so children do more than use technology — they think with it, make with it, and solve something real.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {pillars.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="p-7 rounded-3xl flex flex-col gap-4"
              style={{ background: CARD_DARK, border: `1px solid ${BORDER_DARK}` }}>
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(255,154,0,0.12)' }}>
                <Icon className="w-5 h-5" style={{ color: BEE_ORANGE }} />
              </div>
              <h3 className="font-display font-bold text-xl" style={{ color: WARM_WHITE }}>{title}</h3>
              <p className="text-[15px] leading-relaxed" style={{ color: MUTED_DARK }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
  { num: '01', label: 'YOU ASK',          icon: Mic,     desc: 'A question, a what-if, or the start of an idea.' },
  { num: '02', label: 'BEEPOD LISTENS',   icon: Volume2, desc: 'A voice conversation, not another screen to stare at.' },
  { num: '03', label: 'YOU EXPLORE',      icon: Brain,   desc: 'Age-appropriate answers that invite the next question.' },
  { num: '04', label: 'YOU CREATE',       icon: Zap,     desc: 'Turn curiosity into a skill, a project, or a solution.' },
];

function HowItWorksSection() {
  return (
    <section id="howitworks" className="scroll-mt-32" style={{ background: ESPRESSO, borderTop: `1px solid ${BORDER_DARK}` }}>
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
            JUST TALK.<br />THEN CREATE.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-base max-w-md" style={{ color: MUTED_DARK }}>
            BeePod AI meets children in conversation, then helps them carry an idea into something they can make.
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
      </div>
    </section>
  );
}

// ─── SECTION 4: Product Showcase (WHITE bg) ──────────────────
const productViews: { label: string; img: string; desc: string }[] = [
  { label: 'FRONT', img: productFront, desc: 'Yellow BeePod with a smiling LED face and simple volume controls.' },
  { label: 'SIDE',  img: productSide,  desc: 'A compact silhouette, small enough for a desk or bedside.' },
  { label: 'BACK',  img: productBack,  desc: 'Speaker grille centered on the back of the head.' },
];

function ProductShowcase() {
  const [active, setActive] = useState(0);
  const view = productViews[active];

  return (
    <section id="product" className="scroll-mt-32" style={{ background: WHITE, borderTop: `1px solid ${BORDER_LIGHT}` }}>
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
            MEET BEEPOD AI.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-base max-w-lg mx-auto" style={{ color: MUTED_LIGHT }}>
            A companion robot built so children can think, explore, create, and innovate — out loud, and away from a screen.
          </motion.p>
        </motion.div>

        {/* Gallery */}
        <div className="flex flex-col items-center gap-10">
          {/* View tabs */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="flex flex-wrap justify-center gap-2">
            {productViews.map((v, i) => (
              <button key={v.label} onClick={() => setActive(i)}
                className="text-[11px] font-bold tracking-[0.1em] px-4 py-2 rounded-full transition-all duration-300"
                style={{
                  background: active === i ? `linear-gradient(135deg, ${AMBER_GLOW}, ${BEE_ORANGE})` : CARD_LIGHT,
                  color: active === i ? '#000' : MUTED_LIGHT,
                  border: `1px solid ${active === i ? 'transparent' : BORDER_LIGHT}`,
                }}>
                {v.label}
              </button>
            ))}
          </motion.div>

          {/* Product image */}
          <div className="relative flex items-center justify-center h-80 sm:h-[28rem]">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={view.img}
                alt={`BeePod — ${view.label}`}
                className="h-full object-contain relative z-10"
                initial={{ opacity: 0, scale: 0.94, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
          </div>

          {/* View description */}
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="text-center max-w-lg">
              <h3 className="font-display font-black text-2xl sm:text-3xl mb-3" style={{ color: ESPRESSO }}>
                MADE TO BE YOUR COMPANION.
              </h3>
              <p className="text-[16px] leading-relaxed" style={{ color: MUTED_LIGHT }}>
                {view.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 5: Who Is It For (ESPRESSO bg) ──────────────────
const audiences = [
  { icon: Lightbulb, title: 'CURIOUS THINKERS',     desc: 'Kids who ask why, what if, and what comes next.' },
  { icon: Sparkles,  title: 'CONFIDENT CREATORS',   desc: 'Children ready to turn an idea into a project they can try.' },
  { icon: Puzzle,    title: 'PROBLEM-SOLVERS',      desc: 'Young innovators who want skills, not just answers.' },
  { icon: Users,     title: 'FAMILIES',             desc: 'Parents who want exploration, privacy, and oversight together.' },
];

// ─── Parent App Section ───────────────────────────────────────
function PhoneMockup() {
  return (
    <img
      src={parentAppPhone}
      alt="BeePod parent app on a phone"
      className="mx-auto w-[280px] max-w-full h-auto object-contain"
    />
  );
}

function ParentAppSection() {
  const features: { icon: React.ReactNode; title: string }[] = [
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
      title: 'Parental Oversight',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
      title: 'Screen Time Controls',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
      title: 'Age-Appropriate Talk',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
      title: 'Learning Reports',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
      title: 'Real-Time Alerts',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
      title: 'Multi-Device Family',
    },
  ];

  return (
    <section id="parentapp" className="scroll-mt-32" style={{ background: ESPRESSO }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — text + features */}
          <motion.div initial="hidden" whileInView="visible" variants={stagger}
            viewport={{ once: true, margin: '-80px' }}>
            <motion.span variants={fadeUp}
              className="block text-[11px] font-bold tracking-[0.18em] uppercase mb-4"
              style={{ color: BEE_ORANGE }}>
              Safety and Privacy
            </motion.span>
            <motion.h2 variants={fadeUp}
              className="font-display font-black text-4xl sm:text-5xl lg:text-[3.2rem] leading-[0.95] tracking-tighter mb-5"
              style={{ color: WARM_WHITE }}>
              ROOM TO EXPLORE.<br />
              <span style={{ color: BEE_ORANGE }}>PARENTS IN CONTROL.</span>
            </motion.h2>
            <motion.p variants={fadeUp}
              className="text-[17px] leading-relaxed mb-4"
              style={{ color: MUTED_DARK }}>
              We believe children should do more than consume technology. They should ask questions, explore possibilities, develop skills, and solve problems.
            </motion.p>
            <motion.p variants={fadeUp}
              className="text-[17px] leading-relaxed mb-10"
              style={{ color: MUTED_DARK }}>
              BeePod AI is being developed with a focus on children's privacy, age-appropriate interactions, and parental oversight — giving children room to explore while helping parents maintain control over their child's learning experience.
            </motion.p>

            <motion.div variants={stagger} className="grid grid-cols-2 gap-3">
              {features.map(({ icon, title }) => (
                <motion.div key={title} variants={fadeUp}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{ background: CARD_DARK, border: `1px solid ${BORDER_DARK}` }}>
                  <span className="shrink-0" style={{ color: BEE_ORANGE }}>{icon}</span>
                  <h3 className="font-display font-semibold text-[13px] tracking-tight leading-snug"
                    style={{ color: WARM_WHITE }}>{title}</h3>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8">
              <AmberButton href="#preorder">
                GET EARLY ACCESS <ChevronRight className="w-4 h-4" />
              </AmberButton>
            </motion.div>
          </motion.div>

          {/* Right — phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex justify-center lg:justify-end">
            <PhoneMockup />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function WhoIsItForSection() {
  return (
    <section style={{ background: WHITE, borderTop: `1px solid ${BORDER_LIGHT}` }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-36">
        <motion.div initial="hidden" whileInView="visible" variants={stagger}
          viewport={{ once: true, margin: '-80px' }} className="mb-16">
          <motion.span variants={fadeUp} className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-4"
            style={{ color: BEE_ORANGE }}>
            Who It's For
          </motion.span>
          <motion.h2 variants={fadeUp}
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"
            style={{ color: ESPRESSO }}>
            MADE FOR<br />CURIOUS MINDS.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-base max-w-xl" style={{ color: MUTED_LIGHT }}>
            For children ready to ask, make, and solve — and for families who want that exploration to stay private and age-appropriate.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {audiences.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="p-7 rounded-3xl flex flex-col gap-5 group hover:border-amber-400 transition-colors duration-300"
              style={{ background: CARD_LIGHT, border: `1px solid ${BORDER_LIGHT}` }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(255,154,0,0.1)' }}>
                <Icon className="w-6 h-6" style={{ color: BEE_ORANGE }} />
              </div>
              <div>
                <h3 className="font-display font-bold text-[13px] tracking-[0.1em] mb-2"
                  style={{ color: BEE_ORANGE }}>{title}</h3>
                <p className="text-[14px] leading-relaxed" style={{ color: MUTED_LIGHT }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 4.76 1.52V6.79a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function StoryVideoCard({
  videoId,
  title,
  subtitle,
  href,
}: {
  videoId: string;
  title: string;
  subtitle: string;
  href: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="overflow-hidden rounded-3xl h-full"
      style={{ background: CARD_DARK, border: `1px solid ${BORDER_DARK}` }}>
      <div className="relative aspect-video bg-black">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 h-full w-full"
            aria-label={`Play ${title}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              alt=""
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(26,15,0,0.72) 0%, rgba(26,15,0,0.15) 45%, rgba(26,15,0,0.25) 100%)' }}
            />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
              style={{ background: BEE_ORANGE, boxShadow: '0 10px 30px rgba(0,0,0,0.35)' }}>
              <Play className="ml-1 h-7 w-7 text-black" fill="currentColor" />
            </span>
          </button>
        )}
      </div>
      <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display font-bold text-sm sm:text-base" style={{ color: WARM_WHITE }}>
            {title}
          </p>
          <p className="mt-1 text-[12px]" style={{ color: MUTED_DARK }}>
            {subtitle}
          </p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-[12px] font-bold tracking-[0.08em] uppercase shrink-0"
          style={{ color: BEE_ORANGE }}
        >
          Watch on YouTube
        </a>
      </div>
    </div>
  );
}

// ─── SECTION 6: Founder Story (ESPRESSO bg) ──────────────────
function FounderSection() {
  return (
    <section id="story" className="scroll-mt-32" style={{ background: ESPRESSO, borderTop: `1px solid ${BORDER_DARK}` }}>
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
            A LITTLE SETBACK.<br />
            <span style={{ color: BEE_ORANGE }}>A BIG IDEA.</span>
          </motion.h2>

          {/* Story blocks */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div variants={stagger} className="space-y-6 text-[17px] leading-[1.8]"
              style={{ color: MUTED_DARK }}>
              <motion.p variants={fadeUp}>
                BeePod AI began with{' '}
                <span style={{ color: WARM_WHITE, fontWeight: 600 }}>Malia Ouma</span>
                , an eight-year-old innovator, after she was “fired” from a lemonade business she had co-founded.
              </motion.p>
              <motion.p variants={fadeUp}>
                While thinking about her next business idea, Malia drew inspiration from the robots she watched on TV. She imagined a different kind of toy — one that could inspire children to generate ideas, explore their interests, and turn imagination into real-world projects, like starting and running a lemonade stand.
              </motion.p>
            </motion.div>

            <motion.div variants={stagger} className="space-y-6 text-[17px] leading-[1.8]"
              style={{ color: MUTED_DARK }}>
              <motion.p variants={fadeUp}>
                With her coding skills and mentorship from{' '}
                <span style={{ color: WARM_WHITE, fontWeight: 600 }}>Inventing School</span>
                , Malia transformed her concept and sketch into BeePod AI, bringing together AI, hardware, software, coding and child-centred learning.
              </motion.p>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="mt-12">
            <StoryVideoCard
              videoId="SsgzwpOg8_8"
              title="Malia, The 8-Year-Old AI Innovator"
              subtitle="Diaspora Connect · Citizen TV Kenya"
              href="https://youtu.be/SsgzwpOg8_8"
            />
          </motion.div>

          <div className="mt-5 grid sm:grid-cols-2 gap-5">
            <motion.div variants={fadeUp}>
              <StoryVideoCard
                videoId="Ty8zSyg-MdY"
                title="Presenting BeePod AI to PS Roseline Njogu"
                subtitle="YouTube Short"
                href="https://youtube.com/shorts/Ty8zSyg-MdY"
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <StoryVideoCard
                videoId="n4mLQM45ioA"
                title="Presenting BeePod AI to President William Ruto"
                subtitle="YouTube Short"
                href="https://youtube.com/shorts/n4mLQM45ioA"
              />
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
                Malia Ouma, Founder — Age 8
              </p>
              <p className="text-[12px]" style={{ color: MUTED_DARK }}>
                Mentored at Inventing School. Built from a sketch into BeePod AI.
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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState("Your BeePod is expected on or before November 5, 2026.");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch(apiUrl('/preorders'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(typeof body.message === 'string' ? body.message : 'We could not save your pre-order. Please try again.');
      }

      setSuccessMessage(
        typeof body.message === 'string'
          ? body.message
          : "Your BeePod is expected on or before November 5, 2026.",
      );
      setSubmitted(true);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'We could not save your pre-order. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
    <section id="preorder" className="scroll-mt-32" style={{ background: WHITE, borderTop: `1px solid ${BORDER_LIGHT}` }}>
      <div className="max-w-4xl mx-auto px-6 py-24 lg:py-36">
        <motion.div initial="hidden" whileInView="visible" variants={stagger}
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col items-center text-center">
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
            BRING BEEPOD AI<br />
            <span style={{ color: BEE_ORANGE }}>HOME.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-[16px] leading-relaxed mb-12 max-w-xl"
            style={{ color: MUTED_LIGHT }}>
            Be one of the first families to give a child a voice-powered companion that inspires them to think, explore, create, and innovate — with less screen time and parents in control.
          </motion.p>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(255,154,0,0.1)', border: `1px solid rgba(255,154,0,0.25)` }}>
                  <Star className="w-7 h-7" style={{ color: BEE_ORANGE }} />
                </div>
                <h3 className="font-display font-black text-3xl" style={{ color: ESPRESSO }}>
                  You're on the list!
                </h3>
                <p className="text-[16px]" style={{ color: MUTED_LIGHT }}>
                  {successMessage}
                </p>
              </motion.div>
            ) : (
              <motion.form key="form" variants={fadeUp} onSubmit={handleSubmit}
                className="grid sm:grid-cols-2 gap-4 max-w-xl">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold tracking-[0.12em] uppercase" style={{ color: MUTED_LIGHT }}>
                    Name
                  </label>
                  <input type="text" required minLength={2} placeholder="Your name" value={form.name}
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
                  {error && (
                    <p className="mb-3 rounded-xl px-4 py-3 text-sm text-left"
                      role="alert"
                      style={{ color: '#9E1E1E', background: 'rgba(190,30,30,0.08)' }}>
                      {error}
                    </p>
                  )}
                  <motion.button type="submit" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 text-black font-display font-bold text-[15px] px-8 py-4 rounded-2xl disabled:cursor-not-allowed disabled:opacity-65"
                    style={{ background: `linear-gradient(135deg, ${AMBER_GLOW}, ${BEE_ORANGE})`, boxShadow: `0 0 40px rgba(255,154,0,0.25)` }}>
                    {submitting ? 'SAVING YOUR PLACE…' : <>JOIN THE BEEPOD PRE-ORDER <ArrowRight className="w-4 h-4" /></>}
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
    <section style={{ background: `linear-gradient(135deg, ${BEE_ORANGE} 0%, ${AMBER_GLOW} 50%, #e65c00 100%)` }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-36">
        <div className="grid lg:grid-cols-2 items-center gap-12">
          {/* Left: text */}
          <motion.div initial="hidden" whileInView="visible" variants={stagger}
            viewport={{ once: true, margin: '-80px' }}>
            <motion.h2 variants={fadeUp}
              className="font-display font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-tighter mb-10"
              style={{ color: ESPRESSO }}>
              <span className="block">MORE THAN</span>
              <span className="block" style={{ color: WHITE }}>A TOY.</span>
              <span className="block">ONE CURIOUS</span>
              <span className="block">MIND AT A TIME.</span>
            </motion.h2>
            <motion.div variants={fadeUp}>
              <motion.a href="#preorder" onClick={(event) => onSectionLink(event, '#preorder')}
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 font-display font-bold text-[15px] px-8 py-4 rounded-2xl"
                style={{ background: ESPRESSO, color: WARM_WHITE, boxShadow: '0 8px 30px rgba(26,15,0,0.25)' }}>
                PRE-ORDER BEEPOD <ChevronRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right: Robot */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center relative">
            <motion.img src={productFront} alt="BeePod"
              className="relative z-10 w-52 sm:w-72 lg:w-80 object-contain"
              style={{ filter: `drop-shadow(0 20px 40px rgba(26,15,0,0.3))` }}
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
            <img
              src={beepodLogo}
              alt="BeePod"
              className="h-24 w-auto object-contain self-start"
              style={{ filter: 'invert(1)' }}
            />
            <p className="text-[13px] leading-relaxed max-w-[240px]" style={{ color: MUTED_DARK }}>
              More than a toy. Inspiring the next generation, one curious mind at a time.
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-bold tracking-[0.16em] uppercase mb-2" style={{ color: BEE_ORANGE }}>
              Navigation
            </p>
            {[['About','#about'],['Mission','#mission'],['How It Works','#howitworks'],['Safety','#parentapp'],['Story','#story'],['Pre-Order','#preorder']].map(([l,h]) => (
              <a key={l} href={h} onClick={(event) => onSectionLink(event, h)} className="text-[13px] font-medium transition-colors"
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
                { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/beepod-ai/' },
                { icon: TikTokIcon, label: 'TikTok', href: 'https://www.tiktok.com/@beepod_ai' },
                { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/share/1HqEKdY5HR/?mibextid=wwXIfr' },
                { icon: XIcon, label: 'X', href: 'https://x.com/beepod_ai' },
                { icon: Youtube, label: 'YouTube', href: 'https://youtu.be/SsgzwpOg8_8' },
              ].map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
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

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: `1px solid ${BORDER_DARK}` }}>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
            <p className="text-[12px]" style={{ color: 'rgba(255,248,240,0.2)' }}>
              © 2026 BeePod. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[12px]">
              <Link href="/privacy" className="transition-colors" style={{ color: 'rgba(255,248,240,0.45)' }}
                onMouseEnter={e => (e.currentTarget.style.color = BEE_ORANGE)}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,248,240,0.45)')}>
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition-colors" style={{ color: 'rgba(255,248,240,0.45)' }}
                onMouseEnter={e => (e.currentTarget.style.color = BEE_ORANGE)}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,248,240,0.45)')}>
                Terms of Service
              </Link>
            </div>
          </div>
          <p className="text-[12px]" style={{ color: 'rgba(255,248,240,0.2)' }}>
            Invented by Malia Ouma, age 8.
          </p>
        </div>
      </div>
    </footer>
  );
}
