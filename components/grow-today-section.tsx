"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FlipModalGrid } from "@/components/flip-modal-grid";

const IMAGES = {
  futuristic_brain: "/images/futuristic-brain.jpg",
  del_monte_fruits: "/images/del-monte-fruits.jpg",
  cyberpunk_group: "/images/cyberpunk-group.jpg",
  yellow_pitchfork: "/images/yellow-pitchfork.jpg",
} as const;

const CARD_BASE =
  "w-full h-full min-h-0 rounded-xl overflow-hidden flex flex-col";

const GRID_ITEMS = [
  {
    content: (
      <div key="0" className={`${CARD_BASE} bg-black relative group`}>
        <img
          src={IMAGES.futuristic_brain}
          alt="Futuristic Brain"
          className="w-full h-full min-h-[80px] object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-[10px] font-black text-white uppercase leading-tight">
            Strategic creative for tech & innovation brands
          </p>
        </div>
      </div>
    ),
    description: "Strategic creative for tech & innovation brands",
  },
  {
    content: (
      <div
        key="1"
        className={`${CARD_BASE} bg-white border border-zinc-200/80 p-3 justify-between shadow-sm`}
      >
        <p className="text-[10px] font-black leading-snug text-zinc-900 uppercase flex-1 flex items-center">
          &quot;Partnering with Born & Bred feels like having a high-performing
          internal growth team.&quot;
        </p>
        <div className="flex gap-1.5 shrink-0 mt-1.5">
          <span className="bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded-full text-[8px] font-black flex items-center gap-0.5">
            🧠 29
          </span>
          <span className="bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded-full text-[8px] font-black flex items-center gap-0.5">
            🥰 43
          </span>
        </div>
      </div>
    ),
    description: "Client testimonial — Born & Bred partnership",
  },
  {
    content: (
      <div
        key="2"
        className={`${CARD_BASE} bg-zinc-100/80 p-3 items-center justify-center border border-zinc-200/80`}
      >
        <div className="text-[7px] font-black leading-tight tracking-widest text-zinc-900/40 uppercase text-center">
          <p>L O V E W H A T Y O U S A V E</p>
          <p>S A V E W H A T Y O U L O V E</p>
        </div>
        <p className="text-[9px] font-medium text-zinc-600 mt-1.5 text-center">
          Checkmate — personalized savings platform
        </p>
      </div>
    ),
    description: "Checkmate — personalized savings platform",
  },
  {
    content: (
      <div key="3" className={`${CARD_BASE} bg-black relative group`}>
        <img
          src={IMAGES.del_monte_fruits}
          alt="Del Monte"
          className="w-full h-full min-h-[80px] object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-[10px] font-black text-white uppercase leading-tight">
            Del Monte — growing the most profitable product in history
          </p>
        </div>
      </div>
    ),
    description: "Del Monte — growing the most profitable product in history",
  },
  {
    content: (
      <div
        key="4"
        className={`${CARD_BASE} bg-[#00AEEF] items-center justify-center p-3`}
      >
        <h3 className="text-white text-base md:text-lg font-black italic tracking-tighter text-center">
          eaze
        </h3>
        <p className="text-[9px] text-white/90 font-medium text-center mt-1">
          Cannabis delivery — brand & growth
        </p>
      </div>
    ),
    description: "Eaze — cannabis delivery, brand & growth",
  },
  {
    content: (
      <div key="5" className={`${CARD_BASE} bg-black relative group`}>
        <img
          src={IMAGES.cyberpunk_group}
          alt="Cyberpunk Group"
          className="w-full h-full min-h-[80px] object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-[10px] font-black text-white uppercase leading-tight">
            Cyberpunk-inspired campaign creative
          </p>
        </div>
      </div>
    ),
    description: "Cyberpunk-inspired campaign creative",
  },
  {
    content: (
      <div
        key="6"
        className={`${CARD_BASE} bg-black items-center justify-center p-3 relative`}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-linear-to-br from-blue-500 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shrink-0">
              <div className="w-2.5 h-2.5 bg-black rounded-sm rotate-45" />
            </div>
            <span className="text-white text-sm md:text-base font-black tracking-tighter">
              Pfizer
            </span>
          </div>
          <p className="text-[9px] text-white/80 font-medium text-center">
            Healthcare & pharma brand work
          </p>
        </div>
      </div>
    ),
    description: "Pfizer — healthcare & pharma brand work",
  },
  {
    content: (
      <div
        key="7"
        className={`${CARD_BASE} bg-[#2D2DFF] items-center justify-center p-3`}
      >
        <h3 className="text-white text-sm md:text-base font-black tracking-tighter uppercase text-center">
          SEQUEL
        </h3>
        <p className="text-[9px] text-white/90 font-medium text-center mt-1">
          First tampon redesign in 80 years
        </p>
      </div>
    ),
    description: "Sequel — first tampon redesign in 80 years",
  },
];

export function GrowTodaySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const heading = headingRef.current;
    const paragraph = paragraphRef.current;
    const cta = ctaRef.current;
    const grid = gridRef.current;
    if (!section || !header) return;

    const ctx = gsap.context(() => {
      const trigger = section;

      // Header block: heading, paragraph, then CTA
      const headerTl = gsap.timeline({
        scrollTrigger: { trigger, start: "top 85%", once: true },
      });
      if (heading) {
        headerTl.fromTo(
          heading,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        );
      }
      if (paragraph) {
        headerTl.fromTo(
          paragraph,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.35",
        );
      }
      if (cta) {
        headerTl.fromTo(
          cta,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.3",
        );
      }

      // Grid stagger
      if (grid) {
        const items = gsap.utils.toArray<HTMLElement>(grid.children);
        gsap.set(items, { opacity: 0, y: 20 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger, start: "top 85%", once: true },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="grow"
      className="bg-white py-24 md:py-32 min-h-screen overflow-hidden relative border-t border-zinc-200"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-8">
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-10"
        >
          <div className="flex-1">
            <h2
              ref={headingRef}
              className="text-[clamp(2rem,6vw,4rem)] font-black leading-[0.85] tracking-wide uppercase text-zinc-900"
            >
              Grow Today
            </h2>
            <p
              ref={paragraphRef}
              className="text-zinc-600 text-base md:text-lg font-medium leading-relaxed mt-4 max-w-xl"
            >
              Your growth partner in ads. We help brands scale through strategic
              creative and performance marketing.
            </p>
          </div>

          <div className="shrink-0">
            <a
              ref={ctaRef}
              href="#contact"
              className="inline-flex items-center gap-3 bg-white text-zinc-900 px-6 py-4 rounded-2xl font-semibold text-base shadow-none border-0 hover:bg-zinc-50 transition-colors hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Get a quote</span>
              <span className="w-9 h-9 rounded-full bg-[#8BC34A] flex items-center justify-center shrink-0">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-900"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        <FlipModalGrid
          gridRef={gridRef}
          gridClassName="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4"
          boxClassName="min-w-0 aspect-[4/3]"
          boxContentClassName="aspect-[4/3] w-full h-full min-h-[80px] sm:min-h-0 rounded-xl overflow-hidden cursor-pointer flex items-center justify-center [&>div]:min-h-full [&>div]:min-w-0 [&>div]:w-full [&>div]:h-full"
          itemWrapperClassNames={undefined}
          modalContentClassName="[&>*]:w-full [&>*]:h-full [&>*]:min-h-0 [&>*]:rounded-xl [&>*]:overflow-hidden"
        >
          {GRID_ITEMS.map((item) => item.content)}
        </FlipModalGrid>
      </div>
    </section>
  );
}
