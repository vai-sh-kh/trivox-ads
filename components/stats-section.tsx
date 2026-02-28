"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 40%",
            scrub: 1.5,
          },
        },
      );
    }, sectionRef);

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
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="px-6 py-3 flex flex-col items-center border-b border-white/5"
              >
                <span className="text-2xl font-black tracking-tighter text-white leading-none">
                  BORN
                </span>
                <span className="text-2xl font-black tracking-tighter text-brand-red leading-none">
                  &BRED
                </span>
                <span className="text-[8px] font-black self-end -mt-1">®</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 bg-white/10">
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

          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 bg-white/10">
            <div className="bg-black p-12 border-r border-b border-white/10 flex flex-col justify-between h-72">
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
            <div className="bg-black p-12 border-r border-b border-white/10 flex flex-col justify-between h-72">
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
            <div className="bg-black p-12 border-b border-white/10 flex flex-col justify-between h-72">
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

            <div className="md:col-span-1 bg-black p-12 border-r border-b border-white/10 flex flex-col justify-between h-80">
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
            <div className="md:col-span-2 bg-black p-12 md:p-16 border-b border-white/10 flex flex-col justify-center">
              <blockquote className="text-2xl md:text-4xl font-black leading-[1.1] tracking-tight uppercase mb-8 text-white">
                &quot;BORN & BRED WAS A STRATEGIC GAME-CHANGER. THEIR METICULOUS
                CURATION CUT THROUGH INDUSTRY NOISE, SHAPING A BRAND THAT
                POSITIONS US FOR SCALABLE SUCCESS.&quot;
              </blockquote>
              <cite className="not-italic text-[11px] font-black uppercase tracking-widest text-zinc-500">
                MARCUS SCHILLER | FOUNDER
              </cite>
            </div>

            <div className="bg-black p-12 border-r border-white/10 flex flex-col justify-between h-72">
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
            <div className="bg-black p-12 border-r border-white/10 flex flex-col justify-between h-72">
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

      <div
        className="absolute bottom-0 left-0 w-full h-24 bg-white"
        style={{
          clipPath:
            "polygon(0 100%, 100% 100%, 100% 40%, 95% 35%, 90% 40%, 85% 50%, 80% 45%, 75% 35%, 70% 40%, 65% 55%, 60% 50%, 55% 40%, 50% 45%, 45% 60%, 40% 55%, 35% 40%, 30% 45%, 25% 55%, 20% 50%, 15% 35%, 10% 40%, 5% 55%, 0 45%)",
        }}
      />
    </section>
  );
}
