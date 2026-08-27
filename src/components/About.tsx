import React from "react";
import { siteConfig } from "@/config/site";
import { Layers, ShieldCheck, Zap, Mail, Cpu, BarChart3, MessageSquare } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative py-24 bg-slate-50 overflow-hidden">
      {/* Visual background glows */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Copy Column */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-primary">
              About Foundry4
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              One Unified Partner for All Your Digital Needs
            </h3>
            <div className="h-1 w-12 bg-gradient-to-r from-brand-primary to-brand-accent rounded-full" />
            
            <p className="text-sm text-slate-600 leading-relaxed pt-2">
              {siteConfig.aboutText}
            </p>

            {/* Micro value items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100 mt-0.5">
                  <Layers className="h-4 w-4 text-brand-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Full-Stack Capability</h4>
                  <p className="text-xs text-slate-600 mt-1">Cross-disciplinary teams delivering end-to-end setups.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100 mt-0.5">
                  <Zap className="h-4 w-4 text-brand-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">High-Speed Execution</h4>
                  <p className="text-xs text-slate-600 mt-1">Direct developer engagement ensures prompt deliveries.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Column: Integration Pipeline Canvas */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[460px] aspect-[4/3] relative rounded-2xl overflow-hidden bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-xl">
              {/* Grid Background */}
              <div className="absolute inset-0 bg-[radial-gradient(#f1f5f9_1.5px,transparent_1.5px)] [background-size:16px_16px] pointer-events-none" />

              {/* Canvas Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 relative z-10">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-800 tracking-wider uppercase">Integration Pipeline</span>
                </div>
                <span className="text-[9px] font-mono font-bold text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                  v1.2 Active
                </span>
              </div>

              {/* Workflow flowchart nodes */}
              <div className="my-auto py-4 relative z-10 flex flex-col items-center space-y-3">
                
                {/* Node 1: Trigger */}
                <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 rounded-xl p-3 w-[260px] shadow-sm">
                  <div className="p-2 rounded-lg bg-blue-50 border border-blue-100 text-brand-primary">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[9px] font-bold text-blue-600 tracking-wide uppercase">Trigger Event</div>
                    <div className="text-xs font-bold text-slate-900">Lead Form Submitted</div>
                  </div>
                </div>

                {/* Vertical connection line */}
                <div className="h-5 w-0.5 bg-blue-200 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 bg-blue-500 rounded-full animate-ping" />
                </div>

                {/* Node 2: Processing Engine */}
                <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 rounded-xl p-3 w-[260px] shadow-md">
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[9px] font-bold text-blue-400 tracking-wide uppercase">Processing Engine</div>
                    <div className="text-xs font-bold text-white">AI Routing & Validation</div>
                  </div>
                </div>

                {/* Split connector lines */}
                <div className="w-[180px] h-3.5 relative flex justify-between">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-200" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200" />
                  <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-slate-200" />
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-slate-200" />
                </div>

                {/* Node 3: Outputs (Three columns) */}
                <div className="flex justify-between w-full gap-2 pt-0.5">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 flex flex-col items-center text-center flex-1 shadow-sm">
                    <Layers className="h-3.5 w-3.5 text-slate-700 mb-1" />
                    <span className="text-[8px] font-bold text-slate-800 truncate max-w-full">Sync CRM</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 flex flex-col items-center text-center flex-1 shadow-sm">
                    <MessageSquare className="h-3.5 w-3.5 text-slate-700 mb-1" />
                    <span className="text-[8px] font-bold text-slate-800 truncate max-w-full">Notify Team</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 flex flex-col items-center text-center flex-1 shadow-sm">
                    <BarChart3 className="h-3.5 w-3.5 text-slate-700 mb-1" />
                    <span className="text-[8px] font-bold text-slate-800 truncate max-w-full">Update BI</span>
                  </div>
                </div>

              </div>

              {/* Bottom Guarantee Banner */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 relative z-10 flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <div className="text-[9px] uppercase font-bold tracking-wider text-brand-primary">Our Code Guarantee</div>
                  <div className="text-[10px] text-slate-600">Fully Custom Systems. Highly Secure.</div>
                </div>
                <ShieldCheck className="h-5 w-5 text-brand-primary shrink-0 ml-2" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
