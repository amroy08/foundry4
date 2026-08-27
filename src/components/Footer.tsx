"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { Mail, Phone, MapPin, Heart, ArrowUp } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const SocialIcon = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="p-2.5 rounded-full bg-slate-50 border border-slate-200/80 hover:bg-blue-50/50 text-slate-500 hover:text-brand-primary transition-colors flex items-center justify-center shadow-sm"
    whileHover={{ scale: 1.2, rotate: 8, backgroundColor: "#eff6ff" }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: "spring", stiffness: 400, damping: 14 }}
  >
    {children}
  </motion.a>
);

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) > 0.5);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.replace("#", "");
      if (!id) { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
    }
  };

  const columns = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "#" }, { name: "About Us", href: "#about" },
        { name: "Services", href: "#services" }, { name: "Our Work", href: "#work" }, { name: "Process", href: "#process" }
      ]
    },
    {
      title: "Services",
      links: siteConfig.services.map((s) => ({ name: s.title, href: "#services" }))
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const colVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] as [number,number,number,number] } },
  };

  return (
    <footer className="relative bg-white border-t border-slate-200 pt-20 pb-10 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-100/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-slate-100"
          variants={shouldReduceMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {/* Brand */}
          <motion.div className="space-y-6" variants={colVariants}>
            <a href="#" onClick={(e) => handleNavClick(e, "#")} className="flex items-center space-x-3 focus-visible:ring-2 focus-visible:ring-brand-primary w-fit" aria-label="Foundry4 Homepage">
              <Image src="/images/logo.png" alt="Foundry4" width={36} height={36} className="h-8 md:h-9 w-auto object-contain shrink-0" loading="lazy" />
              <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 flex items-center">
                <span>Foundry</span>
                <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent ml-0.5">4</span>
              </span>
            </a>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
              We design, build, analyze, and market digital products, helping companies bridge the gap between creative visual art and robust engineering.
            </p>
            <div className="flex space-x-3">
              <SocialIcon href={siteConfig.contact.socials.linkedin} label="Foundry4 LinkedIn">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </SocialIcon>
              <SocialIcon href={siteConfig.contact.socials.instagram} label="Foundry4 Instagram">
                <svg className="h-4 w-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </SocialIcon>
              <SocialIcon href={siteConfig.contact.socials.facebook} label="Foundry4 Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
              </SocialIcon>
            </div>
          </motion.div>

          {/* Link columns */}
          {columns.map((col) => (
            <motion.div key={col.title} className="space-y-6" variants={colVariants}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      onClick={(e) => handleNavClick(e as React.MouseEvent<HTMLAnchorElement>, link.href)}
                      className="text-sm text-slate-600 hover:text-brand-primary transition-colors block truncate max-w-xs relative group"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact */}
          <motion.div className="space-y-6" variants={colVariants}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                <span className="text-sm text-slate-600 leading-relaxed">{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-brand-primary shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="text-sm text-slate-600 hover:text-brand-primary transition-colors">{siteConfig.contact.phone}</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-brand-primary shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="text-sm text-slate-600 hover:text-brand-primary transition-colors break-all">{siteConfig.contact.email}</a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-slate-500">
            <span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>
            <div className="hidden md:block h-3 w-px bg-slate-200" />
            <div className="flex space-x-4">
              <a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand-primary transition-colors">Terms & Conditions</a>
            </div>
          </div>
          <div className="text-xs text-slate-500 flex items-center space-x-1.5">
            <span>Built by</span>
            <span className="font-semibold text-slate-900 tracking-wider uppercase bg-slate-50 px-2 py-0.5 rounded text-[10px] border border-slate-200">Foundry4</span>
            <span>with</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" />
            <span>in India</span>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="back-to-top"
            initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.7, y: 20 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.7, y: 20 }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-brand-primary text-white shadow-lg shadow-blue-200 hover:bg-brand-primary/90 focus-visible:ring-2 focus-visible:ring-brand-primary"
            aria-label="Back to top"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.92 }}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
