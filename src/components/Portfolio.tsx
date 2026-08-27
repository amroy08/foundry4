"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { ExternalLink, Check, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? siteConfig.projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === siteConfig.projects.length - 1 ? 0 : prev + 1));
  };

  const project = siteConfig.projects[activeIndex];

  return (
    <section id="work" className="relative py-24 bg-white border-t border-slate-100 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-10 w-[300px] h-[300px] bg-blue-50/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[300px] h-[300px] bg-indigo-50/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3">
            Featured Portfolio
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Work in Action
          </h3>
          <p className="text-sm text-slate-600 mt-3 max-w-xl mx-auto">
            Explore live corporate systems and educational web platforms designed and deployed by Foundry4 for clients in India.
          </p>
          <div className="h-1 w-12 bg-gradient-to-r from-brand-primary to-brand-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Carousel Slider Panel */}
        <div className="relative min-h-[460px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Visual Browser Mockup (Left Column) */}
              <div className="lg:col-span-6 w-full flex justify-center">
                <div className="w-full max-w-[500px] rounded-2xl border border-slate-200 bg-slate-50 shadow-md overflow-hidden relative group">
                  {/* Browser Toolbar mock */}
                  <div className="bg-slate-100 border-b border-slate-200 px-4 py-3.5 flex items-center space-x-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                    <div className="h-5 bg-white border border-slate-200 rounded px-3 flex items-center justify-between text-[9px] font-mono text-slate-500 select-none flex-grow mx-4">
                      <span className="truncate">{project.liveUrl}</span>
                      <Globe className="h-3 w-3 text-slate-400 shrink-0" />
                    </div>
                  </div>
                  {/* Real Screenshot from live website */}
                  <div className="aspect-[16/10] w-full overflow-hidden relative">
                    <Image
                      src={project.id === "mvhs" ? "/images/mvhs.webp" : "/images/bodals.webp"}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none z-10" />
                  </div>
                </div>
              </div>

              {/* Content Column (Right Column) */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-brand-primary text-xs font-bold tracking-wider uppercase">
                    Live Project
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium">
                    📍 {project.location}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                  {project.title}
                </h3>
                <div className="text-xs font-semibold text-brand-primary tracking-wider uppercase">
                  Category: {project.category}
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                    Key Deliverables
                  </h4>
                  <ul className="grid grid-cols-1 min-[370px]:grid-cols-2 gap-x-6 gap-y-2.5">
                    {project.keyFeatures.slice(0, 6).map((feat, i) => (
                      <li key={i} className="flex items-start text-xs text-slate-600">
                        <Check className="h-4 w-4 text-brand-primary shrink-0 mr-2 mt-0.5" />
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
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold tracking-wider text-slate-700 hover:text-brand-primary transition-all active:scale-[0.98]"
                  >
                    View Live Website
                    <ExternalLink className="ml-2 h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls */}
        <div className="flex justify-center items-center space-x-6 mt-12">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-all text-slate-600 hover:text-brand-primary shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Previous Project"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          {/* Pagination Indicators */}
          <div className="flex space-x-2">
            {siteConfig.projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx ? "w-8 bg-brand-primary" : "w-2 bg-slate-200 hover:bg-slate-350"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-all text-slate-600 hover:text-brand-primary shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Next Project"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
