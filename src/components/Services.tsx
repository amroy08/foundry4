"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import * as Icons from "lucide-react";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";

export default function Services() {
  const getIcon = (name: string) => {
    switch (name) {
      case "Code":
        return <Icons.Code className="h-6 w-6 text-brand-primary" />;
      case "Palette":
        return <Icons.Palette className="h-6 w-6 text-brand-secondary" />;
      case "BarChart3":
        return <Icons.BarChart3 className="h-6 w-6 text-brand-accent" />;
      case "Cpu":
        return <Icons.Cpu className="h-6 w-6 text-brand-primary" />;
      default:
        return <Icons.HelpCircle className="h-6 w-6 text-brand-primary" />;
    }
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
    <section id="services" className="relative py-24 bg-bg-dark border-t border-white/5">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3">
            Core Expertise
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Our Four Primary Service Categories
          </p>
          <div className="h-1 w-12 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto mt-4 rounded-full" />
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
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 shadow-inner">
                    {getIcon(service.iconName)}
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Image preview of service */}
                <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-6 border border-white/5 relative group">
                  <Image
                    src={
                      service.title.includes("Software")
                        ? "/images/software.webp"
                        : service.title.includes("Creative")
                        ? "/images/creative.webp"
                        : service.title.includes("Data")
                        ? "/images/data.webp"
                        : "/images/ai.webp"
                    }
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/50 to-transparent pointer-events-none z-10" />
                </div>

                {/* Sub-services list (flat list or grouped subheadings) */}
                <div className="border-t border-white/5 pt-6 mb-8">
                  {service.groupedServices ? (
                    <div className="space-y-6">
                      {service.groupedServices.map((group, gIdx) => (
                        <div key={gIdx} className="space-y-2.5">
                          <h4 className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest">
                            {group.heading}
                          </h4>
                          <ul className="grid grid-cols-1 min-[370px]:grid-cols-2 gap-x-4 gap-y-2">
                            {group.items.map((sub, i) => (
                              <li key={i} className="flex items-start text-[11px] text-text-secondary">
                                <Check className="h-3.5 w-3.5 text-brand-accent shrink-0 mr-2 mt-0.5" />
                                <span>{sub}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                        Key Deliverables
                      </h4>
                      <ul className="grid grid-cols-1 min-[370px]:grid-cols-2 gap-x-4 gap-y-2">
                        {service.subServices && service.subServices.map((sub, i) => (
                          <li key={i} className="flex items-start text-[11px] text-text-secondary">
                            <Check className="h-3.5 w-3.5 text-brand-accent shrink-0 mr-2 mt-0.5" />
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
                className="w-full mt-auto inline-flex items-center justify-center py-3.5 px-6 rounded-xl border border-white/10 hover:border-brand-primary bg-white/[0.02] hover:bg-brand-primary/10 text-xs font-semibold uppercase tracking-wider text-white hover:text-white transition-all active:scale-[0.98]"
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
