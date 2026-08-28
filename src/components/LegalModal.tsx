"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Scale } from "lucide-react";

export default function LegalModal() {
  const [activeTab, setActiveTab] = useState<"privacy" | "terms" | null>(null);

  // Listen for custom events to trigger modal
  useEffect(() => {
    const handleOpenPrivacy = () => setActiveTab("privacy");
    const handleOpenTerms = () => setActiveTab("terms");

    window.addEventListener("open-privacy-policy", handleOpenPrivacy);
    window.addEventListener("open-terms-conditions", handleOpenTerms);

    return () => {
      window.removeEventListener("open-privacy-policy", handleOpenPrivacy);
      window.removeEventListener("open-terms-conditions", handleOpenTerms);
    };
  }, []);

  // Block/unblock background body scroll
  useEffect(() => {
    if (activeTab) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [activeTab]);

  return (
    <AnimatePresence>
      {activeTab && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 pointer-events-none">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveTab(null)}
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm pointer-events-auto"
          />

          {/* Modal Content Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="relative w-full max-w-2xl max-h-[80vh] bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 pointer-events-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className={`p-2.5 rounded-xl ${activeTab === "privacy" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"}`}>
                  {activeTab === "privacy" ? <Shield className="h-5 w-5" /> : <Scale className="h-5 w-5" />}
                </div>
                <div className="text-left">
                  <h3 className="text-base font-extrabold text-slate-900 leading-none">
                    {activeTab === "privacy" ? "Privacy Policy" : "Terms & Conditions"}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-medium mt-1 block">
                    Last Updated: August 28, 2026
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveTab(null)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 text-left text-slate-650 leading-relaxed text-sm scrollbar-thin">
              {activeTab === "privacy" ? (
                <>
                  <section className="space-y-2">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">1. Introduction</h4>
                    <p>
                      Welcome to <strong>Foundry4</strong> (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). We are committed to protecting your personal data and your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website <a href="https://foundry4.in" className="text-blue-600 hover:underline font-semibold">foundry4.in</a> and inquire about our technology, creative, and digital marketing services.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">2. Information We Collect</h4>
                    <p>We may collect information about you in a variety of ways depending on how you interact with our website:</p>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li>
                        <strong>Enquiry & Form Data:</strong> When you submit a project request on our site, we collect your Name, Corporate Email Address, Phone Number, Company Name, Preferred Service, Project Budget, and your custom Project Scope description.
                      </li>
                      <li>
                        <strong>Usage & Technical Data:</strong> For security and traffic analysis, we track technical details such as your IP address, browser type, device operating system, referral links, and pages visited.
                      </li>
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">3. How We Use Your Information</h4>
                    <p>We process your data strictly to execute our business workflows, including:</p>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li>Evaluating your business scope to provide technical consultations and pricing estimates.</li>
                      <li>Sending project proposals, milestone updates, and transaction confirmations.</li>
                      <li>Improving our website performance and tailoring our service categories.</li>
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">4. Data Security</h4>
                    <p>
                      We implement industry-standard administrative, physical, and electronic security measures designed to protect your personal information from unauthorized access, loss, or alteration. All communication with our servers is encrypted using Secure Socket Layer (SSL) technology.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">5. Your Rights</h4>
                    <p>
                      You have the right to request access to the data we hold, ask for corrections, or request the deletion of your personal records at any time. To make a request, contact us directly at <a href="mailto:info@foundry4.in" className="text-blue-600 hover:underline font-semibold">info@foundry4.in</a>.
                    </p>
                  </section>
                </>
              ) : (
                <>
                  <section className="space-y-2">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">1. Agreement to Terms</h4>
                    <p>
                      By accessing or using our website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">2. Scope of Services</h4>
                    <p>
                      Foundry4 provides digital design, application development, brand strategizing, and data consultation. All active client projects, payments, specific timelines, and deliverables are subject to individual Master Services Agreements (MSAs) or Statements of Work (SOWs) signed separately by authorized representatives.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">3. Intellectual Property Rights</h4>
                    <p>
                      Unless explicitly transferred in a signed client contract, all source code, graphic assets, animations, text content, logos, and UI layout schemes on this website are the intellectual property of Foundry4. Unauthorized copying or redistribution is strictly prohibited.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">4. Limitations of Liability</h4>
                    <p>
                      Foundry4, its directors, or employees will not be held liable for any direct, indirect, incidental, or consequential losses arising out of your use of this website, or any initial project evaluations conducted before a formal, written agreement is executed.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">5. Governing Law</h4>
                    <p>
                      These Terms and Conditions are governed by and construed in accordance with the laws of Maharashtra, India, and you irrevocably submit to the exclusive jurisdiction of the courts located in Mumbai.
                    </p>
                  </section>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
