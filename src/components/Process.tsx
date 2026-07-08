import React from "react";
import { siteConfig } from "@/config/site";
import { CheckCircle2 } from "lucide-react";

export default function Process() {
  return (
    <section id="process" className="relative py-24 bg-bg-dark border-t border-white/5">
      {/* Background gradients */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* ================= WHY CHOOSE US ================= */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-3">
              Why Partner With Us
            </h2>
            <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              A Business-Focused Approach
            </p>
            <div className="h-1 w-12 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.whyChooseUs.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.03] hover:border-white/10"
              >
                <div className="h-10 w-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-5 w-5 text-brand-primary" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= WORK PROCESS TIMELINE ================= */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3">
              Execution Strategy
            </h2>
            <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Our 6-Step Delivery Lifecycle
            </p>
            <div className="h-1 w-12 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto mt-4 rounded-full" />
          </div>

          {/* Timeline Grid */}
          <div className="relative">
            {/* Center connector line (Desktop only) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-primary via-brand-secondary to-brand-accent -translate-x-1/2 opacity-20" />

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
                      <div className="glass-card rounded-2xl p-6 relative">
                        {/* Mobile Step Badge */}
                        <div className="absolute top-4 right-4 text-xs font-mono font-bold px-2 py-0.5 bg-brand-primary/20 text-brand-primary border border-brand-primary/25 rounded lg:hidden">
                          STEP {step.step}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 tracking-wide">
                          {step.title}
                        </h3>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Timeline Node Center (Desktop only) */}
                    <div className="hidden lg:flex items-center justify-center w-[10%] relative z-10">
                      <div className="h-10 w-10 rounded-full bg-[#030014] border-2 border-brand-primary flex items-center justify-center font-mono text-xs font-bold text-white shadow-lg shadow-brand-primary/20">
                        {step.step}
                      </div>
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
