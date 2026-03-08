"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { StatsBottomCurve } from "@/components/stats-bottom-curve";

// ─── Helper: Odometer counter animation ────────────────────────────────────
function animateCounter(
  el: HTMLElement,
  target: number,
  suffix: string,
  prefix: string,
  trigger: Element,
) {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: 2.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger,
      start: "top 85%",
      once: true,
    },
    onUpdate() {
      const v = Math.round(obj.val);
      el.textContent =
        prefix + (v >= 1000 ? (v / 1000).toFixed(1) + "k" : String(v)) + suffix;
    },
  });
}

const STATS = [
  {
    display: "5+",
    prefix: "",
    raw: 5,
    suffix: "+",
    label: ["YEARS OF", "GROWTH"],
  },
  {
    display: "50+",
    prefix: "",
    raw: 50,
    suffix: "+",
    label: ["PROJECTS", "DELIVERED"],
  },
  {
    display: "8",
    prefix: "",
    raw: 8,
    suffix: "",
    label: ["WEEKS TO", "MEASURABLE", "RESULTS"],
  },
  {
    display: "100+",
    prefix: "",
    raw: 100,
    suffix: "+",
    label: ["CLIENTS", "TRUST US"],
  },
  {
    display: "200+",
    prefix: "",
    raw: 200,
    suffix: "+",
    label: ["BRANDS WE'VE", "HELPED SCALE"],
  },
  {
    display: "6",
    prefix: "",
    raw: 6,
    suffix: "",
    label: ["SERVICES", "& COUNTING"],
  },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const statsGrid = statsGridRef.current;
    const leftCol = leftColumnRef.current;
    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      // ── Heading slide-in ────────────────────────────────────────────────
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

      // ── Parallax left column ─────────────────────────────────────────────
      if (leftCol) {
        gsap.to(leftCol, {
          y: 60,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // ── Counter roll-up + clip-path reveal for each stat card ────────────
      if (statsGrid) {
        const cards = gsap.utils.toArray<HTMLElement>(
          statsGrid.querySelectorAll("[data-stat-card]"),
        );

        // Initial clip-path hidden state
        gsap.set(cards, {
          clipPath: "inset(0 0 100% 0)",
          opacity: 0,
        });

        gsap.to(cards, {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          duration: 0.7,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
          onComplete() {
            // After reveal, remove clip-path so sub-elements aren't clipped
            gsap.set(cards, { clearProps: "clipPath" });
          },
        });

        // Odometer counters
        numberRefs.current.forEach((el, i) => {
          if (!el) return;
          const stat = STATS[i];
          if (!stat) return;
          // Stretch the number vertically before counting (typewriter up)
          const obj = { val: 0 };
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 0.5,
            delay: i * 0.07,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 85%", once: true },
          });
          gsap.to(obj, {
            val: stat.raw,
            duration: 1.8 + i * 0.1,
            ease: "power2.out",
            delay: i * 0.07 + 0.3,
            scrollTrigger: { trigger: section, start: "top 85%", once: true },
            onUpdate() {
              const v = obj.val;
              if (stat.suffix === "bn+") {
                el.textContent = `$${(v / 1000).toFixed(1)}bn`;
              } else if (stat.suffix === "X") {
                el.textContent = `${Math.round(v)}X`;
              } else if (stat.suffix === "+") {
                el.textContent = `${Math.round(v)}+`;
              } else if (stat.suffix === "%") {
                el.textContent = `${Math.round(v)}%`;
              } else {
                el.textContent = String(Math.round(v));
              }
            },
          });
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white h-screen max-h-screen py-16 md:py-20 relative overflow-hidden"
    >
      <div className="flex h-full min-h-0 w-full">
        {/* Col 1: Scrolling text (continuous) — fixed width */}
        <div
          ref={leftColumnRef}
          className="hidden lg:flex w-[200px] shrink-0 flex-col border-r border-white/10 select-none bg-black overflow-hidden"
        >
          <div className="animate-vertical-scroll flex flex-col">
            {[0, 1, 2, 3, 4].map((block) => (
              <div key={block} className="flex flex-col">
                {[
                  "CREATIVE",
                  "THAT DRIVES",
                  "RESULTS",
                  "TRIVOXADS",
                  "YOUR GROWTH",
                  "PARTNER",
                  "GROWTH · ADS",
                  "CREATIVE",
                  "RESULTS",
                  "TRIVOXADS",
                ].map((line, i) => {
                  const rotations = [-3, 2, -2, 1, -1];
                  const deg = rotations[i % rotations.length];
                  const isBrand =
                    line === "TRIVOXADS" || line === "GROWTH · ADS";
                  return (
                    <div
                      key={`${block}-${i}`}
                      className="px-4 py-3 flex flex-col items-center border-b border-white/5 origin-center shrink-0"
                      style={{ transform: `rotate(${deg}deg)` }}
                    >
                      {isBrand ? (
                        <>
                          <span className="text-xl font-black tracking-tighter text-white leading-none">
                            {line === "TRIVOXADS" ? "TRIVOX" : "GROWTH ·"}
                          </span>
                          <span className="text-xl font-black tracking-tighter text-logo-pink leading-none">
                            {line === "TRIVOXADS" ? "ADS" : " ADS"}
                          </span>
                        </>
                      ) : (
                        <span className="text-xl font-black tracking-tighter text-white leading-none">
                          {line}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Col 2: CLIENTS TRUST US — double width of col 1 */}
        <div className="hidden lg:flex w-[400px] shrink-0 flex-col justify-center bg-black p-8 md:p-12 border-r border-white/10">
          <h2
            ref={headingRef}
            className="text-5xl md:text-7xl font-black leading-[0.85] tracking-tighter uppercase"
          >
            <span className="block mb-2 md:mb-3">CLIENTS</span>
            <span className="block mb-2 md:mb-3">TRUST</span>
            <span className="block">US</span>
          </h2>
        </div>

        {/* Col 3: Stats grid — rest of space, 3 rows × 3 cols */}
        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
          <h2
            className="lg:hidden text-4xl md:text-5xl font-black leading-[0.85] tracking-tighter uppercase p-6 md:p-8 border-b border-white/10"
            aria-hidden
          >
            CLIENTS TRUST US
          </h2>
          <div
            ref={statsGridRef}
            className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-3 grid-rows-3 bg-black"
          >
            {/* Row 1 */}
            <div
              data-stat-card
              className="bg-black p-6 md:p-8 border-r border-b border-white/10 flex flex-col justify-between min-h-[140px] md:min-h-[160px] overflow-hidden"
            >
              <span
                ref={(el) => {
                  numberRefs.current[0] = el;
                }}
                className="text-6xl md:text-7xl font-black tracking-tighter text-white tabular-nums"
              >
                5+
              </span>
              <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest leading-tight text-zinc-400">
                YEARS OF
                <br />
                GROWTH
              </p>
            </div>
            <div
              data-stat-card
              className="bg-black p-6 md:p-8 border-r border-b border-white/10 flex flex-col justify-between min-h-[140px] md:min-h-[160px] overflow-hidden"
            >
              <span
                ref={(el) => {
                  numberRefs.current[1] = el;
                }}
                className="text-6xl md:text-7xl font-black tracking-tighter text-white tabular-nums"
              >
                50+
              </span>
              <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest leading-tight text-zinc-400">
                PROJECTS
                <br />
                DELIVERED
              </p>
            </div>
            <div
              data-stat-card
              className="bg-black p-6 md:p-8 border-b border-white/10 flex flex-col justify-between min-h-[140px] md:min-h-[160px] overflow-hidden"
            >
              <span
                ref={(el) => {
                  numberRefs.current[2] = el;
                }}
                className="text-6xl md:text-7xl font-black tracking-tighter text-white tabular-nums"
              >
                8
              </span>
              <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest leading-tight text-zinc-400">
                WEEKS TO
                <br />
                MEASURABLE
                <br />
                RESULTS
              </p>
            </div>

            {/* Row 2 */}
            <div
              data-stat-card
              className="bg-black p-6 md:p-8 border-r border-b border-white/10 flex flex-col justify-between min-h-[140px] md:min-h-[160px] overflow-hidden"
            >
              <span
                ref={(el) => {
                  numberRefs.current[3] = el;
                }}
                className="text-6xl md:text-7xl font-black tracking-tighter text-white tabular-nums"
              >
                100+
              </span>
              <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest leading-tight text-zinc-400">
                CLIENTS
                <br />
                TRUST US
              </p>
            </div>
            <div
              data-stat-card
              className="md:col-span-2 bg-black p-6 md:p-8 border-b border-white/10 flex flex-col justify-center min-h-[140px] md:min-h-[160px] overflow-hidden"
            >
              <blockquote className="text-lg md:text-2xl font-black leading-[1.15] tracking-tight uppercase mb-4 text-white">
                &quot;TRIVOXADS IS A PERFORMANCE-DRIVEN DIGITAL MARKETING AGENCY
                FOCUSED ON CREATING IMPACTFUL ONLINE STRATEGIES THAT HELP BRANDS
                GROW, ENGAGE, AND CONVERT.&quot;
              </blockquote>
              <cite className="not-italic text-[10px] md:text-[11px] font-black uppercase tracking-widest text-zinc-400">
                CLIENTS TRUST US
              </cite>
            </div>

            {/* Row 3 */}
            <div
              data-stat-card
              className="bg-black p-6 md:p-8 border-r border-white/10 flex flex-col justify-between min-h-[140px] md:min-h-[160px] overflow-hidden"
            >
              <span
                ref={(el) => {
                  numberRefs.current[4] = el;
                }}
                className="text-6xl md:text-7xl font-black tracking-tighter text-white tabular-nums"
              >
                200+
              </span>
              <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest leading-tight text-zinc-400">
                BRANDS WE&apos;VE
                <br />
                HELPED SCALE
              </p>
            </div>
            <div
              data-stat-card
              className="bg-black p-6 md:p-8 border-r border-white/10 flex flex-col justify-between min-h-[140px] md:min-h-[160px] overflow-hidden"
            >
              <span
                ref={(el) => {
                  numberRefs.current[5] = el;
                }}
                className="text-6xl md:text-7xl font-black tracking-tighter text-white tabular-nums"
              >
                6
              </span>
              <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest leading-tight text-zinc-400">
                SERVICES
                <br />& COUNTING
              </p>
            </div>
            <div className="bg-black min-h-[140px] md:min-h-[160px]" />
          </div>
        </div>
      </div>

      <StatsBottomCurve />
    </section>
  );
}
