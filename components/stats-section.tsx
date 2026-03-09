"use client";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "@/lib/gsap";
import { StatsBottomCurve } from "@/components/stats-bottom-curve";
import { Instagram, ExternalLink } from "lucide-react";
import { CLIENTS_LIST } from "@/lib/constants";

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);

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

      // ── Clip-path reveal for each client card ────────────
      if (statsGrid) {
        const cards = gsap.utils.toArray<HTMLElement>(
          statsGrid.querySelectorAll("[data-client-card]"),
        );

        gsap.set(cards, {
          clipPath: "inset(0 0 100% 0)",
          opacity: 0,
        });

        gsap.to(cards, {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
          onComplete() {
            gsap.set(cards, { clearProps: "clipPath" });
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white lg:h-screen relative overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row h-full min-h-0 w-full">
        {/* Col 1: Scrolling text (continuous) — fixed width */}
        <div
          ref={leftColumnRef}
          className="hidden lg:flex w-[160px] xl:w-[200px] shrink-0 flex-col border-r border-white/10 select-none bg-black overflow-hidden"
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
                          <span className="text-lg xl:text-xl font-black tracking-tighter text-white leading-none">
                            {line === "TRIVOXADS" ? "TRIVOX" : "GROWTH ·"}
                          </span>
                          <span className="text-lg xl:text-xl font-black tracking-tighter text-logo-pink leading-none">
                            {line === "TRIVOXADS" ? "ADS" : " ADS"}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg xl:text-xl font-black tracking-tighter text-white leading-none">
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

        {/* Col 2: CLIENTS TRUST US — responsive width */}
        <div className="flex w-full lg:w-[320px] xl:w-[400px] shrink-0 flex-col justify-center bg-black p-8 md:p-12 lg:border-r border-white/10">
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black leading-[0.85] tracking-tighter uppercase"
          >
            <span className="block mb-2">CLIENTS</span>
            <span className="block mb-2">TRUST</span>
            <span className="block">US</span>
          </h2>
        </div>

        {/* Col 3: Clients grid — rest of space */}
        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
          <div
            ref={statsGridRef}
            className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 bg-black"
          >
            {CLIENTS_LIST.map((client, i) => (
              <div
                key={client.id}
                data-client-card
                className={`group relative p-8 md:p-10 lg:p-12 border-b border-white/10 lg:border-b-0 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:bg-zinc-950/50 ${i < 2 ? "lg:border-r" : ""
                  }`}
              >
                {/* Background glow effect on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-brand-purple/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="space-y-6 relative z-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl md:text-3xl font-black text-white group-hover:scale-110 group-hover:bg-brand-purple/20 group-hover:border-brand-purple/30 transition-all duration-500">
                    {client.initials}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl xl:text-4xl font-black leading-tight tracking-tighter uppercase text-white mb-2">
                      {client.name}
                    </h3>
                    <p className="text-zinc-500 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] leading-relaxed">
                      {client.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-12 relative z-10">
                  <div className="h-px bg-white/10 w-full group-hover:bg-brand-purple/30 transition-colors" />
                  <div className="flex items-center gap-4">
                    {client.instagram && client.instagram !== "#" && (
                      <a
                        href={client.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-brand-purple hover:border-brand-purple transition-all duration-300"
                        aria-label={`${client.name} Instagram`}
                      >
                        <Instagram size={18} />
                      </a>
                    )}
                    <a
                      href={`https://${client.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-between border border-white/10 px-5 py-3 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:border-white transition-all duration-300 group/btn"
                    >
                      <span>{client.website}</span>
                      <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Quote / CTA bar */}
          <div className="bg-zinc-950 p-6 md:p-8 lg:p-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group">
            <p className="text-sm md:text-base lg:text-lg font-black leading-tight tracking-tight uppercase text-white max-w-2xl relative z-10">
              &quot;TRIVOXADS HELPS BRANDS GROW, ENGAGE, AND CONVERT WITH DATA-DRIVEN STRATEGIES.&quot;
            </p>
            <div className="flex items-center gap-4 shrink-0 relative z-10">
              <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">OUR GROWTH PARTNER</span>
              <div className="w-10 h-px bg-zinc-700" />
            </div>
          </div>
        </div>
      </div>

      <StatsBottomCurve />
    </section>
  );
}
