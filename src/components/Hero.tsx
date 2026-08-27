"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { ArrowRight, ArrowDown, Globe, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timer);
    };
  }, []);

  const handleScrollTo = (id: string) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex flex-col justify-center bg-grid-pattern">
      {/* Visual background gradient glow orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[600px] md:h-[600px] rounded-full bg-blue-50/50 blur-[50px] md:blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[200px] h-[200px] md:w-[500px] md:h-[500px] rounded-full bg-indigo-50/50 blur-[50px] md:blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-1/3 w-[180px] h-[180px] rounded-full bg-sky-50/40 blur-[40px] md:blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Side Copy */}
        <div className="lg:col-span-7 flex flex-col space-y-8 text-left">
          <motion.div
            initial={!mounted || isMobile ? false : { opacity: 0, y: 15 }}
            animate={!mounted || isMobile ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center space-x-2 bg-blue-50/60 border border-blue-100 rounded-full px-4 py-1.5 w-fit"
          >
            <Sparkles className="h-4 w-4 text-brand-primary" />
            <span className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
              Next-Gen Agency
            </span>
          </motion.div>

          <motion.h1
            initial={!mounted || isMobile ? false : { opacity: 0, y: 20 }}
            animate={!mounted || isMobile ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] md:leading-[1.08]"
          >
            Foundry4 — Technology, Creativity, Data & Marketing{" "}
            <span className="text-gradient">Built Around Your Business.</span>
          </motion.h1>

          <motion.p
            initial={!mounted || isMobile ? false : { opacity: 0, y: 20 }}
            animate={!mounted || isMobile ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl"
          >
            {siteConfig.description}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={!mounted || isMobile ? false : { opacity: 0, y: 20 }}
            animate={!mounted || isMobile ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
          >
            <button
              onClick={() => handleScrollTo("contact")}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-semibold tracking-wide uppercase transition-all duration-300 bg-brand-primary text-white hover:bg-brand-primary/95 md:hover:scale-[1.03] shadow-md shadow-blue-100 active:scale-[0.98]"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button
              onClick={() => handleScrollTo("services")}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-semibold tracking-wide uppercase transition-all duration-300 border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98]"
            >
              Explore Our Services
            </button>
          </motion.div>

          {/* Credibility & Trust Highlights */}
          <motion.div
            initial={!mounted || isMobile ? false : { opacity: 0, y: 25 }}
            animate={!mounted || isMobile ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-10 border-t border-slate-100"
          >
            <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 relative overflow-hidden max-w-xl shadow-sm">
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
                  <span className="text-xs font-medium text-slate-700">
                    Live Client Projects
                  </span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Globe className="h-4 w-4 text-brand-primary shrink-0" />
                  <span className="text-xs font-medium text-slate-700">
                    Serving Businesses in India
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>        {/* Right Side Visual Art: Corporate Dashboard Mockup Stack */}
        <div className="hidden lg:flex lg:col-span-5 relative justify-center items-center h-[450px]">
          {/* Ambient Glows */}
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-blue-100/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-indigo-100/10 blur-3xl pointer-events-none" />

          {/* Interactive Card Stack */}
          <div className="relative w-full max-w-[400px] h-full flex items-center justify-center">
            
            {/* Background decorative dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:16px_16px] opacity-70 pointer-events-none" />

            {/* Card 1: Main Platform Analytics Card (Middle/Base) */}
            <motion.div
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="absolute w-[340px] bg-white border border-slate-200 rounded-2xl p-5 shadow-lg relative z-20"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-800 tracking-wider uppercase">Analytics Engine</span>
                </div>
                <span className="text-[9px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Live</span>
              </div>

              {/* Metric Title */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-semibold uppercase">Business Conversion Value</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-extrabold text-slate-900 tracking-tight">₹48,25,910</span>
                  <span className="text-xs font-bold text-emerald-605 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center text-emerald-600">
                    ↑ 312.4%
                  </span>
                </div>
              </div>

              {/* SVG Line Graph */}
              <div className="h-28 w-full mt-4">
                <svg viewBox="0 0 300 100" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Fill path */}
                  <path
                    d="M0 80 Q 40 50, 80 60 T 160 30 T 240 40 T 300 10 L 300 100 L 0 100 Z"
                    fill="url(#chartGlow)"
                  />
                  {/* Line path */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    d="M0 80 Q 40 50, 80 60 T 160 30 T 240 40 T 300 10"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Dot on target */}
                  <circle cx="300" cy="10" r="4" fill="#ffffff" stroke="#2563eb" strokeWidth="2.5" />
                </svg>
              </div>

              {/* Footnote */}
              <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono mt-3">
                <span>01 AUG - 27 AUG</span>
                <span>SYSTEM HEALTH: OPTIMAL</span>
              </div>
            </motion.div>

            {/* Card 2: Software Latency / API Card (Top Left - Overlapping) */}
            <motion.div
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
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

            {/* Card 3: Marketing Leads / Ads Card (Bottom Right - Overlapping) */}
            <motion.div
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
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
                {/* Visual bar graph representation */}
                <div className="flex space-x-1 items-end h-6 pt-1">
                  <div className="bg-slate-100 rounded-sm w-full h-[40%]" />
                  <div className="bg-slate-100 rounded-sm w-full h-[60%]" />
                  <div className="bg-slate-100 rounded-sm w-full h-[50%]" />
                  <div className="bg-slate-200 rounded-sm w-full h-[70%]" />
                  <div className="bg-blue-500 rounded-sm w-full h-[95%]" />
                </div>
                <div className="text-[8px] text-slate-400 leading-tight">
                  Meta, Google, and LinkedIn campaigns fully optimized.
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <button
          onClick={() => handleScrollTo("about")}
          className="p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-slate-600 hover:text-slate-900"
          aria-label="Scroll down to Next Section"
        >
          <ArrowDown className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
