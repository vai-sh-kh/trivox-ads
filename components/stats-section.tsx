"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const statsGrid = statsGridRef.current;
    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 40%",
            scrub: 1.5,
          },
        },
      );

      // Stagger stat cards when section enters
      if (statsGrid) {
        const cards = gsap.utils.toArray<HTMLElement>(
          statsGrid.querySelectorAll("[data-stat-card]"),
        );
        gsap.set(cards, { opacity: 0, y: 24 });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white py-24 md:py-32 min-h-screen relative overflow-hidden"
    >
      <div className="flex">
        <div className="hidden lg:flex flex-col border-r border-white/10 select-none bg-black">
          <div className="animate-vertical-scroll flex flex-col">
            {[...Array(20)].map((_, i) => {
              const rotations = [-4, 2, -3, 1, -2];
              const deg = rotations[i % rotations.length];
              return (
                <div
                  key={i}
                  className="px-6 py-3 flex flex-col items-center border-b border-white/5 origin-center"
                  style={{ transform: `rotate(${deg}deg)` }}
                >
                  <span className="text-2xl font-black tracking-tighter text-white leading-none">
                    BORN
                  </span>
                  <span className="text-2xl font-black tracking-tighter text-brand-red leading-none">
                    & BRED®
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 bg-black">
          <div className="lg:col-span-3 bg-black p-12 md:p-16 flex flex-col justify-center border-r border-white/10">
            <h2
              ref={headingRef}
              className="text-6xl md:text-8xl font-black leading-[0.8] tracking-tighter uppercase"
            >
              OUR
              <br />
              DATA
              <br />
              DOES
              <br />
              THE
              <br />
              TALKING
            </h2>
          </div>

          <div
            ref={statsGridRef}
            className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 bg-black"
          >
            <div
              data-stat-card
              className="bg-black p-12 border-r border-b border-white/10 flex flex-col justify-between h-72"
            >
              <span className="text-8xl font-black tracking-tighter text-white">
                2X
              </span>
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest leading-tight text-zinc-400">
                  AVERAGE YEAR
                  <br />
                  OVER YEAR
                  <br />
                  GROWTH
                </p>
              </div>
            </div>
            <div
              data-stat-card
              className="bg-black p-12 border-r border-b border-white/10 flex flex-col justify-between h-72"
            >
              <span className="text-8xl font-black tracking-tighter text-white">
                6
              </span>
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest leading-tight text-zinc-400">
                  CLIENT
                  <br />
                  EXITS
                </p>
              </div>
            </div>
            <div
              data-stat-card
              className="bg-black p-12 border-b border-white/10 flex flex-col justify-between h-72"
            >
              <span className="text-8xl font-black tracking-tighter text-white">
                8
              </span>
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest leading-tight text-zinc-400">
                  WEEKS TO
                  <br />
                  MEASURABLE
                  <br />
                  GROWTH
                </p>
              </div>
            </div>

            <div
              data-stat-card
              className="md:col-span-1 bg-black p-12 border-r border-b border-white/10 flex flex-col justify-between h-80"
            >
              <span className="text-7xl font-black tracking-tighter text-white">
                $2.7bn
              </span>
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest leading-tight text-zinc-400">
                  VC FUNDING RAISED
                  <br />
                  BY OUR PARTNERS
                </p>
              </div>
            </div>
            <div
              data-stat-card
              className="md:col-span-2 bg-black p-12 md:p-16 border-b border-white/10 flex flex-col justify-center"
            >
              <blockquote className="text-2xl md:text-4xl font-black leading-[1.1] tracking-tight uppercase mb-8 text-white">
                &quot;BORN & BRED WAS A STRATEGIC GAME-CHANGER. THEIR METICULOUS
                CURATION CUT THROUGH INDUSTRY NOISE, SHAPING A BRAND THAT
                POSITIONS US FOR SCALABLE SUCCESS.&quot;
              </blockquote>
              <cite className="not-italic text-[11px] font-black uppercase tracking-widest text-zinc-400">
                MARCUS SCHILLER | FOUNDER
              </cite>
            </div>

            <div
              data-stat-card
              className="bg-black p-12 border-r border-white/10 flex flex-col justify-between h-72"
            >
              <span className="text-8xl font-black tracking-tighter text-white">
                200+
              </span>
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest leading-tight text-zinc-400">
                  CLIENTS WE&apos;VE
                  <br />
                  HELPED SCALE
                </p>
              </div>
            </div>
            <div
              data-stat-card
              className="bg-black p-12 border-r border-white/10 flex flex-col justify-between h-72"
            >
              <span className="text-8xl font-black tracking-tighter text-white">
                12
              </span>
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest leading-tight text-zinc-400">
                  YEARS SCALING
                  <br />
                  AMBITIOUS BUSINESSES
                </p>
              </div>
            </div>
            <div className="bg-black p-12 flex items-center justify-center" />
          </div>
        </div>
      </div>

      {/* White band at bottom with black paint drips extending down */}
      <div className="absolute bottom-0 left-0 w-full h-28 bg-white pointer-events-none" />
      <svg
        className="absolute bottom-0 left-0 w-full h-28 pointer-events-none"
        viewBox="0 0 100 28"
        preserveAspectRatio="none"
        fill="black"
      >
        {/* Irregular organic black drip shapes on white */}
        <path d="M 0 0 L 6 28 L 14 12 L 18 0 Z" />
        <path d="M 14 0 Q 20 14 22 28 L 30 8 L 32 0 Z" />
        <path d="M 28 0 L 34 24 L 42 0 Z" />
        <path d="M 40 0 Q 46 10 50 28 L 58 16 L 62 0 Z" />
        <path d="M 58 0 L 66 28 L 74 6 L 78 0 Z" />
        <path d="M 74 0 L 80 22 L 88 0 Z" />
        <path d="M 86 0 Q 92 14 98 28 L 100 28 L 100 0 Z" />
      </svg>
    </section>
  );
}
