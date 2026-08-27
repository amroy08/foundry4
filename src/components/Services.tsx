"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { Code, Palette, BarChart3, Cpu, HelpCircle, ArrowRight, Check, Mail, MessageSquare } from "lucide-react";

export default function Services() {
  const getIcon = (name: string) => {
    switch (name) {
      case "Code":
        return <Code className="h-6 w-6 text-brand-primary" />;
      case "Palette":
        return <Palette className="h-6 w-6 text-brand-primary" />;
      case "BarChart3":
        return <BarChart3 className="h-6 w-6 text-brand-primary" />;
      case "Cpu":
        return <Cpu className="h-6 w-6 text-brand-primary" />;
      default:
        return <HelpCircle className="h-6 w-6 text-brand-primary" />;
    }
  };

  const renderServiceMockup = (title: string) => {
    if (title.includes("Software")) {
      return (
        <div className="w-full h-full flex flex-col justify-between text-left p-3">
          {/* Header */}
          <div className="flex items-center space-x-1.5 border-b border-slate-200 pb-2">
            <div className="h-2 w-2 rounded-full bg-red-400" />
            <div className="h-2 w-2 rounded-full bg-yellow-400" />
            <div className="h-2 w-2 rounded-full bg-green-400" />
            <span className="text-[8px] font-mono text-slate-400 ml-2">app.tsx</span>
          </div>
          {/* Code Body */}
          <div className="grid grid-cols-12 gap-3 my-auto py-1 font-mono text-[9px] leading-relaxed">
            <div className="col-span-5 space-y-1.5 border-r border-slate-200 pr-2">
              <div className="h-2 w-[90%] bg-blue-100 rounded" />
              <div className="h-2 w-[70%] bg-slate-100 rounded" />
              <div className="h-2 w-[85%] bg-indigo-50 rounded" />
              <div className="h-2 w-[50%] bg-slate-100 rounded" />
            </div>
            <div className="col-span-7 flex flex-col justify-center space-y-2">
              {/* Responsive layout preview */}
              <div className="bg-white border border-slate-200 rounded p-1.5 shadow-sm space-y-1">
                <div className="h-1.5 w-[40%] bg-blue-500 rounded" />
                <div className="grid grid-cols-3 gap-1">
                  <div className="h-3 bg-slate-100 rounded animate-pulse" />
                  <div className="h-3 bg-slate-100 rounded animate-pulse" />
                  <div className="h-3 bg-slate-100 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (title.includes("Creative")) {
      return (
        <div className="w-full h-full flex flex-col justify-between text-left p-3">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Design Workspace</span>
            <div className="flex space-x-1">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
            </div>
          </div>
          {/* Design vector canvas mockup */}
          <div className="relative my-auto flex-grow flex items-center justify-center">
            <svg viewBox="0 0 200 60" className="w-[85%] h-auto overflow-visible">
              <path d="M10 50 C 40 10, 80 10, 110 30 S 160 50, 190 10" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="3 3" />
              <circle cx="110" cy="30" r="3" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
              <line x1="110" y1="30" x2="110" y2="10" stroke="#2563eb" strokeWidth="1" />
              <circle cx="110" cy="10" r="2.5" fill="#2563eb" />
            </svg>
          </div>
          {/* Color Chips */}
          <div className="flex justify-between items-center pt-2 border-t border-slate-200">
            <span className="text-[8px] font-bold text-slate-400">PALETTE</span>
            <div className="flex space-x-1.5">
              <div className="h-3.5 w-3.5 rounded-full bg-blue-600 border border-white shadow-sm" />
              <div className="h-3.5 w-3.5 rounded-full bg-indigo-600 border border-white shadow-sm" />
              <div className="h-3.5 w-3.5 rounded-full bg-sky-400 border border-white shadow-sm" />
              <div className="h-3.5 w-3.5 rounded-full bg-slate-200 border border-white shadow-sm" />
            </div>
          </div>
        </div>
      );
    }

    if (title.includes("Data")) {
      return (
        <div className="w-full h-full flex flex-col justify-between text-left p-3">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Analytics Dashboard</span>
            <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">↑ 42% ROI</span>
          </div>
          {/* Dashboard graphs */}
          <div className="grid grid-cols-12 gap-3 my-auto py-2">
            {/* Left Bar Graph */}
            <div className="col-span-6 flex items-end justify-between h-14 border-b border-slate-200 px-1">
              <div className="w-[18%] bg-slate-100 rounded-t h-[40%]" />
              <div className="w-[18%] bg-slate-200 rounded-t h-[60%]" />
              <div className="w-[18%] bg-slate-100 rounded-t h-[50%]" />
              <div className="w-[18%] bg-blue-400 rounded-t h-[75%]" />
              <div className="w-[18%] bg-blue-600 rounded-t h-[95%]" />
            </div>
            {/* Right Funnel metrics */}
            <div className="col-span-6 flex flex-col justify-center space-y-1.5 pl-2 border-l border-slate-200">
              <div className="flex justify-between items-center text-[9px]">
                <span className="text-slate-500">Conv. Rate</span>
                <span className="font-bold text-slate-900">4.8%</span>
              </div>
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[70%]" />
              </div>
              <div className="flex justify-between items-center text-[9px] pt-0.5">
                <span className="text-slate-500">Ad Spend</span>
                <span className="font-bold text-slate-900">-12% CAC</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // AI Automation
    return (
      <div className="w-full h-full flex flex-col justify-between text-left p-3">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">AI ROUTING ENGINE</span>
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
        </div>
        {/* Conversation Node Flow */}
        <div className="my-auto space-y-2 py-1">
          {/* User inquiry bubble */}
          <div className="flex items-center space-x-2 bg-slate-100 border border-slate-200 rounded-lg p-1.5 max-w-[85%]">
            <div className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center text-[8px] font-bold text-white shrink-0">U</div>
            <span className="text-[9px] text-slate-700 truncate">Book lead calendar.</span>
          </div>
          {/* AI confirmation bubble */}
          <div className="flex items-center space-x-2 bg-white border border-slate-200 rounded-lg p-1.5 max-w-[90%] ml-auto shadow-sm">
            <span className="text-[9px] text-slate-900 font-bold truncate">Synced CRM & Dispatched.</span>
            <div className="h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] font-bold text-white shrink-0">✓</div>
          </div>
        </div>
      </div>
    );
  };

  const handleEnquiry = (serviceTitle: string) => {
    // Map service section title to the contact form dropdown values
    let formServiceValue = "Other";
    if (serviceTitle.includes("Software")) {
      formServiceValue = "Custom Software Development";
    } else if (serviceTitle.includes("Creative Media")) {
      formServiceValue = "Creative Design and Branding";
    } else if (serviceTitle.includes("Data")) {
      formServiceValue = "Data Analysis";
    } else if (serviceTitle.includes("AI Automation")) {
      formServiceValue = "AI Chatbot";
    }

    // Dispatch custom event for the form to handle
    const event = new CustomEvent("set-enquiry-service", {
      detail: { service: formServiceValue },
    });
    window.dispatchEvent(event);

    // Scroll to contact form
    const targetElement = document.getElementById("contact");
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
    <section id="services" className="relative py-24 bg-white border-t border-slate-100 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3">
            Core Expertise
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Four Primary Service Categories
          </h3>
          <div className="h-1 w-12 bg-gradient-to-r from-brand-primary to-brand-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {siteConfig.services.map((service) => (
            <div
              key={service.title}
              className="glass-card rounded-2xl p-5 sm:p-8 flex flex-col justify-between"
            >
              <div>
                {/* Icon header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 shadow-sm">
                    {getIcon(service.iconName)}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-wide">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Light interactive preview mockup of service instead of static dark images */}
                <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-6 border border-slate-200 bg-slate-50 relative group flex items-center justify-center p-3 shadow-inner">
                  {renderServiceMockup(service.title)}
                </div>

                {/* Sub-services list (flat list or grouped subheadings) */}
                <div className="border-t border-slate-100 pt-6 mb-8">
                  {service.groupedServices ? (
                    <div className="space-y-6">
                      {service.groupedServices.map((group, gIdx) => (
                        <div key={gIdx} className="space-y-2.5">
                          <h4 className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">
                            {group.heading}
                          </h4>
                          <ul className="grid grid-cols-1 min-[370px]:grid-cols-2 gap-x-4 gap-y-2">
                            {group.items.map((sub, i) => (
                              <li key={i} className="flex items-start text-[11px] text-slate-600">
                                <Check className="h-3.5 w-3.5 text-brand-primary shrink-0 mr-2 mt-0.5" />
                                <span>{sub}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">
                        Key Deliverables
                      </h4>
                      <ul className="grid grid-cols-1 min-[370px]:grid-cols-2 gap-x-4 gap-y-2">
                        {service.subServices && service.subServices.map((sub, i) => (
                          <li key={i} className="flex items-start text-[11px] text-slate-600">
                            <Check className="h-3.5 w-3.5 text-brand-primary shrink-0 mr-2 mt-0.5" />
                            <span>{sub}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Action trigger */}
              <button
                onClick={() => handleEnquiry(service.title)}
                className="w-full mt-auto inline-flex items-center justify-center py-3.5 px-6 rounded-xl border border-slate-200 hover:border-brand-primary bg-slate-50 hover:bg-blue-50/50 text-xs font-semibold uppercase tracking-wider text-slate-700 hover:text-brand-primary transition-all active:scale-[0.98]"
              >
                Enquire Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
