"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const sections = ["about", "services", "work", "process", "contact"];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    const handleScrollActive = () => { if (window.scrollY < 100) setActiveSection(""); };
    window.addEventListener("scroll", handleScrollActive, { passive: true });
    sections.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => { observer.disconnect(); window.removeEventListener("scroll", handleScrollActive); };
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace("#", "");
    if (!targetId) { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = document.getElementById(targetId);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {},
  };
  const itemVariants = {
    hidden: { opacity: 0, y: -12 },
    visible: { opacity: 1, y: 0 },
  };
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -16 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm py-4" : "bg-transparent py-4 md:py-6"
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* Logo — spring entrance */}
        <motion.a
          href="#"
          onClick={(e) => handleNavClick(e, "#")}
          className="flex items-center space-x-3 focus-visible:ring-2 focus-visible:ring-brand-primary"
          aria-label="Foundry4 Homepage"
          initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
          animate={shouldReduceMotion ? false : { opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        >
          <Image src="/images/logo.png" alt="Foundry4" width={36} height={36} className="h-8 md:h-9 w-auto object-contain shrink-0" priority />
          <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 flex items-center">
            <span>Foundry</span>
            <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent ml-0.5">4</span>
          </span>
        </motion.a>

        {/* Desktop Nav — stagger + sliding indicator */}
        <motion.nav
          className="hidden md:flex items-center space-x-8 relative"
          aria-label="Main Navigation"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
        >
          {navLinks.map((link) => {
            const isActive = (link.href === "#" && activeSection === "") || (link.href !== "#" && activeSection === link.href.replace("#", ""));
            return (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                variants={itemVariants}
                className={`relative text-sm font-medium transition-colors duration-200 pb-0.5 ${isActive ? "text-brand-primary" : "text-slate-600 hover:text-brand-primary"}`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-brand-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            );
          })}
        </motion.nav>

        {/* Desktop CTA */}
        <motion.div
          className="hidden md:block"
          initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }}
          animate={shouldReduceMotion ? false : { opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
        >
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 bg-brand-primary text-white hover:bg-brand-primary/90 hover:scale-[1.04] shadow-md shadow-blue-100 active:scale-[0.97]"
          >
            Start a Project
            <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
          </a>
        </motion.div>

        {/* Mobile toggle */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-brand-primary"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden fixed inset-0 top-[64px] bg-white/98 backdrop-blur-xl border-t border-slate-100 shadow-lg z-40 overflow-y-auto"
          >
            <nav className="flex flex-col p-8 space-y-1" aria-label="Mobile Navigation">
              {navLinks.map((link, i) => {
                const isActive = (link.href === "#" && activeSection === "") || (link.href !== "#" && activeSection === link.href.replace("#", ""));
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3, ease: "easeOut" }}
                    className={`text-lg font-medium border-b py-4 transition-colors ${isActive ? "text-brand-primary border-blue-100" : "text-slate-600 hover:text-slate-900 border-slate-100"}`}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06 + 0.1, duration: 0.35 }}
                className="flex items-center justify-center w-full py-3.5 mt-4 rounded-xl bg-brand-primary text-white font-semibold text-sm tracking-wide shadow-md shadow-blue-100 hover:bg-brand-primary/95 active:scale-[0.98] transition-all"
              >
                Start a Project
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
