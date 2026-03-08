"use client";

import { useRef, useLayoutEffect, useState, useCallback } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { LineRevealText } from "@/components/line-reveal-text";
import { ParticleBackground } from "@/components/particle-background";

export function AboutWhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  const updateCursor = useCallback((clientX: number, clientY: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCursor({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const button = buttonRef.current;
    if (!section || !heading || !button) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 85%", once: true },
        },
      );
      gsap.fromTo(
        button,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.35,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 85%", once: true },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white min-h-screen overflow-hidden flex flex-col justify-center px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-10 lg:py-14 border-t border-zinc-100"
      onMouseMove={(e) => updateCursor(e.clientX, e.clientY)}
      onMouseLeave={() => setCursor(null)}
      onTouchMove={(e) => {
        const t = e.touches[0];
        if (t) updateCursor(t.clientX, t.clientY);
      }}
      onTouchEnd={() => setCursor(null)}
    >
      <div
        className="absolute inset-4 sm:inset-6 md:inset-8 lg:inset-10 section-grid-pattern section-grid-fade opacity-90 pointer-events-none z-0"
        aria-hidden
      />
      <ParticleBackground
        className="opacity-[0.6]"
        cursor={cursor}
        chaseSpeed={0.18}
        pullStrength={0.035}
      />
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100vw,600px)] h-[min(80vw,500px)] rounded-full bg-brand-purple/4 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="flex flex-col items-center text-center">
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[clamp(3.5rem,6.5vw,6rem)] font-black leading-[1.05] tracking-wide uppercase mt-12 sm:mt-16 md:mt-20 mb-10 sm:mb-12 md:mb-16"
          >
            <span className="text-gradient">Who we are</span>
          </h2>

          <div className="space-y-5 sm:space-y-6 mb-12 sm:mb-14 md:mb-16 max-w-6xl mx-auto">
            <LineRevealText
              className="text-2xl sm:text-3xl md:text-4xl text-zinc-700 leading-relaxed font-normal tracking-wide"
              as="p"
            >
              TrivoxAds is a results-oriented digital marketing agency committed
              to helping brands grow through strategic planning, creative
              execution, and performance-driven campaigns. We specialize in
              delivering data-backed digital solutions that increase visibility,
              engagement, and conversions across online platforms.
            </LineRevealText>
            <LineRevealText
              className="text-xl sm:text-2xl md:text-3xl text-zinc-600 leading-relaxed font-normal tracking-wide"
              as="p"
            >
              By combining market insights, innovative creatives, and advanced
              analytics, we help brands connect with the right audience and
              achieve measurable business outcomes.
            </LineRevealText>
          </div>

          <Link
            ref={buttonRef}
            href="/contact"
            className="inline-block bg-brand-purple text-white px-10 sm:px-12 md:px-14 py-4 sm:py-5 md:py-6 rounded-full font-bold text-sm sm:text-base uppercase tracking-widest hover:bg-purple-900 transition-all shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2"
          >
            Grow your business
          </Link>
        </div>
      </div>
    </section>
  );
}
