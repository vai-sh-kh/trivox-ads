"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { motion } from "motion/react";

const PILLARS = [
  {
    title: "Branding",
    description:
      "At Trivox Ads, we build strong brand identities that connect with audiences and create lasting impressions. Our branding process focuses on defining your brand voice, visual identity, and messaging to ensure consistency across all digital touchpoints.",
  },
  {
    title: "Digital Marketing",
    description:
      "Our digital marketing solutions are designed to increase online visibility, engagement, and lead generation. We create integrated strategies across search engines, social media, and digital platforms to attract the right audience and drive meaningful interactions. Every campaign is planned with clear objectives and optimized for measurable results.",
  },
  {
    title: "Video Marketing",
    description:
      "Trivox Ads leverages video as a powerful storytelling and conversion tool. We develop engaging video content for social media, advertising, and brand promotion that captures attention and communicates messages effectively. From concept to execution, our video strategies are built to boost reach, engagement, and brand recall.",
  },
  {
    title: "Performance Marketing",
    description:
      "We focus on performance-driven campaigns that deliver real business outcomes. Using data, analytics, and continuous optimization, Trivox Ads manages paid advertising across digital platforms to maximize ROI. Every decision is guided by performance metrics such as conversions, cost efficiency, and audience response.",
  },
];

export function HowWeHelpSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subtitle = subtitleRef.current;
    const grid = gridRef.current;
    const cta = ctaRef.current;
    if (!section || !headline) return;

    const ctx = gsap.context(() => {
      const trigger = section;
      const start = "top 85%";

      gsap.fromTo(
        headline,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger, start, once: true },
        },
      );
      if (subtitle) {
        gsap.fromTo(
          subtitle,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.12,
            ease: "power2.out",
            scrollTrigger: { trigger, start, once: true },
          },
        );
      }
      if (grid) {
        const cards = gsap.utils.toArray<HTMLElement>(
          grid.querySelectorAll("[data-pillar-card]"),
        );
        gsap.set(cards, { opacity: 0, y: 32 });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger, start, once: true },
        });
      }
      if (cta) {
        gsap.fromTo(
          cta,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.4,
            ease: "power2.out",
            scrollTrigger: { trigger, start, once: true },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-we-help"
      className="relative bg-black text-white py-24 md:py-32 overflow-hidden"
    >
      <div className="w-full max-w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <h2
          ref={headlineRef}
          className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tight uppercase mb-6 md:whitespace-nowrap"
        >
          How We Help Your Business Grow
        </h2>
        <p
          ref={subtitleRef}
          className="text-zinc-400 text-lg max-w-2xl mb-20"
        >
          We specialize in end-to-end digital marketing solutions—executed with
          real-world market insights and industry best practices.
        </p>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
        >
          {PILLARS.map((pillar, i) => (
            <motion.article
              key={pillar.title}
              data-pillar-card
              className="p-8 md:p-10 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[0.08] transition-colors"
              whileHover={{ y: -4 }}
            >
              <h3 className="text-brand-red font-bold text-xl md:text-2xl uppercase tracking-wide mb-4">
                {pillar.title}
              </h3>
              <p className="text-zinc-300 leading-relaxed">
                {pillar.description}
              </p>
            </motion.article>
          ))}
        </div>

        <div ref={ctaRef} className="mt-16 text-center">
          <Link
            href="/digital-marketing"
            className="inline-block bg-brand-purple text-white px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-purple-900 transition-colors"
          >
            Explore Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}
