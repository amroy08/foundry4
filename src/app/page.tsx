import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { siteConfig } from "@/config/site";

const About = dynamic(() => import("@/components/About"));
const Services = dynamic(() => import("@/components/Services"));
const Portfolio = dynamic(() => import("@/components/Portfolio"));
const Process = dynamic(() => import("@/components/Process"));
const Industries = dynamic(() => import("@/components/Industries"));
const EnquiryForm = dynamic(() => import("@/components/EnquiryForm"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": "https://foundry4.in/#organization",
        "name": "Foundry4",
        "alternateName": ["Foundry 4", "Foundry4 India", "Foundry4 Digital Solutions"],
        "url": "https://foundry4.in",
        "logo": "https://foundry4.in/images/logo.png",
        "image": "https://foundry4.in/opengraph-image",
        "description": siteConfig.description,
        "email": siteConfig.contact.email,
        "telephone": siteConfig.contact.phone,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "House No 625 Bhoiwada village GD Ambekar Road Near Jan Mandir",
          "addressLocality": "Parel, Mumbai",
          "addressRegion": "Maharashtra",
          "postalCode": "400012",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "19.0060",
          "longitude": "72.8424"
        },
        "areaServed": [
          {
            "@type": "Country",
            "name": "India"
          },
          {
            "@type": "City",
            "name": "Mumbai"
          }
        ],
        "foundingDate": "2024",
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "minValue": 2,
          "maxValue": 10
        },
        "priceRange": "$$",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": siteConfig.contact.phone,
            "contactType": "customer service",
            "email": siteConfig.contact.email,
            "areaServed": "IN",
            "availableLanguage": ["en", "hi"]
          }
        ],
        "sameAs": [
          siteConfig.contact.socials.linkedin,
          siteConfig.contact.socials.instagram,
          siteConfig.contact.socials.facebook
        ],
        "knowsAbout": [
          "Website Development",
          "Mobile App Development",
          "Custom Software Development",
          "Digital Marketing",
          "Meta Ads",
          "Google Ads",
          "Data Analysis",
          "Power BI Dashboards",
          "AI Automation",
          "AI Chatbots",
          "WhatsApp Automation",
          "Creative Design",
          "Video Production",
          "Ecommerce Development",
          "Business Intelligence"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://foundry4.in/#website",
        "url": "https://foundry4.in",
        "name": "Foundry4",
        "alternateName": "Foundry 4",
        "description": siteConfig.description,
        "publisher": {
          "@id": "https://foundry4.in/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.google.com/search?q=site:foundry4.in+{search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://foundry4.in/#webpage",
        "url": "https://foundry4.in",
        "name": "Foundry4 | Website Development, Digital Marketing, AI & Data Solutions India",
        "description": siteConfig.description,
        "isPartOf": {
          "@id": "https://foundry4.in/#website"
        },
        "about": {
          "@id": "https://foundry4.in/#organization"
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://foundry4.in/opengraph-image"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://foundry4.in/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://foundry4.in"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "About",
            "item": "https://foundry4.in/#about"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Services",
            "item": "https://foundry4.in/#services"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Work",
            "item": "https://foundry4.in/#work"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Contact",
            "item": "https://foundry4.in/#contact"
          }
        ]
      },
      ...siteConfig.services.map((service, index) => ({
        "@type": "Service",
        "@id": `https://foundry4.in/#service-${index}`,
        "serviceType": service.title,
        "provider": {
          "@id": "https://foundry4.in/#organization"
        },
        "description": service.description,
        "areaServed": {
          "@type": "Country",
          "name": "India"
        },
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "INR"
        }
      })),
      {
        "@type": "FAQPage",
        "@id": "https://foundry4.in/#faq",
        "mainEntity": siteConfig.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Process />
        <Industries />
        <EnquiryForm />
      </main>
      <Footer />
    </>
  );
}
