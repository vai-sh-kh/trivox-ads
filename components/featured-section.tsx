"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { MusicWaveBars } from "@/components/music-wave-bars";

export function FeaturedSection({ embedded }: { embedded?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        container,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  if (embedded) {
    return null;
  }

  return (
    <section ref={sectionRef} className="px-4 pb-10 sm:pb-16 md:pb-24">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10">
        <div
          ref={containerRef}
          className="relative aspect-video md:aspect-[21/9] w-full rounded-lg sm:rounded-xl md:rounded-[1rem] overflow-hidden flex items-center justify-center bg-zinc-900"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/home-banner.mp4" type="video/mp4" />
          </video>
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 text-white scale-100 sm:scale-110 md:scale-150 relative z-10">
            <MusicWaveBars className="bg-white scale-90 sm:scale-100" />
            <span className="text-4xl min-[400px]:text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter">
              vividly
            </span>
          </div>
          <div className="absolute inset-0 bg-black/30 pointer-events-none z-[1]" />
        </div>
      </div>
    </section>
  );
}
