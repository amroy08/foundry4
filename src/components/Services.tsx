"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { Code, Palette, BarChart3, Cpu, HelpCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

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
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Our Four Primary Service Categories
          </h3>
          <div className="h-1 w-12 bg-gradient-to-r from-brand-primary to-brand-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {siteConfig.services.map((service) => (
            <div
              key={service.title}
              className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Icon header */}
                <div className="flex items-center space-x-4 mb-5">
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 shadow-sm">
                    {getIcon(service.iconName)}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-wide">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-650 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Real light-theme mockup image preview */}
                <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-6 border border-slate-200 bg-slate-50 relative group shadow-sm">
                  <Image
                    src={
                      service.title.includes("Software")
                        ? "/images/software_light.jpg"
                        : service.title.includes("Creative")
                        ? "/images/creative_light.jpg"
                        : service.title.includes("Data")
                        ? "/images/data_light.jpg"
                        : "/images/ai_light.jpg"
                    }
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover transition-transform duration-350 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent pointer-events-none z-10" />
                </div>

                {/* Sub-services list: Compact Capsule Tags */}
                <div className="border-t border-slate-100 pt-5 mb-8">
                  <h4 className="text-[10px] font-bold text-slate-450 uppercase tracking-widest mb-3">
                    Deliverables & Capabilities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(service.groupedServices
                      ? service.groupedServices.flatMap((g) => g.items)
                      : service.subServices || []
                    ).map((sub, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg transition-colors hover:bg-blue-50/50 hover:text-brand-primary"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action trigger */}
              <button
                onClick={() => handleEnquiry(service.title)}
                className="w-full mt-auto inline-flex items-center justify-center py-3.5 px-6 rounded-xl border border-slate-200 hover:border-brand-primary bg-slate-50 hover:bg-blue-50/50 text-xs font-semibold uppercase tracking-wider text-slate-700 hover:text-brand-primary transition-all active:scale-[0.98] cursor-pointer"
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
