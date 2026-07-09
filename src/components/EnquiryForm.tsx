"use client";

import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, ChevronDown } from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  serviceRequired: string;
  estimatedBudget: string;
  preferredContact: string;
  projectDescription: string;
  projectTimeline: string;
  consent: boolean;
  honeypot: string; // Anti-spam hidden field
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  companyName: "",
  serviceRequired: "Website Development",
  estimatedBudget: "",
  preferredContact: "Email",
  projectDescription: "",
  projectTimeline: "1-3 Months",
  consent: false,
  honeypot: "",
};

export default function EnquiryForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Listen to auto-selection event from Services section
  useEffect(() => {
    const handleSelectService = (e: Event) => {
      const customEvent = e as CustomEvent<{ service: string }>;
      if (customEvent.detail && customEvent.detail.service) {
        setFormData((prev) => ({
          ...prev,
          serviceRequired: customEvent.detail.service,
        }));
      }
    };

    window.addEventListener("set-enquiry-service", handleSelectService);
    return () => {
      window.removeEventListener("set-enquiry-service", handleSelectService);
    };
  }, []);

  const validateForm = (): boolean => {
    const tempErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.fullName.trim()) {
      tempErrors.fullName = "Full name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      tempErrors.phone = "Please enter a valid phone number (min 10 digits)";
    }

    if (!formData.projectDescription.trim()) {
      tempErrors.projectDescription = "Project description is required";
    } else if (formData.projectDescription.trim().length < 20) {
      tempErrors.projectDescription = "Please provide a bit more detail (min 20 characters)";
    }

    if (!formData.consent) {
      tempErrors.consent = "You must consent to be contacted regarding your project";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
      // Clear checkbox error on check
      if (target.checked) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear field errors as user types
      if (errors[name as keyof FormData]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setFormData(initialFormData);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to submit enquiry. Please try again later.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      setErrorMessage("An unexpected network error occurred. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-[#02000a] border-t border-white/5">
      {/* Background decoration elements */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[300px] h-[300px] bg-brand-secondary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-secondary mb-3">
            Start a Conversation
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Tell Us About Your Project
          </p>
          <div className="h-1 w-12 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto mt-4 rounded-full" />
        </div>

        {/* Form Container */}
        <div className="glass-panel border border-white/10 rounded-3xl p-5 sm:p-8 md:p-12 shadow-2xl relative">
          
          {/* Honeypot hidden input for spam bots */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleInputChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {status === "success" ? (
            <div className="text-center py-12 space-y-6 animate-fade-in">
              <div className="inline-flex p-4 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 mb-2">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Enquiry Received!</h3>
              <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                Thank you for reaching out to Foundry4. We have sent a confirmation email to you. Our engineering and strategy team will review your project parameters and respond within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all bg-white/5 border border-white/10 text-white hover:bg-white/10"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              
              {/* Form Failure Alert */}
              {status === "error" && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start space-x-3 text-red-400">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <div className="text-xs font-semibold leading-relaxed">
                    {errorMessage}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="fullName" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Full Name <span className="text-brand-secondary">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full bg-white/[0.02] border rounded-xl px-4 py-3.5 text-base text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all ${
                      errors.fullName ? "border-red-500/50" : "border-white/10"
                    }`}
                    placeholder="Enter your full name"
                    disabled={status === "loading"}
                    required
                  />
                  {errors.fullName && (
                    <span className="text-[10px] text-red-400 font-semibold flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.fullName}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="email" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Email Address <span className="text-brand-secondary">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-white/[0.02] border rounded-xl px-4 py-3.5 text-base text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all ${
                      errors.email ? "border-red-500/50" : "border-white/10"
                    }`}
                    placeholder="Enter your email address"
                    disabled={status === "loading"}
                    required
                  />
                  {errors.email && (
                    <span className="text-[10px] text-red-400 font-semibold flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Phone Number */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="phone" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Phone Number <span className="text-brand-secondary">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full bg-white/[0.02] border rounded-xl px-4 py-3.5 text-base text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all ${
                      errors.phone ? "border-red-500/50" : "border-white/10"
                    }`}
                    placeholder="e.g. +91 98765 43210"
                    disabled={status === "loading"}
                    required
                  />
                  {errors.phone && (
                    <span className="text-[10px] text-red-400 font-semibold flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.phone}
                    </span>
                  )}
                </div>

                {/* Company Name */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="companyName" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-base text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                    placeholder="Your organization name (optional)"
                    disabled={status === "loading"}
                  />
                </div>

                {/* Service Required */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="serviceRequired" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Service Required
                  </label>
                  <div className="relative">
                    <select
                      id="serviceRequired"
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleInputChange}
                      className="w-full appearance-none bg-bg-dark border border-white/10 rounded-xl pl-4 pr-10 py-3.5 text-base text-white focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all cursor-pointer"
                      disabled={status === "loading"}
                    >
                      <option value="Website Development">Website Development</option>
                      <option value="Ecommerce Website Development">Ecommerce Website Development</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="Custom Software Development">Custom Software Development</option>
                      <option value="Web Application Development">Web Application Development</option>
                      <option value="ERP or Business System">ERP or Business System</option>
                      <option value="Creative Design and Branding">Creative Design and Branding</option>
                      <option value="Poster or Brochure Design">Poster or Brochure Design</option>
                      <option value="Video Editing and Animation">Video Editing and Animation</option>
                      <option value="Social Media Marketing">Social Media Marketing</option>
                      <option value="Meta Ads">Meta Ads</option>
                      <option value="Google Ads">Google Ads</option>
                      <option value="Data Analysis">Data Analysis</option>
                      <option value="Power BI Dashboard">Power BI Dashboard</option>
                      <option value="AI Chatbot">AI Chatbot</option>
                      <option value="WhatsApp Automation">WhatsApp Automation</option>
                      <option value="Business Workflow Automation">Business Workflow Automation</option>
                      <option value="Custom AI Solution">Custom AI Solution</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Estimated Budget */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="estimatedBudget" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Estimated Budget Range
                  </label>
                  <input
                    type="text"
                    id="estimatedBudget"
                    name="estimatedBudget"
                    value={formData.estimatedBudget}
                    onChange={handleInputChange}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-base text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                    placeholder="e.g. ₹50,000 - ₹2,00,000"
                    disabled={status === "loading"}
                  />
                </div>

                {/* Preferred Contact Method */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="preferredContact" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Preferred Contact Method
                  </label>
                  <div className="relative">
                    <select
                      id="preferredContact"
                      name="preferredContact"
                      value={formData.preferredContact}
                      onChange={handleInputChange}
                      className="w-full appearance-none bg-bg-dark border border-white/10 rounded-xl pl-4 pr-10 py-3.5 text-base text-white focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all cursor-pointer"
                      disabled={status === "loading"}
                    >
                      <option value="Email">Email</option>
                      <option value="Phone Call">Phone Call</option>
                      <option value="WhatsApp">WhatsApp</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Project Timeline */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="projectTimeline" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Project Timeline
                  </label>
                  <div className="relative">
                    <select
                      id="projectTimeline"
                      name="projectTimeline"
                      value={formData.projectTimeline}
                      onChange={handleInputChange}
                      className="w-full appearance-none bg-bg-dark border border-white/10 rounded-xl pl-4 pr-10 py-3.5 text-base text-white focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all cursor-pointer"
                      disabled={status === "loading"}
                    >
                      <option value="Immediate (< 1 Month)">Immediate (&lt; 1 Month)</option>
                      <option value="1-3 Months">1-3 Months</option>
                      <option value="3-6 Months">3-6 Months</option>
                      <option value="Flexible / Long-Term">Flexible / Long-Term</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Project Description */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="projectDescription" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Project Scope & Description <span className="text-brand-secondary">*</span>
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  rows={5}
                  className={`w-full bg-white/[0.02] border rounded-xl px-4 py-3.5 text-base text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all resize-none ${
                    errors.projectDescription ? "border-red-500/50" : "border-white/10"
                  }`}
                  placeholder="Tell us about your requirements, features needed, target audience, and business challenges..."
                  disabled={status === "loading"}
                  required
                />
                {errors.projectDescription && (
                  <span className="text-[10px] text-red-400 font-semibold flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.projectDescription}
                  </span>
                )}
              </div>

              {/* Consent Checkbox */}
              <div className="flex flex-col space-y-2">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 bg-bg-dark border border-white/10 rounded focus:ring-brand-primary cursor-pointer text-brand-primary"
                    disabled={status === "loading"}
                  />
                  <label htmlFor="consent" className="text-xs text-text-secondary leading-relaxed cursor-pointer select-none">
                    I consent to Foundry4 processing my data and contacting me regarding this project enquiry according to their Privacy Policy. <span className="text-brand-secondary">*</span>
                  </label>
                </div>
                {errors.consent && (
                  <span className="text-[10px] text-red-400 font-semibold flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.consent}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full inline-flex items-center justify-center py-4 px-8 rounded-xl font-bold tracking-wide uppercase transition-all duration-300 bg-brand-primary hover:bg-brand-primary/95 text-white disabled:bg-white/5 disabled:text-text-secondary disabled:cursor-not-allowed text-xs relative overflow-hidden active:scale-[0.98]"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing Request...
                  </>
                ) : (
                  <>
                    Send Project Enquiry
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}
