"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  ABOUT_YEARS,
  ABOUT_YEARS_LABEL,
  ABOUT_YEARS_DESCRIPTION,
} from "@/lib/constants";
import { ParticleBackground } from "@/components/particle-background";
import { useCallback, useState } from "react";

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
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
    const number = numberRef.current;
    const label = labelRef.current;
    const desc = descRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (number) {
        gsap.fromTo(
          number,
          { y: 80, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
          },
        );
      }
      if (label) {
        gsap.fromTo(
          label,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: 0.2,
            ease: "power2.out",
          },
        );
      }
      if (desc) {
        gsap.fromTo(
          desc,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.4,
            ease: "power2.out",
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden bg-white pt-24 sm:pt-28 lg:pt-32 pb-16 md:pb-24"
      onMouseMove={(e) => updateCursor(e.clientX, e.clientY)}
      onMouseLeave={() => setCursor(null)}
      onTouchMove={(e) => {
        const t = e.touches[0];
        if (t) updateCursor(t.clientX, t.clientY);
      }}
      onTouchEnd={() => setCursor(null)}
    >
      <div className="absolute inset-0 section-grid-pattern section-grid-fade opacity-70 pointer-events-none z-0" />
      <ParticleBackground
        className="opacity-[0.5]"
        cursor={cursor}
        chaseSpeed={0.14}
        pullStrength={0.03}
      />
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100vw,500px)] h-[min(70vw,400px)] rounded-full bg-brand-purple/6 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1920px] mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="max-w-4xl">
          <p
            ref={numberRef}
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black tracking-tighter leading-none text-gradient"
          >
            {ABOUT_YEARS}
          </p>
          <p
            ref={labelRef}
            className="text-xl sm:text-2xl md:text-3xl font-black text-black uppercase tracking-tight mt-6 sm:mt-8"
          >
            {ABOUT_YEARS_LABEL}
          </p>
          <p
            ref={descRef}
            className="text-zinc-600 text-base sm:text-lg md:text-xl leading-relaxed mt-4 max-w-2xl"
          >
            {ABOUT_YEARS_DESCRIPTION}
          </p>
        </div>
      </div>
    </section>
  );
}
