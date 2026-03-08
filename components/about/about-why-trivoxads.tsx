"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const WHY_TEXT =
  "Trivox Ads is a performance-driven digital marketing agency focused on creating impactful online strategies that help brands grow, engage, and convert. We blend data, creativity, and technology to deliver measurable results across digital platforms.";

const SPECIALIZATION =
  "We specialize in end-to-end digital marketing solutions, including paid advertising, social media marketing, search engine marketing, content strategy, and performance optimization—executed with real-world market insights and industry best practices.";

const TRUST_QUOTE =
  "TrivoxAds is a performance-driven digital marketing agency focused on creating impactful online strategies that help brands grow, engage, and convert.";

export function AboutWhyTrivoxAds() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const body = bodyRef.current;
    const quote = quoteRef.current;
    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 85%", once: true },
        },
      );
      if (body) {
        gsap.fromTo(
          body,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.15,
            ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top 85%", once: true },
          },
        );
      }
      if (quote) {
        gsap.fromTo(
          quote,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top 85%", once: true },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white py-20 md:py-28 lg:py-32 overflow-hidden border-t border-white/10"
    >
      <div className="max-w-[1920px] mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight uppercase mb-8 md:mb-10"
        >
          Why TrivoxAds?
        </h2>

        <div ref={bodyRef} className="space-y-6 max-w-4xl mb-16 md:mb-20">
          <p className="text-zinc-300 text-lg md:text-xl leading-relaxed">
            {WHY_TEXT}
          </p>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
            {SPECIALIZATION}
          </p>
        </div>

        <div
          ref={quoteRef}
          className="border-l-4 border-brand-purple pl-6 md:pl-8 py-4 rounded-r-xl bg-white/5"
        >
          <p className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-2">
            Clients Trust Us
          </p>
          <blockquote className="text-zinc-400 text-lg md:text-xl leading-relaxed italic">
            &ldquo;{TRUST_QUOTE}&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
