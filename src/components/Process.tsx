"use client";

import React, { useRef } from "react";
import { siteConfig } from "@/config/site";
import { CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Mouse tilt card hook
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
  };
  const resetTilt = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <div ref={ref} onMouseMove={handleMouse} onMouseLeave={resetTilt} className={`transition-transform duration-100 ${className}`}>
      {children}
    </div>
  );
}

export default function Process() {
  const [activeStep, setActiveStep] = React.useState(0);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % siteConfig.processSteps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="process" className="relative py-24 bg-slate-50 border-t border-slate-100 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* ===== WHY CHOOSE US ===== */}
        <div className="mb-24">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3">Why Partner With Us</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">A Business-Focused Approach</h3>
            <div className="h-1 w-12 bg-gradient-to-r from-brand-primary to-brand-accent mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.whyChooseUs.map((benefit, bIdx) => (
              <motion.div
                key={benefit.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: bIdx * 0.09 }}
              >
                <TiltCard className="h-full bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 cursor-default" >
                  <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                    <motion.div whileHover={{ rotate: 15, scale: 1.2 }} transition={{ type: "spring", stiffness: 400 }}>
                      <CheckCircle2 className="h-5 w-5 text-brand-primary" />
                    </motion.div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{benefit.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{benefit.description}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ===== PROCESS TIMELINE ===== */}
        <div>
          <motion.div
            className="text-center max-w-3xl mx-auto mb-20"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3">Execution Strategy</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Our 6-Step Delivery Lifecycle</h3>
            <div className="h-1 w-12 bg-gradient-to-r from-brand-primary to-brand-accent mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="relative">
            {/* Animated center line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 pointer-events-none">
              <div className="absolute inset-0 bg-slate-200" />
              <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none">
                <line x1="1" y1="0" x2="1" y2="100%" stroke="#2563eb" strokeWidth="2" strokeDasharray="6 6" className="animate-timeline-dash" style={{ strokeDashoffset: 300 }} />
              </svg>
            </div>

            <div className="space-y-12 lg:space-y-0 relative">
              {siteConfig.processSteps.map((step, index) => {
                const isEven = index % 2 === 0;
                const isActive = index === activeStep;
                return (
                  <div
                    key={step.step}
                    className={`flex flex-col lg:flex-row items-center justify-between lg:min-h-[160px] ${isEven ? "" : "lg:flex-row-reverse"}`}
                  >
                    {/* Card */}
                    <motion.div
                      className="w-full lg:w-[45%] flex flex-col justify-center"
                      initial={shouldReduceMotion ? false : { opacity: 0, x: isEven ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.07 }}
                    >
                      <div
                        onClick={() => setActiveStep(index)}
                        className={`rounded-2xl p-6 relative transition-all duration-500 cursor-pointer overflow-hidden ${
                          isActive
                            ? "border-brand-primary shadow-lg bg-white scale-[1.02] ring-4 ring-blue-50/60 opacity-100 z-20 border"
                            : "border-slate-200 shadow-sm bg-white/70 opacity-55 scale-[0.98] hover:opacity-80 border"
                        }`}
                      >
                        {/* Active shimmer sweep */}
                        <AnimatePresence>
                          {isActive && !shouldReduceMotion && (
                            <motion.div
                              key="shimmer"
                              className="absolute inset-0 pointer-events-none"
                              initial={{ x: "-100%" }}
                              animate={{ x: "200%" }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.7, ease: "easeInOut" }}
                              style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.06), transparent)" }}
                            />
                          )}
                        </AnimatePresence>

                        <div className={`absolute top-4 right-4 text-[10px] font-mono font-bold px-2 py-0.5 rounded lg:hidden transition-colors duration-500 ${isActive ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500 border border-slate-200"}`}>
                          STEP {step.step}
                        </div>
                        <h3 className={`text-base font-bold mb-2 tracking-wide transition-colors duration-500 ${isActive ? "text-blue-600" : "text-slate-900"}`}>{step.title}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                      </div>
                    </motion.div>

                    {/* Timeline node */}
                    <div className="hidden lg:flex items-center justify-center w-[10%] relative z-10">
                      <motion.div
                        onClick={() => setActiveStep(index)}
                        className={`h-10 w-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-500 cursor-pointer ${
                          isActive
                            ? "bg-brand-primary text-white border-brand-primary scale-110 shadow-lg shadow-blue-200 border-2"
                            : "bg-white text-slate-400 border-slate-200 border-2 hover:border-slate-300 hover:text-slate-600"
                        }`}
                        animate={isActive && !shouldReduceMotion ? { scale: [1, 1.4, 1.1] } : {}}
                        transition={{ duration: 0.4, ease: "backOut" }}
                      >
                        {step.step}
                      </motion.div>
                    </div>

                    <div className="hidden lg:block w-[45%]" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
