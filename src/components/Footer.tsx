"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { Mail, Phone, MapPin, Heart } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a local anchor link
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      if (!targetId) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <footer className="relative bg-[#02000a] border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-white/5">
          {/* Brand Info */}
          <div className="space-y-6">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => handleNavClick(e, "#")}
              className="flex items-center space-x-3 focus-visible:ring-2 focus-visible:ring-brand-primary w-fit"
              aria-label="Foundry4 Homepage"
            >
              <Image src="/images/logo.png" alt="Foundry4 Icon" width={36} height={36} className="h-8 md:h-9 w-auto object-contain shrink-0" loading="lazy" />
              <span className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center">
                <span>Foundry</span>
                <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent ml-0.5">
                  4
                </span>
              </span>
            </a>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              We design, build, analyze, and market digital products, helping companies bridge the gap between creative visual art and robust engineering.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href={siteConfig.contact.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-brand-primary/20 text-text-secondary hover:text-white transition-all flex items-center justify-center"
                aria-label="Foundry4 LinkedIn profile"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href={siteConfig.contact.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-brand-primary/20 text-text-secondary hover:text-white transition-all flex items-center justify-center"
                aria-label="Foundry4 Instagram profile"
              >
                <svg className="h-4 w-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href={siteConfig.contact.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-brand-primary/20 text-text-secondary hover:text-white transition-all flex items-center justify-center"
                aria-label="Foundry4 Facebook page"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  onClick={(e) => handleNavClick(e, "#")}
                  className="text-sm text-text-secondary hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, "#about")}
                  className="text-sm text-text-secondary hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, "#services")}
                  className="text-sm text-text-secondary hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#work"
                  onClick={(e) => handleNavClick(e, "#work")}
                  className="text-sm text-text-secondary hover:text-white transition-colors"
                >
                  Our Work
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  onClick={(e) => handleNavClick(e, "#process")}
                  className="text-sm text-text-secondary hover:text-white transition-colors"
                >
                  Process
                </a>
              </li>
            </ul>
          </div>

          {/* Primary Services Directory */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="space-y-3">
              {siteConfig.services.map((service) => (
                <li key={service.title}>
                  <a
                    href="#services"
                    onClick={(e) => handleNavClick(e, "#services")}
                    className="text-sm text-text-secondary hover:text-white transition-colors block truncate max-w-xs"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                <span className="text-sm text-text-secondary leading-relaxed">
                  {siteConfig.contact.address}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-brand-primary shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-sm text-text-secondary hover:text-white transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-brand-primary shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm text-text-secondary hover:text-white transition-colors break-all"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Attribution footer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-text-secondary">
            <span>
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </span>
            <div className="hidden md:block h-3 w-px bg-white/10" />
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms & Conditions
              </a>
            </div>
          </div>
          <div className="text-xs text-text-secondary flex items-center space-x-1.5">
            <span>Built by</span>
            <span className="font-semibold text-white tracking-wider uppercase bg-white/5 px-2 py-0.5 rounded text-[10px] border border-white/5">
              Foundry4
            </span>
            <span>with</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" />
            <span>in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
