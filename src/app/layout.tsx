import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingActions from "@/components/FloatingActions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Website Development, Digital Marketing, AI & Data Solutions India`,
    template: `%s | ${siteConfig.name} — Technology, Creative, Data & Marketing`
  },
  description: "Foundry4 is a technology, creative, data, and digital marketing company in Mumbai, India. We build custom websites, mobile apps, Power BI dashboards, run Meta & Google Ads campaigns, and implement AI automation solutions for businesses.",
  keywords: [
    "Foundry4","Foundry 4","foundry4.in","Foundry4 India","Foundry4 Mumbai",
    "website development company India","web development agency Mumbai","custom software development India",
    "mobile app development India","digital marketing agency India","digital marketing company Mumbai",
    "Meta Ads agency India","Google Ads management India","social media marketing Mumbai",
    "Power BI dashboard development","data analysis company India","business intelligence solutions India",
    "AI automation India","AI chatbot development","WhatsApp automation India",
    "ecommerce website development India","creative design agency India","video production company Mumbai",
    "logo design India","SEO services India","lead generation India","SaaS development India",
    "ERP CRM development India","business workflow automation","custom AI solutions India",
    "Software Development","Website Development","Ecommerce Development","Creative Media",
    "Creative Design","Video Production","Data Analysis","Business Intelligence",
    "Power BI Dashboards","Digital Marketing","Meta Ads","Google Ads","AI Automation",
    "AI Chatbots","WhatsApp Automation","Business Workflow Automation","Custom AI Solution"
  ],
  authors: [{ name: "Foundry4", url: "https://foundry4.in" }],
  creator: "Foundry4",
  publisher: "Foundry4",
  metadataBase: new URL("https://foundry4.in"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://foundry4.in",
    title: `${siteConfig.name} | Website Development, Digital Marketing, AI & Data Solutions India`,
    description: "Foundry4 builds custom websites, mobile apps, Power BI dashboards, runs Meta & Google Ads campaigns, and implements AI automation for businesses in India.",
    siteName: siteConfig.name,
    images: [{ url: "https://foundry4.in/opengraph-image", width: 1200, height: 630, alt: "Foundry4 — Technology, Creativity, Data & Marketing Solutions India", type: "image/png" }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Website Development, Digital Marketing, AI & Data Solutions India`,
    description: "Foundry4 builds custom websites, mobile apps, Power BI dashboards, runs Meta & Google Ads campaigns, and implements AI automation for businesses in India.",
    images: ["https://foundry4.in/opengraph-image"],
    creator: "@foundry4"
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  category: "technology"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth overflow-x-hidden`}>
      <body className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900 antialiased flex flex-col justify-between">
        <Cursor />
        <ScrollProgress />
        <FloatingActions />
        {children}
      </body>
    </html>
  );
}
