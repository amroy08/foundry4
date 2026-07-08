"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { ExternalLink, Check, Globe } from "lucide-react";

export default function Portfolio() {
  return (
    <section id="work" className="relative py-24 bg-[#02000a] border-t border-white/5">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-10 w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[300px] h-[300px] bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-secondary mb-3">
            Featured Portfolio
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Our Work in Action
          </p>
          <p className="text-sm text-text-secondary mt-3 max-w-xl mx-auto">
            Explore live corporate systems and educational web platforms designed and deployed by Foundry4 for clients in India.
          </p>
          <div className="h-1 w-12 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto mt-4 rounded-full" />
        </div>

        {/* Projects Layout (Stack of 2 columns) */}
        <div className="space-y-20">
          {siteConfig.projects.map((project, index) => {
            const isOdd = index % 2 !== 0;
            return (
              <div
                key={project.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  isOdd ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Visual Browser Mockup (Equal Importance) */}
                <div
                  className={`lg:col-span-6 ${
                    isOdd ? "lg:order-2" : "lg:order-1"
                  } w-full flex justify-center`}
                >
                  <div className="w-full max-w-[500px] rounded-2xl border border-white/10 bg-black/60 shadow-2xl overflow-hidden relative group">
                    {/* Browser Toolbar mock */}
                    <div className="bg-white/5 border-b border-white/10 px-4 py-3.5 flex items-center space-x-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                      <div className="h-5 bg-white/5 rounded px-3 flex items-center justify-between text-[9px] font-mono text-slate-400 select-none flex-grow mx-4">
                        <span className="truncate">{project.liveUrl}</span>
                        <Globe className="h-3 w-3 text-slate-500 shrink-0" />
                      </div>
                    </div>
                    {/* Real Screenshot from live website */}
                    <div className="aspect-[16/10] w-full overflow-hidden relative">
                      <img
                        src={project.id === "mvhs" ? "/images/mvhs.png" : "/images/bodals.png"}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/40 to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div
                  className={`lg:col-span-6 ${
                    isOdd ? "lg:order-1" : "lg:order-2"
                  } space-y-6`}
                >
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 rounded-full bg-brand-primary/15 border border-brand-primary/30 text-brand-primary text-xs font-bold tracking-wider uppercase">
                      Live Project
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium">
                      📍 {project.location}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white leading-tight">
                    {project.title}
                  </h3>
                  <div className="text-xs font-semibold text-brand-accent tracking-wider uppercase">
                    Category: {project.category}
                  </div>

                  <p className="text-sm text-text-secondary leading-relaxed">
                    {project.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">
                      Key Deliverables
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                      {project.keyFeatures.slice(0, 6).map((feat, i) => (
                        <li key={i} className="flex items-start text-xs text-text-secondary">
                          <Check className="h-4 w-4 text-brand-secondary shrink-0 mr-2 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 flex items-center space-x-2">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold tracking-wider text-white transition-all active:scale-[0.98]"
                    >
                      View Live Website
                      <ExternalLink className="ml-2 h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
