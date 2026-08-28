"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen } from "lucide-react";

export default function BrochureModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-brochure", handleOpen);
    return () => window.removeEventListener("open-brochure", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 md:p-4 pointer-events-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm pointer-events-auto"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="relative w-full max-w-4xl h-[92vh] bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 pointer-events-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-shrink-0 bg-white">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 leading-none">Company Brochure</h3>
                  <span className="text-[10px] text-slate-400 font-medium mt-1 block">Foundry4 — Digital Agency Profile 2026</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
                aria-label="Close brochure"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Iframe embed */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src="/foundry4-brochure.html"
                title="Foundry4 Company Brochure"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
