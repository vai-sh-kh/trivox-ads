/**
 * When true: Hero + FeaturedSection use video background container (video-through-text).
 * When false: Original design with separate Hero and FeaturedSection.
 */
export const IS_HERO_SECTION_FULL = true;

// ─── Site (SEO, sitemap, robots) ─────────────────────────────────────────────
export const SITE_URL =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SITE_URL) ||
  "https://trivoxads.com";
export const SITE_NAME = "TrivoxAds";
export const SITE_DEFAULT_TITLE = "TrivoxAds | Results-Oriented Digital Marketing Agency";
export const SITE_DEFAULT_DESCRIPTION =
  "TrivoxAds is a results-oriented digital marketing agency in Trivandrum. We help brands grow through strategic planning, creative execution, and performance-driven campaigns. Social media, SEO, content, and analytics.";

// ─── Contact (single source of truth) ───────────────────────────────────────
export const CONTACT_PHONE = "+91 8089609045";
export const CONTACT_EMAIL = "info@edustackacademy.com";
export const CONTACT_ADDRESS =
  "320/21, SREEVALSAM, KARIYAKONAM, VELICODE, OORUTTAMBALAM P O, Trivandrum";
export const CONTACT_INSTAGRAM_URL = "https://www.instagram.com/trivox_ads";
export const CONTACT_FACEBOOK_URL = "https://www.facebook.com/share/1WBbfi3cDj/";
/** Phone digits only for WhatsApp (derived from CONTACT_PHONE) */
export const CONTACT_WHATSAPP_NUMBER = CONTACT_PHONE.replace(/\D/g, "");
export const CONTACT_WHATSAPP_URL = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}`;

export const CONTACT = {
  phone: CONTACT_PHONE,
  email: CONTACT_EMAIL,
  address: CONTACT_ADDRESS,
  instagram: CONTACT_INSTAGRAM_URL,
  facebook: CONTACT_FACEBOOK_URL,
  whatsappNumber: CONTACT_WHATSAPP_NUMBER,
  whatsappUrl: CONTACT_WHATSAPP_URL,
} as const;

/** Media/social links for menu overlay and footer (single source of truth) */
export const MEDIA_LINKS = [
  { label: "Instagram", href: CONTACT.instagram },
  { label: "Facebook", href: CONTACT.facebook },
  { label: "WhatsApp", href: CONTACT.whatsappUrl },
] as const;

/** Rotating tagline in header (navbar + menu overlay) */
export const HEADER_TEXTS = [
  "RESULTS-ORIENTED DIGITAL MARKETING",
  "YOUR GROWTH PARTNER IN ADS",
  "DATA-BACKED STRATEGIES THAT CONVERT",
] as const;

/** Main nav links – same order in menu overlay and footer */
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Digital Marketing", href: "/digital-marketing" },
  { label: "Contact", href: "/contact" },
] as const;

// ─── Testimonials (dummy – replace with real client reviews) ──────────────────
export interface Testimonial {
  id: string;
  authorName: string;
  initials: string;
  date: string;
  text: string;
  company?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    authorName: "EduStack Academy",
    initials: "EA",
    date: "March 2026",
    text: "We had a great experience working with Trivox Ads for the marketing of EduStack Academy. Their team clearly understands the education industry and helped us generate quality leads through well-planned digital campaigns. The strategy, creatives, and ad optimization they provided really helped increase our admissions. Highly professional team, responsive support, and result-oriented approach. Highly recommended for any educational institution looking to grow through digital marketing.",
    company: "EduStack Academy",
  },
  {
    id: "t2",
    authorName: "Taneya Jewelry",
    initials: "TJ",
    date: "March 2026",
    text: "Working with Trivox Ads for promoting Taneya has been an amazing experience. Their team perfectly understood our brand identity and created campaigns that matched our anti-tarnish minimalist jewelry positioning. From ad creatives to audience targeting, everything was handled professionally. We saw great engagement and brand visibility through their campaigns. Highly recommended for brands that want strong digital growth.",
    company: "Taneya Jewelry",
  },
  {
    id: "t3",
    authorName: "Aromél by Newmont Aromatics",
    initials: "AN",
    date: "March 2026",
    text: "Our collaboration with Trivox Ads for promoting Aromél by Newmont Aromatics has been fantastic. As a wellness and self-care brand, we wanted marketing that communicates calm, trust, and authenticity — and the Trivox team delivered exactly that. Their campaign strategies helped us reach the right audience interested in wellness, healing, and self-care products. Very supportive team and highly creative approach. Definitely recommend them for wellness and lifestyle brands.",
    company: "Aromél by Newmont Aromatics",
  },
];

// ─── FAQs (dummy – replace with real Q&A) ────────────────────────────────────
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq1",
    question: "Who is TrivoxAds?",
    answer:
      "TrivoxAds is a results-oriented digital marketing agency committed to helping brands grow through strategic planning, creative execution, and performance-driven campaigns. We specialize in delivering data-backed digital solutions that increase visibility, engagement, and conversions across online platforms.",
  },
  {
    id: "faq2",
    question: "Why choose TrivoxAds?",
    answer:
      "TrivoxAds is a performance-driven digital marketing agency focused on creating impactful online strategies that help brands grow, engage, and convert. We blend data, creativity, and technology to deliver measurable results across digital platforms, with end-to-end solutions executed using real-world market insights and industry best practices.",
  },
  {
    id: "faq3",
    question: "What services does TrivoxAds offer?",
    answer:
      "We offer social media marketing, search engine optimization, content creation, performance tracking and analytics, influencer marketing, and meme marketing. All our services are executed with real-world market insights and industry best practices. You can explore full details on our Digital Marketing page.",
  },
  {
    id: "faq4",
    question: "How can I contact TrivoxAds?",
    answer:
      "You can reach us via phone, email, Instagram, or Facebook. Visit our Contact page for all details. We'll discuss your goals and how our strategies can help you reach the right audience and achieve measurable growth.",
  },
  {
    id: "faq5",
    question: "How much experience does TrivoxAds have?",
    answer:
      "We bring years of growth and hands-on experience in digital marketing. For more on our journey, team, and the people behind TrivoxAds, check our About Us page.",
  },
];

// ─── Services (single source for Home + Digital Marketing page) ──────────────
export interface ServiceItem {
  id: string;
  name: string;
  shortDescription?: string;
}

export const SERVICES: ServiceItem[] = [
  { id: "s1", name: "Social Media Marketing" },
  { id: "s2", name: "Search Engine Optimization" },
  { id: "s3", name: "Content Creation" },
  { id: "s4", name: "Performance Tracking & Analytics" },
  { id: "s5", name: "Influencer Marketing" },
  { id: "s6", name: "Meme Marketing" },
];

// Service names only (for grids/lists that don't need full object)
export const SERVICE_NAMES = SERVICES.map((s) => s.name) as readonly string[];

// Service descriptions (Digital Marketing page + any long-form use) — short card copy
export const SERVICE_DESCRIPTIONS: Record<string, string> = {
  "Social Media Marketing":
    "We build and manage your presence across social platforms to increase visibility, engagement, and community. Strategies tailored to your audience and goals.",
  "Search Engine Optimization":
    "We improve your site and content for search engines so you rank for the terms your audience uses. Technical health, relevant content, and sustainable organic growth.",
  "Content Creation":
    "Copy, visuals, and assets that match your brand voice and support your goals. From blog posts and social content to ad creatives and landing pages.",
  "Performance Tracking & Analytics":
    "We turn data into decisions. Clear visibility into traffic, engagement, conversions, and ROI—so you can refine campaigns and improve performance.",
  "Influencer Marketing":
    "We connect you with the right creators to extend your reach and credibility. From selection and briefing to execution and reporting.",
  "Meme Marketing":
    "Meme-style and trend-led content to make your brand relatable and shareable. We keep it on-brand and on-trend for engagement and recall.",
};

// ─── About page (single source from doc) ───────────────────────────────────
export const ABOUT_YEARS = "1+";
export const ABOUT_YEARS_LABEL = "Year Experience";
export const ABOUT_YEARS_DESCRIPTION =
  "Delivering data-backed digital solutions that increase visibility, engagement, and conversions for brands.";

export const ABOUT_MISSION =
  "To empower brands with data-driven digital marketing strategies that deliver measurable growth, meaningful engagement, and long-term success. We combine creativity, technology, and analytics to help businesses reach the right audience at the right time with the right message.";

export const ABOUT_VISION =
  "To become a trusted digital growth partner for brands by setting new standards in performance, innovation, and transparency—driving sustainable results in an ever-evolving digital landscape.";

export const ABOUT_MAN_BEHIND =
  "The driving force behind TrivoxAds brings together a passion for performance marketing and a commitment to helping brands grow. With a focus on data, creativity, and real-world market insights, the team is dedicated to delivering strategies that connect brands with the right audience and achieve measurable business outcomes.";
// ─── Clients (for Showcase/Stats section replacement) ──────────────────────
export interface ClientItem {
  id: string;
  name: string;
  website: string;
  tagline: string;
  instagram?: string;
  initials: string;
}

export const CLIENTS_LIST: ClientItem[] = [
  {
    id: "c1",
    name: "EduStack Academy LLP",
    website: "edustackacademy.com",
    tagline: "Top-Rated Digital Marketing Academy in Kerala",
    instagram: "https://www.instagram.com/edustack_academy/",
    initials: "ES",
  },
  {
    id: "c2",
    name: "Aromél Wellness Blends",
    website: "aromel.com",
    tagline: "Wellness & Self-Care Brand. Promoting calm, trust, and authenticity with high-quality healing products.",
    instagram: "https://www.instagram.com/aromelwellnessblends.official?igsh=MW1jMzc1amFmODg0bA%3D%3D",
    initials: "AN",
  },
  {
    id: "c3",
    name: "Taneya Jewelry",
    website: "taneyajewelry.com",
    tagline: "Minimalist Anti-Tarnish Jewelry Brand. Premium 316L stainless steel jewelry crafted for everyday elegance.",
    instagram: "https://www.instagram.com/taneya.jewels?igsh=MWtwMXhna2xrMDN0ZQ%3D%3D",
    initials: "TJ",
  },
];
