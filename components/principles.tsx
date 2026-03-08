"use client";

import { useRef, useLayoutEffect } from "react";
import { motion } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const principles = [
  {
    title: "Performance-Driven",
    description:
      "We focus on real business outcomes. Every campaign is planned with clear objectives and optimized for measurable results—conversions, cost efficiency, and audience response.",
  },
  {
    title: "Data-Backed Strategies",
    description:
      "We combine market insights, innovative creatives, and advanced analytics. No guesswork: we help brands connect with the right audience and achieve measurable growth.",
  },
  {
    title: "End-to-End Solutions",
    description:
      "From paid advertising and social media to SEO, content strategy, influencer marketing, and performance optimization—executed with real-world market insights and industry best practices.",
  },
  {
    title: "Transparency & Trust",
    description:
      "We aim to become a trusted digital growth partner by setting new standards in performance, innovation, and transparency—driving sustainable results in an ever-evolving digital landscape.",
    showIcon: true,
  },
];

export function Principles() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const columns = columnsRef.current;
    if (!section || !columns) return;

    const ctx = gsap.context(() => {
      const trigger = section;

      if (title) {
        gsap.fromTo(
          title,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger, start: "top 82%", once: true },
          },
        );
      }

      if (subtitle) {
        gsap.fromTo(
          subtitle,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            delay: 0.15,
            ease: "power2.out",
            scrollTrigger: { trigger, start: "top 82%", once: true },
          },
        );
      }

      const cards = gsap.utils.toArray<HTMLElement>(
        columns.querySelectorAll("[data-principle-card]"),
      );
      gsap.set(cards, { opacity: 0, y: 36 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        delay: 0.25,
        scrollTrigger: { trigger, start: "top 82%", once: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:py-20 lg:py-24 flex flex-col bg-[#faf9fc]"
    >
      {/* Base gradient: soft warm white to very light purple */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "linear-gradient(165deg, #fdfcff 0%, #f8f6fc 35%, #f3effa 70%, #faf9fc 100%)",
        }}
      />

      {/* Soft gradient orbs (brand purple / pink) */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
        <div className="absolute -top-24 left-1/4 w-[min(90vw,480px)] h-[min(90vw,480px)] rounded-full bg-brand-purple/6 blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-[min(70vw,380px)] h-[min(70vw,380px)] rounded-full bg-logo-pink/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(80vw,420px)] h-[min(60vw,320px)] rounded-full bg-brand-purple/4 blur-3xl" />
      </div>

      {/* Subtle moving shine */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute top-0 left-0 h-full w-[200%]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 25%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 75%, transparent 100%)",
          }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative max-w-[1920px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 flex flex-col w-full z-10">
        {/* Title block — doc: Why TrivoxAds? + tagline (mobile-first) */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14">
          <h2 ref={titleRef} className="text-center">
            <span className="block text-[clamp(2rem,4.5vw,3rem)] md:text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-brand-purple">
              Why TrivoxAds?
            </span>
            <span
              ref={subtitleRef}
              className="block mt-2 md:mt-3 text-[clamp(1.25rem,2.8vw,2rem)] md:text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-[1.1] tracking-tight text-black"
            >
              Results-Oriented. Data-Backed. Trusted.
            </span>
          </h2>
        </div>

        {/* Four columns with motion hover */}
        <div
          ref={columnsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10"
        >
          {principles.map((p, i) => (
            <motion.div
              key={i}
              className="lg:px-6 xl:px-8 flex"
              initial={false}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div
                data-principle-card
                className="flex flex-col rounded-xl sm:rounded-2xl border border-zinc-100 bg-white p-5 sm:p-6 md:p-8 shadow-sm hover:shadow-md hover:border-brand-purple/20 transition-all duration-300"
              >
                {p.showIcon && (
                  <div className="mb-4 flex items-center justify-start">
                    <span
                      className="w-8 h-8 rounded-full border-2 border-brand-purple flex items-center justify-center"
                      aria-hidden
                    >
                      <span className="w-2 h-2 rounded-full bg-brand-purple" />
                    </span>
                  </div>
                )}
                <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-[1.2] text-black mb-4">
                  {p.title}
                </h3>
                <p className="text-base md:text-[1.05rem] leading-relaxed text-zinc-700 flex-1">
                  {p.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
