/**
 * When true: Hero + FeaturedSection use video background container (video-through-text).
 * When false: Original design with separate Hero and FeaturedSection.
 */
export const IS_HERO_SECTION_FULL = true;

// ─── Contact (single source of truth) ───────────────────────────────────────
export const CONTACT_PHONE = "+91 98765 43210";
export const CONTACT_EMAIL = "hello@trivoxads.com";
export const CONTACT_ADDRESS =
  "Your address here, City, State – Pin Code";
export const CONTACT_INSTAGRAM_URL = "https://instagram.com/trivoxads";
export const CONTACT_FACEBOOK_URL = "https://facebook.com/trivoxads";
/** Phone digits only for WhatsApp (derived from CONTACT_PHONE) */
export const CONTACT_WHATSAPP_NUMBER = CONTACT_PHONE.replace(/\D/g, "");

export const CONTACT = {
  phone: CONTACT_PHONE,
  email: CONTACT_EMAIL,
  address: CONTACT_ADDRESS,
  instagram: CONTACT_INSTAGRAM_URL,
  facebook: CONTACT_FACEBOOK_URL,
  whatsappNumber: CONTACT_WHATSAPP_NUMBER,
} as const;

/** Media/social links for menu overlay and footer (single source of truth) */
export const MEDIA_LINKS = [
  { label: "Instagram", href: CONTACT.instagram },
  { label: "Facebook", href: CONTACT.facebook },
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
    authorName: "Priya Sharma",
    initials: "PS",
    date: "15 Jan 2025",
    text: "TrivoxAds helped us scale our social presence and reach the right audience. Their data-driven approach delivered measurable results within weeks.",
    company: "TechStart India",
  },
  {
    id: "t2",
    authorName: "Rahul Menon",
    initials: "RM",
    date: "02 Dec 2024",
    text: "From branding to performance campaigns, the team understood our goals and executed with precision. Highly recommend for brands looking to grow.",
    company: "GreenLeaf Foods",
  },
  {
    id: "t3",
    authorName: "Anitha Krishnan",
    initials: "AK",
    date: "20 Nov 2024",
    text: "We saw a clear uplift in engagement and conversions after partnering with TrivoxAds. Professional, creative, and results-focused.",
  },
  {
    id: "t4",
    authorName: "Vikram Singh",
    initials: "VS",
    date: "08 Oct 2024",
    text: "Their video marketing strategies gave our brand a fresh voice. The team is responsive and truly cares about delivering outcomes.",
    company: "StyleHub",
  },
  {
    id: "t5",
    authorName: "Meera Nair",
    initials: "MN",
    date: "22 Sep 2024",
    text: "TrivoxAds combined creativity with analytics in a way that actually moved the needle. Our ROI on digital spend improved significantly.",
  },
  {
    id: "t6",
    authorName: "Karthik Reddy",
    initials: "KR",
    date: "14 Aug 2024",
    text: "End-to-end digital solutions delivered with transparency and real-world market insights. A trusted partner for growth.",
    company: "FinServe",
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
export const ABOUT_YEARS = "5+";
export const ABOUT_YEARS_LABEL = "Years of Growth";
export const ABOUT_YEARS_DESCRIPTION =
  "Delivering data-backed digital solutions that increase visibility, engagement, and conversions for brands.";

export const ABOUT_MISSION =
  "To empower brands with data-driven digital marketing strategies that deliver measurable growth, meaningful engagement, and long-term success. We combine creativity, technology, and analytics to help businesses reach the right audience at the right time with the right message.";

export const ABOUT_VISION =
  "To become a trusted digital growth partner for brands by setting new standards in performance, innovation, and transparency—driving sustainable results in an ever-evolving digital landscape.";

export const ABOUT_MAN_BEHIND =
  "The driving force behind TrivoxAds brings together a passion for performance marketing and a commitment to helping brands grow. With a focus on data, creativity, and real-world market insights, the team is dedicated to delivering strategies that connect brands with the right audience and achieve measurable business outcomes.";
