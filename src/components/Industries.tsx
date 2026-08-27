"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { GraduationCap, ShoppingBag, Store, Calendar, Truck, Rocket, Briefcase, Building, Sparkles, MessageSquare } from "lucide-react";

export default function Industries() {
  const getIcon = (name: string) => {
    switch (name) {
      case "Education & Academics":
        return <GraduationCap className="h-6 w-6 text-brand-primary" />;
      case "E-commerce Brands":
        return <ShoppingBag className="h-6 w-6 text-brand-secondary" />;
      case "Retail & Merchandising":
        return <Store className="h-6 w-6 text-brand-accent" />;
      case "Events & Entertainment":
        return <Calendar className="h-6 w-6 text-brand-primary" />;
      case "Export & Logistics":
        return <Truck className="h-6 w-6 text-brand-secondary" />;
      case "Tech Startups":
        return <Rocket className="h-6 w-6 text-brand-accent" />;
      case "Professional Services":
        return <Briefcase className="h-6 w-6 text-brand-primary" />;
      case "Small & Medium Businesses":
        return <Building className="h-6 w-6 text-brand-secondary" />;
      default:
        return <Sparkles className="h-6 w-6 text-brand-primary" />;
    }
  };

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
    <section className="relative py-24 bg-white border-t border-slate-100 overflow-hidden">
      {/* Visual background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* ================= INDUSTRIES GRID ================= */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3">
              Market Domains
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Industries We Serve
            </h3>
            <div className="h-1 w-12 bg-gradient-to-r from-brand-primary to-brand-accent mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {siteConfig.industries.map((ind) => (
              <div
                key={ind}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-slate-350 hover:bg-slate-50/80 shadow-sm"
              >
                <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 mb-4 shadow-sm">
                  {getIcon(ind)}
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 tracking-wide">{ind}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* ================= CALL TO ACTION SECTION ================= */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-indigo-50 to-sky-100 rounded-3xl opacity-20 pointer-events-none" />
          
          <div className="relative glass-panel rounded-3xl p-8 md:p-12 lg:p-16 border border-slate-200/80 flex flex-col lg:flex-row items-center justify-between gap-8 overflow-hidden shadow-lg">
            {/* Background decoration grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
            
            <div className="space-y-4 text-center lg:text-left max-w-2xl relative z-10">
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                Have an Idea? Let’s Turn It Into a Powerful Digital Solution.
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Connect with our team today to evaluate scopes, map requirements, and receive a transparent pricing estimate for your next-gen application.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 relative z-10 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => handleScrollTo("contact")}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all bg-brand-primary text-white hover:bg-brand-primary/95 shadow-md shadow-blue-100 active:scale-[0.98] w-full sm:w-auto"
              >
                Start a Project
              </button>
              <button
                onClick={() => handleScrollTo("contact")}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:scale-[0.98] w-full sm:w-auto"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Foundry4
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
