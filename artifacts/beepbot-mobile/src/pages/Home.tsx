import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Globe2, Mic, Volume2, MonitorPlay, Wifi, Cpu, CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Assets
import robotHero from "@assets/46822828-644F-4E3A-965C-DDD72FDBCCD1_1786241339014.png";
import robotSpecs from "@assets/D0483BFE-5004-456A-8CA5-CB52A31DE290_1786241251828.png";

// Validation Schema
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
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PreOrderValues>({
    resolver: zodResolver(preOrderSchema),
  });

  const onSubmit = async (data: PreOrderValues) => {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSuccess(true);
  };

  // Sticky bottom bar visibility logic: Hide if user scrolled down to the actual form
  const [showStickyCTA, setShowStickyCTA] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const formEl = document.getElementById("pre-order-section");
      if (formEl) {
        const rect = formEl.getBoundingClientRect();
        // If the top of the form section is within the viewport height, hide the sticky CTA
        if (rect.top < window.innerHeight) {
          setShowStickyCTA(false);
        } else {
          setShowStickyCTA(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPreOrder = () => {
    document.getElementById("pre-order-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative mx-auto w-full max-w-[430px] bg-background min-h-[100dvh] overflow-x-hidden selection:bg-primary selection:text-primary-foreground pb-[100px]">
      
      {/* 1. Hero Section */}
      <section className="relative px-6 pt-12 pb-16 flex flex-col items-center text-center">
        {/* Ambient glow behind robot */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 w-full flex justify-center mb-6"
        >
          <motion.img 
            src={robotHero} 
            alt="BeepBot" 
            className="h-[280px] object-contain drop-shadow-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.h1 
          className="text-5xl font-extrabold text-foreground mb-3 text-glow tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          BEEPBOT
        </motion.h1>
        
        <motion.p 
          className="text-xl font-medium text-primary mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Your Smart Voice Companion
        </motion.p>
        
        <motion.p 
          className="text-muted-foreground text-base mb-8 max-w-[280px] mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Speak Any Language. Understand Everyone.
        </motion.p>

        <motion.div 
          className="flex flex-col gap-4 w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button size="lg" className="w-full text-lg" onClick={scrollToPreOrder}>
            Pre-Order Now
          </Button>
          <Button size="lg" variant="secondary" className="w-full" onClick={() => document.getElementById("story-section")?.scrollIntoView({ behavior: "smooth" })}>
            Our Story
          </Button>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {["100+ Languages", "ESP32", "USB-C"].map((stat) => (
            <div key={stat} className="px-3 py-1.5 rounded-full bg-card border border-border text-sm font-semibold text-muted-foreground">
              {stat}
            </div>
          ))}
        </motion.div>
      </section>

      {/* 2. Powered By */}
      <section className="py-8 border-y border-border/50 bg-card/30">
        <p className="text-center text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">
          AI Intelligence Powered By
        </p>
        {/* Horizontal scroll container but we'll use a wrapping flex for guaranteed visibility on mobile */}
        <div className="flex flex-wrap justify-center gap-3 px-6">
          {["ChatGPT", "DeepSeek", "Claude", "Gemini"].map((ai) => (
            <div key={ai} className="px-4 py-2 bg-card border border-border rounded-xl shadow-sm text-sm font-bold flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" />
              {ai}
            </div>
          ))}
        </div>
      </section>

      {/* 3. Key Features */}
      <section className="px-6 py-16 flex flex-col gap-4">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Superpowers in a tiny bot.</h2>
        </motion.div>

        <motion.div 
          className="flex flex-col gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {[
            { icon: Globe2, title: "Multi-Language", desc: "Speaks and understands 100+ languages." },
            { icon: Mic, title: "Voice Assistant", desc: "Powerful AI for questions, tasks & learning." },
            { icon: Volume2, title: "Clear & Loud", desc: "Hi-Fi speaker for crystal clear voice output." },
            { icon: MonitorPlay, title: "Color Screen", desc: "1.8\" LCD face packed with expressions." },
            { icon: Wifi, title: "Always Connected", desc: "Wi-Fi & Bluetooth always ready to help." },
            { icon: Cpu, title: "Open Source", desc: "ESP32 based – fully hackable & customizable." },
          ].map((feature, i) => (
            <motion.div key={i} variants={fadeInUp} className="bg-card border border-border rounded-3xl p-5 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. How It Works */}
      <section className="px-6 py-16 bg-card/30 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-border -z-10" />
        
        <motion.h2 
          className="text-3xl font-bold mb-12 text-center"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        >
          How It Works
        </motion.h2>

        <motion.div 
          className="flex flex-col gap-6"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        >
          {[
            { step: "1", label: "You Speak", icon: Mic },
            { step: "2", label: "I2S Mic Array", icon: Cpu },
            { step: "3", label: "ESP32 AI Processing", icon: Zap },
            { step: "4", label: "BeepBot Speaks", icon: Volume2 },
          ].map((item, i, arr) => (
            <motion.div key={i} variants={fadeInUp} className="relative z-10 flex flex-col items-center">
              <div className="bg-background border-2 border-border w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-lg">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="bg-card border border-border px-5 py-3 rounded-2xl font-bold text-center w-full shadow-sm">
                {item.label}
              </div>
              {i !== arr.length - 1 && (
                <div className="w-[2px] h-6 bg-primary/50 mt-4 rounded-full" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. Specs */}
      <section className="px-6 py-16">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-center"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        >
          The Hardware
        </motion.h2>
        
        <motion.div 
          className="rounded-3xl overflow-hidden border border-border bg-card shadow-xl mb-8"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        >
          <img src={robotSpecs} alt="BeepBot Specifications" className="w-full h-auto" />
        </motion.div>

        <motion.div 
          className="bg-card border border-border rounded-3xl p-6"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        >
          <ul className="flex flex-col gap-4 text-sm font-medium">
            <li className="flex justify-between border-b border-border/50 pb-3">
              <span className="text-muted-foreground">MCU</span>
              <span className="text-right font-bold text-foreground">ESP32-WROOM-32</span>
            </li>
            <li className="flex justify-between border-b border-border/50 pb-3">
              <span className="text-muted-foreground">Display</span>
              <span className="text-right font-bold text-foreground">1.8" ST7735S LCD</span>
            </li>
            <li className="flex justify-between border-b border-border/50 pb-3">
              <span className="text-muted-foreground">Mic</span>
              <span className="text-right font-bold text-foreground">I2S Digital MEMS</span>
            </li>
            <li className="flex justify-between border-b border-border/50 pb-3">
              <span className="text-muted-foreground">Speaker</span>
              <span className="text-right font-bold text-foreground">MAX98357A + 3W</span>
            </li>
            <li className="flex justify-between border-b border-border/50 pb-3">
              <span className="text-muted-foreground">Power</span>
              <span className="text-right font-bold text-foreground">18650 (2000mAh)</span>
            </li>
            <li className="flex justify-between border-b border-border/50 pb-3">
              <span className="text-muted-foreground">Charging</span>
              <span className="text-right font-bold text-foreground">USB-C</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Connectivity</span>
              <span className="text-right font-bold text-foreground">Wi-Fi + Bluetooth</span>
            </li>
          </ul>
        </motion.div>
      </section>

      {/* 6. Malya's Story */}
      <section id="story-section" className="px-6 py-16 bg-accent text-accent-foreground rounded-t-[40px] mt-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full pointer-events-none" />
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <div className="inline-block px-4 py-1.5 bg-black/10 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
            Founded at age 8
          </div>
          <h2 className="text-3xl font-extrabold mb-6 leading-tight">
            From a Lemonade Stand to an AI Revolution.
          </h2>
          
          <div className="space-y-4 text-base font-medium leading-relaxed opacity-90">
            <p>
              When 8-year-old Malya was "fired" from a neighborhood lemonade stand by her friends, she decided to build something bigger than lemonade.
            </p>
            <p>
              She discovered AI bots but found them far too expensive for kids. Enrolled in an inventing school, she decided to build her own.
            </p>
            <p>
              Months of prototyping, learning about the ESP32, and coding led to BeepBot — a smart, friendly, and affordable companion for everyone.
            </p>
          </div>

          <blockquote className="mt-8 p-5 bg-background/10 border-l-4 border-background rounded-r-2xl font-bold text-lg italic">
            "I wanted to build a robot that could talk to anyone in the world. So I did." <br/>
            <span className="text-sm font-semibold opacity-70 mt-2 block">— Malya</span>
          </blockquote>
        </motion.div>
      </section>

      {/* 7. Pre-Order */}
      <section id="pre-order-section" className="px-6 pt-16 pb-24 bg-card rounded-t-[40px] -mt-6 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <div className="flex justify-center mb-6">
            <img src={robotHero} alt="BeepBot" className="h-32 object-contain drop-shadow-md" />
          </div>
          
          <h2 className="text-3xl font-bold mb-2 text-center text-foreground">
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

                <Button type="submit" size="lg" className="w-full mt-2 h-16 text-lg" disabled={isSubmitting}>
                  {isSubmitting ? "Securing Spot..." : "Pre-Order Now"}
                </Button>
                
                <p className="text-center text-sm text-muted-foreground mt-2 font-medium">
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
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                >
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
      </section>

      {/* 8. Footer */}
      <footer className="px-6 py-12 text-center bg-background border-t border-border">
        <h2 className="text-2xl font-extrabold text-foreground mb-6 text-glow tracking-tight">BEEPBOT</h2>
        <div className="flex justify-center gap-6 mb-8 text-sm font-semibold text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
        </div>
        <p className="text-sm text-muted-foreground font-medium bg-card inline-block px-4 py-2 rounded-full border border-border shadow-sm">
          Dreamt up by Malya, age 8
        </p>
      </footer>

      {/* Sticky Bottom Bar */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div 
            className="fixed bottom-0 left-0 right-0 w-full max-w-[430px] mx-auto p-4 pb-6 bg-gradient-to-t from-background via-background to-transparent z-50 pointer-events-none"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
          >
            <div className="pointer-events-auto">
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
