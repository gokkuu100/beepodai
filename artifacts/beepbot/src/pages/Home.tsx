import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mic, Speaker, Wifi, Battery, Globe, Heart,
  CheckCircle2, ChevronRight, Send, Cpu, Monitor,
  Volume2, Star, Zap, Users
} from 'lucide-react';

// @ts-ignore
import beepbotHero from '@assets/beepbop_1786446954186.png';
// @ts-ignore
import beepbotSpec from '@assets/D0483BFE-5004-456A-8CA5-CB52A31DE290_1786241251828.png';
// @ts-ignore
import beepbotLogo from '@assets/Artboard_7_1786446052689.png';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-hidden selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <HeroSection />
        <PoweredBySection />
        <FeaturesSection />
        <HowItWorksSection />
        <SpecsSection />
        <PerfectForSection />
        <FounderSection />
        <PreOrderSection />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 inset-x-0 z-50 px-6 py-4 bg-background/85 backdrop-blur-md border-b border-border/40"
    >
      {/* Mobile: logo left, CTA right */}
      <div className="flex md:hidden items-center justify-between">
        <img src={beepbotLogo} alt="BeepBot" className="h-16 w-auto object-contain" />
        <motion.a
          href="#preorder"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-white px-4 py-2 rounded-full font-display font-bold text-sm whitespace-nowrap shadow-[0_3px_0_0_rgba(89,49,233,0.4)] transition-all"
          style={{ background: 'linear-gradient(135deg, #5931E9 0%, #8B3DF0 100%)' }}
        >
          Pre-Order
        </motion.a>
      </div>

      {/* Desktop: 3-col — nav | big centered logo | CTA */}
      <div className="hidden md:grid grid-cols-3 items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-8 text-sm font-display font-semibold text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#specs" className="hover:text-foreground transition-colors">Specs</a>
          <a href="#story" className="hover:text-foreground transition-colors">Our Story</a>
        </div>
        <div className="flex justify-center">
          <img src={beepbotLogo} alt="BeepBot" className="h-28 w-auto object-contain" />
        </div>
        <div className="flex justify-end">
          <motion.a
            href="#preorder"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white px-6 py-2.5 rounded-full font-display font-bold text-sm whitespace-nowrap shadow-[0_4px_0_0_rgba(89,49,233,0.4)] hover:translate-y-[2px] hover:shadow-[0_2px_0_0_rgba(89,49,233,0.4)] transition-all"
            style={{ background: 'linear-gradient(135deg, #5931E9 0%, #8B3DF0 100%)' }}
          >
            Pre-Order Now
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  return (
    <section
      className="relative pt-24 pb-16 lg:pt-36 lg:pb-28 px-4 sm:px-6 overflow-hidden rounded-b-[2.5rem]"
      style={{ background: 'linear-gradient(135deg, #5931E9 0%, #8B3DF0 100%)' }}
    >
      {/* Soft inner glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-white/5 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
        {/* Robot — right on desktop, top on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, type: 'spring', bounce: 0.3 }}
          className="relative flex justify-center items-center order-1 lg:order-2 lg:h-[580px]"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-56 h-56 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] rounded-full bg-white/10 blur-3xl" />
          </div>
          <img
            src={beepbotHero}
            alt="BeepBot Robot"
            className="relative z-10 w-52 sm:w-80 lg:w-full lg:max-w-md xl:max-w-lg object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Text — left on desktop, below robot on mobile */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="order-2 lg:order-1"
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <div
              className="text-7xl sm:text-8xl lg:text-9xl xl:text-[10rem] font-display font-black leading-none tracking-tighter bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(160deg, #ffffff 0%, #c4b5fd 50%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              BEEP
            </div>
            <div
              className="text-7xl sm:text-8xl lg:text-9xl xl:text-[10rem] font-display font-black leading-none tracking-tighter bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(160deg, #e9d5ff 0%, #a78bfa 50%, #7c3aed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              BOT
            </div>
          </motion.div>

          <motion.p variants={fadeInUp} className="text-base sm:text-lg text-white/75 mb-8 max-w-md leading-relaxed font-sans">
            BeepBot speaks, listens, and helps in any language — the AI companion built to make kids smarter and learning more fun.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 mb-8">
            <motion.a
              href="#preorder"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#5931E9] px-7 py-4 rounded-2xl font-display font-bold text-base sm:text-lg shadow-[0_6px_0_0_rgba(0,0,0,0.2)] hover:shadow-[0_3px_0_0_rgba(0,0,0,0.2)] hover:translate-y-[3px] transition-all"
            >
              Pre-Order BeepBot
              <ChevronRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#story"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white px-7 py-4 rounded-2xl font-display font-bold text-base sm:text-lg hover:bg-white/10 hover:translate-y-[3px] transition-all"
            >
              Our Story
            </motion.a>
          </motion.div>

          {/* Quick stats */}
          <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3">
            {[
              { value: '100+', label: 'Languages' },
              { value: 'AI', label: 'Powered' },
              { value: 'Kids', label: 'First' }
            ].map((s, i) => (
              <div key={i} className="text-center p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="text-lg sm:text-2xl font-display font-black text-white leading-tight">{s.value}</div>
                <div className="text-[10px] sm:text-xs font-display font-bold text-white/60 uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function PoweredBySection() {
  return (
    <section className="py-10 border-y border-border/40 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <p className="font-display font-bold text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
          AI Intelligence Powered By
        </p>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-16">
          {[
            { name: 'ChatGPT', color: 'text-emerald-600' },
            { name: 'DeepSeek', color: 'text-blue-600' },
            { name: 'Claude', color: 'text-orange-500' },
            { name: 'Gemini', color: 'text-purple-600' },
          ].map((ai, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className={`font-display font-black text-2xl md:text-3xl tracking-tight ${ai.color} opacity-70 hover:opacity-100 transition-opacity cursor-default text-center`}
            >
              {ai.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <Globe className="w-7 h-7" />,
      title: 'Multi-Language',
      desc: 'Speaks and understands 100+ languages fluently. Perfect for bilingual families.',
      color: 'from-blue-500/10 to-blue-600/5 border-blue-200 dark:border-blue-900',
      iconBg: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    },
    {
      icon: <Mic className="w-7 h-7" />,
      title: 'Voice Assistant',
      desc: 'Powerful AI assistant for questions, homework help, tasks, and smart home control.',
      color: 'from-violet-500/10 to-violet-600/5 border-violet-200 dark:border-violet-900',
      iconBg: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
    },
    {
      icon: <Volume2 className="w-7 h-7" />,
      title: 'Clear & Loud Voice',
      desc: 'Hi-Fi speaker with MAX98357A amplifier delivers crystal-clear audio output.',
      color: 'from-yellow-500/10 to-yellow-600/5 border-yellow-200 dark:border-yellow-900',
      iconBg: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    },
    {
      icon: <Monitor className="w-7 h-7" />,
      title: 'Color Screen',
      desc: '1.8" LCD screen shows expressions, status, and real-time interaction feedback.',
      color: 'from-cyan-500/10 to-cyan-600/5 border-cyan-200 dark:border-cyan-900',
      iconBg: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400',
    },
    {
      icon: <Wifi className="w-7 h-7" />,
      title: 'Wi-Fi & Bluetooth',
      desc: 'Always connected, always ready to help. Supports both wireless standards.',
      color: 'from-emerald-500/10 to-emerald-600/5 border-emerald-200 dark:border-emerald-900',
      iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    },
    {
      icon: <Cpu className="w-7 h-7" />,
      title: 'Open Source',
      desc: 'ESP32-WROOM-32 based and fully customizable. Hack it, mod it, make it yours.',
      color: 'from-rose-500/10 to-rose-600/5 border-rose-200 dark:border-rose-900',
      iconBg: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="font-display font-bold text-xs tracking-[0.2em] uppercase text-primary mb-4"
          >
            What BeepBot Can Do
          </motion.p>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-6xl font-display font-black text-foreground mb-4 sm:mb-6 leading-tight"
          >
            Small Bot.<br />Big Features.
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto font-sans"
          >
            Packed with everything a kid — or a family — could need in a voice companion.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`p-7 rounded-3xl border-2 bg-gradient-to-br ${f.color} relative overflow-hidden group transition-transform`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${f.iconBg} group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-display font-black text-foreground mb-3">{f.title}</h3>
              <p className="text-foreground/70 font-sans leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { icon: <Users className="w-7 h-7" />, label: 'You Speak', color: 'bg-blue-500' },
    { icon: <Mic className="w-7 h-7" />, label: 'I2S Mic', color: 'bg-violet-500' },
    { icon: <Cpu className="w-7 h-7" />, label: 'ESP32 + AI', color: 'bg-primary' },
    { icon: <Speaker className="w-7 h-7" />, label: 'BeepBot Speaks', color: 'bg-emerald-500' },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
      <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-primary rounded-full blur-[100px] opacity-20" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white mb-3 sm:mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-white/60 text-base sm:text-xl font-sans"
          >
            Internet optional — smart enough offline, even smarter online.
          </motion.p>
        </div>

        {/* Mobile: 2×2 grid. Desktop: horizontal row */}
        <div className="grid grid-cols-2 md:flex md:flex-row items-center justify-center gap-6 md:gap-0">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center gap-3 md:gap-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center gap-2 sm:gap-3"
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl ${step.color} flex items-center justify-center text-white shadow-2xl`}>
                  {step.icon}
                </div>
                <span className="font-display font-bold text-xs sm:text-sm text-white/80 text-center max-w-[90px]">{step.label}</span>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.1 }}
                  className="text-white/30 text-3xl font-thin mx-5 hidden md:block"
                >
                  →
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-2 mt-10 sm:mt-12 text-white/50 font-display font-bold text-xs sm:text-sm text-center"
        >
          <Wifi className="w-4 h-4 flex-shrink-0" />
          Internet Optional — enhances AI responses and translation
        </motion.div>
      </div>
    </section>
  );
}

function SpecsSection() {
  const specs = [
    { label: 'MCU', value: 'ESP32-WROOM-32' },
    { label: 'Display', value: '1.8" ST7735S LCD' },
    { label: 'Mic', value: 'I2S MEMS (INMP441)' },
    { label: 'Speaker', value: 'MAX98357A + 3W' },
    { label: 'Connectivity', value: 'Wi-Fi + Bluetooth' },
    { label: 'Storage', value: 'MicroSD (Optional)' },
    { label: 'Power', value: '18650 (2000mAh)' },
    { label: 'Charging', value: 'USB-C' },
    { label: 'Size', value: '90 × 70 × 60mm' },
    { label: 'Weight', value: '~220g' },
  ];

  return (
    <section id="specs" className="py-16 sm:py-24 px-4 sm:px-6 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Spec sheet image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-3 bg-primary/10 rounded-[2.5rem] blur-xl" />
            <img
              src={beepbotSpec}
              alt="BeepBot Product Specifications"
              className="relative rounded-[1.5rem] sm:rounded-[2rem] w-full object-cover shadow-2xl border border-border/30"
            />
          </motion.div>

          {/* Spec table */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} className="font-display font-bold text-xs tracking-[0.2em] uppercase text-primary mb-3 sm:mb-4">
              Hardware Specifications
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-foreground mb-6 sm:mb-8 leading-tight">
              Built for brilliance.<br />Inside and out.
            </motion.h2>

            <div className="space-y-2 sm:space-y-3">
              {specs.map((spec, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex items-center justify-between gap-3 p-3 sm:p-4 bg-card rounded-xl sm:rounded-2xl border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <span className="font-display font-bold text-xs sm:text-sm text-muted-foreground uppercase tracking-wide flex-shrink-0">{spec.label}</span>
                  <span className="font-display font-bold text-foreground text-right text-sm sm:text-base">{spec.value}</span>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeInUp} className="mt-5 sm:mt-6 p-4 sm:p-5 bg-primary/10 border border-primary/20 rounded-xl sm:rounded-2xl">
              <p className="font-display font-bold text-primary text-xs sm:text-sm">
                Open Source — ESP32 based, fully customizable. Build your own skills, connect your own APIs, make BeepBot truly yours.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PerfectForSection() {
  const useCases = [
    { icon: '📚', label: 'Education & E-Learning' },
    { icon: '🌍', label: 'Language Translator' },
    { icon: '🎵', label: 'Stories & Entertainment' },
    { icon: '🤖', label: 'Kids Learning Companion' },
    { icon: '🏠', label: 'Smart Home Controller' },
    { icon: '👴', label: 'Elderly Companion' },
    { icon: '🧑', label: 'Personal Assistant' },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-foreground mb-3 sm:mb-4"
        >
          Perfect for everyone.
        </motion.h2>
        <motion.p
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="text-base sm:text-xl text-muted-foreground mb-10 sm:mb-14 font-sans"
        >
          Small in size, big in intelligence. Always by your side.
        </motion.p>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 sm:gap-4">
          {useCases.map((uc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-card rounded-2xl border-2 border-border hover:border-primary/40 shadow-sm hover:shadow-lg transition-all font-display font-bold text-foreground text-sm sm:text-base"
            >
              <span className="text-xl sm:text-2xl">{uc.icon}</span>
              <span className="text-left">{uc.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 sm:mt-16 inline-flex items-center gap-2 sm:gap-3 bg-foreground text-background px-5 sm:px-8 py-3 sm:py-4 rounded-full font-display font-black text-sm sm:text-lg"
        >
          <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-secondary text-secondary flex-shrink-0" />
          <span>Small Bot. Big Voice. Infinite Possibilities.</span>
          <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-secondary text-secondary flex-shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}

function FounderSection() {
  return (
    <section id="story" className="py-16 sm:py-24 px-4 sm:px-6 bg-secondary/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl -z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Robot image with decorative frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center"
          >
            <div className="absolute -inset-4 bg-white dark:bg-card rounded-[3rem] border-2 border-secondary/40 shadow-2xl transform rotate-2" />
            <div className="relative flex flex-col items-center py-4">
              <motion.img
                src={beepbotHero}
                alt="BeepBot"
                className="relative w-40 sm:w-56 md:w-72 object-contain drop-shadow-2xl"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="absolute -bottom-4 sm:-bottom-8 -right-2 sm:-right-4 bg-accent text-white px-4 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg font-display font-bold text-xs sm:text-sm transform -rotate-3 flex items-center gap-2">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 fill-white" />
                Founded at age 8
              </div>
            </div>
          </motion.div>

          {/* Story text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} className="font-display font-bold text-xs tracking-[0.2em] uppercase text-accent mb-3 sm:mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4 fill-accent" />
              The Heart of BeepBot
            </motion.p>

            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-foreground mb-6 sm:mb-8 leading-tight">
              From a Lemonade Stand to an AI Revolution.
            </motion.h2>

            <div className="space-y-4 sm:space-y-5 font-sans text-base sm:text-lg text-foreground/80 leading-relaxed">
              <motion.p variants={fadeInUp}>
                The story of BeepBot begins with <strong className="text-foreground">Malya</strong> — just 8 years old. She was selling lemonade with her friends when they fired her from her own stand.
              </motion.p>
              <motion.p variants={fadeInUp}>
                Instead of giving up, she made a decision: <strong className="text-foreground">"I'll build my own business — and it'll be bigger than the lemonade stand."</strong>
              </motion.p>
              <motion.p variants={fadeInUp}>
                Through her inventing school, Malya discovered AI learning bots — but they were far too expensive for most families. She believed every kid deserved a brilliant, patient learning companion they could actually afford.
              </motion.p>
              <motion.p variants={fadeInUp} className="font-bold text-primary text-lg sm:text-xl">
                So she decided to build it herself.
              </motion.p>
            </div>

            <motion.blockquote
              variants={fadeInUp}
              className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white dark:bg-card rounded-xl sm:rounded-2xl border-l-4 border-accent shadow-sm"
            >
              <p className="italic text-muted-foreground text-base sm:text-lg font-sans">
                "An 8-year-old building a company to make AI accessible to every family. That's the BeepBot promise — and Malya is just getting started."
              </p>
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PreOrderSection() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section id="preorder" className="py-20 sm:py-32 px-4 sm:px-6 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src={beepbotHero}
            alt="BeepBot"
            className="w-24 sm:w-36 mx-auto mb-6 sm:mb-8 drop-shadow-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-white mb-4 sm:mb-6 leading-tight">
            Be the first family<br className="hidden sm:block" /> to get BeepBot.
          </h2>
          <p className="text-base sm:text-xl md:text-2xl text-white/80 font-sans mb-8 sm:mb-12 max-w-2xl mx-auto">
            Join the waitlist and get exclusive early-bird pricing. Limited pre-orders available.
          </p>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/15 backdrop-blur-md text-white p-8 sm:p-10 rounded-3xl inline-flex flex-col items-center border border-white/25 shadow-2xl mx-auto max-w-sm w-full"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-secondary rounded-full flex items-center justify-center mb-4 sm:mb-5">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-secondary-foreground" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black mb-2 sm:mb-3">You're on the list!</h3>
              <p className="font-sans text-base sm:text-lg text-white/80 max-w-sm">
                Watch your inbox for updates from Malya and the BeepBot team. Big things are coming.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4 max-w-md mx-auto w-full">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl font-sans text-base sm:text-lg border-none focus:ring-4 focus:ring-secondary/50 shadow-lg outline-none text-foreground"
              />
              <input
                type="email"
                placeholder="Parent's email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl font-sans text-base sm:text-lg border-none focus:ring-4 focus:ring-secondary/50 shadow-lg outline-none text-foreground"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full bg-secondary text-secondary-foreground px-6 sm:px-8 py-4 sm:py-5 rounded-2xl font-display font-black text-lg sm:text-xl shadow-[0_6px_0_0_hsl(44,100%,42%)] hover:shadow-[0_3px_0_0_hsl(44,100%,42%)] hover:translate-y-[3px] transition-all flex items-center justify-center gap-2 sm:gap-3"
              >
                Reserve My BeepBot
                <Send className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
              <p className="text-white/50 text-xs sm:text-sm font-sans">No credit card required. Cancel anytime.</p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground py-10 sm:py-12 px-4 sm:px-6 text-white/50 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-white/10">
          <div className="flex items-center">
            <img src={beepbotLogo} alt="BeepBot" className="h-9 w-auto object-contain brightness-0 invert" />
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-center sm:text-left">
          <p className="text-xs sm:text-sm">Built with <Heart className="inline w-3 h-3 sm:w-3.5 sm:h-3.5 fill-red-500 text-red-500" /> using ESP32 — Dreamt up by Malya, age 8.</p>
          <p className="text-xs sm:text-sm">&copy; {new Date().getFullYear()} BeepBot. Small Bot. Big Voice. Infinite Possibilities.</p>
        </div>
      </div>
    </footer>
  );
}
