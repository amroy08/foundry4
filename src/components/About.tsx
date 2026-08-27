"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { Layers, ShieldCheck, Zap, Mail, Cpu, BarChart3, MessageSquare } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const leftVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  };
  const rightVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section id="about" className="relative py-24 bg-slate-50 overflow-hidden">
      <div className="absolute top-10 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
          variants={shouldReduceMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.12 }}
        >
          {/* Left column */}
          <motion.div className="lg:col-span-6 space-y-6" variants={shouldReduceMotion ? {} : leftVariants}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-primary">About Foundry4</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              One Unified Partner for All Your Digital Needs
            </h3>
            <div className="h-1 w-12 bg-gradient-to-r from-brand-primary to-brand-accent rounded-full" />
            <p className="text-sm text-slate-600 leading-relaxed pt-2">{siteConfig.aboutText}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {[
                { icon: <Layers className="h-4 w-4 text-brand-primary" />, title: "Full-Stack Capability", desc: "Cross-disciplinary teams delivering end-to-end setups." },
                { icon: <Zap className="h-4 w-4 text-brand-primary" />, title: "High-Speed Execution", desc: "Direct developer engagement ensures prompt deliveries." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="flex items-start space-x-3.5"
                  variants={shouldReduceMotion ? undefined : { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 + i * 0.12 } } }}
                >
                  <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100 mt-0.5">{item.icon}</div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-600 mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column — Pipeline */}
          <motion.div className="lg:col-span-6 flex justify-center" variants={shouldReduceMotion ? {} : rightVariants}>
            <div className="w-full max-w-[460px] aspect-[4/3] relative rounded-2xl overflow-hidden bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-xl">
              <div className="absolute inset-0 bg-[radial-gradient(#f1f5f9_1.5px,transparent_1.5px)] [background-size:16px_16px] pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 relative z-10">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-800 tracking-wider uppercase">Integration Pipeline</span>
                </div>
                <span className="text-[9px] font-mono font-bold text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">v1.2 Active</span>
              </div>

              {/* Nodes */}
              <div className="my-auto py-4 relative z-10 flex flex-col items-center space-y-3">
                {/* Node 1 */}
                <motion.div
                  className="flex items-center space-x-3 bg-slate-50 border border-slate-200 rounded-xl p-3 w-[260px] shadow-sm"
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="p-2 rounded-lg bg-blue-50 border border-blue-100 text-brand-primary"><Mail className="h-4 w-4" /></div>
                  <div className="text-left">
                    <div className="text-[9px] font-bold text-blue-600 tracking-wide uppercase">Trigger Event</div>
                    <div className="text-xs font-bold text-slate-900">Lead Form Submitted</div>
                  </div>
                </motion.div>

                {/* Connector with moving dot */}
                <div className="h-6 w-0.5 bg-blue-100 relative overflow-hidden">
                  <motion.div
                    className="absolute w-full h-2 bg-gradient-to-b from-transparent via-blue-500 to-transparent"
                    animate={{ y: ["-100%", "300%"] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
                  />
                </div>

                {/* Node 2 */}
                <motion.div
                  className="flex items-center space-x-3 bg-slate-900 border border-slate-800 rounded-xl p-3 w-[260px] shadow-md"
                  initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                >
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400"><Cpu className="h-4 w-4" /></div>
                  <div className="text-left">
                    <div className="text-[9px] font-bold text-blue-400 tracking-wide uppercase">Processing Engine</div>
                    <div className="text-xs font-bold text-white">AI Routing & Validation</div>
                  </div>
                </motion.div>

                {/* Branch connector */}
                <div className="w-[180px] h-3.5 relative flex justify-between">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-200" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200" />
                  <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-slate-200" />
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-slate-200" />
                </div>

                {/* Node 3 — output trio */}
                <div className="flex justify-between w-full gap-2 pt-0.5">
                  {[{ icon: <Layers className="h-3.5 w-3.5 text-slate-700 mb-1" />, label: "Sync CRM" },
                    { icon: <MessageSquare className="h-3.5 w-3.5 text-slate-700 mb-1" />, label: "Notify Team" },
                    { icon: <BarChart3 className="h-3.5 w-3.5 text-slate-700 mb-1" />, label: "Update BI" }].map((node, i) => (
                    <motion.div
                      key={node.label}
                      className="bg-slate-50 border border-slate-200 rounded-lg p-2 flex flex-col items-center text-center flex-1 shadow-sm"
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.4 + i * 0.1 }}
                      whileHover={{ scale: 1.05, borderColor: "#2563eb" }}
                    >
                      {node.icon}
                      <span className="text-[8px] font-bold text-slate-800">{node.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Guarantee Banner */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 relative z-10 flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <div className="text-[9px] uppercase font-bold tracking-wider text-brand-primary">Our Code Guarantee</div>
                  <div className="text-[10px] text-slate-600">Fully Custom Systems. Highly Secure.</div>
                </div>
                <ShieldCheck className="h-5 w-5 text-brand-primary shrink-0 ml-2" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
