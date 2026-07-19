import React from "react";
import { siteConfig } from "@/config/site";
import { Layers, ShieldCheck, Zap } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative py-24 bg-[#02000a] overflow-hidden">
      {/* Visual background glows */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-brand-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Copy Column */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-secondary">
              About Foundry4
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              One Unified Partner for All Your Digital Needs
            </h3>
            <div className="h-1 w-12 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full" />
            
            <p className="text-sm text-text-secondary leading-relaxed pt-2">
              {siteConfig.aboutText}
            </p>

            {/* Micro value items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 mt-0.5">
                  <Layers className="h-4 w-4 text-brand-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Full-Stack Capability</h4>
                  <p className="text-xs text-text-secondary mt-1">Cross-disciplinary teams delivering end-to-end setups.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 mt-0.5">
                  <Zap className="h-4 w-4 text-brand-secondary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">High-Speed Execution</h4>
                  <p className="text-xs text-text-secondary mt-1">Direct developer engagement ensures prompt deliveries.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Column */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[460px] aspect-[4/3] relative rounded-2xl overflow-hidden glass-panel border border-white/15 p-6 flex flex-col justify-between shadow-2xl">
              {/* Abstract decorative grid */}
              <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

              {/* Fake dashboard headers */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 relative z-10">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  <span className="text-[10px] text-text-secondary font-mono ml-2">foundry4_engine_v1.0</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-mono text-brand-accent border border-white/5">
                  STATUS: ACTIVE
                </span>
              </div>

              {/* Dashboard metrics preview visual */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 my-6 relative z-10">
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2 sm:p-4 flex flex-col justify-center items-center text-center">
                  <span className="text-[10px] sm:text-xs text-text-secondary mb-1 truncate max-w-full">Web Platform</span>
                  <span className="text-xs sm:text-base font-extrabold text-white font-mono">100%</span>
                  <span className="text-[8px] sm:text-[9px] text-brand-accent mt-0.5 font-semibold">RESPONSIVE</span>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2 sm:p-4 flex flex-col justify-center items-center text-center">
                  <span className="text-[10px] sm:text-xs text-text-secondary mb-1 truncate max-w-full">Dashboard</span>
                  <span className="text-xs sm:text-base font-extrabold text-white font-mono truncate max-w-full">Realtime</span>
                  <span className="text-[8px] sm:text-[9px] text-brand-secondary mt-0.5 font-semibold">POWER BI</span>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2 sm:p-4 flex flex-col justify-center items-center text-center">
                  <span className="text-[10px] sm:text-xs text-text-secondary mb-1 truncate max-w-full">Campaigns</span>
                  <span className="text-xs sm:text-base font-extrabold text-white font-mono">Leads</span>
                  <span className="text-[8px] sm:text-[9px] text-brand-primary mt-0.5 font-semibold">OPTIMIZED</span>
                </div>
              </div>

              {/* Bottom taglines / trust highlight inside container */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-brand-primary-light">Our Code Guarantee</div>
                  <div className="text-xs text-text-secondary">Fully Custom Systems. Highly Secure & Scalable.</div>
                </div>
                <ShieldCheck className="h-6 w-6 text-brand-primary-light shrink-0 ml-2" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
