import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Globe2, Mic, Volume2, MonitorPlay, Wifi, CheckCircle2, Zap, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import robotHero from "@assets/46822828-644F-4E3A-965C-DDD72FDBCCD1_1786241339014.png";
// @ts-ignore
import beepbotLogo from "@assets/BB1_1786445338290.png";

const preOrderSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
});

type PreOrderValues = z.infer<typeof preOrderSchema>;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const features = [
  { icon: Globe2,      title: "Multi-Language",   desc: "Speaks and understands 100+ languages fluently." },
  { icon: Mic,         title: "Voice Assistant",   desc: "Answers questions, tells stories, and helps with homework." },
  { icon: Volume2,     title: "Clear & Loud",      desc: "Crystal-clear voice that fills a room." },
  { icon: MonitorPlay, title: "Expressive Face",   desc: "Animated screen that reacts as it talks." },
  { icon: Wifi,        title: "Always Ready",      desc: "Connects to Wi-Fi so it's always up to date." },
  { icon: Heart,       title: "Kid-Friendly",      desc: "Designed to be safe, gentle, and fun for all ages." },
];

const steps = [
  { label: "You Ask",          icon: Mic },
  { label: "BeepBot Listens",  icon: Zap },
  { label: "AI Thinks",        icon: Globe2 },
  { label: "BeepBot Answers",  icon: Volume2 },
];

const aiModels = ["ChatGPT", "DeepSeek", "Claude", "Gemini"];

export default function Home() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(true);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PreOrderValues>({
    resolver: zodResolver(preOrderSchema),
  });

  const onSubmit = async (_data: PreOrderValues) => {
    await new Promise((r) => setTimeout(r, 800));
    setIsSuccess(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("pre-order-section");
      if (el) setShowStickyCTA(el.getBoundingClientRect().top >= window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPreOrder = () =>
    document.getElementById("pre-order-section")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="relative w-full bg-background min-h-[100dvh] overflow-x-hidden selection:bg-primary selection:text-primary-foreground pb-[80px] lg:pb-0">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <img src={beepbotLogo} alt="BeepBot" className="h-8 w-auto object-contain brightness-0 invert" />
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="#story-section" className="hover:text-foreground transition-colors">Our Story</a>
          </div>
          <Button size="default" className="hidden md:flex" onClick={scrollToPreOrder}>Pre-Order Now</Button>
          <Button size="default" className="md:hidden" onClick={scrollToPreOrder}>Pre-Order</Button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative px-6 pt-12 pb-16 lg:pt-20 lg:pb-28 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Mobile: stacked  |  Desktop: side-by-side */}
          <div className="flex flex-col items-center text-center lg:flex-row lg:items-center lg:text-left lg:gap-16">

            {/* Robot image — top on mobile, right on desktop */}
            <motion.div
              className="order-first lg:order-last flex-shrink-0 flex justify-center lg:justify-end w-full lg:w-auto mb-8 lg:mb-0"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.img
                src={robotHero}
                alt="BeepBot"
                className="h-[260px] sm:h-[320px] lg:h-[440px] object-contain drop-shadow-2xl"
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Text block */}
            <div className="flex-1 flex flex-col items-center lg:items-start">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Zap className="w-3.5 h-3.5" /> Your Smart Voice Companion
              </motion.div>

              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-foreground mb-4 text-glow tracking-tight leading-none"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                BEEPBOT
              </motion.h1>

              <motion.p
                className="text-muted-foreground text-base sm:text-lg lg:text-xl mb-8 max-w-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Speak Any Language. Understand Everyone. The AI companion built for every family.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button size="lg" className="w-full sm:w-auto text-base px-8" onClick={scrollToPreOrder}>
                  Pre-Order Now <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button size="lg" variant="secondary" className="w-full sm:w-auto" onClick={() => document.getElementById("story-section")?.scrollIntoView({ behavior: "smooth" })}>
                  Our Story
                </Button>
              </motion.div>

              <motion.div
                className="flex flex-wrap justify-center lg:justify-start gap-2 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {["100+ Languages", "Kids & Families", "Always Learning"].map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-full bg-card border border-border text-xs sm:text-sm font-semibold text-muted-foreground">
                    {s}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Powered By ── */}
      <section className="py-8 border-y border-border/50 bg-card/30">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-widest mb-5">
            AI Intelligence Powered By
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {aiModels.map((ai) => (
              <div key={ai} className="px-4 py-2 bg-card border border-border rounded-xl shadow-sm text-sm font-bold flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                {ai}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="px-6 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          >
            Superpowers in a tiny bot.
          </motion.h2>
          <motion.p
            className="text-center text-muted-foreground mb-12 max-w-xl mx-auto"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          >
            Everything a kid — or a whole family — could ever need from a voice companion.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-card border border-border rounded-3xl p-5 flex items-start gap-4 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-base lg:text-lg font-bold text-foreground mb-1">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="px-6 py-16 lg:py-24 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          >
            How It Works
          </motion.h2>

          <motion.div
            className="flex flex-col lg:flex-row items-center lg:items-stretch gap-4 lg:gap-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            {steps.map((item, i, arr) => (
              <React.Fragment key={i}>
                <motion.div variants={fadeInUp} className="flex flex-col items-center text-center flex-1">
                  <div className="bg-background border-2 border-primary/40 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-primary/10">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-xs font-bold text-primary/60 uppercase tracking-widest mb-1">Step {i + 1}</div>
                  <div className="text-base font-bold text-foreground">{item.label}</div>
                </motion.div>

                {/* Arrow — vertical on mobile, horizontal on desktop */}
                {i !== arr.length - 1 && (
                  <div className="flex items-center justify-center text-primary/40 lg:mx-2">
                    <ArrowRight className="w-5 h-5 hidden lg:block" />
                    <div className="w-[2px] h-6 bg-primary/30 rounded-full lg:hidden" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Malya's Story ── */}
      <section id="story-section" className="px-6 py-16 lg:py-24 bg-accent text-accent-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Robot on desktop */}
            <motion.div
              className="hidden lg:flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.img
                src={robotHero}
                alt="BeepBot"
                className="h-[380px] object-contain drop-shadow-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Story text */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="inline-block px-4 py-1.5 bg-black/10 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                Founded at age 8
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                From a Lemonade Stand to an AI Revolution.
              </h2>

              <div className="space-y-4 text-base lg:text-lg font-medium leading-relaxed opacity-90">
                <p>When 8-year-old Malya was "fired" from a neighborhood lemonade stand by her friends, she decided to build something bigger than lemonade.</p>
                <p>She discovered AI bots but found them far too expensive for kids. Enrolled in an inventing school, she decided to build her own.</p>
                <p>Months of building, testing, and dreaming led to BeepBot — a smart, friendly, and affordable companion for every family.</p>
              </div>

              <blockquote className="mt-8 p-5 bg-background/10 border-l-4 border-background/60 rounded-r-2xl font-bold text-lg italic">
                "I wanted to build a robot that could talk to anyone in the world. So I did."
                <span className="text-sm font-semibold opacity-70 mt-2 block">— Malya</span>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Pre-Order ── */}
      <section id="pre-order-section" className="px-6 py-16 lg:py-24 bg-card relative">
        <div className="max-w-lg mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <div className="flex justify-center mb-6">
              <img src={robotHero} alt="BeepBot" className="h-28 lg:h-36 object-contain drop-shadow-md" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-center text-foreground">
              Be the first family to get BeepBot.
            </h2>
            <p className="text-center text-muted-foreground mb-8 text-sm">
              Join the waitlist to secure your spot in line.
            </p>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div>
                    <Input
                      placeholder="Parent's Name"
                      {...register("name")}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && <p className="text-destructive text-sm mt-1.5 ml-2 font-medium">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      {...register("email")}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-destructive text-sm mt-1.5 ml-2 font-medium">{errors.email.message}</p>}
                  </div>
                  <Button type="submit" size="lg" className="w-full mt-2 h-14 text-lg" disabled={isSubmitting}>
                    {isSubmitting ? "Securing Spot..." : "Pre-Order Now"}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground mt-1 font-medium">
                    No credit card required. Cancel anytime.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="bg-primary/10 border border-primary/20 rounded-3xl p-8 flex flex-col items-center text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}>
                    <CheckCircle2 className="w-16 h-16 text-primary mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground mb-2">You're on the list!</h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    We'll email you as soon as BeepBot is ready to ship. Keep an eye on your inbox.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 py-10 bg-background border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <img src={beepbotLogo} alt="BeepBot" className="h-8 w-auto object-contain brightness-0 invert" />
          <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <p className="text-sm text-muted-foreground font-medium bg-card px-4 py-2 rounded-full border border-border">
            Dreamt up by Malya, age 8
          </p>
        </div>
      </footer>

      {/* ── Sticky bottom CTA — mobile only ── */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 p-4 pb-6 bg-gradient-to-t from-background via-background to-transparent z-50 pointer-events-none lg:hidden"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
          >
            <div className="pointer-events-auto max-w-[430px] mx-auto">
              <Button size="lg" className="w-full shadow-2xl h-14" onClick={scrollToPreOrder}>
                Pre-Order BeepBot
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
