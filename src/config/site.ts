export interface ServiceGroup {
  heading: string;
  items: string[];
}

export interface ServiceItem {
  title: string;
  description: string;
  iconName: string;
  subServices?: string[];
  groupedServices?: ServiceGroup[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  liveUrl: string;
  description: string;
  keyFeatures: string[];
  technologies: string[];
  location: string;
  isLive: boolean;
  pdfUrl?: string;
  pages?: string[];
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  aboutText: string;
  contact: {
    email: string;
    phone: string;
    address: string;
    socials: {
      linkedin: string;
      instagram: string;
      facebook: string;
    };
  };
  services: ServiceItem[];
  projects: ProjectItem[];
  processSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  whyChooseUs: {
    title: string;
    description: string;
  }[];
  industries: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: "Foundry4",
  tagline: "Building Digital Experiences That Move Businesses Forward",
  description: "Foundry4 helps businesses build custom digital products, powerful visual content, data-driven solutions, and high-performing marketing campaigns.",
  aboutText: "Foundry4 is a technology, creative, data, and digital marketing company helping businesses turn ideas into practical digital solutions. Our work includes live websites for organisations in education and international trade, along with custom software, mobile applications, data dashboards, creative design, video production, and performance marketing services.",
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@foundry4.in",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+91 8433568078",
    address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || "House No 625 Bhoiwada village GD Ambekar Road Near jan mandir parel mum 12",
    socials: {
      linkedin: "https://linkedin.com/company/foundry4-digital/",
      instagram: "https://instagram.com/foundry4.in",
      facebook: "https://facebook.com/foundry4.in"
    }
  },
  services: [
    {
      title: "Software and Web Development",
      description: "Custom-built, secure, scalable, fast, and fully responsive websites, mobile applications, software platforms, and business systems designed around each client’s requirements.",
      iconName: "Code",
      subServices: [
        "Custom Website Development",
        "Business Website Development",
        "Ecommerce Website Development",
        "Custom Software Development",
        "Mobile App Development",
        "Web Application Development",
        "SaaS Product Development",
        "ERP and CRM Systems",
        "Business Management Systems",
        "API Development and Integration",
        "Website Redesign",
        "Website Maintenance and Support",
        "Responsive and Fast-Loading Development"
      ]
    },
    {
      title: "Creative Media and Digital Marketing",
      description: "Creative design, professional video production, social media content, and performance-driven marketing solutions that help businesses build their brand, attract audiences, generate leads, and grow online.",
      iconName: "Palette",
      groupedServices: [
        {
          heading: "Creative Design",
          items: [
            "Graphic Design",
            "Social Media Post Design",
            "Poster Design",
            "Brochure Design",
            "Business Card Design",
            "Logo Design",
            "Branding Materials",
            "Promotional Creatives",
            "Advertisement Creative Design"
          ]
        },
        {
          heading: "Video and Animation",
          items: [
            "Video Editing",
            "Reels and Short-Form Videos",
            "Motion Graphics",
            "Animation Videos",
            "Corporate Videos",
            "Product Promotional Videos",
            "Social Media Videos"
          ]
        },
        {
          heading: "Digital Marketing",
          items: [
            "Social Media Marketing",
            "Digital Marketing Strategy",
            "Meta Ads",
            "Instagram and Facebook Ads",
            "Google Ads",
            "Campaign Management",
            "Lead Generation",
            "Brand Awareness Campaigns",
            "Social Media Content Creation",
            "Performance Tracking and Reporting"
          ]
        }
      ]
    },
    {
      title: "Data Analysis and Business Intelligence",
      description: "Data analysis, interactive dashboards, automated reporting, and business intelligence solutions that transform raw business data into meaningful insights and better decisions.",
      iconName: "BarChart3",
      subServices: [
        "Data Analysis",
        "Data Cleaning and Transformation",
        "Interactive Dashboard Development",
        "Power BI Dashboard Development",
        "Excel Reporting",
        "Business Intelligence Solutions",
        "Automated Reports",
        "KPI Tracking",
        "Sales and Performance Analysis",
        "Customer Behaviour Analysis",
        "Data Visualization",
        "Business Decision Support"
      ]
    },
    {
      title: "AI Automation and Business Solutions",
      description: "AI-powered tools, intelligent assistants, and automated workflows designed to reduce repetitive work, improve customer service, speed up business processes, and increase operational efficiency.",
      iconName: "Cpu",
      subServices: [
        "AI Chatbots",
        "Website Chatbot Integration",
        "WhatsApp Automation",
        "Customer Support Automation",
        "Business Workflow Automation",
        "Lead Follow-Up Automation",
        "Email Automation",
        "Custom AI Assistants",
        "Document and Invoice Processing",
        "AI-Powered Search",
        "Data Extraction and Processing",
        "Reporting Automation",
        "API and Third-Party Integrations",
        "Internal Business Tools",
        "AI Consultation and Implementation"
      ]
    }
  ],
  projects: [
    {
      id: "mvhs",
      title: "M.V. High School Website",
      category: "School Website and Digital Administration",
      liveUrl: "https://mvhighschool.in/",
      description: "A complete, responsive school website developed for M.V. High School in Mumbai. The platform provides information about the school, academics, admissions, campus life, news, events, activities, faculty, and other important school resources.",
      keyFeatures: [
        "Fully responsive school website",
        "Modern school-focused UI/UX",
        "Online admission-enquiry form",
        "Academics and grade information",
        "School news and events",
        "Circulars and monthly activities",
        "Campus-life and gallery sections",
        "Contact and enquiry functionality",
        "Mobile-friendly navigation",
        "Fast-loading and SEO-friendly pages",
        "Content-management functionality for school information"
      ],
      technologies: ["PHP", "JavaScript", "HTML5", "Tailwind CSS", "MySQL"],
      location: "India",
      isLive: true
    },
    {
      id: "bodals",
      title: "Bodal's International Corporate Website",
      category: "Export Business and Corporate Website",
      liveUrl: "https://bodalsint.com/",
      description: "A premium corporate website developed for an Indian merchant export business. The website professionally presents the company, its product categories, export capabilities, business information, and enquiry options for international buyers.",
      keyFeatures: [
        "Premium corporate website design",
        "Fully responsive layout",
        "Product-category presentation",
        "Seafood, textile, agriculture, grain, and coffee sections",
        "Product-management functionality",
        "Business enquiry form",
        "International-buyer-focused content",
        "Mobile-friendly user experience",
        "Visitor and business analytics",
        "Fast-loading and SEO-friendly structure",
        "Professional company and contact presentation"
      ],
      technologies: ["PHP", "JavaScript", "Tailwind CSS", "MySQL", "HTML5"],
      location: "India",
      isLive: true
    },
    {
      id: "mvhs-erp",
      title: "M.V. High School ERP System",
      category: "School ERP and Management Software",
      liveUrl: "https://mvhighscoolerp.in/",
      description: "A full-featured, custom-built School ERP platform developed for M.V. High School, Mumbai. The system manages 600+ students across 17 classes, covering admissions, fee collection (₹4.1Cr+ tracked), attendance, academics, payroll, reports, and administration — all from a single unified dashboard.",
      keyFeatures: [
        "Live admin dashboard with real-time stats",
        "Fee collection & outstanding dues tracker",
        "Student, teacher & parent management",
        "Class & section management (17 classes)",
        "Attendance marking & daily reports",
        "Automated WhatsApp fee reminders",
        "8-module reports center (CSV, PDF, Print)",
        "Stock, assets & library management",
        "Payroll & daily accounts ledger",
        "Role-based access for admin & staff",
        "Academic year & exam management",
        "Helpdesk, complaints & document store"
      ],
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "WhatsApp API"],
      location: "Mumbai, India",
      isLive: true
    },
    {
      id: "sakhi-darpan",
      title: "Sakhi Darpan — Festive Magazine Design",
      category: "Magazine Design and Print Media",
      liveUrl: "#",
      description: "A beautifully crafted festive edition magazine designed for Sakhi Darpan, a Ganesh Utsav special publication. The design features rich traditional aesthetics, vibrant layouts, and editorial sections covering beauty, health, recipes, careers, and lifestyle topics.",
      keyFeatures: [
        "Festive Ganesh Utsav special edition design",
        "Multi-section editorial layout (10+ columns)",
        "Traditional Indian design aesthetic",
        "Beauty & fashion, health, recipe sections",
        "Gen Z special career and skills feature",
        "Poetry, stories & home decor sections",
        "Expert advice and women empowerment columns",
        "High-resolution print-ready PDF output",
        "Custom typography and floral design elements",
        "Bilingual content (Hindi and English)"
      ],
      technologies: ["Adobe InDesign", "Adobe Photoshop", "Adobe Illustrator", "Print Design"],
      location: "Mumbai, India",
      isLive: false,
      pdfUrl: "/pdfs/sakhi_darpan.pdf",
      pages: Array.from({ length: 27 }, (_, i) => `/images/pdf_pages/sakhi_p${String(i + 1).padStart(2, '0')}.png`)
    },
    {
      id: "grc",
      title: "GRC Residency — Luxury Branding",
      category: "Real Estate Branding and Identity Design",
      liveUrl: "#",
      description: "Premium brand identity and business card design for GRC Residency, a luxury real estate development project. The design conveys architectural grandeur, refinement, and prestige — reflecting the elevated positioning of the property brand.",
      keyFeatures: [
        "Premium luxury brand identity",
        "Business card design (front and back)",
        "High-end typography and layout",
        "Architecture-inspired visual theme",
        "Gold and white colour palette",
        "Professional print-ready format",
        "Brand consistency across collateral"
      ],
      technologies: ["Adobe Photoshop", "Adobe Illustrator", "Brand Design", "Print Design"],
      location: "India",
      isLive: false,
      pdfUrl: "/pdfs/grc_bizcard.pdf",
      pages: ["/images/pdf_pages/grc_p01.png", "/images/pdf_pages/grc_p02.png"]
    },
    {
      id: "bodals-print",
      title: "Bodals International — Print Collateral",
      category: "Corporate Branding and Print Design",
      liveUrl: "#",
      description: "Complete corporate print design package for Bodals International, a global merchant export company. Includes a premium business card and a full-page brochure cover showcasing their international shipping, logistics, and trading capabilities.",
      keyFeatures: [
        "Corporate business card design",
        "Full-page brochure cover design",
        "Global trade & logistics visual theme",
        "Premium gold and navy brand palette",
        "Air, sea, and road freight imagery",
        "World map connectivity concept",
        "Print-ready high-resolution files"
      ],
      technologies: ["Adobe Photoshop", "Adobe Illustrator", "Brand Design", "Print Design"],
      location: "India",
      isLive: false,
      pdfUrl: "/pdfs/bodals_brochure.pdf",
      pages: [
        ...Array.from({ length: 11 }, (_, i) => `/images/pdf_pages/bodals_brochure_p${String(i + 1).padStart(2, '0')}.png`),
        "/images/pdf_pages/bodals_biz_p01.png",
        "/images/pdf_pages/bodals_biz_p02.png"
      ]
    }
  ],
  processSteps: [
    {
      step: "01",
      title: "Discovery & Analysis",
      description: "We understand your objectives, requirements, target audience, and business processes in detail."
    },
    {
      step: "02",
      title: "Planning & Strategy",
      description: "We design a comprehensive execution roadmap, select tech stacks, and align on project architecture."
    },
    {
      step: "03",
      title: "Design & Development",
      description: "We build intuitive user interfaces and write clean, robust, and scalable code matching global standards."
    },
    {
      step: "04",
      title: "Review & Testing",
      description: "We perform rigorous quality control, cross-browser audits, accessibility validations, and load testing."
    },
    {
      step: "05",
      title: "Launch & Delivery",
      description: "We deploy the application securely to production environments and perform final validations."
    },
    {
      step: "06",
      title: "Support & Growth",
      description: "We monitor performance, provide continuous updates, and optimize your systems for organic growth."
    }
  ],
  whyChooseUs: [
    {
      title: "Custom Solutions",
      description: "No generic templates. Every line of code and layout is custom built for your exact workflow and brand values."
    },
    {
      title: "Modern UI/UX",
      description: "We build layouts that look stunning, load fast, and provide smooth interactions for exceptional user engagement."
    },
    {
      title: "Transparent Communication",
      description: "We keep you informed at every phase with clear updates, shared access, and collaborative milestones."
    },
    {
      title: "Scalable Development",
      description: "Our architectures are built to grow alongside your customer base without bottlenecking performance."
    },
    {
      title: "Reliable Support",
      description: "Get technical support, optimization advice, and proactive server maintenance whenever you need it."
    },
    {
      title: "Fast & Responsive Delivery",
      description: "Every page is hand-crafted and highly optimized to load fast on desktop, tablet, and mobile browsers."
    },
    {
      title: "Creative & Technical Expertise",
      description: "We bridge the gap between creative visual artistry, deep data analytics, and robust software engineering."
    },
    {
      title: "Business-Focused Approach",
      description: "We prioritize features and channels that directly impact your bottom line, sales, and administration efficiency."
    }
  ],
  industries: [
    "Education & Academics",
    "E-commerce Brands",
    "Retail & Merchandising",
    "Events & Entertainment",
    "Export & Logistics",
    "Tech Startups",
    "Professional Services",
    "Small & Medium Businesses"
  ],
  faqs: [
    {
      question: "What services does Foundry4 offer?",
      answer: "Foundry4 offers custom software and website development, creative media and digital marketing, data analysis and business intelligence dashboards, and AI automation solutions. We help businesses build custom websites, mobile apps, ecommerce platforms, Power BI dashboards, run Meta and Google ad campaigns, and implement AI chatbots and workflow automation."
    },
    {
      question: "Where is Foundry4 located?",
      answer: "Foundry4 is based in Mumbai, India. We work with clients across India and internationally, delivering digital solutions remotely and on-site as needed."
    },
    {
      question: "How much does it cost to build a website with Foundry4?",
      answer: "Every project is custom-scoped based on your requirements. We offer competitive pricing for startups, small businesses, and enterprises. Contact us at info@foundry4.in or call +91 8433568078 for a free consultation and quote."
    },
    {
      question: "Does Foundry4 build mobile apps?",
      answer: "Yes, Foundry4 builds custom mobile applications for Android and iOS platforms, including native apps, cross-platform apps, and progressive web apps (PWAs) tailored to your business needs."
    },
    {
      question: "Can Foundry4 help with digital marketing and social media ads?",
      answer: "Yes, Foundry4 provides full-service digital marketing including Meta Ads (Facebook and Instagram), Google Ads, social media marketing, content creation, lead generation campaigns, and performance tracking with detailed analytics and reporting."
    },
    {
      question: "What is Foundry4's process for starting a new project?",
      answer: "Our process starts with a Discovery and Analysis phase where we understand your goals, followed by Planning and Strategy, then Design and Development, rigorous Review and Testing, Launch and Delivery, and ongoing Support and Growth to ensure long-term success."
    }
  ]
};
