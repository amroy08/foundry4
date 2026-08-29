"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, GraduationCap, Globe, BookOpen, Building } from "lucide-react";

interface ShowcaseProject {
  id: string;
  title: string;
  category: string;
  metric: string;
  icon: React.ReactNode;
}

const projects: ShowcaseProject[] = [
  {
    id: "mvhs-erp",
    title: "M.V. High School ERP",
    category: "Custom School Administration System",
    metric: "600+ students, ₹4.1Cr+ fees & automated WhatsApp reminders live",
    icon: <GraduationCap className="h-5 w-5 text-blue-600" />
  },
  {
    id: "bodals",
    title: "Bodal's International",
    category: "Global Export Merchant Platform",
    metric: "Full-scale logistics, product catalog & international enquiries live",
    icon: <Globe className="h-5 w-5 text-emerald-600" />
  },
  {
    id: "sakhi-darpan",
    title: "Sakhi Darpan Magazine",
    category: "Festive Editorial Publication Design",
    metric: "27 high-resolution designed pages, custom Hindi typography live",
    icon: <BookOpen className="h-5 w-5 text-purple-600" />
  },
  {
    id: "grc",
    title: "GRC Residency Branding",
    category: "Luxury Property Identity Design",
    metric: "Gold-accent business card design and luxury branding suite live",
    icon: <Building className="h-5 w-5 text-amber-600" />
  },
  {
    id: "mvhs",
    title: "M.V. High School Portal",
    category: "School Website and Admissions System",
    metric: "Full online admission registrations & monthly circulars system live",
    icon: <GraduationCap className="h-5 w-5 text-indigo-650" />
  }
];

export default function FloatingShowcase() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Show after 3 seconds on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Slide loop every 5.5 seconds
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isVisible]);

  const activeProject = projects[activeIndex];

  const handleProjectClick = () => {
    window.dispatchEvent(new CustomEvent("select-portfolio-project", { detail: { id: activeProject.id } }));
    const el = document.getElementById("work");
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 26 }}
          className="fixed bottom-4 left-4 z-[48] w-[360px] max-w-[calc(100vw-2rem)] bg-white/95 border border-slate-200/80 backdrop-blur-md rounded-xl p-4 shadow-2xl shadow-slate-100 flex flex-col justify-between overflow-hidden group select-none pointer-events-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100 relative z-10">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase flex items-center">
                <Sparkles className="h-3 w-3 text-brand-primary mr-1" />
                Work in Action
              </span>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
              aria-label="Dismiss announcement"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Project Details Stage */}
          <div className="relative min-h-[72px] flex flex-col justify-center py-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex items-start space-x-3 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={handleProjectClick}
              >
                {/* Icon Box */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex-shrink-0 shadow-sm relative group-hover:scale-105 transition-transform duration-300">
                  {activeProject.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center space-x-2">
                    <h5 className="text-sm font-black text-slate-900 truncate">
                      {activeProject.title}
                    </h5>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-extrabold bg-blue-50 text-blue-700 uppercase tracking-wide border border-blue-100 shrink-0">
                      Delivered
                    </span>
                  </div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5 truncate">
                    {activeProject.category}
                  </p>
                  <p className="text-xs text-slate-600 leading-normal mt-1.5 font-medium">
                    {activeProject.metric}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Auto-Slide Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-100 overflow-hidden">
            <motion.div
              key={activeIndex}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5.5, ease: "linear" }}
              className="h-full bg-brand-primary"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
