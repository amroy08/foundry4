"use client";

import React, { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import { ArrowRight, ArrowDown, Globe, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Animated counter hook
function useCounter(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// Split text into word spans for staggered reveal
function AnimatedTitle({ text, gradient }: { text: string; gradient?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block mr-[0.25em] ${gradient && i >= words.length - 3 ? gradient : ""}`}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
          animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 + i * 0.04, ease: "easeOut" }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const projectCount = useCounter(3, 1200, statsVisible);
  const businessCount = useCounter(12, 1400, statsVisible);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setStatsVisible(true); }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  // card entrance delays defined per card, not in variants
  const cardBase = shouldReduceMotion ? {} : { opacity: 0, y: 30, scale: 0.96 };
  const cardVisible = shouldReduceMotion ? {} : { opacity: 1, y: 0, scale: 1 };


  return (
    <section ref={sectionRef} className="relative min-h-screen pt-32 pb-20 overflow-hidden flex flex-col justify-center bg-grid-pattern">
      {/* Parallax background orbs */}
      <motion.div style={{ y: blobY }} className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[600px] md:h-[600px] rounded-full bg-blue-50/60 blur-[50px] md:blur-[130px] pointer-events-none" />
      <motion.div style={{ y: blobY }} className="absolute bottom-10 right-10 w-[200px] h-[200px] md:w-[500px] md:h-[500px] rounded-full bg-indigo-50/60 blur-[50px] md:blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-1/3 w-[180px] h-[180px] rounded-full bg-sky-50/50 blur-[40px] md:blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Copy */}
        <div className="lg:col-span-7 flex flex-col space-y-8 text-left">
          {/* Badge — typewriter style */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
            animate={shouldReduceMotion ? false : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "backOut" }}
            className="inline-flex items-center space-x-2 bg-blue-50/80 border border-blue-100 rounded-full px-4 py-1.5 w-fit"
          >
            <Sparkles className="h-4 w-4 text-brand-primary" />
            <span className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
              Next-Gen Agency
            </span>
          </motion.div>

          {/* Word-by-word animated H1 */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] md:leading-[1.08]">
            <AnimatedTitle text="Foundry4 — Technology, Creativity, Data &" />
            {" "}
            <motion.span
              className="text-gradient inline-block"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
              animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
            >
              Marketing Built Around Your Business.
            </motion.span>
          </h1>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl"
          >
            {siteConfig.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
          >
            <motion.button
              onClick={() => handleScrollTo("contact")}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-semibold tracking-wide uppercase transition-all duration-300 bg-brand-primary text-white hover:bg-brand-primary/95 shadow-md shadow-blue-100 active:scale-[0.98]"
              whileHover={{ scale: 1.04, boxShadow: "0 8px 24px -4px rgba(37,99,235,0.35)" }}
              whileTap={{ scale: 0.97 }}
            >
              Start Your Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.button>
            <motion.button
              onClick={() => handleScrollTo("services")}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-semibold tracking-wide uppercase transition-all duration-300 border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Our Services
            </motion.button>
          </motion.div>

          {/* Animated Stats */}
          <motion.div
            ref={statsRef}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
            animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="pt-10 border-t border-slate-100"
          >
            <div className="bg-slate-50/60 border border-slate-100 rounded-2xl p-6 relative overflow-hidden max-w-xl shadow-sm">
              {/* shimmer sweep */}
              <div className="absolute inset-0 shimmer-sweep pointer-events-none" />
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Globe className="h-24 w-24 text-slate-900" />
              </div>
              <h3 className="text-sm font-semibold text-brand-primary tracking-wider uppercase mb-1.5">
                Real Solutions. Live Projects. Growing Businesses.
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Explore websites successfully designed and developed by Foundry4 for clients across education and international trade.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0" />
                  <div>
                    <div className="text-xl font-extrabold text-slate-900 tabular-nums">{projectCount}+</div>
                    <span className="text-xs font-medium text-slate-600">Live Client Projects</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Globe className="h-4 w-4 text-brand-primary shrink-0" />
                  <div>
                    <div className="text-xl font-extrabold text-slate-900 tabular-nums">{businessCount}+</div>
                    <span className="text-xs font-medium text-slate-600">Businesses in India</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Dashboard Cards */}
        <div className="hidden lg:flex lg:col-span-5 relative justify-center items-center h-[450px]">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-blue-100/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-indigo-100/10 blur-3xl pointer-events-none" />

          <div className="relative w-full max-w-[400px] h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:16px_16px] opacity-70 pointer-events-none" />

            {/* Main Analytics Card */}
            <motion.div
              initial={cardBase}
              animate={cardVisible}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -8, rotate: -0.5, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="absolute w-[340px] bg-white border border-slate-200 rounded-2xl p-5 shadow-lg relative z-20 cursor-pointer"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-800 tracking-wider uppercase">Analytics Engine</span>
                </div>
                <span className="text-[9px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Live</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-semibold uppercase">Business Conversion Value</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-extrabold text-slate-900 tracking-tight">₹48,25,910</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">↑ 312.4%</span>
                </div>
              </div>
              <div className="h-28 w-full mt-4">
                <svg viewBox="0 0 300 100" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 80 Q 40 50, 80 60 T 160 30 T 240 40 T 300 10 L 300 100 L 0 100 Z" fill="url(#chartGlow)" />
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
                    d="M0 80 Q 40 50, 80 60 T 160 30 T 240 40 T 300 10"
                    fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round"
                  />
                  <motion.circle
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.8 }}
                    cx="300" cy="10" r="4" fill="#ffffff" stroke="#2563eb" strokeWidth="2.5"
                  />
                </svg>
              </div>
              <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono mt-3">
                <span>01 AUG - 27 AUG</span>
                <span>SYSTEM HEALTH: OPTIMAL</span>
              </div>
            </motion.div>

            {/* System Latency Card */}
            <motion.div
              initial={cardBase}
              animate={cardVisible}
              transition={{ duration: 0.6, delay: 0.65 }}
              whileHover={{ y: -10, rotate: 1, scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 18 } }}
              className="absolute -top-4 -left-6 w-[200px] bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl z-30 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">SYSTEM LATENCY</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <div className="text-xl font-extrabold text-white font-mono">42ms</div>
              <p className="text-[9px] text-slate-400 mt-1 leading-relaxed">
                Global Edge network delivering <span className="text-blue-400 font-semibold">99.9% uptime</span>.
              </p>
            </motion.div>

            {/* Campaign ROI Card */}
            <motion.div
              initial={cardBase}
              animate={cardVisible}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ y: -10, rotate: -1, scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 18 } }}
              className="absolute -bottom-8 -right-6 w-[220px] bg-white border border-slate-200 rounded-2xl p-4 shadow-xl z-30 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">CAMPAIGN ROI</span>
                <span className="text-[9px] font-bold text-blue-600">Active</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-base font-extrabold text-slate-900">4.8k leads</span>
                  <span className="text-[10px] text-emerald-600 font-bold">↑ 22.4%</span>
                </div>
                <div className="flex space-x-1 items-end h-6 pt-1">
                  {[40, 60, 50, 70, 95].map((h, i) => (
                    <motion.div
                      key={i}
                      className={`rounded-sm w-full ${i === 4 ? "bg-blue-500" : "bg-slate-100"}`}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 1.2 + i * 0.1, duration: 0.4, ease: "easeOut" }}
                    />
                  ))}
                </div>
                <div className="text-[8px] text-slate-400 leading-tight">Meta, Google, and LinkedIn campaigns.</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Down Cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.button
          onClick={() => handleScrollTo("about")}
          className="p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-slate-600 hover:text-slate-900"
          aria-label="Scroll down"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.button>
      </motion.div>
    </section>
  );
}
