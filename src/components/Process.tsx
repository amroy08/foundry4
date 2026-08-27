"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Process() {
  return (
    <section id="process" className="relative py-24 bg-slate-50 border-t border-slate-100 overflow-hidden">
      {/* Inline styles for custom dash animation */}
      <style>{`
        @keyframes timelineDash {
          from { stroke-dashoffset: 300; }
          to { stroke-dashoffset: 0; }
        }
        .animate-timeline-dash {
          animation: timelineDash 15s linear infinite;
        }
      `}</style>

      {/* Background gradients */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* ================= WHY CHOOSE US ================= */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3">
              Why Partner With Us
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              A Business-Focused Approach
            </h3>
            <div className="h-1 w-12 bg-gradient-to-r from-brand-primary to-brand-accent mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.whyChooseUs.map((benefit, bIdx) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: bIdx * 0.1 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-300 hover:border-slate-350 shadow-sm"
              >
                <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-5 w-5 text-brand-primary" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= WORK PROCESS TIMELINE ================= */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3">
              Execution Strategy
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our 6-Step Delivery Lifecycle
            </h3>
            <div className="h-1 w-12 bg-gradient-to-r from-brand-primary to-brand-accent mx-auto mt-4 rounded-full" />
          </div>

          {/* Timeline Grid */}
          <div className="relative">
            {/* Center connector line (Desktop only) with high level flow animation */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 pointer-events-none">
              <div className="absolute inset-0 bg-slate-200" />
              <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none">
                <line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="100%"
                  stroke="#2563eb"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  className="animate-timeline-dash"
                  style={{ strokeDashoffset: 300 }}
                />
              </svg>
            </div>

            <div className="space-y-12 lg:space-y-0 relative">
              {siteConfig.processSteps.map((step, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={step.step}
                    className={`flex flex-col lg:flex-row items-center justify-between lg:min-h-[160px] ${
                      isEven ? "" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Panel Left/Right */}
                    <div className="w-full lg:w-[45%] flex flex-col justify-center">
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="glass-card rounded-2xl p-6 relative"
                      >
                        {/* Mobile Step Badge */}
                        <div className="absolute top-4 right-4 text-xs font-mono font-bold px-2 py-0.5 bg-blue-50 text-brand-primary border border-blue-100 rounded lg:hidden">
                          STEP {step.step}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-wide">
                          {step.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {step.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Timeline Node Center (Desktop only) */}
                    <div className="hidden lg:flex items-center justify-center w-[10%] relative z-10">
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 120, delay: 0.05 }}
                        className="h-10 w-10 rounded-full bg-white border-2 border-brand-primary flex items-center justify-center font-mono text-xs font-bold text-brand-primary shadow-sm shadow-blue-100"
                      >
                        {step.step}
                      </motion.div>
                    </div>

                    {/* Spacer panel for even columns */}
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
