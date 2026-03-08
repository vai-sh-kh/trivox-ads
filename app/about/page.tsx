"use client";

import Link from "next/link";
import { Footer } from "@/components/footer";
import { InnerPageLayout } from "@/components/inner-page-layout";
import {
  ABOUT_YEARS,
  ABOUT_YEARS_LABEL,
  ABOUT_YEARS_DESCRIPTION,
  ABOUT_MISSION,
  ABOUT_VISION,
  ABOUT_MAN_BEHIND,
} from "@/lib/constants";
import { motion } from "motion/react";

const INTRO_COPY =
  "TrivoxAds is a results-oriented digital marketing agency committed to helping brands grow through strategic planning, creative execution, and performance-driven campaigns. We specialize in delivering data-backed digital solutions that increase visibility, engagement, and conversions across online platforms.";

const ABOUT_CARDS = [
  {
    id: "years",
    title: `${ABOUT_YEARS} ${ABOUT_YEARS_LABEL}`,
    body: ABOUT_YEARS_DESCRIPTION,
  },
  {
    id: "mission",
    title: "Our Mission",
    body: ABOUT_MISSION,
  },
  {
    id: "vision",
    title: "Our Vision",
    body: ABOUT_VISION,
  },
  {
    id: "why",
    title: "Why TrivoxAds?",
    body: "TrivoxAds is a performance-driven digital marketing agency focused on creating impactful online strategies that help brands grow, engage, and convert. We blend data, creativity, and technology to deliver measurable results across digital platforms. We specialize in end-to-end digital marketing solutions—executed with real-world market insights and industry best practices.",
  },
  {
    id: "man-behind",
    title: "The Man Behind",
    body: ABOUT_MAN_BEHIND,
    cta: { label: "Get in touch", href: "/contact" },
  },
  {
    id: "clients",
    title: "Clients Trust Us",
    body: "Brands partner with TrivoxAds for strategic planning, creative execution, and performance-driven campaigns. We help businesses reach the right audience and achieve measurable growth.",
  },
];

export default function AboutPage() {
  return (
    <>
      <InnerPageLayout
        contentClassName="w-full"
        centerContent={true}
        showDecorativeCircle={false}
      >
        <div className="space-y-16 md:space-y-20 lg:space-y-24">
          {/* Centered hero: same as Digital Marketing page */}
          <header className="text-center max-w-6xl mx-auto w-full">
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-black uppercase tracking-tight leading-[0.95] mt-8 mb-8 whitespace-nowrap"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              About Us
            </motion.h1>
            <motion.p
              className="text-base md:text-lg lg:text-xl text-zinc-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {INTRO_COPY}
            </motion.p>
          </header>

          {/* Cards grid: same style as Digital Marketing page */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {ABOUT_CARDS.map((card, i) => (
              <motion.article
                key={card.id}
                className="group relative p-8 md:p-10 rounded-2xl border border-zinc-200 bg-white hover:border-brand-purple/30 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6 }}
              >
                <h2 className="text-brand-purple font-black text-xl md:text-2xl uppercase tracking-tight mb-6">
                  {card.title}
                </h2>
                <p className="text-zinc-600 leading-relaxed text-base md:text-lg">
                  {card.body}
                </p>
                {card.cta && (
                  <Link
                    href={card.cta.href}
                    className="inline-flex items-center justify-center mt-6 bg-brand-purple text-white px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-purple-900 transition-colors w-fit"
                  >
                    {card.cta.label}
                  </Link>
                )}
              </motion.article>
            ))}
          </section>
        </div>
      </InnerPageLayout>
      <Footer />
    </>
  );
}
