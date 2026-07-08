import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

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
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.aboutText,
  keywords: [
    "Software Development",
    "Website Development",
    "Ecommerce Development",
    "Creative Media",
    "Creative Design",
    "Video Production",
    "Data Analysis",
    "Business Intelligence",
    "Power BI Dashboards",
    "Digital Marketing",
    "Meta Ads",
    "Google Ads",
    "AI Automation",
    "AI Chatbots",
    "WhatsApp Automation",
    "Business Workflow Automation",
    "Custom AI Solution",
    "Foundry4",
    "Foundry4 India"
  ],
  authors: [{ name: "Foundry4" }],
  creator: "Foundry4",
  metadataBase: new URL("https://foundry4.in"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://foundry4.in",
    title: `${siteConfig.name} | Technology, Creative, Data & Marketing Services`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Building Digital Experiences`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Technology, Creative, Data & Marketing Services`,
    description: siteConfig.description,
    images: ["/og-image.png"],
    creator: "@foundry4"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-bg-dark text-text-primary selection:bg-brand-primary/30 selection:text-white antialiased flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}
