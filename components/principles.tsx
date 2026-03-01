"use client";

import { useRef, useLayoutEffect } from "react";
import { motion } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { AnimatedText } from "@/components/animated-text";

const principles = [
  {
    title: "We Show Up\nAt Critical\nInflection Points",
    description:
      "Launches. Pivots. Category creation. We do our best work when the stakes are highest, helping you make decisions that move your business forward, fast.",
  },
  {
    title: "Your Creative\nMust Convert",
    description:
      "There are plenty of designers in the world, and AI can generate a pretty picture in seconds. Good design is table stakes. We build creative and marketing solutions that actually perform, driving growth, traction, and results for your business.",
  },
  {
    title: "We're In It For\nThe long Haul",
    description:
      "From brand to performance, we align with your goals from the start. We don't do one-offs. Instead, we build robust systems designed to scale and consistently deliver value over time.",
  },
  {
    title: "Doing Great Work,\nWith Great People",
    description:
      "We believe in working with good people, doing good things, to generate exceptional results, accelerating both business growth and personal success",
  },
];

export function Principles() {
  const sectionRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const columns = columnsRef.current;
    if (!section || !columns) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(
        columns.querySelectorAll("[data-principle-card]"),
      );
      gsap.set(cards, { opacity: 0, y: 28 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden py-24 md:py-32 min-h-screen flex flex-col"
    >
      {/* Running animation: subtle moving shine matching the section design */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute top-0 left-0 h-full w-[200%]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.04) 50%, rgba(0,0,0,0.02) 75%, transparent 100%)",
          }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Full-height vertical lines: top to bottom of section (touch dark section boundary) */}
      <div
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1920px] hidden lg:block pointer-events-none z-1 px-6 md:px-10 lg:px-12"
        aria-hidden
      >
        <div className="relative w-full h-full flex">
          <div className="absolute left-[25%] top-0 bottom-0 w-px bg-zinc-200" />
          <div className="absolute left-[50%] top-0 bottom-0 w-px bg-zinc-200" />
          <div className="absolute left-[75%] top-0 bottom-0 w-px bg-zinc-200" />
        </div>
      </div>

      <div className="relative max-w-[1920px] mx-auto px-6 md:px-10 lg:px-12 flex-1 flex flex-col w-full">
        {/* Title floats above the vertical lines */}
        <div className="text-center mb-20 md:mb-28 lg:mb-32">
          <h2 className="text-left inline-block max-w-[min(90vw,1000px)]">
            <span className="block text-[clamp(2rem,4vw,2.75rem)] md:text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-brand-purple">
              <AnimatedText
                sectionRef={sectionRef}
                as="span"
                className="inline-block"
              >
                Four Principles
              </AnimatedText>
            </span>
            <span className="block mt-1 text-[clamp(1.5rem,3.2vw,2.5rem)] md:text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-tight text-black">
              <AnimatedText
                sectionRef={sectionRef}
                as="span"
                className="inline-block"
              >
                We Never Get Bored Of Talking About
              </AnimatedText>
            </span>
          </h2>
        </div>

        {/* Four columns aligned with full-height vertical lines */}
        <div
          ref={columnsRef}
          className="mt-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 lg:gap-y-0 lg:gap-x-0 items-stretch"
        >
          {principles.map((p, i) => (
            <div key={i} className="lg:px-8">
              <div data-principle-card>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-[1.2] text-black mb-6 whitespace-pre-line">
                  {p.title}
                </h3>
                <p className="text-base md:text-[1.05rem] leading-relaxed text-black font-normal">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
