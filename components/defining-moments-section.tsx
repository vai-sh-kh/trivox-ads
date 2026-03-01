"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { LineRevealText } from "@/components/line-reveal-text";

export function DefiningMomentsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const gridLinesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const button = buttonRef.current;
    const gridLines = gridLinesRef.current;
    if (!section || !heading || !button) return;

    const ctx = gsap.context(() => {
      const trigger = section;

      // Heading block: y + opacity
      gsap.fromTo(
        heading,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger,
            start: "top 85%",
            once: true,
          },
        },
      );

      // Button: opacity + scale
      gsap.fromTo(
        button,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger,
            start: "top 85%",
            once: true,
          },
        },
      );

      // Grid lines: draw in when section enters
      if (gridLines) {
        const vLines = gridLines.querySelectorAll("[data-v-line]");
        const hLines = gridLines.querySelectorAll("[data-h-line]");
        if (vLines.length && hLines.length) {
          gsap.set([...vLines], { scaleY: 0, transformOrigin: "top center" });
          gsap.set([...hLines], { scaleX: 0, transformOrigin: "left center" });
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger,
              start: "top 85%",
              once: true,
            },
          });
          tl.to(vLines, {
            scaleY: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: "power2.out",
          }).to(
            hLines,
            {
              scaleX: 1,
              duration: 0.5,
              stagger: 0.06,
              ease: "power2.out",
            },
            "-=0.3",
          );
        }
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Grid: 3 vertical + 3 horizontal lines */}
      <div
        ref={gridLinesRef}
        className="absolute inset-0 pointer-events-none max-w-[1400px] mx-auto px-6"
      >
        <div className="w-full h-full relative">
          {[1, 2, 3].map((i) => (
            <div
              key={`v-${i}`}
              data-v-line
              className="absolute top-0 bottom-0 w-px bg-zinc-300"
              style={{ left: `${(i / 4) * 100}%` }}
            />
          ))}
          {[1, 2, 3].map((i) => (
            <div
              key={`h-${i}`}
              data-h-line
              className="absolute left-0 right-0 h-px bg-zinc-300"
              style={{ top: `${(i / 4) * 100}%` }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative">
        <div className="flex flex-col items-center pt-8 md:pt-14 text-center max-w-5xl mx-auto">
          <h2
            ref={headingRef}
            className="flex flex-col gap-4 text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.85] tracking-wide mb-16 uppercase text-zinc-900"
          >
            <span>THE CREATIVE</span>
            <span>MARKETING</span>
            <span>AGENCY FOR</span>
            <span>DEFINING</span>
            <span>MOMENTS</span>
          </h2>

          <LineRevealText
            className="text-lg md:text-2xl text-zinc-800 mb-16 leading-relaxed max-w-3xl font-medium block"
            as="p"
          >
            Companies call us when everything&apos;s on the line, from Series A
            launches to global repositioning. We move brands through their most
            critical inflection points.
          </LineRevealText>

          <button
            ref={buttonRef}
            type="button"
            className="bg-brand-purple text-white px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest hover:bg-purple-900 transition-all shadow-xl shadow-brand-purple/20 hover:scale-105 active:scale-95"
          >
            GROW YOUR BUSINESS
          </button>
        </div>
      </div>
    </section>
  );
}
