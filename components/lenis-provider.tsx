"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";

const LENIS_OPTIONS = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  touchMultiplier: 2,
  smoothWheel: true,
  wheelMultiplier: 1,
  smoothTouch: false,
};

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      ...LENIS_OPTIONS,
      autoResize: true,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger so scroll-driven animations stay in sync
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP ticker as single source for rAF (avoids double updates with ScrollTrigger)
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
