"use client";

import React, { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import { ExternalLink, Check, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const SLIDE_DURATION = 5000;

  const handlePrev = () => {
    setActiveIndex((p) => (p === 0 ? siteConfig.projects.length - 1 : p - 1));
    setProgress(0);
  };

  const handleNext = React.useCallback(() => {
    setActiveIndex((p) => (p === siteConfig.projects.length - 1 ? 0 : p + 1));
    setProgress(0);
  }, []);

  const goTo = (idx: number) => { setActiveIndex(idx); setProgress(0); };

  // Progress bar + auto-advance
  useEffect(() => {
    if (shouldReduceMotion) return;
    let start: number;
    let raf: number;
    let done = false;

    const step = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100 && !done) raf = requestAnimationFrame(step);
      else if (!done) { done = true; handleNext(); }
    };
    raf = requestAnimationFrame(step);
    return () => { done = true; cancelAnimationFrame(raf); };
  }, [activeIndex, handleNext, shouldReduceMotion]);

  const project = siteConfig.projects[activeIndex];

  return (
    <section id="work" className="relative py-24 bg-white border-t border-slate-100 overflow-hidden">
      <div className="absolute top-1/4 left-10 w-[300px] h-[300px] bg-blue-50/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[300px] h-[300px] bg-indigo-50/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3">Featured Portfolio</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Our Work in Action</h3>
          <p className="text-sm text-slate-600 mt-3 max-w-xl mx-auto">
            Explore live corporate systems and educational web platforms designed and deployed by Foundry4 for clients in India.
          </p>
          <div className="h-1 w-12 bg-gradient-to-r from-brand-primary to-brand-accent mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Carousel */}
        <div className="relative min-h-[460px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={shouldReduceMotion ? {} : { opacity: 0, x: 60, scale: 0.97 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, x: 0, scale: 1 }}
              exit={shouldReduceMotion ? {} : { opacity: 0, x: -60, scale: 0.97 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Browser Mockup */}
              <div className="lg:col-span-6 w-full flex justify-center">
                <motion.div
                  className="w-full max-w-[500px] rounded-2xl border border-slate-200 bg-slate-50 shadow-md overflow-hidden relative group"
                  initial={shouldReduceMotion ? false : { x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                >
                  {/* Browser Bar */}
                  <div className="bg-slate-100 border-b border-slate-200 px-4 py-3.5 flex items-center space-x-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                    <div className="h-5 bg-white border border-slate-200 rounded px-3 flex items-center justify-between text-[9px] font-mono text-slate-500 select-none flex-grow mx-4">
                      <span className="truncate">{project.liveUrl}</span>
                      <Globe className="h-3 w-3 text-slate-400 shrink-0" />
                    </div>
                  </div>
                  {/* Screenshot */}
                  <div className="aspect-[16/10] w-full overflow-hidden relative">
                    <Image
                      src={project.id === "mvhs" ? "/images/mvhs.webp" : project.id === "mvhs-erp" ? "/images/mvhs_erp.webp" : "/images/bodals.webp"}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none z-10" />
                  </div>
                </motion.div>
              </div>

              {/* Content Column */}
              <motion.div
                className="lg:col-span-6 space-y-6"
                initial={shouldReduceMotion ? false : { x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
              >
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-brand-primary text-xs font-bold tracking-wider uppercase">Live Project</span>
                  <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium">📍 {project.location}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 leading-tight">{project.title}</h3>
                <div className="text-xs font-semibold text-brand-primary tracking-wider uppercase">Category: {project.category}</div>
                <p className="text-sm text-slate-600 leading-relaxed">{project.description}</p>
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest">Key Deliverables</h4>
                  <ul className="grid grid-cols-1 min-[370px]:grid-cols-2 gap-x-6 gap-y-2.5">
                    {project.keyFeatures.slice(0, 6).map((feat, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start text-xs text-slate-600"
                        initial={shouldReduceMotion ? false : { opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 + i * 0.05 }}
                      >
                        <Check className="h-4 w-4 text-brand-primary shrink-0 mr-2 mt-0.5" />
                        <span>{feat}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4">
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold tracking-wider text-slate-700 hover:text-brand-primary transition-all"
                    whileHover={{ scale: 1.03, borderColor: "#2563eb" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    View Live Website
                    <ExternalLink className="ml-2 h-3.5 w-3.5" />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls + Progress */}
        <div className="flex flex-col items-center gap-4 mt-12">
          <div className="flex items-center space-x-6">
            <motion.button onClick={handlePrev} className="p-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-all text-slate-600 hover:text-brand-primary shadow-sm cursor-pointer" whileHover={{ scale: 1.12, x: -2 }} whileTap={{ scale: 0.92 }} aria-label="Previous">
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            <div className="flex space-x-2">
              {siteConfig.projects.map((_, idx) => (
                <button key={idx} onClick={() => goTo(idx)} className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeIndex === idx ? "w-8 bg-brand-primary" : "w-2 bg-slate-200 hover:bg-slate-300"}`} aria-label={`Go to slide ${idx + 1}`} />
              ))}
            </div>
            <motion.button onClick={handleNext} className="p-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-all text-slate-600 hover:text-brand-primary shadow-sm cursor-pointer" whileHover={{ scale: 1.12, x: 2 }} whileTap={{ scale: 0.92 }} aria-label="Next">
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Auto-slide progress bar */}
          {!shouldReduceMotion && (
            <div className="w-48 h-0.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-brand-primary rounded-full transition-none" style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
