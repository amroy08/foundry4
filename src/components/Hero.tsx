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
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[600px] md:h-[600px] rounded-full bg-brand-primary/10 blur-[50px] md:blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[200px] h-[200px] md:w-[500px] md:h-[500px] rounded-full bg-brand-secondary/5 blur-[50px] md:blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-1/3 w-[180px] h-[180px] rounded-full bg-brand-accent/5 blur-[40px] md:blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Side Copy */}
        <div className="lg:col-span-7 flex flex-col space-y-8 text-left">
          <motion.div
            initial={!mounted || isMobile ? false : { opacity: 0, y: 15 }}
            animate={!mounted || isMobile ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 w-fit"
          >
            <Sparkles className="h-4 w-4 text-brand-secondary" />
            <span className="text-xs font-semibold tracking-wider text-slate-200 uppercase">
              Next-Gen Agency
            </span>
          </motion.div>

          <motion.h1
            initial={!mounted || isMobile ? false : { opacity: 0, y: 20 }}
            animate={!mounted || isMobile ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] md:leading-[1.08]"
          >
            Technology, Creativity, Data & Marketing —{" "}
            <span className="text-gradient">Built Around Your Business.</span>
          </motion.h1>

          <motion.p
            initial={!mounted || isMobile ? false : { opacity: 0, y: 20 }}
            animate={!mounted || isMobile ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl"
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
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-semibold tracking-wide uppercase transition-all duration-300 bg-brand-primary text-white hover:bg-brand-primary/95 md:hover:scale-[1.03] shadow-xl shadow-brand-primary/25 md:hover:shadow-brand-primary/30 active:scale-[0.98]"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button
              onClick={() => handleScrollTo("services")}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-semibold tracking-wide uppercase transition-all duration-300 border border-white/10 text-white hover:bg-white/5 active:scale-[0.98]"
            >
              Explore Our Services
            </button>
          </motion.div>

          {/* Credibility & Trust Highlights */}
          <motion.div
            initial={!mounted || isMobile ? false : { opacity: 0, y: 25 }}
            animate={!mounted || isMobile ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-10 border-t border-white/5"
          >
            <div className="bg-gradient-to-br from-white/5 to-white/[0.01] border border-white/10 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm max-w-xl">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Globe className="h-24 w-24 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-brand-accent tracking-wider uppercase mb-1.5">
                Real Solutions. Live Projects. Growing Businesses.
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed mb-4">
                Explore websites successfully designed and developed by Foundry4 for clients across education and international trade.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0" />
                  <span className="text-xs font-medium text-slate-200">
                    Live Client Projects
                  </span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Globe className="h-4 w-4 text-brand-primary shrink-0" />
                  <span className="text-xs font-medium text-slate-200">
                    Serving Businesses in India
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side Visual Art / Interactive Graph (Isometric Grid & Floating Service Spheres) */}
        <div className="hidden lg:flex lg:col-span-5 relative justify-center items-center">
          <motion.div
            initial={!mounted || isMobile ? false : { opacity: 0, scale: 0.95 }}
            animate={!mounted || isMobile ? false : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="w-full max-w-[420px] aspect-square rounded-3xl relative flex items-center justify-center"
          >
            {/* Ambient visual background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-brand-secondary/15 rounded-full filter blur-2xl animate-pulse" />

            {/* Rotating central ring */}
            <div className={`absolute w-[80%] h-[80%] border border-dashed border-white/10 rounded-full ${isMobile ? "" : "animate-[spin_60s_linear_infinite]"}`} />
            <div className={`absolute w-[60%] h-[60%] border border-white/5 rounded-full ${isMobile ? "" : "animate-[spin_40s_linear_infinite_reverse]"}`} />

            {/* Interactive SVG geometric representation */}
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full relative z-10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Central Core Sphere */}
              <defs>
                <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
                <linearGradient id="secondaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d946ef" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
                <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>
              </defs>

              <circle cx="200" cy="200" r="80" fill="url(#coreGlow)" />
              <circle
                cx="200"
                cy="200"
                r="35"
                fill="#0b0825"
                stroke="url(#primaryGrad)"
                strokeWidth="2"
              />
              <text
                x="200"
                y="205"
                textAnchor="middle"
                className="fill-white font-extrabold text-[12px] tracking-widest"
              >
                FOUNDRY4
              </text>

              {/* Connected nodes representing 4 departments */}
              {/* Dept 1: Software - Top Left */}
              <line x1="200" y1="200" x2="110" y2="110" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="110" cy="110" r="28" fill="#0c072b" stroke="url(#primaryGrad)" strokeWidth="2" />
              <path d="M104 104l5 5-5 5M116 116l-5-5 5-5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <text x="110" y="152" textAnchor="middle" className="fill-slate-300 font-semibold text-[10px]">SOFTWARE</text>

              {/* Dept 2: Creative - Top Right */}
              <line x1="200" y1="200" x2="290" y2="110" stroke="rgba(217, 70, 239, 0.4)" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="290" cy="110" r="28" fill="#0c072b" stroke="url(#secondaryGrad)" strokeWidth="2" />
              <path d="M282 108a8 8 0 1016 0 8 8 0 10-16 0zM286 114h8" stroke="#d946ef" strokeWidth="1.5" />
              <text x="290" y="152" textAnchor="middle" className="fill-slate-300 font-semibold text-[10px]">CREATIVE</text>

              {/* Dept 3: Data - Bottom Right */}
              <line x1="200" y1="200" x2="290" y2="290" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="290" cy="290" r="28" fill="#0c072b" stroke="url(#accentGrad)" strokeWidth="2" />
              <path d="M280 295v-8m10 8v-14m10 14v-5" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
              <text x="290" y="332" textAnchor="middle" className="fill-slate-300 font-semibold text-[10px]">DATA</text>

              {/* Dept 4: Marketing - Bottom Left */}
              <line x1="200" y1="200" x2="110" y2="290" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="110" cy="290" r="28" fill="#0c072b" stroke="url(#primaryGrad)" strokeWidth="2" />
              <path d="M102 290l8-8 4 4 8-8" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
              <text x="110" y="332" textAnchor="middle" className="fill-slate-300 font-semibold text-[10px]">MARKETING</text>
            </svg>

            {/* Orbiting text pills */}
            <div className="absolute -top-4 -right-2 glass-panel border border-white/10 rounded-full px-4 py-1.5 text-[10px] font-bold text-slate-300 shadow-md">
              🎯 Meta & Google Ads
            </div>
            <div className="absolute bottom-4 -left-6 glass-panel border border-white/10 rounded-full px-4 py-1.5 text-[10px] font-bold text-slate-300 shadow-md">
              📊 BI Dashboards
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <button
          onClick={() => handleScrollTo("about")}
          className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-text-secondary hover:text-white"
          aria-label="Scroll down to Next Section"
        >
          <ArrowDown className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
