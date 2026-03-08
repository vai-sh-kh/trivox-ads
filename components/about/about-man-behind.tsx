"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ABOUT_MAN_BEHIND } from "@/lib/constants";
export function AboutManBehind() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const cta = ctaRef.current;
    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 85%", once: true },
        },
      );
      if (image) {
        gsap.fromTo(
          image,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.15,
            ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top 85%", once: true },
          },
        );
      }
      if (content) {
        gsap.fromTo(
          content,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.25,
            ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top 85%", once: true },
          },
        );
      }
      if (cta) {
        gsap.fromTo(
          cta,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.45,
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
      className="relative bg-white py-16 sm:py-20 md:py-24 lg:py-28 border-t border-zinc-200 overflow-hidden"
    >
      <div className="max-w-[1920px] mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black uppercase tracking-tight mb-12 md:mb-16"
        >
          <span className="text-gradient">The Man Behind</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-10 lg:gap-14 items-start">
          <div
            ref={imageRef}
            className="w-full md:w-64 lg:w-72 aspect-square rounded-2xl bg-gradient-to-br from-brand-purple/20 to-logo-pink/10 border-2 border-zinc-200 flex items-center justify-center shrink-0 overflow-hidden"
          >
            <span className="text-zinc-500 text-sm font-medium text-center px-4">
              Photo placeholder
            </span>
          </div>

          <div ref={contentRef} className="flex-1 min-w-0">
            <p className="text-zinc-700 leading-relaxed text-base md:text-lg">
              {ABOUT_MAN_BEHIND}
            </p>
            <Link
              ref={ctaRef}
              href="/contact"
              className="inline-block mt-8 bg-brand-purple text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-purple-900 transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
