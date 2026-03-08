"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ABOUT_MISSION, ABOUT_VISION } from "@/lib/constants";
import { motion } from "motion/react";

export function AboutMissionVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;
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
      if (cards) {
        const items = gsap.utils.toArray<HTMLElement>(
          cards.querySelectorAll("[data-mv-card]"),
        );
        gsap.set(items, { y: 48, opacity: 0 });
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 85%", once: true },
        });
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
          <span className="text-gradient">Our Mission & Vision</span>
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16"
        >
          <motion.article
            data-mv-card
            className="border border-zinc-200 rounded-2xl p-8 md:p-10 bg-zinc-50/50 hover:bg-zinc-100/50 transition-colors border-l-4 border-l-brand-purple"
            whileHover={{ y: -4 }}
          >
            <h3 className="text-brand-purple font-black text-lg md:text-xl uppercase tracking-wide mb-4">
              Our Mission
            </h3>
            <p className="text-zinc-700 leading-relaxed text-base md:text-lg">
              {ABOUT_MISSION}
            </p>
          </motion.article>
          <motion.article
            data-mv-card
            className="border border-zinc-200 rounded-2xl p-8 md:p-10 bg-zinc-50/50 hover:bg-zinc-100/50 transition-colors border-l-4 border-l-logo-pink"
            whileHover={{ y: -4 }}
          >
            <h3 className="text-logo-pink font-black text-lg md:text-xl uppercase tracking-wide mb-4">
              Our Vision
            </h3>
            <p className="text-zinc-700 leading-relaxed text-base md:text-lg">
              {ABOUT_VISION}
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
