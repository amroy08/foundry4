import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Industries from "@/components/Industries";
import EnquiryForm from "@/components/EnquiryForm";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://foundry4.in/#organization",
        "name": siteConfig.name,
        "url": "https://foundry4.in",
        "logo": "https://foundry4.in/logo.png",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": siteConfig.contact.phone,
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": ["en", "hi"]
          }
        ],
        "sameAs": [
          siteConfig.contact.socials.linkedin,
          siteConfig.contact.socials.twitter,
          siteConfig.contact.socials.instagram,
          siteConfig.contact.socials.github
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://foundry4.in/#website",
        "url": "https://foundry4.in",
        "name": siteConfig.name,
        "description": siteConfig.description,
        "publisher": {
          "@id": "https://foundry4.in/#organization"
        }
      },
      ...siteConfig.services.map((service, index) => ({
        "@type": "Service",
        "@id": `https://foundry4.in/#service-${index}`,
        "serviceType": service.title,
        "provider": {
          "@id": "https://foundry4.in/#organization"
        },
        "description": service.description,
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "INR"
        }
      }))
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
