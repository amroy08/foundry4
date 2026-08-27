"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { Code, Palette, BarChart3, Cpu, HelpCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function Services() {
  const shouldReduceMotion = useReducedMotion();

  const getIcon = (name: string) => {
    switch (name) {
      case "Code": return <Code className="h-6 w-6 text-brand-primary" />;
      case "Palette": return <Palette className="h-6 w-6 text-brand-primary" />;
      case "BarChart3": return <BarChart3 className="h-6 w-6 text-brand-primary" />;
      case "Cpu": return <Cpu className="h-6 w-6 text-brand-primary" />;
      default: return <HelpCircle className="h-6 w-6 text-brand-primary" />;
    }
  };

  const getImage = (title: string) =>
    title.includes("Software") ? "/images/software_light.jpg"
    : title.includes("Creative") ? "/images/creative_light.jpg"
    : title.includes("Data") ? "/images/data_light.jpg"
    : "/images/ai_light.jpg";

  const handleEnquiry = (serviceTitle: string) => {
    let formServiceValue = "Other";
    if (serviceTitle.includes("Software")) formServiceValue = "Custom Software Development";
    else if (serviceTitle.includes("Creative Media")) formServiceValue = "Creative Design and Branding";
    else if (serviceTitle.includes("Data")) formServiceValue = "Data Analysis";
    else if (serviceTitle.includes("AI")) formServiceValue = "AI Chatbot";
    window.dispatchEvent(new CustomEvent("set-enquiry-service", { detail: { service: formServiceValue } }));
    const el = document.getElementById("contact");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  return (
    <section id="services" className="relative py-24 bg-white border-t border-slate-100 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3">Core Expertise</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Our Four Primary Service Categories</h3>
          <div className="h-1 w-12 bg-gradient-to-r from-brand-primary to-brand-accent mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {siteConfig.services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: "easeOut" }}
              className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center space-x-4 mb-5">
                  <motion.div
                    className="p-3 rounded-xl bg-blue-50 border border-blue-100 shadow-sm"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    {getIcon(service.iconName)}
                  </motion.div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-wide">{service.title}</h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-6">{service.description}</p>

                {/* Image with zoom + overlay on hover */}
                <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-6 border border-slate-200 bg-slate-50 relative group/img shadow-sm">
                  <Image
                    src={getImage(service.title)}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover transition-transform duration-500 group-hover/img:scale-[1.06]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent pointer-events-none z-10" />
                  {/* Hover reveal overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" />
                </div>

                {/* Capsule tags */}
                <div className="border-t border-slate-100 pt-5 mb-8">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Deliverables & Capabilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {(service.groupedServices
                      ? service.groupedServices.flatMap((g) => g.items)
                      : service.subServices || []
                    ).map((sub, i) => (
                      <motion.span
                        key={i}
                        className="text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg transition-colors hover:bg-blue-50/50 hover:text-brand-primary hover:border-blue-100 cursor-default"
                        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.25, delay: 0.1 + i * 0.02 }}
                      >
                        {sub}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <motion.button
                onClick={() => handleEnquiry(service.title)}
                className="w-full mt-auto inline-flex items-center justify-center py-3.5 px-6 rounded-xl border border-slate-200 hover:border-brand-primary bg-slate-50 hover:bg-blue-50/50 text-xs font-semibold uppercase tracking-wider text-slate-700 hover:text-brand-primary transition-all active:scale-[0.98] cursor-pointer"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
              >
                Enquire Now
                <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.span>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
